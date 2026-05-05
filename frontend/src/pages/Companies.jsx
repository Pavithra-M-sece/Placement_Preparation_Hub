import { useEffect, useState } from 'react'
import api from '../api/axios'
import { Building2, BookOpen, ListChecks, BarChart2, Info } from 'lucide-react'

const diffColor = {
  Easy:   'text-green-400 bg-green-500/10 border border-green-500/20',
  Medium: 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/20',
  Hard:   'text-red-400 bg-red-500/10 border border-red-500/20',
}

export default function Companies() {
  const [companies, setCompanies] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => { api.get('/companies').then(r => setCompanies(r.data)) }, [])

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold"><span className="gradient-text-gold">Company-wise Preparation</span></h1>
        <p className="text-slate-400 text-sm mt-1">{companies.length} compan{companies.length !== 1 ? 'ies' : 'y'} — select one to view hiring patterns and topics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          {companies.map(c => (
            <button key={c.id} onClick={() => setSelected(c)}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl text-left transition border ${
                selected?.id === c.id
                  ? 'bg-indigo-600/80 border-indigo-500/50 text-white'
                  : 'glass border-white/5 text-slate-300 hover:border-indigo-500/30'
              }`}>
              <Building2 size={18} className={selected?.id === c.id ? 'text-white' : 'text-slate-500'} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{c.name}</p>
                <p className={`text-xs mt-0.5 ${selected?.id === c.id ? 'text-indigo-200' : 'text-slate-500'}`}>
                  {c.difficulty} · {c.rounds?.length || 0} rounds
                </p>
              </div>
            </button>
          ))}
          {companies.length === 0 && (
            <div className="text-slate-500 text-center py-10">
              <Building2 size={32} className="mx-auto mb-2 text-slate-700" />
              <p>No companies added yet</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          {selected ? (
            <div className="glass rounded-2xl p-6 space-y-6 border border-white/5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Building2 size={20} className="text-indigo-400" /> {selected.name}
                </h2>
                {selected.difficulty && (
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${diffColor[selected.difficulty] || 'text-slate-400 glass'}`}>
                    {selected.difficulty}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="glass rounded-xl p-3 text-center border border-white/5">
                  <p className="text-xl font-bold text-indigo-400">{selected.rounds?.length || 0}</p>
                  <p className="text-slate-500 text-xs mt-0.5">Interview Rounds</p>
                </div>
                <div className="glass rounded-xl p-3 text-center border border-white/5">
                  <p className="text-xl font-bold text-purple-400">{selected.suggestedTopics?.length || 0}</p>
                  <p className="text-slate-500 text-xs mt-0.5">Suggested Topics</p>
                </div>
              </div>

              {selected.pattern && (
                <div>
                  <h3 className="text-slate-400 text-sm font-semibold mb-2 flex items-center gap-2">
                    <BarChart2 size={14} /> Hiring Pattern
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{selected.pattern}</p>
                </div>
              )}

              {selected.rounds?.length > 0 && (
                <div>
                  <h3 className="text-slate-400 text-sm font-semibold mb-3 flex items-center gap-2">
                    <ListChecks size={14} /> Interview Rounds
                  </h3>
                  <div className="space-y-2">
                    {selected.rounds.map((round, i) => (
                      <div key={i} className="flex items-center gap-3 glass border border-white/5 px-4 py-3 rounded-xl">
                        <span className="bg-indigo-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{i + 1}</span>
                        <span className="text-slate-300 text-sm">{round}</span>
                        {i === 0 && <span className="ml-auto text-xs text-slate-600">First</span>}
                        {i === selected.rounds.length - 1 && i > 0 && <span className="ml-auto text-xs text-slate-600">Final</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selected.suggestedTopics?.length > 0 && (
                <div>
                  <h3 className="text-slate-400 text-sm font-semibold mb-3 flex items-center gap-2">
                    <BookOpen size={14} /> Suggested Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selected.suggestedTopics.map((t, i) => (
                      <span key={i} className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm px-3 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="glass border border-white/5 rounded-xl px-4 py-3 flex gap-2 text-xs text-slate-500">
                <Info size={13} className="flex-shrink-0 mt-0.5 text-indigo-400" />
                Use the Roadmap to track progress on these topics, and Bookmarks to save relevant problems.
              </div>
            </div>
          ) : (
            <div className="glass border border-white/5 rounded-2xl p-16 text-center text-slate-500">
              <Building2 size={40} className="mx-auto mb-3 text-slate-700" />
              <p className="font-medium text-slate-400">Select a company</p>
              <p className="text-sm mt-1">View hiring patterns, interview rounds, and topics to prepare</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
