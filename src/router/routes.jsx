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

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="courses" element={<Courses />} />
                    <Route path="courses/:id" element={<CourseDetails />} />
                    <Route path="verified-institutes" element={<VerifiedInstitutes />} />
                    <Route path="success-students" element={<SuccessStudents />} />
                    <Route path="student-result" element={<StudentResult />} />
                    <Route path="institute-apply" element={<InstituteApply />} />
                    <Route path="institute-login" element={<InstituteLogin />} />
                    <Route path="notice" element={<Notice />} />
                    <Route path="contact-us" element={<ContactUs />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
