import React from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './router/routes'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <Toaster position="top-center" />
        <AppRoutes />
    </AuthProvider>
)
