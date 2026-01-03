import React, { useState, useContext } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { AuthContext } from '../context/AuthContext'

const InstituteLogin = () => {
    const [instituteCode, setInstituteCode] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useContext(AuthContext)

    const submit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        // Dummy authentication for institutes
        if (!instituteCode || !password) {
            setError('Please enter institute code and password')
            setLoading(false)
            return
        }

        setTimeout(() => {
            login('institute-token')
            const dest = location.state?.from?.pathname || '/'
            navigate(dest, { replace: true })
        }, 500)
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-500 text-center mb-12">
                    LOGIN YOUR INSTITUTE ACCOUNT
                </h1>

                <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left side - Logo */}
                        <div className="flex justify-center">
                            <div className="w-80 h-80 flex items-center justify-center">
                                <svg viewBox="0 0 400 400" className="w-full h-full">
                                    {/* Outer laurel wreath */}
                                    <path d="M50 200 Q30 150 50 100 L60 110 Q45 150 60 190 Z" fill="#DAA520" />
                                    <path d="M350 200 Q370 150 350 100 L340 110 Q355 150 340 190 Z" fill="#DAA520" />
                                    <path d="M60 210 Q45 250 60 290 L50 300 Q30 250 50 200 Z" fill="#DAA520" />
                                    <path d="M340 210 Q355 250 340 290 L350 300 Q370 250 350 200 Z" fill="#DAA520" />

                                    {/* Stars */}
                                    <polygon points="200,50 210,80 240,80 215,100 225,130 200,110 175,130 185,100 160,80 190,80" fill="#2E7D32" />

                                    {/* Circular badge */}
                                    <circle cx="200" cy="200" r="120" fill="none" stroke="#0288D1" strokeWidth="8" />
                                    <circle cx="200" cy="200" r="110" fill="white" />

                                    {/* Book and graduation cap */}
                                    <rect x="150" y="180" width="100" height="70" rx="5" fill="#2E7D32" />
                                    <rect x="155" y="185" width="90" height="60" fill="white" />
                                    <line x1="200" y1="185" x2="200" y2="245" stroke="#2E7D32" strokeWidth="3" />

                                    {/* Graduation cap */}
                                    <polygon points="200,150 240,170 200,180 160,170" fill="#0288D1" />
                                    <rect x="195" y="180" width="10" height="30" fill="#0288D1" />

                                    {/* Pen */}
                                    <rect x="190" y="220" width="20" height="40" rx="2" fill="#C62828" transform="rotate(-15 200 240)" />

                                    {/* Text curved around */}
                                    <path id="topCurve" d="M 100,200 A 100,100 0 0,1 300,200" fill="none" />
                                    <text fontSize="14" fontWeight="bold" fill="#2E7D32">
                                        <textPath href="#topCurve" startOffset="50%" textAnchor="middle">
                                            BANGLADESH YOUTH TECHNICAL
                                        </textPath>
                                    </text>

                                    <path id="bottomCurve" d="M 100,200 A 100,100 0 0,0 300,200" fill="none" />
                                    <text fontSize="14" fontWeight="bold" fill="#2E7D32">
                                        <textPath href="#bottomCurve" startOffset="50%" textAnchor="middle">
                                            TRAINING
                                        </textPath>
                                    </text>

                                    {/* Red stars */}
                                    <polygon points="120,190 125,200 135,200 127,207 130,217 120,210 110,217 113,207 105,200 115,200" fill="#C62828" />
                                    <polygon points="280,190 285,200 295,200 287,207 290,217 280,210 270,217 273,207 265,200 275,200" fill="#C62828" />

                                    {/* Bottom banner */}
                                    <path d="M 100,320 L 120,300 L 280,300 L 300,320 L 280,330 L 120,330 Z" fill="#2E7D32" />
                                    <text x="200" y="320" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">
                                        রেজি নং সি-19173
                                    </text>
                                </svg>
                            </div>
                        </div>

                        {/* Right side - Form */}
                        <div>
                            {error && <div className="text-sm text-red-600 mb-4 text-center">{error}</div>}

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Institute Code:
                                    </label>
                                    <input
                                        type="text"
                                        value={instituteCode}
                                        onChange={(e) => setInstituteCode(e.target.value)}
                                        required
                                        placeholder="Enter your Institute code"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            placeholder="Enter Your Password"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((s) => !s)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    <div className="text-right mt-2">
                                        <Link to="/" className="text-sm text-blue-600 hover:underline">
                                            Forget Password?
                                        </Link>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                    />
                                    <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-blue-500 hover:bg-blue-800 text-white py-3 px-6 rounded-md font-medium text-lg"
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>

                                <div className="text-center mt-6">
                                    <Link to="/institute-apply" className="text-lg font-medium text-gray-800 hover:text-blue-700">
                                        Institute Apply
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstituteLogin
