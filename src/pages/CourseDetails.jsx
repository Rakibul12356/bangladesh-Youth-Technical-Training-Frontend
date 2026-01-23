import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Clock, BarChart, Users, Award, CheckCircle, ArrowRight } from 'lucide-react'
import { getCourseById } from '../config/apiFunction'
import { createEnrollment } from '../config/apiFunction'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-hot-toast'

const CourseDetails = () => {
    const { id } = useParams()
    const { isAuthenticated } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const [course, setCourse] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth/login', { state: { from: location }, replace: true })
        }
    }, [isAuthenticated, navigate, location])
    useEffect(() => {
        let mounted = true
        const fetchCourse = async () => {
            try {
                setLoading(true)
                const data = await getCourseById(id)
                if (!mounted) return
                setCourse(data)
            } catch (err) {
                console.error('Failed to load course', err)
                setCourse(null)
            } finally {
                if (mounted) setLoading(false)
            }
        }
        fetchCourse()
        return () => { mounted = false }
    }, [id])

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-20 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-slate-600">Loading course...</p>
            </div>
        )
    }

    if (!course) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-20 text-center">
                <h2 className="text-2xl font-bold text-slate-900">Course Not Found</h2>
                <p className="mt-4 text-slate-600">The course you're looking for doesn't exist.</p>
            </div>
        )
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
                        <p className="text-xl text-blue-100 mb-6">{course.description}</p>

                        <div className="flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BarChart className="w-5 h-5" />
                                <span>{course.level}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                <span>{course.students} Enrolled</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Award className="w-5 h-5" />
                                <span>★ {course.rating} Rating</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About Course */}
                        <div className="bg-white rounded-xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Course</h2>
                            <p className="text-slate-600 leading-relaxed">{course.fullDescription}</p>
                        </div>

                        {/* Curriculum */}
                        <div className="bg-white rounded-xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">What You'll Learn</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {(Array.isArray(course.curriculum) && course.curriculum.length > 0) ? (
                                    course.curriculum.map((item, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-slate-700">{item}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-slate-600">No curriculum available for this course.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl p-6 shadow-sm sticky top-20">
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Duration:</span>
                                    <span className="font-semibold text-slate-900">{course.duration}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Level:</span>
                                    <span className="font-semibold text-slate-900">{course.level}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Prerequisites:</span>
                                    <span className="font-semibold text-slate-900">{course.prerequisites}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Certification:</span>
                                    <span className="font-semibold text-slate-900">{course.certification}</span>
                                </div>
                            </div>

                            <EnrollButton courseId={course._id || course.id} />

                            <p className="text-xs text-slate-500 text-center mt-4">
                                Limited seats available. Enroll today!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetails

function EnrollButton({ courseId }) {
    const { isAuthenticated, user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const handleEnroll = async () => {
        if (!isAuthenticated) {
            toast.error('Please login to enroll')
            return
        }
        try {
            setLoading(true)
            const res = await createEnrollment({ courseId })
            toast.success('Enrollment request sent')
        } catch (err) {
            console.error('Enroll error', err)
            const msg = err?.message || 'Failed to send enrollment request'
            toast.error(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <button disabled={loading} onClick={handleEnroll} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors group">
            {loading ? 'Sending...' : 'Enroll Now'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
    )
}
