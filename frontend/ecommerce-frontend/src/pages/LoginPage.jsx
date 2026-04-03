import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../api/axiosConfig'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError('Email and password required!')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await API.post('/users/login', form)
      if (res.data.success) {
        login(res.data.data, null)
        navigate('/')
      } else {
        setError(res.data.message)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-4 page-transition">

      {/* Card */}
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">

        {/* Top banner */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-8 py-8 text-center">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            😊 SmileMart
          </h1>
          <p className="text-orange-100 text-sm mt-2">
            Welcome back! Happy to see you 🎉
          </p>
        </div>

        {/* Form */}
        <div className="px-8 py-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Login to your account</h2>

          <div className="flex flex-col gap-5">

            {/* Email */}
            <div className="animate-slideIn" style={{ animationDelay: '0.1s' }}>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-orange-400">📧</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-9 pr-4 py-3 border-2 border-gray-100 rounded-xl text-sm focus:outline-none focus:border-orange-400 transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Password */}
            <div className="animate-slideIn" style={{ animationDelay: '0.2s' }}>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-orange-400">🔒</span>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-9 pr-4 py-3 border-2 border-gray-100 rounded-xl text-sm focus:outline-none focus:border-orange-400 transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 animate-fadeIn">
              <p className="text-red-500 text-sm">⚠️ {error}</p>
            </div>
          )}

          {/* Forgot */}
          <p className="text-right text-xs text-orange-400 cursor-pointer hover:underline mt-3">
            Forgot Password?
          </p>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="btn-shine btn-press mt-5 w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-200 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Logging in...
              </span>
            ) : 'Login 🚀'}
          </button>

          {/* Divider */}
          <div className="flex items-center my-5">
            <hr className="flex-grow border-gray-100" />
            <span className="mx-3 text-gray-300 text-sm">or</span>
            <hr className="flex-grow border-gray-100" />
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-500">
            New to SmileMart?{' '}
            <span
              onClick={() => navigate('/register')}
              className="text-orange-500 font-semibold cursor-pointer hover:underline"
            >
              Create Account →
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage