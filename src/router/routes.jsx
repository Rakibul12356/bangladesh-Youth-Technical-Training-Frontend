import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/home/HomePage'
import Courses from '../pages/Courses'
import CourseDetails from '../pages/CourseDetails'
import MyCourses from '../pages/MyCourses'
import SuccessStudents from '../pages/SuccessStudents'
import StudentResult from '../pages/StudentResult'

import Notice from '../pages/Notice'
import ContactUs from '../pages/ContactUs'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminLayout from '../pages/admin/AdminLayout'
import StudentDashboard from '../pages/student/StudentDashboard'
import TeacherDashboard from '../pages/teacher/TeacherDashboard'
import TeacherLayout from '../pages/teacher/TeacherLayout'
import RoleProtectedRoute from '../components/RoleProtectedRoute'
import { AuthProvider } from '../context/AuthContext'
import ProtectedRoute from '../components/ProtectedRoute'
import AllUsers from '../pages/admin/pages/AllUsers'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Public home page wrapped by MainLayout */}
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<HomePage />} />

                        {/* Protected pages (students only where appropriate) */}
                        <Route path="courses" element={<RoleProtectedRoute allowedRoles={["student"]}><Courses /></RoleProtectedRoute>} />
                        <Route path="courses/:id" element={<RoleProtectedRoute allowedRoles={["student"]}><CourseDetails /></RoleProtectedRoute>} />
                        <Route path="my-courses" element={<RoleProtectedRoute allowedRoles={["student"]}><MyCourses /></RoleProtectedRoute>} />
                        <Route path="success-students" element={<ProtectedRoute><SuccessStudents /></ProtectedRoute>} />
                        <Route path="student-result" element={<ProtectedRoute><StudentResult /></ProtectedRoute>} />
                        <Route path="notice" element={<ProtectedRoute><Notice /></ProtectedRoute>} />
                        <Route path="contact-us" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
                    </Route>

                    {/* Auth pages rendered outside MainLayout so they don't include Navbar/Footer */}
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                    {/* Role-based dashboards */}
                    <Route path="/admin" element={<RoleProtectedRoute allowedRoles={["admin"]}><AdminLayout /></RoleProtectedRoute>}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="courses" element={<Courses />} />
                        <Route path="users" element={<AllUsers />} />
                    </Route>

                    <Route path="/student" element={<RoleProtectedRoute allowedRoles={["student"]}><StudentDashboard /></RoleProtectedRoute>} />
                    <Route path="/teacher" element={<RoleProtectedRoute allowedRoles={["teacher"]}><TeacherLayout /></RoleProtectedRoute>}>
                        <Route index element={<TeacherDashboard />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default AppRoutes
