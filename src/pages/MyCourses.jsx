import React, { useEffect, useState, useContext } from 'react'
import { getUserEnrollments } from '../config/apiFunction'
import { AuthContext } from '../context/AuthContext'

const MyCourses = () => {
    const { isAuthenticated } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [enrollments, setEnrollments] = useState([])

    useEffect(() => {
        if (!isAuthenticated) return
        let mounted = true
        const fetch = async () => {
            try {
                setLoading(true)
                const data = await getUserEnrollments()
                if (!mounted) return
                setEnrollments(data)
            } catch (err) {
                console.error('Failed to load enrollments', err)
            } finally {
                if (mounted) setLoading(false)
            }
        }
        fetch()
        return () => { mounted = false }
    }, [isAuthenticated])

    if (!isAuthenticated) return <div className="px-6 py-12">Please login to see your courses.</div>
    if (loading) return <div className="px-6 py-12">Loading...</div>

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold mb-6">My Courses</h2>
            {enrollments.length === 0 ? (
                <p>You have no approved courses yet.</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {enrollments.map((e) => (
                        <div key={e._id} className="bg-white p-4 rounded shadow">
                            <h3 className="font-semibold text-lg">{e.course?.title || e.course?.name}</h3>
                            <p className="text-sm text-slate-600">Enrolled on: {new Date(e.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyCourses
