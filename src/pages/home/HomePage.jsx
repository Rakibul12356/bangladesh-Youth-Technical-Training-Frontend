import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

const HomePage = () => {
    return (
        <>
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <section className="py-12 text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Welcome to BTEB</h1>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Bangladesh Technical Education Board trainings and verified institutes — find courses,
                        check results, and apply as an institute.
                    </p>
                </section>

                <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 py-6">
                    <div className="p-6 bg-white rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold">Courses</h3>
                        <p className="mt-2 text-sm text-gray-600">Explore available courses and curricula.</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold">Verified Institutes</h3>
                        <p className="mt-2 text-sm text-gray-600">Find institutes verified by BTEB.</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold">Student Result</h3>
                        <p className="mt-2 text-sm text-gray-600">Check results for registered students.</p>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default HomePage
