import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import { Mail, Lock, Eye, EyeOff, ArrowRight, BookOpen } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { setAuthToken } from '../../config/axiosInstance'
import { toast } from 'react-hot-toast'
import axiosInstance from '../../config/axiosInstance'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)


  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useContext(AuthContext)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setEmailError(null)
    setPasswordError(null)

    if (!email || !password) {
      setError('Please enter email and password')
      setLoading(false)
      return
    }

    try {
      const res = await axiosInstance.post('/users/login', { email, password })
      const token = res?.data?.token
      const user = res?.data?.user
      if (token) {
        if (typeof login === 'function') {
          login(token, user)
        } else {
          // Fallback: ensure token/user stored and axios header set
          try {
            localStorage.setItem('token', token)
            if (user) localStorage.setItem('user', JSON.stringify(user))
          } catch (e) { }
          try { setAuthToken(token) } catch (e) { }
        }
        toast.success('Successfully signed in')
        const dest = location.state?.from?.pathname
        if (dest) {
          navigate(dest, { replace: true })
        } else {
          // Redirect to role based dashboard when no previous destination
          const role = user?.role
          if (role === 'admin') navigate('/admin', { replace: true })
          else if (role === 'student') navigate('/student', { replace: true })
          else if (role === 'teacher') navigate('/teacher', { replace: true })
          else navigate('/', { replace: true })
        }
      } else {
        const msg = 'Invalid response from server'
        setError(msg)
        toast.error(msg)
      }
    } catch (err) {
      console.error('Login error (frontend):', err)
      const respMsg = err?.response?.data?.message
      const field = err?.response?.data?.field
      const msg = respMsg || err?.message || 'Login failed'

      if (field === 'email') setEmailError(msg)
      else if (field === 'password') setPasswordError(msg)
      else setError(msg)

      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    // Redirect to backend Google OAuth endpoint
    const base = axiosInstance?.defaults?.baseURL || ''
    const url = `${base.replace(/\/$/, '')}/users/google`
    window.location.href = url
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-sky-50 to-white py-12 px-4">
      <div className="w-full max-w-md">

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col items-center">
            <div className="bg-blue-50 rounded-full p-4 mb-4">
              <BookOpen className="w-7 h-7 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold mb-1">BYTT Center</h1>
            <p className="text-sm text-slate-500 mb-4 text-center">Welcome back! Please sign in to continue.</p>

            
          </div>

          {error && <div className="text-sm text-red-600 mb-3 text-center">{error}</div>}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-600 mb-1">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(null); }}
                  required
                  placeholder="student@example.com"
                  className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-3 pl-10 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              {emailError && <div className="text-xs text-red-600 mt-1">{emailError}</div>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-slate-600">Password</label>

              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setPasswordError(null); }}
                  required
                  placeholder="••••••••"
                  className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-3 pl-10 pr-10 focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 p-1 rounded focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {passwordError && <div className="text-xs text-red-600 mt-1">{passwordError}</div>}
              <Link to="/" className="text-xs text-blue-600">Forgot password?</Link>
            </div>

            <div className="space-y-3">


              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-3"
              >
                <span className="font-medium">{loading ? 'Signing in...' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
              {/* <div className="mt-6">
                <div className="flex items-center">
                  <div className="grow border-t border-slate-200"></div>
                  <div className="px-4 text-xs text-slate-400">Or</div>
                  <div className="grow border-t border-slate-200"></div>
                </div>
              </div> */}
              {/* <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full bg-white border hover:shadow-sm text-slate-700 py-3 rounded-lg flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
                  <path d="M533.5 278.4c0-18.5-1.6-37.1-5.1-55.1H272v104.3h146.9c-6.4 34.8-25.6 64.3-54.6 84v69h88.1c51.6-47.6 81.1-117.6 81.1-202.2z" fill="#4285F4" />
                  <path d="M272 544.3c73.7 0 135.7-24.4 180.9-66.3l-88.1-69c-24.5 16.4-56 26.1-92.8 26.1-71.4 0-132-48.2-153.6-112.9H29.6v70.9C74.6 489.8 167.1 544.3 272 544.3z" fill="#34A853" />
                  <path d="M118.4 323.2c-11.6-34.9-11.6-72.7 0-107.6V144.7H29.6c-39.8 80.3-39.8 174.7 0 255l88.8-76.5z" fill="#FBBC05" />
                  <path d="M272 107.7c39 0 74 13.5 101.6 39l76.1-76.1C407.7 24.7 345.7 0 272 0 167.1 0 74.6 54.5 29.6 144.7l88.8 70.9C140 155.9 200.6 107.7 272 107.7z" fill="#EA4335" />
                </svg>
                <span className="font-medium">Sign in with Google</span>
              </button> */}
            </div>

            <p className="text-center text-sm text-slate-500">Don't have an account? <Link to="/auth/register" className="text-blue-600 font-medium">Create Account</Link></p>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login