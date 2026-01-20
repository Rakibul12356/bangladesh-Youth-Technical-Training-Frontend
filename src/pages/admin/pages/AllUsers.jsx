import React, { useEffect, useState } from 'react'
import { Eye, Edit2, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '../../../config/apiFunction'

const Badge = ({ status }) => {
    const s = (status || '').toString().toLowerCase()
    const cls = s === 'pending' ? 'bg-yellow-100 text-yellow-800' : s === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>{status || 'Active'}</span>
    )
}

const AllUsers = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let mounted = true
        const fetchUsers = async () => {
            try {
                setLoading(true)
                const data = await api.getList('/users')
                if (!mounted) return
                setUsers(Array.isArray(data) ? data : [])
            } catch (err) {
                if (!mounted) return
                setError(err.message || 'Failed to load users')
            } finally {
                if (mounted) setLoading(false)
            }
        }
        fetchUsers()
        return () => { mounted = false }
    }, [])

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this user? This cannot be undone.')) return
        try {
            await api.deleteItem('/users', id)
            setUsers((s) => s.filter((u) => String(u._id) !== String(id)))
        } catch (err) {
            alert(err?.message || 'Delete failed')
        }
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">All Students</h2>
                <Link to="/admin/users/create" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700">
                    Add User
                </Link>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-4 border-b">
                    <div className="text-sm text-gray-600">List of registered students and their application status. Use actions to view, edit or delete.</div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">Loading users...</td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-10 text-center text-red-500">{error}</td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">No users found.</td>
                                </tr>
                            ) : (
                                users.map((u) => (
                                    <tr key={u._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.name || '—'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{u.email || '—'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{u.role || 'student'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <Badge status={u.status || (u.applied ? 'Pending' : 'Active')} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center justify-end gap-3">
                                            <Link to={`/admin/users/${u._id}`} title="View" className="text-blue-600 hover:text-blue-800"><Eye size={18} /></Link>
                                            <Link to={`/admin/users/${u._id}/edit`} title="Edit" className="text-yellow-600 hover:text-yellow-800"><Edit2 size={18} /></Link>
                                            <button onClick={() => handleDelete(u._id)} title="Delete" className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AllUsers