import React, { createContext, useState, useEffect } from 'react'
import axiosInstance, { setAuthToken, clearAuthToken } from '../config/axiosInstance'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setAuthToken(token)
            setIsAuthenticated(true)
        }
    }, [])

    const login = (token, userData = null) => {
        if (!token) return
        setAuthToken(token)
        setIsAuthenticated(true)
        if (userData) setUser(userData)
    }

    const logout = () => {
        clearAuthToken()
        setIsAuthenticated(false)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
