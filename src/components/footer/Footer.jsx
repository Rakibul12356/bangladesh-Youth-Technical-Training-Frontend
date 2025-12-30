import React from 'react'
import { MapPin, Mail, Phone } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-slate-800 text-white">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Footer Content */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    {/* Address */}
                    <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-blue-400" />
                        <div>
                            <h3 className="font-semibold mb-2">Address</h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Idris Villa, Uttara Residential, North Halishahar, Halishahar Thana Road, B-Block, Chattagram
                            </p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 mt-1 flex-shrink-0 text-blue-400" />
                        <div>
                            <h3 className="font-semibold mb-2">Email</h3>
                            <a
                                href="mailto:info@byttc.com.bd"
                                className="text-sm text-slate-300 hover:text-blue-400 transition-colors"
                            >
                                info@byttc.com.bd
                            </a>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 mt-1 flex-shrink-0 text-blue-400" />
                        <div>
                            <h3 className="font-semibold mb-2">Phone</h3>
                            <a
                                href="tel:+8801234567890"
                                className="text-sm text-slate-300 hover:text-blue-400 transition-colors"
                            >
                                +880 1234-567890
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-slate-700 pt-6 text-center text-sm text-slate-400">
                    © Copyright 1998-{new Date().getFullYear()}. All Rights Reserved By BYTTC
                </div>
            </div>
        </footer>
    )
}

export default Footer