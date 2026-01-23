import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { BookOpen, Users, DollarSign, Award, Search, Filter, TrendingUp } from 'lucide-react'
import { getAllCourses } from '../../config/apiFunction'

const TeacherDashboard = () => {
    const { user, balances, getTeacherBalance } = useContext(AuthContext)
    const [coursesData, setCoursesData] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    const myId = user && (user._id || user.id)
    const balance = getTeacherBalance ? getTeacherBalance(myId) : (balances?.[myId] || 0)

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
            } catch (error) {
                console.error('Failed to fetch courses:', error)
            } finally {
                if (mounted) setLoading(false)
            }
        }
        fetchCourses()
        return () => { mounted = false }
    }, [user])

    // Calculate stats
    const activeCourses = coursesData.filter(c => c.status === 'active').length
    const totalStudents = coursesData.reduce((sum, c) => sum + (c.students || 0), 0)
    const totalRevenue = balance
    const avgRating = coursesData.length > 0
        ? (coursesData.reduce((sum, c) => sum + (c.rating || 0), 0) / coursesData.length).toFixed(1)
        : '0.0'

    // Filter courses by search
    const filteredCourses = coursesData.filter(course =>
        course.title?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Get course initial
    const getCourseInitial = (title) => {
        return title ? title.charAt(0).toUpperCase() : 'C'
    }

    // Get random color for avatar
    const getAvatarColor = (index) => {
        const colors = ['bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500']
        return colors[index % colors.length]
    }

    if (loading) {
        return (
            <div className="bg-slate-50 min-h-screen py-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-slate-600">Loading dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-slate-50 min-h-screen py-8">
            <div className=" px-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Active Courses */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <BookOpen className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex items-center text-green-500 text-sm">
                                <TrendingUp className="w-4 h-4 mr-1" />
                                <span>+12%</span>
                            </div>
                        </div>
                        <div className="text-sm text-slate-500 mb-1">ACTIVE COURSES</div>
                        <div className="text-3xl font-bold text-slate-900">{activeCourses}</div>
                    </div>

                    {/* Total Students */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="flex items-center text-green-500 text-sm">
                                <TrendingUp className="w-4 h-4 mr-1" />
                                <span>+12%</span>
                            </div>
                        </div>
                        <div className="text-sm text-slate-500 mb-1">TOTAL STUDENTS</div>
                        <div className="text-3xl font-bold text-slate-900">{totalStudents.toLocaleString()}</div>
                    </div>

                    {/* Total Revenue */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-green-50 rounded-lg">
                                <DollarSign className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="flex items-center text-green-500 text-sm">
                                <TrendingUp className="w-4 h-4 mr-1" />
                                <span>+12%</span>
                            </div>
                        </div>
                        <div className="text-sm text-slate-500 mb-1">TOTAL REVENUE</div>
                        <div className="text-3xl font-bold text-slate-900">${Number(totalRevenue).toLocaleString()}</div>
                    </div>

                    {/* Avg Rating */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-orange-50 rounded-lg">
                                <Award className="w-6 h-6 text-orange-600" />
                            </div>
                            <div className="flex items-center text-green-500 text-sm">
                                <TrendingUp className="w-4 h-4 mr-1" />
                                <span>+12%</span>
                            </div>
                        </div>
                        <div className="text-sm text-slate-500 mb-1">AVG. RATING</div>
                        <div className="text-3xl font-bold text-slate-900">{avgRating}</div>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search your courses by title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <button className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                        <Filter className="w-5 h-5 text-slate-600" />
                        <span className="text-slate-700 font-medium">Advanced Filter</span>
                    </button>
                </div>

                {/* Courses Table */}
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
                                {filteredCourses.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                            {searchQuery ? 'No courses found matching your search.' : 'You have not created any courses yet.'}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCourses.map((course, index) => (
                                        <tr key={course._id || course.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-12 h-12 ${getAvatarColor(index)} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                                                        {getCourseInitial(course.title)}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-slate-900">{course.title}</div>
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
                                                <div className="text-xl font-bold text-green-600">${((course.students || 0) * (course.price || 0) * 0.6).toLocaleString()}</div>
                                                <div className="text-xs text-slate-500 uppercase">Earnings</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${course.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${course.status === 'active' ? 'bg-green-600' : 'bg-yellow-600'
                                                        }`}></span>
                                                    {course.status === 'active' ? 'ACTIVE' : 'DRAFT'}
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
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherDashboard
