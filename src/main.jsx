import React from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './router/routes'
import './index.css'

createRoot(document.getElementById('root')).render(<AppRoutes />)
