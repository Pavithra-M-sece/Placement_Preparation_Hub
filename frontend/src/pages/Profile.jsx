import { useEffect, useState } from 'react'
import api from '../api/axios'
import { User, Save, Code, FlaskConical, CheckCircle, Clock, XCircle, TrendingUp } from 'lucide-react'

const statusIcon = {
  ACCEPTED:     <CheckCircle size={14} className="text-green-400" />,
  WRONG_ANSWER: <XCircle size={14} className="text-red-400" />,
  PENDING:      <Clock size={14} className="text-yellow-400" />,
}
const statusColor = { ACCEPTED: 'text-green-400', WRONG_ANSWER: 'text-red-400', PENDING: 'text-yellow-400' }
const TABS = ['Profile', 'Submissions', 'Test History']

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const [form, setForm] = useState({ name: '', skills: '', resumeLink: '' })
  const [saved, setSaved] = useState(false)
  const [tab, setTab] = useState('Profile')
  const [submissions, setSubmissions] = useState([])
  const [testResults, setTestResults] = useState([])

  useEffect(() => {
    api.get('/users/profile').then(r => {
      setProfile(r.data)
      setForm({ name: r.data.name || '', skills: r.data.skills || '', resumeLink: r.data.resumeLink || '' })
    })
    api.get('/submissions/my').then(r => setSubmissions(r.data))
    api.get('/tests/results').then(r => setTestResults(r.data))
  }, [])

  const handleSave = async () => {
    await api.put('/users/update', form)
    setSaved(true); setTimeout(() => setSaved(false), 2000)
  }

  if (!profile) return <div className="p-6 text-slate-400">Loading...</div>

  const accepted       = submissions.filter(s => s.status === 'ACCEPTED').length
  const acceptanceRate = submissions.length > 0 ? Math.round((accepted / submissions.length) * 100) : 0
  const avgTestScore   = testResults.length > 0
    ? Math.round(testResults.reduce((sum, r) => sum + (r.totalQuestions > 0 ? (r.score / r.totalQuestions) * 100 : 0), 0) / testResults.length)
    : null
  const skillList = form.skills ? form.skills.split(',').map(s => s.trim()).filter(Boolean) : []

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="glass border border-white/5 rounded-2xl p-6 flex items-center gap-5">
        <div className="bg-indigo-600/80 rounded-full p-4 flex-shrink-0">
          <User size={32} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-lg">{profile.name}</p>
          <p className="text-slate-400 text-sm">{profile.email}</p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-xs glass text-indigo-400 px-2 py-1 rounded">{profile.role}</span>
            {skillList.length > 0 && <span className="text-xs glass text-slate-400 px-2 py-1 rounded">{skillList.length} skills</span>}
            {profile.resumeLink && (
              <a href={profile.resumeLink} target="_blank" rel="noreferrer"
                className="text-xs glass text-green-400 px-2 py-1 rounded hover:text-green-300 transition">📄 Resume</a>
            )}
          </div>
        </div>
        <div className="hidden sm:flex gap-6 text-center">
          <div><p className="text-2xl font-bold text-green-400">{accepted}</p><p className="text-slate-500 text-xs">Solved</p></div>
          <div><p className="text-2xl font-bold text-indigo-400">{testResults.length}</p><p className="text-slate-500 text-xs">Tests</p></div>
          <div><p className="text-2xl font-bold text-yellow-400">{submissions.length}</p><p className="text-slate-500 text-xs">Submissions</p></div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          [acceptanceRate >= 70 ? 'text-green-400' : acceptanceRate >= 40 ? 'text-yellow-400' : 'text-red-400', `${acceptanceRate}%`, 'Acceptance Rate'],
          [avgTestScore !== null ? (avgTestScore >= 70 ? 'text-green-400' : avgTestScore >= 40 ? 'text-yellow-400' : 'text-red-400') : 'text-slate-600', avgTestScore !== null ? `${avgTestScore}%` : '—', 'Avg Test Score'],
          ['text-indigo-400', accepted, 'Problems Solved'],
          ['text-purple-400', testResults.length, 'Tests Taken'],
        ].map(([cls, val, label]) => (
          <div key={label} className="glass border border-white/5 rounded-xl p-4 text-center">
            <p className={`text-xl font-bold ${cls}`}>{val}</p>
            <p className="text-slate-500 text-xs mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${tab === t ? 'bg-indigo-600 text-white' : 'glass text-slate-400 hover:text-white'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'Profile' && (
        <div className="glass border border-white/5 rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-slate-400 text-sm block mb-1.5">Full Name</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className="input-field w-full px-4 py-3 rounded-xl text-sm" />
          </div>
          <div>
            <label className="text-slate-400 text-sm block mb-1.5">Skills <span className="text-slate-600">(comma separated)</span></label>
            <input type="text" placeholder="Java, DSA, Spring Boot, SQL..."
              value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })}
              className="input-field w-full px-4 py-3 rounded-xl text-sm" />
          </div>
          <div>
            <label className="text-slate-400 text-sm block mb-1.5">Resume Link</label>
            <input type="url" placeholder="https://drive.google.com/..."
              value={form.resumeLink} onChange={e => setForm({ ...form, resumeLink: e.target.value })}
              className="input-field w-full px-4 py-3 rounded-xl text-sm" />
          </div>
          <button onClick={handleSave}
            className="btn-primary flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl">
            <Save size={16} /> {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
          {skillList.length > 0 && (
            <div>
              <p className="text-slate-400 text-sm mb-2">Your Skills</p>
              <div className="flex flex-wrap gap-2">
                {skillList.map((s, i) => (
                  <span key={i} className="glass text-slate-300 text-sm px-3 py-1 rounded-full">{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'Submissions' && (
        <div className="glass border border-white/5 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <span className="flex items-center gap-2 text-slate-400 text-sm font-semibold"><Code size={16} /> {submissions.length} Submissions</span>
            <span className="text-xs text-slate-500">{accepted} accepted · {acceptanceRate}% rate</span>
          </div>
          {submissions.length === 0 ? <p className="text-center text-slate-500 py-10">No submissions yet</p> : (
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-slate-400 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 text-left">Problem</th>
                  <th className="px-6 py-3 text-left">Language</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map(s => (
                  <tr key={s.id} className="border-t border-white/5 hover:bg-white/5 transition">
                    <td className="px-6 py-3 text-white font-medium">{s.problem?.title}</td>
                    <td className="px-6 py-3"><span className="glass text-slate-400 text-xs px-2 py-0.5 rounded">{s.language}</span></td>
                    <td className="px-6 py-3"><span className={`flex items-center gap-1.5 ${statusColor[s.status]}`}>{statusIcon[s.status]} {s.status}</span></td>
                    <td className="px-6 py-3 text-slate-500 text-xs">{new Date(s.submittedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {tab === 'Test History' && (
        <div className="glass border border-white/5 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <span className="flex items-center gap-2 text-slate-400 text-sm font-semibold"><FlaskConical size={16} /> {testResults.length} Tests Taken</span>
            {avgTestScore !== null && <span className="flex items-center gap-1 text-xs text-slate-500"><TrendingUp size={12} /> Avg: {avgTestScore}%</span>}
          </div>
          {testResults.length === 0 ? <p className="text-center text-slate-500 py-10">No tests taken yet</p> : (
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-slate-400 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 text-left">Test</th>
                  <th className="px-6 py-3 text-center">Score</th>
                  <th className="px-6 py-3 text-center">Accuracy</th>
                  <th className="px-6 py-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {testResults.map(r => {
                  const pct = r.totalQuestions > 0 ? Math.round((r.score / r.totalQuestions) * 100) : 0
                  return (
                    <tr key={r.id} className="border-t border-white/5 hover:bg-white/5 transition">
                      <td className="px-6 py-3 text-white font-medium">{r.test?.title}</td>
                      <td className="px-6 py-3 text-center"><span className="text-green-400 font-bold">{r.score}</span><span className="text-slate-500">/{r.totalQuestions}</span></td>
                      <td className="px-6 py-3 text-center">
                        <span className={`font-semibold ${pct >= 70 ? 'text-green-400' : pct >= 40 ? 'text-yellow-400' : 'text-red-400'}`}>{pct}%</span>
                      </td>
                      <td className="px-6 py-3 text-slate-500 text-xs">{new Date(r.takenAt).toLocaleDateString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}
