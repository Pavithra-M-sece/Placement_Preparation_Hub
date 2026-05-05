import { useState, useEffect } from 'react'
import api from '../api/axios'
import { PlusCircle, CheckCircle, Users, Trash2 } from 'lucide-react'

const tabs = ['Problem', 'Test', 'Company', 'Roadmap', 'Job', 'Schedule']

export default function Admin() {
  const [tab, setTab] = useState('Problem')
  const [success, setSuccess] = useState('')

  const notify = (msg) => { setSuccess(msg); setTimeout(() => setSuccess(''), 3000) }

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold"><span className="gradient-text-rose">Admin Panel</span></h1>

      <div className="flex gap-2 flex-wrap">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${tab === t ? 'bg-indigo-600 text-white' : 'glass text-gray-400 hover:bg-gray-700'}`}
          >{t}</button>
        ))}
      </div>

      {success && (
        <div className="flex items-center gap-2 bg-green-900/40 text-green-400 px-4 py-3 rounded-xl text-sm">
          <CheckCircle size={16} /> {success}
        </div>
      )}

      {tab === 'Problem' && <ProblemForm onSuccess={() => notify('Problem created!')} />}
      {tab === 'Test' && <TestForm onSuccess={() => notify('Test created!')} />}
      {tab === 'Company' && <CompanyForm onSuccess={() => notify('Company created!')} />}
      {tab === 'Roadmap' && <RoadmapForm onSuccess={() => notify('Roadmap item added!')} />}
      {tab === 'Job' && <JobForm onSuccess={() => notify('Job posted!')} />}
      {tab === 'Schedule' && <ScheduleForm onSuccess={() => notify('Schedule created!')} />}
    </div>
  )
}

function ProblemForm({ onSuccess }) {
  const [form, setForm] = useState({ title: '', description: '', constraints: '', examples: '', hints: '', difficulty: 'EASY', topic: 'DSA' })
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    await api.post('/problems', form)
    setForm({ title: '', description: '', constraints: '', examples: '', hints: '', difficulty: 'EASY', topic: 'DSA' })
    onSuccess()
  }

  return (
    <form onSubmit={submit} className="glass rounded-2xl p-6 shadow space-y-4">
      <h2 className="text-white font-semibold flex items-center gap-2"><PlusCircle size={18} /> Add Problem</h2>
      <input required placeholder="Title" value={form.title} onChange={f('title')}
        className="w-full glass text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
      <textarea required placeholder="Description" rows={3} value={form.description} onChange={f('description')}
        className="w-full glass text-white px-4 py-3 rounded-xl outline-none resize-none focus:ring-2 focus:ring-indigo-500" />
      <textarea placeholder="Examples (e.g. Input: [1,2,3] → Output: 6)" rows={3} value={form.examples} onChange={f('examples')}
        className="w-full glass text-white px-4 py-3 rounded-xl outline-none resize-none focus:ring-2 focus:ring-indigo-500" />
      <textarea placeholder="Constraints (e.g. 1 ≤ n ≤ 10^5)" rows={2} value={form.constraints} onChange={f('constraints')}
        className="w-full glass text-white px-4 py-3 rounded-xl outline-none resize-none focus:ring-2 focus:ring-indigo-500" />
      <input placeholder="Hint (optional)" value={form.hints} onChange={f('hints')}
        className="w-full glass text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
      <div className="grid grid-cols-2 gap-4">
        <select value={form.difficulty} onChange={f('difficulty')}
          className="glass text-white px-4 py-3 rounded-xl outline-none">
          {['EASY', 'MEDIUM', 'HARD'].map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={form.topic} onChange={f('topic')}
          className="glass text-white px-4 py-3 rounded-xl outline-none">
          {['DSA', 'Aptitude', 'OS', 'CN', 'DBMS'].map(t => <option key={t}>{t}</option>)}
        </select>
      </div>
      <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition">
        Create Problem
      </button>
    </form>
  )
}

function TestForm({ onSuccess }) {
  const [form, setForm] = useState({ title: '', durationMinutes: 30, company: '', problemIds: '' })
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      durationMinutes: Number(form.durationMinutes),
      problemIds: form.problemIds.split(',').map(s => Number(s.trim())).filter(Boolean)
    }
    await api.post('/tests', payload)
    setForm({ title: '', durationMinutes: 30, company: '', problemIds: '' })
    onSuccess()
  }

  return (
    <form onSubmit={submit} className="glass rounded-2xl p-6 shadow space-y-4">
      <h2 className="text-white font-semibold flex items-center gap-2"><PlusCircle size={18} /> Add Mock Test</h2>
      <input required placeholder="Test Title" value={form.title} onChange={f('title')}
        className="w-full glass text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
      <input type="number" placeholder="Duration (minutes)" value={form.durationMinutes} onChange={f('durationMinutes')}
        className="w-full glass text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
      <input placeholder="Company (optional)" value={form.company} onChange={f('company')}
        className="w-full glass text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
      <input required placeholder="Problem IDs (comma separated, e.g. 1,2,3)" value={form.problemIds} onChange={f('problemIds')}
        className="w-full glass text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
      <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition">
        Create Test
      </button>
    </form>
  )
}

function CompanyForm({ onSuccess }) {
  const [form, setForm] = useState({ name: '', pattern: '', difficulty: 'Medium', rounds: '', suggestedTopics: '' })
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      rounds: form.rounds.split(',').map(s => s.trim()).filter(Boolean),
      suggestedTopics: form.suggestedTopics.split(',').map(s => s.trim()).filter(Boolean)
    }
    await api.post('/companies', payload)
    setForm({ name: '', pattern: '', difficulty: 'Medium', rounds: '', suggestedTopics: '' })
    onSuccess()
  }

  return (
    <form onSubmit={submit} className="glass rounded-2xl p-6 shadow space-y-4">
      <h2 className="text-white font-semibold flex items-center gap-2"><PlusCircle size={18} /> Add Company</h2>
      <input required placeholder="Company Name (e.g. Amazon)" value={form.name} onChange={f('name')}
        className="w-full glass text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
      <textarea placeholder="Hiring pattern description" rows={3} value={form.pattern} onChange={f('pattern')}
        className="w-full glass text-white px-4 py-3 rounded-xl outline-none resize-none focus:ring-2 focus:ring-indigo-500" />
      <select value={form.difficulty} onChange={f('difficulty')}
        className="w-full glass text-white px-4 py-3 rounded-xl outline-none">
        {['Easy', 'Medium', 'Hard'].map(d => <option key={d}>{d}</option>)}
      </select>
      <input placeholder="Interview rounds (comma separated, e.g. Online Test, Technical, HR)" value={form.rounds} onChange={f('rounds')}
        className="w-full glass text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
      <input placeholder="Suggested topics (comma separated)" value={form.suggestedTopics} onChange={f('suggestedTopics')}
        className="w-full glass text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
      <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition">
        Add Company
      </button>
    </form>
  )
}

function RoadmapForm({ onSuccess }) {
  const [form, setForm] = useState({ topic: '', description: '', category: 'DSA', orderIndex: 1 })
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    await api.post('/roadmap', { ...form, orderIndex: Number(form.orderIndex) })
    setForm({ topic: '', description: '', category: 'DSA', orderIndex: 1 })
    onSuccess()
  }

  return (
    <form onSubmit={submit} className="glass rounded-2xl p-6 shadow space-y-4">
      <h2 className="text-white font-semibold flex items-center gap-2"><PlusCircle size={18} /> Add Roadmap Item</h2>
      <input required placeholder="Topic (e.g. Arrays)" value={form.topic} onChange={f('topic')}
        className="w-full glass text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
      <textarea placeholder="Description" rows={3} value={form.description} onChange={f('description')}
        className="w-full glass text-white px-4 py-3 rounded-xl outline-none resize-none focus:ring-2 focus:ring-indigo-500" />
      <div className="grid grid-cols-2 gap-4">
        <select value={form.category} onChange={f('category')}
          className="glass text-white px-4 py-3 rounded-xl outline-none">
          {['DSA', 'OS', 'CN', 'DBMS'].map(c => <option key={c}>{c}</option>)}
        </select>
        <input type="number" min={1} placeholder="Order Index" value={form.orderIndex} onChange={f('orderIndex')}
          className="glass text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition">
        Add Roadmap Item
      </button>
    </form>
  )
}

function JobForm({ onSuccess }) {
  const [form, setForm] = useState({ title: '', companyName: '', location: '', type: 'Full-time', description: '', eligibility: '', package_: '', deadline: '', requiredSkills: '' })
  const [jobs, setJobs] = useState([])
  const [applicants, setApplicants] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  useEffect(() => { api.get('/jobs/all').then(r => setJobs(r.data)) }, [])

  const submit = async (e) => {
    e.preventDefault()
    const payload = { ...form, requiredSkills: form.requiredSkills.split(',').map(s => s.trim()).filter(Boolean) }
    await api.post('/jobs', payload)
    setForm({ title: '', companyName: '', location: '', type: 'Full-time', description: '', eligibility: '', package_: '', deadline: '', requiredSkills: '' })
    api.get('/jobs/all').then(r => setJobs(r.data))
    onSuccess()
  }

  const toggleActive = async (id) => {
    await api.put(`/jobs/${id}/toggle`)
    api.get('/jobs/all').then(r => setJobs(r.data))
  }

  const viewApplicants = async (job) => {
    setSelectedJob(job)
    const r = await api.get(`/jobs/${job.id}/applicants`)
    setApplicants(r.data)
  }

  const updateStatus = async (appId, status) => {
    await api.put(`/jobs/applications/${appId}/status`, null, { params: { status } })
    viewApplicants(selectedJob)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={submit} className="glass rounded-2xl p-6 shadow space-y-4">
        <h2 className="text-white font-semibold flex items-center gap-2"><PlusCircle size={18} /> Post a Job</h2>
        <div className="grid grid-cols-2 gap-4">
          <input required placeholder="Job Title" value={form.title} onChange={f('title')}
            className="glass text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
          <input required placeholder="Company Name" value={form.companyName} onChange={f('companyName')}
            className="glass text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Location" value={form.location} onChange={f('location')}
            className="glass text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
          <select value={form.type} onChange={f('type')} className="glass text-white px-4 py-3 rounded-xl outline-none">
            {['Full-time', 'Internship', 'Part-time'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <textarea required placeholder="Job Description" rows={3} value={form.description} onChange={f('description')}
          className="w-full glass text-white px-4 py-3 rounded-xl outline-none resize-none focus:ring-2 focus:ring-indigo-500" />
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Eligibility (e.g. CGPA >= 7.0)" value={form.eligibility} onChange={f('eligibility')}
            className="glass text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
          <input placeholder="Package (e.g. 6 LPA)" value={form.package_} onChange={f('package_')}
            className="glass text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input type="date" value={form.deadline} onChange={f('deadline')}
            className="glass text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
          <input placeholder="Required Skills (comma separated)" value={form.requiredSkills} onChange={f('requiredSkills')}
            className="glass text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition">
          Post Job
        </button>
      </form>

      {jobs.length > 0 && (
        <div className="glass rounded-2xl p-6 shadow space-y-3">
          <h2 className="text-white font-semibold">Posted Jobs</h2>
          {jobs.map(job => (
            <div key={job.id} className="flex items-center justify-between glass px-4 py-3 rounded-xl gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{job.title}</p>
                <p className="text-gray-400 text-xs">{job.companyName} · {job.type}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => viewApplicants(job)}
                  className="flex items-center gap-1 text-xs bg-indigo-900/50 text-indigo-400 px-3 py-1.5 rounded-lg hover:bg-indigo-900 transition">
                  <Users size={12} /> Applicants
                </button>
                <button onClick={() => toggleActive(job.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition ${job.active ? 'bg-red-900/40 text-red-400 hover:bg-red-900/60' : 'bg-green-900/40 text-green-400 hover:bg-green-900/60'}`}>
                  {job.active ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedJob && (
        <div className="glass rounded-2xl p-6 shadow space-y-4">
          <h2 className="text-white font-semibold">Applicants for: {selectedJob.title}</h2>
          {applicants.length === 0 ? (
            <p className="text-gray-500 text-sm">No applicants yet</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="glass text-gray-400 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2 text-left">Student</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Update</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map(a => (
                  <tr key={a.id} className="border-t border-gray-800">
                    <td className="px-4 py-3 text-white">{a.user?.name}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{a.user?.email}</td>
                    <td className="px-4 py-3 text-yellow-400 font-semibold">{a.status}</td>
                    <td className="px-4 py-3">
                      <select value={a.status} onChange={e => updateStatus(a.id, e.target.value)}
                        className="glass text-white text-xs px-2 py-1 rounded-lg outline-none">
                        {['APPLIED', 'SHORTLISTED', 'REJECTED', 'SELECTED'].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}

function ScheduleForm({ onSuccess }) {
  const [form, setForm] = useState({ companyName: '', roundName: '', venue: '', scheduledAt: '', instructions: '', type: 'OFFLINE', invitedUserIds: '' })
  const [schedules, setSchedules] = useState([])
  const [users, setUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  useEffect(() => {
    api.get('/schedules').then(r => setSchedules(r.data))
    api.get('/users/all').then(r => setUsers(r.data)).catch(() => {})
  }, [])

  const toggleUser = (id) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
    )
  }

  const submit = async (e) => {
    e.preventDefault()
    const payload = { ...form, invitedUserIds: selectedUsers }
    await api.post('/schedules', payload)
    setForm({ companyName: '', roundName: '', venue: '', scheduledAt: '', instructions: '', type: 'OFFLINE', invitedUserIds: '' })
    setSelectedUsers([])
    api.get('/schedules').then(r => setSchedules(r.data))
    onSuccess()
  }

  const deleteSchedule = async (id) => {
    await api.delete(`/schedules/${id}`)
    setSchedules(prev => prev.filter(s => s.id !== id))
  }

  const now = new Date()
  const upcoming = schedules.filter(s => new Date(s.scheduledAt) >= now)
  const past = schedules.filter(s => new Date(s.scheduledAt) < now)

  return (
    <div className="space-y-6">
      <form onSubmit={submit} className="glass rounded-2xl p-6 shadow space-y-4">
        <h2 className="text-white font-semibold flex items-center gap-2"><PlusCircle size={18} /> Schedule Interview</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 text-xs block mb-1">Company Name *</label>
            <input required placeholder="e.g. Amazon" value={form.companyName} onChange={f('companyName')}
              className="w-full glass text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="text-gray-400 text-xs block mb-1">Round Name *</label>
            <input required placeholder="e.g. Technical Round 1" value={form.roundName} onChange={f('roundName')}
              className="w-full glass text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 text-xs block mb-1">Date & Time *</label>
            <input type="datetime-local" required value={form.scheduledAt} onChange={f('scheduledAt')}
              className="w-full glass text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="text-gray-400 text-xs block mb-1">Mode *</label>
            <select value={form.type} onChange={f('type')} className="w-full glass text-white px-4 py-3 rounded-xl outline-none">
              <option value="OFFLINE">Offline (In-person)</option>
              <option value="ONLINE">Online (Virtual)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-gray-400 text-xs block mb-1">
            {form.type === 'ONLINE' ? 'Meeting Link' : 'Venue / Location'}
          </label>
          <input
            placeholder={form.type === 'ONLINE' ? 'https://meet.google.com/...' : 'e.g. Seminar Hall A, Block 2'}
            value={form.venue} onChange={f('venue')}
            className="w-full glass text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label className="text-gray-400 text-xs block mb-1">Instructions for Students</label>
          <textarea
            placeholder="e.g. Bring resume, dress formally, carry ID proof, topics to prepare..."
            rows={3} value={form.instructions} onChange={f('instructions')}
            className="w-full glass text-white px-4 py-3 rounded-xl outline-none resize-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        {/* Student picker */}
        <div>
          <label className="text-gray-400 text-xs block mb-2">
            Invite Students
            <span className="text-gray-600 ml-1">(leave all unchecked to invite everyone)</span>
          </label>
          {users.filter(u => u.role !== 'ADMIN').length === 0 ? (
            <p className="text-gray-600 text-xs">No students registered yet</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {users.filter(u => u.role !== 'ADMIN').map(u => (
                <label key={u.id}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition border ${
                    selectedUsers.includes(u.id)
                      ? 'bg-indigo-900/40 border-indigo-600'
                      : 'glass border-gray-700 hover:border-gray-500'
                  }`}>
                  <input type="checkbox" checked={selectedUsers.includes(u.id)}
                    onChange={() => toggleUser(u.id)} className="accent-indigo-500" />
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{u.name}</p>
                    <p className="text-gray-500 text-xs truncate">{u.email}</p>
                  </div>
                </label>
              ))}
            </div>
          )}
          {selectedUsers.length > 0 && (
            <p className="text-indigo-400 text-xs mt-2">{selectedUsers.length} student{selectedUsers.length !== 1 ? 's' : ''} selected</p>
          )}
          {selectedUsers.length === 0 && (
            <p className="text-gray-600 text-xs mt-2">All students will be notified</p>
          )}
        </div>

        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition">
          Create Schedule
        </button>
      </form>

      {/* Upcoming schedules */}
      {upcoming.length > 0 && (
        <div className="glass rounded-2xl p-6 shadow space-y-3">
          <h2 className="text-white font-semibold">Upcoming Schedules <span className="text-indigo-400 text-sm">({upcoming.length})</span></h2>
          {upcoming.map(s => (
            <div key={s.id} className="flex items-center justify-between glass px-4 py-3 rounded-xl gap-3 border border-indigo-900/40">
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium">{s.companyName} — {s.roundName}</p>
                <p className="text-gray-400 text-xs mt-0.5">
                  {new Date(s.scheduledAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })} · {s.type}
                  {s.invitedUserIds?.length > 0 && ` · ${s.invitedUserIds.length} invited`}
                  {(!s.invitedUserIds || s.invitedUserIds.length === 0) && ' · All students'}
                </p>
              </div>
              <button onClick={() => deleteSchedule(s.id)}
                className="text-red-400 hover:text-red-300 transition flex-shrink-0">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Past schedules */}
      {past.length > 0 && (
        <div className="glass rounded-2xl p-6 shadow space-y-3">
          <h2 className="text-white font-semibold text-gray-400">Past Schedules <span className="text-gray-600 text-sm">({past.length})</span></h2>
          {past.map(s => (
            <div key={s.id} className="flex items-center justify-between glass/50 px-4 py-3 rounded-xl gap-3 opacity-60">
              <div className="flex-1 min-w-0">
                <p className="text-gray-300 font-medium">{s.companyName} — {s.roundName}</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {new Date(s.scheduledAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })} · {s.type}
                </p>
              </div>
              <button onClick={() => deleteSchedule(s.id)}
                className="text-red-400 hover:text-red-300 transition flex-shrink-0">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {schedules.length === 0 && (
        <div className="glass rounded-2xl p-8 text-center text-gray-500">
          No schedules created yet
        </div>
      )}
    </div>
  )
}
