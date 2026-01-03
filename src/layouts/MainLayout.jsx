import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'

const MainLayout = () => {
    return (
        <>
            <Navbar />

            <main className="min-h-screen pt-10 md:pt-0">
                <Outlet />
            </main>

            <Footer />
        </>
    )
}

export default MainLayout