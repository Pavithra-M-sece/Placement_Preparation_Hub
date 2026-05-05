import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { Bookmark, Trash2 } from 'lucide-react'

const diffBg = {
  EASY:   'bg-green-500/15 text-green-400 border border-green-500/20',
  MEDIUM: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20',
  HARD:   'bg-red-500/15 text-red-400 border border-red-500/20',
}

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([])
  const navigate = useNavigate()

  const fetchBookmarks = () => api.get('/bookmarks').then(r => setBookmarks(r.data))
  useEffect(() => { fetchBookmarks() }, [])

  const remove = async (e, problemId) => {
    e.stopPropagation()
    await api.delete(`/bookmarks/${problemId}`)
    fetchBookmarks()
  }

  const easy   = bookmarks.filter(b => b.problem.difficulty === 'EASY').length
  const medium = bookmarks.filter(b => b.problem.difficulty === 'MEDIUM').length
  const hard   = bookmarks.filter(b => b.problem.difficulty === 'HARD').length

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Bookmark size={26} className="text-indigo-400" />
        <div>
          <h1 className="text-2xl font-bold"><span className="gradient-text-rose">Bookmarked Problems</span></h1>
          <p className="text-slate-400 text-sm">{bookmarks.length} saved problem{bookmarks.length !== 1 ? 's' : ''} — click any row to open</p>
        </div>
      </div>

      {bookmarks.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {[['EASY', easy], ['MEDIUM', medium], ['HARD', hard]].map(([d, count]) => (
            <div key={d} className={`rounded-xl p-4 text-center border ${diffBg[d]}`}>
              <p className="text-2xl font-bold">{count}</p>
              <p className="text-xs font-semibold mt-0.5">{d}</p>
            </div>
          ))}
        </div>
      )}

      <div className="glass rounded-2xl overflow-hidden border border-white/5">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-slate-400 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Topic</th>
              <th className="px-6 py-3 text-left">Difficulty</th>
              <th className="px-6 py-3 text-left">Saved</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {bookmarks.map((b, i) => (
              <tr key={b.id} onClick={() => navigate(`/problems/${b.problem.id}`)}
                className="border-t border-white/5 hover:bg-white/5 cursor-pointer transition">
                <td className="px-6 py-4 text-slate-500">{i + 1}</td>
                <td className="px-6 py-4 text-white font-medium">{b.problem.title}</td>
                <td className="px-6 py-4">
                  <span className="glass text-slate-400 text-xs px-2 py-0.5 rounded-full">{b.problem.topic}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${diffBg[b.problem.difficulty]}`}>{b.problem.difficulty}</span>
                </td>
                <td className="px-6 py-4 text-slate-500 text-xs">{new Date(b.savedAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <button onClick={(e) => remove(e, b.problem.id)} className="text-red-400 hover:text-red-300 transition">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {bookmarks.length === 0 && (
              <tr><td colSpan={6} className="px-6 py-12 text-center">
                <Bookmark size={32} className="mx-auto mb-3 text-slate-700" />
                <p className="text-slate-500 font-medium">No bookmarks yet</p>
                <p className="text-slate-600 text-xs mt-1">Click the bookmark icon on any problem to save it here</p>
              </td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
