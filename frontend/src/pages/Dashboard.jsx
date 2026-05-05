import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { CheckCircle, Code, FlaskConical, TrendingUp, Flame, Trophy, BookOpen, ArrowRight, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function StatCard({ icon, label, value, sub, glowClass, iconBg }) {
  return (
    <div className={`glass rounded-2xl p-5 flex items-center gap-4 border border-white/5 ${glowClass} transition-all hover:scale-[1.02]`}>
      <div className={`p-3 rounded-xl ${iconBg} flex-shrink-0`}>{icon}</div>
      <div>
        <p className="text-slate-400 text-xs font-medium">{label}</p>
        <p className="text-white text-2xl font-bold tracking-tight">{value}</p>
        {sub && <p className="text-slate-500 text-xs mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

function QuickAction({ icon, label, desc, to, iconBg }) {
  const navigate = useNavigate()
  return (
    <button onClick={() => navigate(to)}
      className="glass border border-white/5 hover:border-indigo-500/30 rounded-2xl p-5 text-left transition-all hover:bg-indigo-500/5 flex items-center gap-4 group">
      <div className={`p-3 rounded-xl ${iconBg} flex-shrink-0`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm">{label}</p>
        <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
      </div>
      <ArrowRight size={15} className="text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
    </button>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [results, setResults] = useState([])
  const [streak, setStreak] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/dashboard').then(r => setStats(r.data))
    api.get('/tests/results').then(r => setResults(r.data))
    api.get('/streak').then(r => setStreak(r.data)).catch(() => {})
    api.post('/streak/record').catch(() => {})
  }, [])

  const chartData = results.slice(-6).map((r, i) => ({
    name: `T${i + 1}`, score: r.score, total: r.totalQuestions
  }))

  const tip = stats
    ? stats.accuracyPercent >= 80
      ? { text: '🔥 Great accuracy! Try Hard problems to push your limits.', cls: 'bg-green-500/10 border-green-500/20 text-green-400' }
      : stats.accuracyPercent >= 50
      ? { text: '📈 Good progress! Focus on Medium problems and retake tests.', cls: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' }
      : { text: '💡 Start with Easy problems and build your fundamentals first.', cls: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' }
    : null

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            Welcome back, <span className="gradient-text">{user?.name}</span> 👋
          </h1>
          <p className="text-slate-500 text-sm mt-1">Here's your placement prep overview — keep solving and climbing the leaderboard!</p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full">
          <Sparkles size={13} className="text-indigo-400" />
          <span className="text-indigo-300 text-xs font-medium">Prep Mode</span>
        </div>
      </div>

      {tip && (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm ${tip.cls}`}>
          {tip.text}
        </div>
      )}

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<Code size={20} className="text-white" />} label="Total Submissions" value={stats.totalSubmissions} sub="all attempts" iconBg="bg-indigo-600/80" glowClass="stat-glow-indigo" />
          <StatCard icon={<CheckCircle size={20} className="text-white" />} label="Accepted" value={stats.acceptedSubmissions} sub="correct solutions" iconBg="bg-green-600/80" glowClass="stat-glow-green" />
          <StatCard icon={<TrendingUp size={20} className="text-white" />} label="Accuracy" value={`${stats.accuracyPercent.toFixed(1)}%`} sub={stats.accuracyPercent >= 70 ? 'above average' : 'keep improving'} iconBg="bg-yellow-600/80" glowClass="stat-glow-yellow" />
          <StatCard icon={<FlaskConical size={20} className="text-white" />} label="Tests Taken" value={stats.testsTaken} sub="mock assessments" iconBg="bg-purple-600/80" glowClass="stat-glow-purple" />
        </div>
      )}

      {streak && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass border border-white/5 hover:border-orange-500/30 rounded-2xl p-5 flex items-center gap-4 cursor-pointer transition-all hover:bg-orange-500/5"
            onClick={() => navigate('/leaderboard')}>
            <div className="bg-orange-600/80 p-3 rounded-xl"><Flame size={20} className="text-white" /></div>
            <div>
              <p className="text-slate-400 text-xs font-medium">Current Streak</p>
              <p className="text-white text-2xl font-bold">{streak.currentStreak} <span className="text-sm text-slate-400 font-normal">days</span></p>
              <p className="text-slate-500 text-xs mt-0.5">Visit daily to maintain your streak</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-slate-500 text-xs">Longest</p>
              <p className="text-orange-400 font-bold">{streak.longestStreak}d</p>
            </div>
          </div>
          <div className="glass border border-white/5 hover:border-yellow-500/30 rounded-2xl p-5 flex items-center gap-4 cursor-pointer transition-all hover:bg-yellow-500/5"
            onClick={() => navigate('/leaderboard')}>
            <div className="bg-yellow-600/80 p-3 rounded-xl"><Trophy size={20} className="text-white" /></div>
            <div>
              <p className="text-slate-400 text-xs font-medium">Leaderboard</p>
              <p className="text-white text-lg font-bold">View Rankings</p>
              <p className="text-slate-500 text-xs mt-0.5">See how you compare to peers</p>
            </div>
            <ArrowRight size={15} className="ml-auto text-slate-600" />
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Quick Actions</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <QuickAction icon={<Code size={18} className="text-white" />} label="Solve a Problem" desc="Pick up where you left off" to="/problems" iconBg="bg-indigo-600/80" />
          <QuickAction icon={<FlaskConical size={18} className="text-white" />} label="Take a Mock Test" desc="Simulate interview conditions" to="/tests" iconBg="bg-purple-600/80" />
          <QuickAction icon={<BookOpen size={18} className="text-white" />} label="Learning Roadmap" desc="Track your topic progress" to="/roadmap" iconBg="bg-green-600/80" />
        </div>
      </div>

      {/* Chart */}
      {chartData.length > 0 && (
        <div className="glass border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-white font-semibold">Test Performance</h2>
            <span className="text-slate-500 text-xs">Last {chartData.length} tests</span>
          </div>
          <p className="text-slate-500 text-xs mb-5">Score vs total questions per test</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#475569" tick={{ fontSize: 11 }} />
              <YAxis stroke="#475569" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: '#0d1117', border: '1px solid #1e2d45', color: '#f0f4ff', borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="score" fill="#6366f1" radius={[4,4,0,0]} name="Score" />
              <Bar dataKey="total" fill="rgba(99,102,241,0.15)" radius={[4,4,0,0]} name="Total" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {chartData.length === 0 && stats && (
        <div className="glass border border-white/5 rounded-2xl p-10 text-center">
          <FlaskConical size={32} className="mx-auto mb-3 text-slate-700" />
          <p className="text-white font-medium">No test results yet</p>
          <p className="text-sm mt-1 text-slate-500">Take a mock test to see your performance graph here!</p>
          <button onClick={() => navigate('/tests')}
            className="btn-primary mt-4 text-white text-sm font-semibold px-5 py-2 rounded-xl">
            Browse Tests →
          </button>
        </div>
      )}
    </div>
  )
}
