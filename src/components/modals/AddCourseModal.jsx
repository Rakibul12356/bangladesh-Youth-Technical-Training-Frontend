import React, { useState } from 'react'
import { X } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { createCourseWithAuth } from '../../config/apiFunction'

const AddCourseModal = ({ open, onClose, onAdd, currentUser }) => {
    const [form, setForm] = useState({
        title: '',
        instructor: '',
        price: '',
        students: '',
        status: 'Active',
        image: '',
        description: '',
        duration: '4 weeks',
        level: 'Beginner',
        rating: '4.5',
    })

    // If a teacher opens the modal, prefill the instructor
    React.useEffect(() => {
        if (open && currentUser) {
            setForm((s) => ({ ...s, instructor: currentUser.name || s.instructor }))
        }
    }, [open, currentUser])

    if (!open) return null

    const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }))

    const submit = async (e) => {
        e.preventDefault()
        const payload = {
            title: form.title || 'Untitled Course',
            instructor: form.instructor || 'Unknown',
            price: parseFloat(form.price) || 0,
            students: parseInt(form.students || '0', 10),
            status: form.status,
            image: form.image || '/src/assets/default-course.jpg',
            description: form.description || '',
            duration: form.duration,
            level: form.level,
            rating: form.rating || '0',
        }

        // attach teacher id if currentUser is a teacher
        if (currentUser && (currentUser.role === 'teacher' || String(currentUser.role).toLowerCase() === 'teacher')) {
            payload.teacherId = currentUser._id || currentUser.id || null
        }

        try {
            const saved = await createCourseWithAuth(payload)
            onAdd(saved)
            toast.success('Course added successfully')
            onClose()
        } catch (err) {
            console.error('Failed to create course:', err)
            toast.error(err?.message || 'Failed to create course')
        }
    }

    return (
        <div className="fixed inset-0 z-60 flex items-start justify-center p-4 md:p-8">
            <div className="fixed inset-0 bg-black/40" onClick={onClose} />

            <form onSubmit={submit} className="relative bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 z-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Add Course</h3>
                    <button type="button" onClick={onClose} className="p-2 rounded hover:bg-slate-100">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-slate-600">Title</label>
                        <input name="title" value={form.title} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-xs text-slate-600">Instructor</label>
                        <input name="instructor" value={form.instructor} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-xs text-slate-600">Price</label>
                        <input type="number" step="0.01" name="price" value={form.price} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-xs text-slate-600">Students</label>
                        <input name="students" value={form.students} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-xs text-slate-600">Status</label>
                        <select name="status" value={form.status} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2">
                            <option>Active</option>
                            <option>Draft</option>
                            <option>Archived</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-slate-600">Level</label>
                        <select name="level" value={form.level} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2">
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs text-slate-600">Image URL</label>
                        <input name="image" value={form.image} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs text-slate-600">Description</label>
                        <textarea name="description" value={form.description} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" rows={4} />
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
                    <button type="submit" className="px-4 py-2 rounded bg-indigo-600 text-white">Add Course</button>
                </div>
            </form>
        </div>
    )
}

export default AddCourseModal
