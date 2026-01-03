import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/home/HomePage'
import Courses from '../pages/Courses'
import CourseDetails from '../pages/CourseDetails'
import VerifiedInstitutes from '../pages/VerifiedInstitutes'
import SuccessStudents from '../pages/SuccessStudents'
import StudentResult from '../pages/StudentResult'
import InstituteApply from '../pages/InstituteApply'
import InstituteLogin from '../pages/InstituteLogin'
import Notice from '../pages/Notice'
import ContactUs from '../pages/ContactUs'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import { AuthProvider } from '../context/AuthContext'
import ProtectedRoute from '../components/ProtectedRoute'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Public home page wrapped by MainLayout */}
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<HomePage />} />

                        {/* Protected pages (everything except home) */}
                        <Route path="courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
                        <Route path="courses/:id" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />
                        <Route path="verified-institutes" element={<ProtectedRoute><VerifiedInstitutes /></ProtectedRoute>} />
                        <Route path="success-students" element={<ProtectedRoute><SuccessStudents /></ProtectedRoute>} />
                        <Route path="student-result" element={<ProtectedRoute><StudentResult /></ProtectedRoute>} />
                        <Route path="institute-apply" element={<ProtectedRoute><InstituteApply /></ProtectedRoute>} />
                        <Route path="institute-login" element={<ProtectedRoute><InstituteLogin /></ProtectedRoute>} />
                        <Route path="notice" element={<ProtectedRoute><Notice /></ProtectedRoute>} />
                        <Route path="contact-us" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
                    </Route>

                    {/* Auth pages rendered outside MainLayout so they don't include Navbar/Footer */}
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default AppRoutes
