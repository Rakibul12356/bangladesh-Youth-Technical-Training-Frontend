import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const MENU_ITEMS = [
    'Home',
    'Courses',
    'Verified Institutes',
    'Success Students',
    'Student Result',
    'Institute Apply',
    'Institute Login',
    'Notice',
    'Contact Us',
]

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const location = useLocation()

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link
                        to="/"
                        className="shrink-0 text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                        BYTTC
                    </Link>

                    {/* Desktop menu */}
                    <div className="hidden md:flex md:items-center md:space-x-3">
                        {MENU_ITEMS.map((label) => {
                            const slug = label === 'Home' ? '/' : `/${label.replace(/\s+/g, '-').toLowerCase()}`
                            const isActive = location.pathname === slug
                            return (
                                <Link
                                    key={label}
                                    to={slug}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {label}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Mobile toggle */}
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            aria-controls="mobile-menu"
                            aria-expanded={open}
                            onClick={() => setOpen((s) => !s)}
                        >
                            <span className="sr-only">{open ? 'Close main menu' : 'Open main menu'}</span>
                            {open ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            {open && (
                <div className="md:hidden px-2 pt-2 pb-3 space-y-1" id="mobile-menu">
                    {MENU_ITEMS.map((label) => {
                        const slug = label === 'Home' ? '/' : `/${label.replace(/\s+/g, '-').toLowerCase()}`
                        const isActive = location.pathname === slug
                        return (
                            <Link
                                key={label}
                                to={slug}
                                onClick={() => setOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {label}
                            </Link>
                        )
                    })}
                </div>
            )}
        </nav>
    )
}

export default Navbar