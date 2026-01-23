import React, { useContext, useMemo } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

const TeacherDashboard = () => {
    const { user, balances, getTeacherBalance } = useContext(AuthContext)

    const myId = user && (user._id || user.id)
    const balance = getTeacherBalance ? getTeacherBalance(myId) : (balances?.[myId] || 0)

    // For simplicity, we read courses from localStorage or leave empty — Courses page holds canonical list from API.
    const allCourses = useMemo(() => {
        try {
            const s = localStorage.getItem('courses')
            return s ? JSON.parse(s) : []
        } catch (e) { return [] }
    }, [])

    const myCourses = allCourses.filter(c => (c.teacherId || c.teacher) && ((c.teacherId === myId) || (c.teacher === myId)))

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="max-w-5xl mx-auto px-6">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
                        <p className="text-sm text-slate-500">Welcome back, {user?.name || 'Teacher'}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-slate-500">Current Balance</div>
                        <div className="text-xl font-semibold">${Number(balance || 0).toFixed(2)}</div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold">My Courses</h2>
                        <Link to="/courses" className="text-sm text-blue-600">Browse Courses</Link>
                    </div>

                    {myCourses.length === 0 ? (
                        <div className="text-sm text-slate-500">You have not added any courses yet.</div>
                    ) : (
                        <ul className="space-y-3">
                            {myCourses.map(c => (
                                <li key={c._id || c.id} className="border rounded p-3 flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">{c.title}</div>
                                        <div className="text-xs text-slate-500">Students: {c.students || 0} • ${Number(c.price || 0).toFixed(2)}</div>
                                    </div>
                                    <div>
                                        <Link to={`/courses/${c._id || c.id}`} className="text-indigo-600">View</Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TeacherDashboard
