import { useEffect, useState } from 'react'
import api from '../api/axios'
import { Briefcase, MapPin, Calendar, ChevronRight, CheckCircle, Clock, XCircle, Star, AlertTriangle } from 'lucide-react'

const TYPES = ['All', 'Full-time', 'Internship', 'Part-time']

const typeColor = {
  'Full-time': 'bg-green-900/40 text-green-400',
  'Internship': 'bg-blue-900/40 text-blue-400',
  'Part-time': 'bg-yellow-900/40 text-yellow-400',
}

const statusIcon = {
  APPLIED: <Clock size={14} className="text-yellow-400" />,
  SHORTLISTED: <Star size={14} className="text-indigo-400" />,
  SELECTED: <CheckCircle size={14} className="text-green-400" />,
  REJECTED: <XCircle size={14} className="text-red-400" />,
}
const statusColor = {
  APPLIED: 'text-yellow-400',
  SHORTLISTED: 'text-indigo-400',
  SELECTED: 'text-green-400',
  REJECTED: 'text-red-400',
}

function deadlineUrgency(deadline) {
  if (!deadline) return null
  const diff = new Date(deadline) - new Date()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days < 0) return { label: 'Expired', cls: 'text-gray-500' }
  if (days <= 3) return { label: `${days}d left`, cls: 'text-red-400' }
  if (days <= 7) return { label: `${days}d left`, cls: 'text-yellow-400' }
  return null
}

export default function Jobs() {
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [type, setType] = useState('All')
  const [selected, setSelected] = useState(null)
  const [applying, setApplying] = useState(false)
  const [tab, setTab] = useState('browse')

  const fetchJobs = () => {
    const params = type !== 'All' ? { type } : {}
    api.get('/jobs', { params }).then(r => {
      setJobs(r.data)
      if (r.data.length > 0 && !selected) setSelected(r.data[0])
    })
  }

  const fetchApplications = () => api.get('/jobs/my-applications').then(r => setApplications(r.data))

  useEffect(() => { fetchJobs(); fetchApplications() }, [type])

  const appliedJobIds = new Set(applications.map(a => a.job?.id))

  const handleApply = async (jobId) => {
    setApplying(true)
    try {
      await api.post(`/jobs/${jobId}/apply`)
      fetchApplications()
    } catch (err) {
      alert(err.response?.data?.message || 'Already applied or error occurred')
    } finally {
      setApplying(false)
    }
  }

  const shortlisted = applications.filter(a => a.status === 'SHORTLISTED').length
  const selected_ = applications.filter(a => a.status === 'SELECTED').length

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Briefcase size={26} className="text-indigo-400" /> Job & Internship Listings
          </h1>
          <p className="text-gray-400 text-sm mt-1">{jobs.length} opening{jobs.length !== 1 ? 's' : ''} available — apply and track your application status</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setTab('browse')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${tab === 'browse' ? 'bg-indigo-600 text-white' : 'glass text-slate-400 hover:text-white'}`}>
            Browse Jobs
          </button>
          <button onClick={() => setTab('applied')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${tab === 'applied' ? 'bg-indigo-600 text-white' : 'glass text-slate-400 hover:text-white'}`}>
            My Applications {applications.length > 0 && <span className="ml-1 bg-indigo-500 text-white text-xs px-1.5 py-0.5 rounded-full">{applications.length}</span>}
          </button>
        </div>
      </div>

      {/* Application summary */}
      {applications.length > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {[['Applied', applications.length, 'text-yellow-400'], ['Shortlisted', shortlisted, 'text-indigo-400'], ['Selected', selected_, 'text-green-400'], ['Rejected', applications.filter(a => a.status === 'REJECTED').length, 'text-red-400']].map(([label, count, cls]) => (
            <div key={label} className="glass rounded-xl p-3 text-center">
              <p className={`text-xl font-bold ${cls}`}>{count}</p>
              <p className="text-gray-500 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'browse' && (
        <>
          <div className="flex gap-2 flex-wrap">
            {TYPES.map(t => (
              <button key={t} onClick={() => { setType(t); setSelected(null) }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${type === t ? 'bg-indigo-600 text-white' : 'glass text-slate-400 hover:text-white'}`}>
                {t}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Job list */}
            <div className="space-y-3 lg:overflow-y-auto lg:max-h-[70vh]">
              {jobs.map(job => {
                const urgency = deadlineUrgency(job.deadline)
                return (
                  <button key={job.id} onClick={() => setSelected(job)}
                    className={`w-full text-left p-4 rounded-2xl transition border ${selected?.id === job.id ? 'bg-indigo-600 border-indigo-500' : 'glass border-white/5 hover:border-indigo-500/30'}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-white">{job.title}</p>
                        <p className={`text-sm mt-0.5 ${selected?.id === job.id ? 'text-indigo-200' : 'text-gray-400'}`}>{job.companyName}</p>
                      </div>
                      {appliedJobIds.has(job.id) && (
                        <span className="text-xs bg-green-900/50 text-green-400 px-2 py-0.5 rounded-full flex-shrink-0">Applied</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColor[job.type] || 'bg-gray-800 text-gray-400'}`}>{job.type}</span>
                      {job.location && <span className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={11} />{job.location}</span>}
                      {job.package_ && <span className="text-xs text-gray-500">{job.package_}</span>}
                      {urgency && (
                        <span className={`text-xs flex items-center gap-1 ${urgency.cls}`}>
                          <AlertTriangle size={10} />{urgency.label}
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
              {jobs.length === 0 && (
                <div className="text-center text-gray-500 py-16">No jobs available</div>
              )}
            </div>

            {/* Job detail */}
            <div className="lg:col-span-2">
              {selected ? (
                <div className="glass rounded-2xl p-6 shadow space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-white">{selected.title}</h2>
                      <p className="text-indigo-400 font-medium mt-1">{selected.companyName}</p>
                    </div>
                    <span className={`text-sm px-3 py-1 rounded-full font-semibold flex-shrink-0 ${typeColor[selected.type] || 'bg-gray-800 text-gray-400'}`}>
                      {selected.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                    {selected.location && (
                      <span className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-lg"><MapPin size={14} />{selected.location}</span>
                    )}
                    {selected.package_ && (
                      <span className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-lg text-green-400 font-semibold"><Briefcase size={14} />{selected.package_}</span>
                    )}
                    {selected.deadline && (() => {
                      const urgency = deadlineUrgency(selected.deadline)
                      return (
                        <span className={`flex items-center gap-1.5 glass px-3 py-1.5 rounded-lg ${urgency ? urgency.cls : ''}`}>
                          <Calendar size={14} />Deadline: {new Date(selected.deadline).toLocaleDateString()}
                          {urgency && <span className="font-bold">({urgency.label})</span>}
                        </span>
                      )
                    })()}
                  </div>

                  {selected.description && (
                    <div>
                      <h3 className="text-gray-400 text-sm font-semibold mb-2">About the Role</h3>
                      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{selected.description}</p>
                    </div>
                  )}

                  {selected.eligibility && (
                    <div>
                      <h3 className="text-gray-400 text-sm font-semibold mb-2">Eligibility Criteria</h3>
                      <p className="text-slate-300 text-sm glass px-4 py-3 rounded-xl">{selected.eligibility}</p>
                    </div>
                  )}

                  {selected.requiredSkills?.length > 0 && (
                    <div>
                      <h3 className="text-gray-400 text-sm font-semibold mb-2">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {selected.requiredSkills.map((s, i) => (
                          <span key={i} className="glass text-slate-300 text-sm px-3 py-1 rounded-full">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => handleApply(selected.id)}
                    disabled={applying || appliedJobIds.has(selected.id)}
                    className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-xl transition ${appliedJobIds.has(selected.id) ? 'bg-green-900/40 text-green-400 cursor-default' : 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50'}`}
                  >
                    {appliedJobIds.has(selected.id)
                      ? <><CheckCircle size={16} /> Applied</>
                      : <><ChevronRight size={16} /> {applying ? 'Applying...' : 'Apply Now'}</>}
                  </button>
                </div>
              ) : (
                <div className="glass rounded-2xl p-10 text-center text-slate-500 shadow">
                  <Briefcase size={40} className="mx-auto mb-3 text-gray-700" />
                  <p className="font-medium">Select a job to view details</p>
                  <p className="text-sm mt-1 text-gray-600">Browse openings on the left and click to see full details</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {tab === 'applied' && (
        <div className="glass rounded-2xl shadow overflow-hidden">
          {applications.length === 0 ? (
            <div className="text-center text-slate-500 py-16">
              <Briefcase size={36} className="mx-auto mb-3 text-gray-700" />
              <p className="font-medium">No applications yet</p>
              <p className="text-sm mt-1 text-gray-600">Browse jobs and click Apply Now to get started</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-slate-400 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 text-left">Job</th>
                  <th className="px-6 py-3 text-left">Company</th>
                  <th className="px-6 py-3 text-left">Type</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Applied On</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(a => (
                  <tr key={a.id} className="border-t border-white/5 hover:bg-white/5 transition">
                    <td className="px-6 py-4 text-white font-medium">{a.job?.title}</td>
                    <td className="px-6 py-4 text-gray-400">{a.job?.companyName}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${typeColor[a.job?.type] || 'glass text-slate-400'}`}>{a.job?.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1.5 font-semibold ${statusColor[a.status]}`}>
                        {statusIcon[a.status]} {a.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">{new Date(a.appliedAt).toLocaleDateString()}</td>
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
