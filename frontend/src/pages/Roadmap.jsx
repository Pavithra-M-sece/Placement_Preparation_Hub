import { useEffect, useState } from 'react'
import api from '../api/axios'
import { CheckCircle, Circle, BookOpen } from 'lucide-react'

const CATEGORIES = ['DSA', 'OS', 'CN', 'DBMS']
const catDesc = {
  DSA:  'Arrays, Linked Lists, Trees, Graphs, DP and more',
  OS:   'Processes, Threads, Memory Management, Scheduling',
  CN:   'OSI Model, TCP/IP, DNS, HTTP, Sockets',
  DBMS: 'SQL, Normalization, Transactions, Indexing',
}
const catBar = { DSA: 'bg-indigo-500', OS: 'bg-green-500', CN: 'bg-yellow-500', DBMS: 'bg-purple-500' }
const catAccent = { DSA: 'text-indigo-400', OS: 'text-green-400', CN: 'text-yellow-400', DBMS: 'text-purple-400' }

export default function Roadmap() {
  const [data, setData] = useState(null)
  const [activeTab, setActiveTab] = useState('DSA')

  const fetchRoadmap = () => api.get('/roadmap').then(r => setData(r.data))
  useEffect(() => { fetchRoadmap() }, [])

  const toggle = async (itemId) => { await api.post(`/roadmap/${itemId}/toggle`); fetchRoadmap() }

  if (!data) return <div className="p-6 text-slate-400">Loading...</div>

  const items = data.items?.[activeTab] || []

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen size={26} className="text-indigo-400" />
        <div>
          <h1 className="text-2xl font-bold"><span className="gradient-text-green">Learning Roadmap</span></h1>
          <p className="text-slate-400 text-sm">Track your progress across DSA, OS, CN, and DBMS topics</p>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 border border-white/5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-slate-400 text-sm">Overall Progress</span>
          <span className="text-white font-bold">{data.completed}/{data.total} topics</span>
        </div>
        <div className="w-full bg-white/5 rounded-full h-3">
          <div className="progress-bar h-3 rounded-full transition-all duration-500" style={{ width: `${data.percent}%` }} />
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-slate-500 text-xs">{data.total - data.completed} topics remaining</p>
          <p className="text-indigo-400 font-bold">{data.percent}%</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CATEGORIES.map(cat => {
          const catItems = data.items?.[cat] || []
          const catDone = catItems.filter(i => i.completed).length
          const catPct = catItems.length > 0 ? Math.round((catDone / catItems.length) * 100) : 0
          const isActive = activeTab === cat
          return (
            <button key={cat} onClick={() => setActiveTab(cat)}
              className={`rounded-xl p-4 text-left transition border ${isActive ? 'bg-indigo-600/80 border-indigo-500/50' : 'glass border-white/5 hover:border-indigo-500/30'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`font-bold text-sm ${isActive ? 'text-white' : catAccent[cat]}`}>{cat}</span>
                {catPct === 100 && <span className="text-xs">✅</span>}
              </div>
              <p className={`text-xs mb-2 ${isActive ? 'text-indigo-200' : 'text-slate-500'}`}>{catDone}/{catItems.length} done</p>
              <div className={`w-full rounded-full h-1.5 ${isActive ? 'bg-indigo-800' : 'bg-white/5'}`}>
                <div className={`h-1.5 rounded-full transition-all ${isActive ? 'bg-white' : catBar[cat]}`} style={{ width: `${catPct}%` }} />
              </div>
            </button>
          )
        })}
      </div>

      <div className="glass border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-400">
        <span className={`font-semibold ${catAccent[activeTab]}`}>{activeTab}: </span>{catDesc[activeTab]}
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={item.id} onClick={() => toggle(item.id)}
            className={`flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition border ${
              item.completed
                ? 'bg-green-500/10 border-green-500/20'
                : 'glass border-white/5 hover:border-indigo-500/30'
            }`}>
            <div className="mt-0.5">
              {item.completed
                ? <CheckCircle size={22} className="text-green-400" />
                : <Circle size={22} className="text-slate-600" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-slate-500 text-xs">#{idx + 1}</span>
                <h3 className={`font-semibold ${item.completed ? 'text-green-400 line-through' : 'text-white'}`}>{item.topic}</h3>
                {item.completed && <span className="text-xs text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">Done</span>}
              </div>
              <p className="text-slate-400 text-sm mt-1">{item.description}</p>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="glass border border-white/5 rounded-2xl p-10 text-center text-slate-500">
            No topics added for {activeTab} yet
          </div>
        )}
      </div>
    </div>
  )
}
