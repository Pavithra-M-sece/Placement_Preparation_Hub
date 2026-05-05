import { useEffect, useState } from 'react'
import api from '../api/axios'
import { CalendarDays, MapPin, Clock, Wifi, Building2, FileText, CheckCircle } from 'lucide-react'

const typeColor = {
  ONLINE:  'bg-blue-500/15 text-blue-400 border border-blue-500/20',
  OFFLINE: 'bg-green-500/15 text-green-400 border border-green-500/20',
}

function countdown(scheduledAt) {
  const diff = new Date(scheduledAt) - new Date()
  if (diff <= 0) return 'Completed'
  const days  = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  if (days > 0)  return `In ${days}d ${hours}h`
  if (hours > 0) return `In ${hours}h ${mins}m`
  return `In ${mins}m`
}

export default function Schedule() {
  const [schedules, setSchedules] = useState([])
  const [filter, setFilter] = useState('upcoming')

  useEffect(() => { api.get('/schedules/my').then(r => setSchedules(r.data)) }, [])

  const now      = new Date()
  const upcoming = schedules.filter(s => new Date(s.scheduledAt) >= now)
  const past     = schedules.filter(s => new Date(s.scheduledAt) < now)
  const filtered = (filter === 'upcoming' ? upcoming : past)
    .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt))

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <CalendarDays size={26} className="text-indigo-400" />
        <div>
          <h1 className="text-2xl font-bold text-white">Interview Schedule</h1>
          <p className="text-slate-400 text-sm">Your upcoming and past interview rounds in one place</p>
        </div>
      </div>

      {schedules.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <div className="glass border border-white/5 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">{schedules.length}</p>
            <p className="text-slate-500 text-xs mt-0.5">Total</p>
          </div>
          <div className="glass border border-white/5 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-indigo-400">{upcoming.length}</p>
            <p className="text-slate-500 text-xs mt-0.5">Upcoming</p>
          </div>
          <div className="glass border border-white/5 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-400">{past.length}</p>
            <p className="text-slate-500 text-xs mt-0.5">Completed</p>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        {['upcoming', 'past'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition ${filter === f ? 'bg-indigo-600 text-white' : 'glass text-slate-400 hover:text-white'}`}>
            {f} ({f === 'upcoming' ? upcoming.length : past.length})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="glass border border-white/5 rounded-2xl p-16 text-center text-slate-500">
          <CalendarDays size={40} className="mx-auto mb-3 text-slate-700" />
          <p className="font-medium text-slate-400">No {filter} interviews scheduled</p>
          <p className="text-sm mt-1">{filter === 'upcoming' ? 'Your admin will schedule interviews here.' : 'Completed interviews will appear here.'}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(s => {
            const isPast = new Date(s.scheduledAt) < now
            return (
              <div key={s.id} className={`glass rounded-2xl p-6 border ${isPast ? 'border-white/5 opacity-80' : 'border-indigo-500/20'}`}>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-white font-bold text-lg">{s.companyName}</h2>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColor[s.type]}`}>
                        {s.type === 'ONLINE'
                          ? <span className="flex items-center gap-1"><Wifi size={11} /> Online</span>
                          : <span className="flex items-center gap-1"><Building2 size={11} /> Offline</span>}
                      </span>
                      {isPast && (
                        <span className="flex items-center gap-1 text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                          <CheckCircle size={11} /> Completed
                        </span>
                      )}
                    </div>
                    <p className="text-indigo-400 font-semibold mt-1">{s.roundName}</p>
                  </div>
                  {!isPast && (
                    <div className="bg-indigo-500/15 border border-indigo-500/20 text-indigo-300 px-4 py-2 rounded-xl text-sm font-bold">
                      {countdown(s.scheduledAt)}
                    </div>
                  )}
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock size={15} className="text-indigo-400 flex-shrink-0" />
                    {new Date(s.scheduledAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  </div>
                  {s.venue && (
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin size={15} className="text-indigo-400 flex-shrink-0" />
                      {s.type === 'ONLINE'
                        ? <a href={s.venue} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline truncate">{s.venue}</a>
                        : <span>{s.venue}</span>}
                    </div>
                  )}
                </div>

                {s.instructions && (
                  <div className="mt-4 glass border border-yellow-500/15 rounded-xl px-4 py-3 flex gap-2">
                    <FileText size={15} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-yellow-400 text-xs font-semibold mb-1">Instructions</p>
                      <p className="text-slate-300 text-sm leading-relaxed">{s.instructions}</p>
                    </div>
                  </div>
                )}

                {!isPast && (
                  <div className="mt-4 glass border border-white/5 rounded-xl px-4 py-3 text-xs text-slate-500">
                    💡 Review your bookmarked problems and roadmap topics before this interview.
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
