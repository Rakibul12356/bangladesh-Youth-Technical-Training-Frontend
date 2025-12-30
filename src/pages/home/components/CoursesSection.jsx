import React from 'react'
import { Link } from 'react-router-dom'
import coursesData from '../../../data/coursesData.json'
import { Clock, BarChart } from 'lucide-react'

const CoursesSection = () => {
    // Show only first 6 courses on home page
    const featuredCourses = coursesData.slice(0, 6)

    return (
        <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Popular <span className="text-blue-600">Courses</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Choose from our wide range of technical training programs designed to boost your career
                    </p>
                </div>

                {/* Courses Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredCourses.map((course) => (
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

                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {course.duration}
                                    </span>
                                    <span className="px-2 py-1 bg-slate-100 rounded-full">
                                        {course.level}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Link
                        to="/courses"
                        className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                    >
                        View All {coursesData.length} Courses
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default CoursesSection
