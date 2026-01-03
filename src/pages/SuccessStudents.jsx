import React, { useState } from 'react'
import students from '../data/successStudents.json'

const SuccessStudents = () => {
    const [expanded, setExpanded] = useState(null)

    return (
        <section className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Success Students</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {students.map((s) => (
                    <div key={s.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="h-44 bg-slate-100 overflow-hidden">
                            <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="p-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="text-lg font-semibold text-slate-900">{s.name}</div>
                                    <div className="text-xs text-slate-500">{s.course} • {s.year}</div>
                                </div>
                               
                            </div>

                            <p className="text-sm text-slate-600 mt-3 line-clamp-3">{s.story}</p>

                            {expanded === s.id && (
                                <div className="mt-3 text-sm text-slate-700">{s.story}</div>
                                
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default SuccessStudents
