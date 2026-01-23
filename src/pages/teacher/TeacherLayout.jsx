import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'

const TeacherLayout = () => {
    return (
        <div className="flex min-h-screen">
            <Sidebar role="teacher" />
            <div className="flex-1 md:ml-72">
                <Outlet />
            </div>
        </div>
    )
}

export default TeacherLayout
