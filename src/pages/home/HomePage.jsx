import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import HeroSection from './components/HeroSection'
import CoursesSection from './components/CoursesSection'
import ApplyNowSection from './components/ApplyNowSection'

const HomePage = () => {
    return (
        <>
            <main className="">
                <HeroSection />
                <CoursesSection />
                <ApplyNowSection />
            </main>
        </>
    )
}

export default HomePage
