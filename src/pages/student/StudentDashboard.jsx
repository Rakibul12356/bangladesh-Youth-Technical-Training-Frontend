import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Sidebar from '../../components/Sidebar'
import { Link } from 'react-router-dom'

const StudentDashboard = () => {
    const { user } = useContext(AuthContext)

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar role="student" />
            <main className="flex-1 p-6 md:ml-72">
                <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
                <p className="text-sm text-slate-600 mb-4">Welcome, {user?.name || user?.email || 'Student'}.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link to="/courses" className="p-4 bg-white rounded shadow hover:shadow-md">
                        <h3 className="font-semibold">My Courses</h3>
                        <p className="text-sm text-slate-500">View enrolled courses and progress.</p>
                    </Link>

                    <Link to="/student/result" className="p-4 bg-white rounded shadow hover:shadow-md">
                        <h3 className="font-semibold">Results</h3>
                        <p className="text-sm text-slate-500">Check your exam results and certificates.</p>
                    </Link>
                </div>
            </main>
        </div>
    )
}

export default StudentDashboard
