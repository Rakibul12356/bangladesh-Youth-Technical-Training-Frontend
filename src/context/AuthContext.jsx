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
            return s ? JSON.parse(s) : null
        } catch (e) {
            return null
        }
    })

    // On mount ensure axios has the auth header if token exists
    useEffect(() => {
        try {
            const token = localStorage.getItem('token')
            if (token) setAuthToken(token)
        } catch (e) {
            // ignore
        }
    }, [])

    const login = (token, userData = null) => {
        if (!token) return
        setAuthToken(token)
        setIsAuthenticated(true)
        if (userData) {
            setUser(userData)
            try { localStorage.setItem('user', JSON.stringify(userData)) } catch (e) { }
        }
    }

    const logout = () => {
        clearAuthToken()
        setIsAuthenticated(false)
        setUser(null)
        try { localStorage.removeItem('user') } catch (e) { }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
