import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import AddCourseModal from '../../components/modals/AddCourseModal'
import { AuthContext } from '../../context/AuthContext'
import { toast } from 'react-hot-toast'
import { getAllCourses } from '../../config/apiFunction'

const TeacherCourses = () => {
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

                // Filter courses created by this teacher
                const teacherId = user?._id || user?.id
                const teacherCourses = teacherId
                    ? data.filter(course =>
                        course.teacherId === teacherId ||
                        String(course.teacherId) === String(teacherId)
                    )
                    : []

                setCoursesData(teacherCourses)
                try { localStorage.setItem('teacherCourses', JSON.stringify(teacherCourses)) } catch (e) { }
            } catch (error) {
                console.error('Failed to fetch courses:', error)
                toast.error('Failed to load courses')
            } finally {
                if (mounted) setLoading(false)
            }
        }
        fetchCourses()
        return () => { mounted = false }
    }, [user])

    const handleAddCourse = (newCourse) => {
        // Add the new course to the list
        setCoursesData((prev) => [newCourse, ...prev])
        try {
            const prev = JSON.parse(localStorage.getItem('teacherCourses') || '[]')
            localStorage.setItem('teacherCourses', JSON.stringify([newCourse, ...prev]))
        } catch (e) { }
    }

    if (loading) return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-slate-600">Loading your courses...</p>
            </div>
        </div>
    )

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className=" px-6">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">My Courses</h1>
                        <p className="text-sm text-slate-500">Manage courses you've created</p>
                    </div>

                    <button
                        onClick={() => setShowAdd(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700"
                    >
                        <Plus className="w-4 h-4" /> New Course
                    </button>
                </div>

                <AddCourseModal
                    open={showAdd}
                    onClose={() => setShowAdd(false)}
                    onAdd={handleAddCourse}
                    currentUser={user}
                />

                {coursesData.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <p className="text-slate-600 mb-4">You haven't created any courses yet</p>
                        <button
                            onClick={() => setShowAdd(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded"
                        >
                            <Plus className="w-4 h-4" /> Create Your First Course
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-200">
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            COURSE IDENTITY
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            AUDIENCE
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            GROSS REVENUE
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            VISIBILITY
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            ACTIONS
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {coursesData.map((course, index) => {
                                        const getCourseInitial = (title) => title ? title.charAt(0).toUpperCase() : 'C'
                                        const getAvatarColor = (idx) => {
                                            const colors = ['bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500']
                                            return colors[idx % colors.length]
                                        }
                                        const revenue = ((course.students || 0) * (course.price || 0) * 0.6)
                                        const statusLower = (course.status || 'active').toLowerCase()

                                        return (
                                            <tr key={course._id || course.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-12 h-12 ${getAvatarColor(index)} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                                                            {getCourseInitial(course.title || course.name)}
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-slate-900">{course.title || course.name}</div>
                                                            <div className="text-xs text-slate-500 mt-0.5">
                                                                <span className="inline-flex items-center">
                                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                                                                    UPDATED RECENTLY
                                                                </span>
                                                                <span className="mx-1">•</span>
                                                                <span className="uppercase">{course.category || 'DEVELOPMENT'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-2xl font-bold text-slate-900">{course.students || 0}</div>
                                                    <div className="text-xs text-slate-500 uppercase">Students</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-xl font-bold text-green-600">${revenue.toLocaleString()}</div>
                                                    <div className="text-xs text-slate-500 uppercase">Earnings</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusLower === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${statusLower === 'active' ? 'bg-green-600' : 'bg-yellow-600'
                                                            }`}></span>
                                                        {statusLower === 'active' ? 'ACTIVE' : 'DRAFT'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Link
                                                        to={`/courses/${course._id || course.id}`}
                                                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                                                    >
                                                        View Details →
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TeacherCourses
