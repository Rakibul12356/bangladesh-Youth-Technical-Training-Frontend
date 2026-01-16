import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen">
            <Sidebar role="admin" />
            <div className="flex-1 md:ml-72">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout
