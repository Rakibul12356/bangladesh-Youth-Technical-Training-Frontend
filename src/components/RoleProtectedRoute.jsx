import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const RoleProtectedRoute = ({ allowedRoles = [], children }) => {
    const { isAuthenticated, user } = useContext(AuthContext)

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />
    }

    const role = user?.role ? String(user.role).toLowerCase() : null
    const allowed = allowedRoles.map(r => String(r).toLowerCase())
    if (!role || !allowed.includes(role)) {
        return <Navigate to="/" replace />
    }

    return children
}

export default RoleProtectedRoute
