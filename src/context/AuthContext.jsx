import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('auth_token')
        setIsAuthenticated(!!token)
    }, [])

    const login = (token = 'dummy-token') => {
        localStorage.setItem('auth_token', token)
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem('auth_token')
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
