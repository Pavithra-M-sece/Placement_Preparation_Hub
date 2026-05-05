import { useEffect, useState } from 'react'
import api from '../api/axios'
import { Trophy, Medal, TrendingUp } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const rankColor = ['text-yellow-400', 'text-slate-300', 'text-orange-400']
const rankBg    = ['bg-yellow-500/10 border-yellow-500/20', 'bg-white/5 border-white/10', 'bg-orange-500/10 border-orange-500/20']
const rankLabel = ['🥇 1st', '🥈 2nd', '🥉 3rd']

export default function Leaderboard() {
  const [data, setData] = useState([])
  const { user } = useAuth()

  useEffect(() => { api.get('/leaderboard').then(r => setData(r.data)) }, [])

  const myRank  = data.findIndex(e => e.email === user?.email)
  const myEntry = myRank >= 0 ? data[myRank] : null

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Trophy size={26} className="text-yellow-400" />
        <div>
          <h1 className="text-2xl font-bold"><span className="gradient-text-gold">Leaderboard</span></h1>
          <p className="text-slate-400 text-sm">Points = problems solved × 10 + avg test score</p>
        </div>
      </div>

      {myEntry && (
        <div className="glass border border-indigo-500/20 rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-indigo-600/80 p-3 rounded-xl flex-shrink-0">
            <TrendingUp size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-indigo-300 text-xs font-semibold mb-0.5">Your Ranking</p>
            <p className="text-white font-bold text-lg">#{myRank + 1} — {myEntry.name}</p>
            <p className="text-slate-400 text-xs mt-0.5">{myEntry.problemsSolved} solved · {myEntry.avgTestScore}% avg score</p>
          </div>
          <div className="text-right">
            <p className="text-indigo-400 text-2xl font-black">{myEntry.points}</p>
            <p className="text-slate-500 text-xs">points</p>
          </div>
        </div>
      )}

      {data.length >= 3 && (
        <div className="grid grid-cols-3 gap-4">
          {[1, 0, 2].map(idx => (
            <div key={idx} className={`glass rounded-2xl p-5 text-center border ${rankBg[idx]}`}>
              <div className="text-lg mb-1">{rankLabel[idx]}</div>
              <div className={`text-2xl font-black ${rankColor[idx]}`}>#{idx + 1}</div>
              <div className="text-white font-bold mt-2">{data[idx]?.name}</div>
              <div className="text-indigo-400 text-xl font-bold mt-1">{data[idx]?.points} pts</div>
              <div className="text-slate-400 text-xs mt-1">{data[idx]?.problemsSolved} solved · {data[idx]?.avgTestScore}% avg</div>
            </div>
          ))}
        </div>
      )}

      <div className="glass rounded-2xl overflow-hidden border border-white/5">
        <div className="px-6 py-3 bg-white/5 border-b border-white/5 flex items-center justify-between">
          <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">All Rankings</span>
          <span className="text-slate-500 text-xs">{data.length} participants</span>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-slate-400 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Rank</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-center">Solved</th>
              <th className="px-6 py-3 text-center">Avg Score</th>
              <th className="px-6 py-3 text-center">Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, i) => (
              <tr key={i} className={`border-t border-white/5 transition ${entry.email === user?.email ? 'bg-indigo-500/10' : 'hover:bg-white/5'}`}>
                <td className="px-6 py-4">
                  {i < 3 ? <Medal size={18} className={rankColor[i]} /> : <span className="text-slate-500">#{i + 1}</span>}
                </td>
                <td className="px-6 py-4">
                  <span className="text-white font-medium">{entry.name}</span>
                  {entry.email === user?.email && <span className="ml-2 text-xs text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">(you)</span>}
                </td>
                <td className="px-6 py-4 text-center text-green-400 font-semibold">{entry.problemsSolved}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`font-semibold ${entry.avgTestScore >= 70 ? 'text-green-400' : entry.avgTestScore >= 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {entry.avgTestScore}%
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-indigo-400 font-bold">{entry.points}</td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-10 text-center text-slate-500">No data yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
