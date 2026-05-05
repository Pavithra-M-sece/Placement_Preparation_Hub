import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import { Code2, CheckCircle, ArrowRight, User, Mail, Lock } from 'lucide-react'

const perks = [
  'Track DSA progress with a structured roadmap',
  'Take timed mock tests and see your score history',
  'Apply to jobs & internships directly',
  'Compete on the leaderboard with peers',
  'Get notified about interview schedules',
]

export default function Register() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const { data } = await api.post('/auth/register', form)
      login(data); navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen page-auth dot-grid flex items-center justify-center p-4">
      <div className="w-full max-w-md fade-in">
        <div className="glass rounded-2xl p-8 shadow-2xl space-y-6 border border-white/5">

          <div className="text-center space-y-2">
            <div className="flex items-center gap-2.5 justify-center mb-4">
              <div className="p-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30">
                <Code2 size={24} className="text-indigo-400" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">PlacementHub</h1>
            </div>
            <h2 className="text-lg font-semibold text-white">Create your account</h2>
            <p className="text-slate-500 text-sm">Join and start your placement preparation today</p>
          </div>

          {/* Perks */}
          <div className="bg-white/3 border border-white/5 rounded-xl p-4 space-y-2">
            {perks.map((p, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-slate-400">
                <CheckCircle size={13} className="text-green-400 flex-shrink-0 mt-0.5" />
                {p}
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
              <label className="text-slate-400 text-xs font-medium block mb-1.5">Full Name</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="text" placeholder="Your full name" required
                  className="input-field w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
            </div>
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
                <input type="password" placeholder="Create a strong password" required
                  className="input-field w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl text-sm disabled:opacity-50">
              {loading ? 'Creating account...' : <><span>Create Account</span><ArrowRight size={15} /></>}
            </button>
          </form>

          <p className="text-slate-500 text-sm text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
