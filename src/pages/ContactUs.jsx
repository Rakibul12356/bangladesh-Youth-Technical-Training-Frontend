import React from 'react'
import { MapPin, Phone, Mail } from 'lucide-react'

const ContactUs = () => {
    return (
        <section className="max-w-5xl mx-auto px-4 py-12">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-500 text-center mb-8">
                    Contact Us
                </h1>

                <div className="mb-8 text-gray-700 leading-relaxed">
                    <p className="text-base md:text-lg">
                        Bangladesh Youth Technical Training Center has completed a long journey of 27 years. We express our sincere gratitude to all students, parents and well-wishers for their support. Various short courses are currently running including Computer, Land Survey, Electrical and House Wiring, Medical Treatment and many more.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <div className="flex items-start gap-3 mb-2">
                            <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                            <h2 className="text-xl font-semibold text-blue-500">Our Address</h2>
                        </div>
                        <p className="text-gray-700 ml-8">
                            Idris Villa, Uttara Residential, North Halishahar,<br />
                            Halishahar Thana Road, B-Block, Chattagram
                        </p>
                    </div>

                    <div>
                        <div className="flex items-start gap-3 mb-2">
                            <Phone className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                            <h2 className="text-xl font-semibold text-blue-500">Our Contact Number</h2>
                        </div>
                        <a
                            href="tel:+8801857240692"
                            className="text-blue-600 hover:underline ml-8 inline-block"
                        >
                            +8801857240692
                        </a>
                    </div>
                </div>

                <div>
                    <div className="flex items-start gap-3 mb-2">
                        <Mail className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                        <h2 className="text-xl font-semibold text-blue-500">Our Email Address</h2>
                    </div>
                    <a
                        href="mailto:info@byttc.com.bd"
                        className="text-blue-600 hover:underline ml-8 inline-block"
                    >
                        info@byttc.com.bd
                    </a>
                </div>
            </div>
        </section>
    )
}

export default ContactUs
