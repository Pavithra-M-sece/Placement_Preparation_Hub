import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import { Code2, Code, FlaskConical, Briefcase, BookOpen, Trophy, ArrowRight, Lock, Mail } from 'lucide-react'

const features = [
  { icon: <Code size={15} />, label: 'DSA Problems', color: 'text-indigo-400 bg-indigo-500/10' },
  { icon: <FlaskConical size={15} />, label: 'Mock Tests', color: 'text-purple-400 bg-purple-500/10' },
  { icon: <Briefcase size={15} />, label: 'Job Listings', color: 'text-cyan-400 bg-cyan-500/10' },
  { icon: <BookOpen size={15} />, label: 'Roadmap', color: 'text-green-400 bg-green-500/10' },
  { icon: <Trophy size={15} />, label: 'Leaderboard', color: 'text-yellow-400 bg-yellow-500/10' },
  { icon: <Code2 size={15} />, label: 'Schedules', color: 'text-orange-400 bg-orange-500/10' },
]

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const { data } = await api.post('/auth/login', form)
      login(data); navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen page-auth dot-grid flex items-center justify-center p-4">
      <div className="w-full max-w-md fade-in">
        {/* Card */}
        <div className="glass rounded-2xl p-8 shadow-2xl space-y-6 border border-white/5">

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center gap-2.5 justify-center mb-4">
              <div className="p-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30">
                <Code2 size={24} className="text-indigo-400" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">PlacementHub</h1>
            </div>
            <h2 className="text-lg font-semibold text-white">Welcome back</h2>
            <p className="text-slate-500 text-sm">Sign in to continue your placement prep</p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-3 gap-2">
            {features.map(f => (
              <div key={f.label} className={`rounded-xl p-3 text-center flex flex-col items-center gap-1.5 border border-white/5 ${f.color.split(' ')[1]}`}>
                <span className={f.color.split(' ')[0]}>{f.icon}</span>
                <span className="text-slate-400 text-xs font-medium">{f.label}</span>
              </div>
            ))}
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-slate-400 text-xs font-medium block mb-1.5">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="email" placeholder="you@example.com" required
                  className="input-field w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="text-slate-400 text-xs font-medium block mb-1.5">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="password" placeholder="••••••••" required
                  className="input-field w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Signing in...' : <><span>Sign In</span><ArrowRight size={15} /></>}
            </button>
          </form>

          <p className="text-slate-500 text-sm text-center">
            No account?{' '}
            <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition">
              Register for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
