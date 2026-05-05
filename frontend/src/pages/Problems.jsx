import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { Code2 } from 'lucide-react'

const DIFFICULTIES = ['ALL', 'EASY', 'MEDIUM', 'HARD']
const TOPICS = ['ALL', 'DSA', 'Aptitude', 'OS', 'CN', 'DBMS']

const diffBg = {
  EASY:   'bg-green-500/15 text-green-400 border border-green-500/20',
  MEDIUM: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20',
  HARD:   'bg-red-500/15 text-red-400 border border-red-500/20',
}

export default function Problems() {
  const [problems, setProblems] = useState([])
  const [allProblems, setAllProblems] = useState([])
  const [difficulty, setDifficulty] = useState('ALL')
  const [topic, setTopic] = useState('ALL')
  const navigate = useNavigate()

  useEffect(() => { api.get('/problems').then(r => setAllProblems(r.data)) }, [])

  useEffect(() => {
    const params = {}
    if (difficulty !== 'ALL') params.difficulty = difficulty
    if (topic !== 'ALL') params.topic = topic
    api.get('/problems', { params }).then(r => setProblems(r.data))
  }, [difficulty, topic])

  const easy   = allProblems.filter(p => p.difficulty === 'EASY').length
  const medium = allProblems.filter(p => p.difficulty === 'MEDIUM').length
  const hard   = allProblems.filter(p => p.difficulty === 'HARD').length

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold"><span className="gradient-text-green">Coding Problems</span></h1>
        <p className="text-slate-400 text-sm mt-1">{problems.length} problem{problems.length !== 1 ? 's' : ''} found — filter by difficulty or topic</p>
      </div>

      {allProblems.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {[['EASY', easy, 'bg-green-500/10 border-green-500/20 text-green-400'],
            ['MEDIUM', medium, 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'],
            ['HARD', hard, 'bg-red-500/10 border-red-500/20 text-red-400']].map(([d, count, cls]) => (
            <button key={d} onClick={() => setDifficulty(d)}
              className={`rounded-xl p-4 border text-center transition hover:opacity-90 ${cls} ${difficulty === d ? 'ring-2 ring-current ring-offset-1 ring-offset-transparent' : ''}`}>
              <p className="text-2xl font-bold">{count}</p>
              <p className="text-xs font-semibold mt-0.5 capitalize">{d.toLowerCase()}</p>
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          {DIFFICULTIES.map(d => (
            <button key={d} onClick={() => setDifficulty(d)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${difficulty === d ? 'bg-indigo-600 text-white' : 'glass text-slate-400 hover:text-white'}`}>
              {d}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {TOPICS.map(t => (
            <button key={t} onClick={() => setTopic(t)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${topic === t ? 'bg-purple-600 text-white' : 'glass text-slate-400 hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-slate-400 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Topic</th>
              <th className="px-6 py-3 text-left">Difficulty</th>
              <th className="px-6 py-3 text-left">Submissions</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((p, i) => (
              <tr key={p.id} onClick={() => navigate(`/problems/${p.id}`)}
                className="border-t border-white/5 hover:bg-white/5 cursor-pointer transition">
                <td className="px-6 py-4 text-slate-500">{i + 1}</td>
                <td className="px-6 py-4">
                  <p className="text-white font-medium">{p.title}</p>
                  {p.topic && <p className="text-slate-600 text-xs mt-0.5">{p.topic}</p>}
                </td>
                <td className="px-6 py-4">
                  <span className="glass text-slate-400 text-xs px-2 py-0.5 rounded-full">{p.topic}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${diffBg[p.difficulty]}`}>{p.difficulty}</span>
                </td>
                <td className="px-6 py-4 text-slate-500 text-xs">{p.submissionCount ?? 0} submissions</td>
              </tr>
            ))}
            {problems.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-10 text-center">
                <Code2 size={28} className="mx-auto mb-2 text-slate-700" />
                <p className="text-slate-500">No problems found for the selected filters</p>
              </td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
