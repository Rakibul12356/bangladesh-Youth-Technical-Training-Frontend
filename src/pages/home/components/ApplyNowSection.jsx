import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const ApplyNowSection = () => {
    return (
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Apply Now for Your Institute Registration
                </h2>
                <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                    Register your institute with BYTTC and become part of Bangladesh's technical education network
                </p>
                <Link
                    to="/institute-apply"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all shadow-lg active:scale-95 group"
                >
                    APPLY NOW
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </section>
    )
}

export default ApplyNowSection
