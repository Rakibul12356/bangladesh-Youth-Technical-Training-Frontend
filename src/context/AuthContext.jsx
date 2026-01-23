import React, { createContext, useState, useEffect } from 'react'
import axiosInstance, { setAuthToken, clearAuthToken } from '../config/axiosInstance'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        try {
            return !!localStorage.getItem('token')
        } catch (e) {
            return false
        }
    })

    const [user, setUser] = useState(() => {
        try {
            const s = localStorage.getItem('user')
            const parsed = s ? JSON.parse(s) : null
            if (parsed && parsed.role) parsed.role = String(parsed.role).toLowerCase()
            return parsed
        } catch (e) {
            return null
        }
    })

    // Admin balance (app-level) and per-teacher balances stored in localStorage
    const [adminBalance, setAdminBalance] = useState(() => {
        try { return parseFloat(localStorage.getItem('adminBalance')) || 0 } catch (e) { return 0 }
    })

    const [balances, setBalances] = useState(() => {
        try { const s = localStorage.getItem('balances'); return s ? JSON.parse(s) : {} } catch (e) { return {} }
    })

    // On mount ensure axios has the auth header if token exists
    useEffect(() => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                setAuthToken(token)
                    // fetch current user from backend and store it
                    (async () => {
                        try {
                            const res = await axiosInstance.get('/users/me')
                            const me = res?.data
                            if (me) {
                                if (me.role) me.role = String(me.role).toLowerCase()
                                console.log('Fetched current user from /users/me:', me)
                                setUser(me)
                                try { localStorage.setItem('user', JSON.stringify(me)) } catch (e) { }
                            }
                        } catch (e) {
                            console.warn('Failed to fetch /users/me:', e?.response?.data || e.message || e)
                        }
                    })()
            }
        } catch (e) {
            // ignore
        }
    }, [])

    const login = (token, userData = null) => {
        if (!token) return
        setAuthToken(token)
        setIsAuthenticated(true)
        if (userData) {
            if (userData.role) userData.role = String(userData.role).toLowerCase()
            setUser(userData)
            try { localStorage.setItem('user', JSON.stringify(userData)) } catch (e) { }
            // ensure a balance entry exists for this user (teacher) even if zero
            try {
                const id = userData._id || userData.id || null
                if (id) {
                    setBalances((prev) => {
                        if (prev[id]) return prev
                        const next = { ...prev, [id]: 0 }
                        try { localStorage.setItem('balances', JSON.stringify(next)) } catch (er) { }
                        return next
                    })
                }
            } catch (e) { }
        }

        // Log login for debugging/visibility
        try {
            console.log('AuthContext: login', { token: Boolean(token), user: userData })
        } catch (e) { }
    }

    const logout = () => {
        clearAuthToken()
        setIsAuthenticated(false)
        setUser(null)
        try { localStorage.removeItem('user') } catch (e) { }
        try { console.log('AuthContext: logout') } catch (e) { }
    }

    // Process an enrollment payment on the frontend (simulation): split between admin (40%) and teacher (60%)
    const processEnrollment = (course, teacherId, price) => {
        try {
            const p = Number(price) || Number(course?.price) || 0
            const adminShare = parseFloat((p * 0.4).toFixed(2))
            const teacherShare = parseFloat((p - adminShare).toFixed(2))

            setAdminBalance((prev) => {
                const nv = parseFloat((Number(prev || 0) + adminShare).toFixed(2))
                try { localStorage.setItem('adminBalance', String(nv)) } catch (e) { }
                return nv
            })

            if (!teacherId) return { adminShare, teacherShare }

            setBalances((prev) => {
                const current = Number(prev[teacherId] || 0)
                const nv = parseFloat((current + teacherShare).toFixed(2))
                const next = { ...prev, [teacherId]: nv }
                try { localStorage.setItem('balances', JSON.stringify(next)) } catch (e) { }
                return next
            })

            return { adminShare, teacherShare }
        } catch (e) {
            return { adminShare: 0, teacherShare: 0 }
        }
    }

    const getTeacherBalance = (teacherId) => {
        try { return parseFloat(balances[teacherId] || 0) } catch (e) { return 0 }
    }

    // Log auth state changes for easier debugging in frontend console
    React.useEffect(() => {
        try {
            console.log('Auth state changed:', {
                isAuthenticated,
                user,
                adminBalance,
                balances,
            })
        } catch (e) { }
    }, [isAuthenticated, user, adminBalance, balances])

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, adminBalance, balances, processEnrollment, getTeacherBalance }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
