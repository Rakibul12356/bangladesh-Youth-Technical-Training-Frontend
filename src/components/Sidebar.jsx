import React, { useContext, useState, useRef, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Home, Grid, BookOpen, Users, Settings, LogOut, Menu, X } from 'lucide-react'
import { AuthContext } from '../context/AuthContext'

const Sidebar = ({ role = 'student' }) => {
    const { logout } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)
    const drawerRef = useRef(null)

    useEffect(() => {
        if (!isOpen) return
        const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false) }
        const onDown = (e) => { if (drawerRef.current && !drawerRef.current.contains(e.target)) setIsOpen(false) }
        document.addEventListener('keydown', onKey)
        document.addEventListener('mousedown', onDown)
        return () => {
            document.removeEventListener('keydown', onKey)
            document.removeEventListener('mousedown', onDown)
        }
    }, [isOpen])

    const baseItemClass = 'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium'
    const activeClass = 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'

    return (
        <>
            <aside className="fixed inset-y-0 left-0 w-72 bg-[#0b1220] text-white hidden md:flex flex-col h-screen overflow-hidden z-20">
                <div className="px-6 py-6 border-b border-white/5">
                    <Link to="/" className="flex items-center gap-3 hover:opacity-95">
                        <div className="w-10 h-10 rounded-md bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold">BY</div>
                        <div>
                            <div className="text-lg font-semibold">BYTTC</div>
                            <div className="text-xs text-white/70">{role === 'admin' ? 'Administrator' : 'Student'}</div>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 px-3 py-6 space-y-2 overflow-hidden">
                    <div className="text-xs text-white/50 px-4 mb-2 uppercase">Overview</div>
                    <NavLink end to={role === 'admin' ? '/admin' : '/student'} className={({ isActive }) => `${baseItemClass} ${isActive ? activeClass : 'text-white/90 hover:bg-white/5'}`}>
                        <Grid className="w-5 h-5" />
                        <span>Dashboard</span>
                    </NavLink>

                    {role === 'admin' ? (
                        <>
                            <NavLink end to="/admin/courses" className={({ isActive }) => `${baseItemClass} ${isActive ? activeClass : 'text-white/90 hover:bg-white/5'}`}>
                                <BookOpen className="w-5 h-5" />
                                <span>Courses</span>
                            </NavLink>

                            <NavLink end to="/admin/users" className={({ isActive }) => `${baseItemClass} ${isActive ? activeClass : 'text-white/90 hover:bg-white/5'}`}>
                                <Users className="w-5 h-5" />
                                <span>Students</span>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink end to="/courses" className={({ isActive }) => `${baseItemClass} ${isActive ? activeClass : 'text-white/90 hover:bg-white/5'}`}>
                                <BookOpen className="w-5 h-5" />
                                <span>Courses</span>
                            </NavLink>
                        </>
                    )}

                    {/* <div className="text-xs text-white/50 px-4 mt-6 mb-2 uppercase">System</div>
                    <NavLink end to="/settings" className={({ isActive }) => `${baseItemClass} ${isActive ? activeClass : 'text-white/90 hover:bg-white/5'}`}>
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                    </NavLink> */}
                </nav>

                <div className="px-4 py-6 border-t border-white/5">
                    <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-white/5">
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Mobile overlay and drawer */}
            {/* overlay */}
            {isOpen && <div className="fixed inset-0 z-40 bg-black/40 md:hidden" aria-hidden onClick={() => setIsOpen(false)}></div>}

            {/* mobile drawer (hidden on md and up) */}
            <aside ref={drawerRef} className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0b1220] text-white flex flex-col transform transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 hover:opacity-95">
                        <div className="w-10 h-10 rounded-md bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold">BY</div>
                        <div>
                            <div className="text-lg font-semibold">BYTTC</div>
                            <div className="text-xs text-white/70">{role === 'admin' ? 'Administrator' : 'Student'}</div>
                        </div>
                    </Link>
                    <button onClick={() => setIsOpen(false)} className="p-2 rounded hover:bg-white/5">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 px-3 py-6 space-y-2">
                    <div className="text-xs text-white/50 px-4 mb-2 uppercase">Overview</div>
                    <NavLink end to={role === 'admin' ? '/admin' : '/student'} onClick={() => setIsOpen(false)} className={({ isActive }) => `${baseItemClass} ${isActive ? activeClass : 'text-white/90 hover:bg-white/5'}`}>
                        <Grid className="w-5 h-5" />
                        <span>Dashboard</span>
                    </NavLink>

                    {role === 'admin' ? (
                        <>
                            <NavLink end to="/admin/courses" onClick={() => setIsOpen(false)} className={({ isActive }) => `${baseItemClass} ${isActive ? activeClass : 'text-white/90 hover:bg-white/5'}`}>
                                <BookOpen className="w-5 h-5" />
                                <span>Courses</span>
                            </NavLink>

                            <NavLink end to="/admin/users" onClick={() => setIsOpen(false)} className={({ isActive }) => `${baseItemClass} ${isActive ? activeClass : 'text-white/90 hover:bg-white/5'}`}>
                                <Users className="w-5 h-5" />
                                <span>Students</span>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink end to="/courses" onClick={() => setIsOpen(false)} className={({ isActive }) => `${baseItemClass} ${isActive ? activeClass : 'text-white/90 hover:bg-white/5'}`}>
                                <BookOpen className="w-5 h-5" />
                                <span>Courses</span>
                            </NavLink>
                        </>
                    )}

                    {/* <div className="text-xs text-white/50 px-4 mt-6 mb-2 uppercase">System</div>
                    <NavLink end to="/settings" onClick={() => setIsOpen(false)} className={({ isActive }) => `${baseItemClass} ${isActive ? activeClass : 'text-white/90 hover:bg-white/5'}`}>
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                    </NavLink> */}
                </nav>

                <div className="px-4 py-6 border-t border-white/5">
                    <button onClick={() => { setIsOpen(false); logout() }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-white/5">
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Mobile top bar (fixed so it doesn't occupy layout width) */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={() => setIsOpen(true)} className="inline-flex items-center justify-center p-2 rounded hover:bg-slate-100">
                        <Menu className="w-5 h-5 text-slate-700" />
                    </button>
                    <div>
                        <div className="text-lg font-semibold">BYTTC</div>
                        <div className="text-xs text-slate-400">{role === 'admin' ? 'Admin' : 'Student'}</div>
                    </div>
                </div>
                <Link to="/" className="inline-flex items-center gap-2 px-3 py-2 rounded bg-blue-600 text-white text-sm">
                    <Home className="w-4 h-4" /> Home
                </Link>
            </div>
        </>
    )
}

export default Sidebar
