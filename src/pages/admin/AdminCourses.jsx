import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Funnel, Plus } from 'lucide-react'
import AddCourseModal from '../../components/modals/AddCourseModal'
import { AuthContext } from '../../context/AuthContext'
import { toast } from 'react-hot-toast'
import { getAllCourses } from '../../config/apiFunction'

const AdminCourses = () => {
    const [showAdd, setShowAdd] = useState(false)
    const [coursesData, setCoursesData] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        let mounted = true
        const fetchCourses = async () => {
            try {
                setLoading(true)
                const data = await getAllCourses()
                if (!mounted) return
                setCoursesData(data)
                try { localStorage.setItem('courses', JSON.stringify(data)) } catch (e) { }
            } catch (error) {
                console.error('Failed to fetch courses:', error)
                toast.error('Failed to load courses')
            } finally {
                if (mounted) setLoading(false)
            }
        }
        fetchCourses()
        return () => { mounted = false }
    }, [])

    const handleAddCourse = (c) => {
        const enhanced = {
            ...c,
            teacherId: (user && (user._id || user.id)) || null,
            instructor: user?.name || c.instructor || 'Unknown',
        }
        setCoursesData((s) => [enhanced, ...s])
        try {
            const prev = JSON.parse(localStorage.getItem('courses') || '[]')
            localStorage.setItem('courses', JSON.stringify([enhanced, ...prev]))
        } catch (e) { }
    }

    if (loading) return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className=" px-6 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-slate-600">Loading courses...</p>
            </div>
        </div>
    )

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className=" px-6">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Courses Directory</h1>
                        <p className="text-sm text-slate-500">Manage your course catalog and pricing.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="inline-flex items-center gap-2 px-3 py-2 bg-white border rounded shadow-sm">
                            <Funnel className="w-4 h-4" /> Filters
                        </button>
                        <button onClick={() => setShowAdd(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded shadow">
                            <Plus className="w-4 h-4" /> Add Course
                        </button>
                    </div>
                </div>

                <AddCourseModal open={showAdd} onClose={() => setShowAdd(false)} onAdd={handleAddCourse} currentUser={user} />

                <div className="bg-white rounded-lg shadow p-4">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-xs text-slate-500 border-b">
                                    <th className="py-3">COURSE DETAILS</th>
                                    <th className="py-3">PRICE / REVENUE</th>
                                    <th className="py-3">STUDENTS</th>
                                    <th className="py-3">STATUS</th>
                                    <th className="py-3">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coursesData.map((course) => (
                                    <tr key={course._id || course.id} className="border-b">
                                        <td className="py-5">
                                            <div className="font-semibold">{course.title || course.name}</div>
                                            <div className="text-xs text-slate-400">By {course.instructor || 'Unknown'}</div>
                                        </td>
                                        <td className="py-5">
                                            <div className="font-semibold">${course.price || 0}</div>
                                            <div className="text-xs text-green-600">${((course.price || 0) * (course.students || 0)).toLocaleString()} total</div>
                                        </td>
                                        <td className="py-5">{course.students || 0}</td>
                                        <td className="py-5">
                                            <span className={`px-3 py-1 rounded-full text-xs ${course.status === 'Active' ? 'bg-green-100 text-green-800' : course.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{course.status || 'Active'}</span>
                                        </td>
                                        <td className="py-5 text-right">
                                            <Link to={`/courses/${course._id || course.id}`} className="text-indigo-600">View</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminCourses
