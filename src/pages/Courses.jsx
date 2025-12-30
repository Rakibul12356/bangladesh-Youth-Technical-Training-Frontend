import React from 'react'
import { Link } from 'react-router-dom'
import coursesData from '../data/coursesData.json'
import { Clock, BarChart, Users } from 'lucide-react'

const Courses = () => {
    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        All <span className="text-blue-600">Courses</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Explore our complete range of technical training programs and start your journey today
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                            <strong className="text-slate-900">{coursesData.length}</strong> Courses Available
                        </span>
                        <span>•</span>
                        <span>BTEB Verified</span>
                    </div>
                </div>

                {/* Courses Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coursesData.map((course) => (
                        <Link
                            key={course.id}
                            to={`/courses/${course.id}`}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-200 group hover:border-blue-300"
                        >
                            {/* Course Image */}
                            <div className="relative h-48 overflow-hidden bg-slate-200">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-semibold text-slate-700">
                                    {course.level}
                                </div>
                            </div>

                            {/* Course Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {course.title}
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
                                    {course.description}
                                </p>

                                {/* Course Meta */}
                                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-4 text-xs text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {course.duration}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            {course.students}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-yellow-500 text-sm">
                                        <span>★</span>
                                        <span className="font-semibold text-slate-700">{course.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Courses
