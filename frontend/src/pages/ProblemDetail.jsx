import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'
import { Send, CheckCircle, Clock, Bookmark, BookmarkCheck, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react'

const LANGUAGES = ['Java', 'Python', 'C++']
const diffColor = { EASY: 'text-green-400', MEDIUM: 'text-yellow-400', HARD: 'text-red-400' }
const diffBg = { EASY: 'bg-green-900/30', MEDIUM: 'bg-yellow-900/30', HARD: 'bg-red-900/30' }

function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 glass/50 text-sm font-semibold text-gray-300 hover:glass transition">
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <div className="px-4 py-3 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{children}</div>}
    </div>
  )
}

export default function ProblemDetail() {
  const { id } = useParams()
  const [problem, setProblem] = useState(null)
  const [code, setCode] = useState('// Write your solution here\n')
  const [language, setLanguage] = useState('Java')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [submissions, setSubmissions] = useState([])
  const [bookmarked, setBookmarked] = useState(false)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    api.get(`/problems/${id}`).then(r => setProblem(r.data))
    api.get('/submissions/my').then(r =>
      setSubmissions(r.data.filter(s => s.problem?.id === Number(id)))
    )
    api.get(`/bookmarks/${id}/status`).then(r => setBookmarked(r.data.bookmarked)).catch(() => {})
  }, [id])

  const toggleBookmark = async () => {
    if (bookmarked) {
      await api.delete(`/bookmarks/${id}`)
      setBookmarked(false)
    } else {
      await api.post(`/bookmarks/${id}`)
      setBookmarked(true)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setResult(null)
    try {
      const { data } = await api.post('/submissions', { problemId: Number(id), code, language })
      setResult(data)
      setSubmissions(prev => [data, ...prev])
    } catch (err) {
      setResult({ status: 'ERROR', message: err.response?.data?.error })
    } finally {
      setLoading(false)
    }
  }

  if (!problem) return <div className="p-6 text-gray-400">Loading...</div>

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Problem Description */}
      <div className="space-y-4">
        <div className="glass rounded-2xl p-6 shadow space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">{problem.title}</h1>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${diffBg[problem.difficulty]} ${diffColor[problem.difficulty]}`}>
                {problem.difficulty}
              </span>
              <button onClick={toggleBookmark} className="text-yellow-400 hover:text-yellow-300 transition">
                {bookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
              </button>
            </div>
          </div>
          <span className="text-xs glass text-indigo-400 px-2 py-1 rounded">{problem.topic}</span>

          <Section title="Problem Description">
            {problem.description}
          </Section>

          {problem.examples && (
            <Section title="Examples">
              {problem.examples}
            </Section>
          )}

          {problem.constraints && (
            <Section title="Constraints" defaultOpen={false}>
              {problem.constraints}
            </Section>
          )}

          {problem.hints && (
            <div className="border border-yellow-800/50 rounded-xl overflow-hidden">
              <button onClick={() => setShowHint(o => !o)}
                className="w-full flex items-center justify-between px-4 py-3 bg-yellow-900/20 text-sm font-semibold text-yellow-400 hover:bg-yellow-900/30 transition">
                <span className="flex items-center gap-2"><Lightbulb size={15} /> Hint</span>
                {showHint ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {showHint && (
                <div className="px-4 py-3 text-yellow-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {problem.hints}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Past Submissions */}
        {submissions.length > 0 && (
          <div className="glass rounded-2xl p-5 shadow">
            <h3 className="text-gray-400 text-sm font-semibold mb-3">Your Submissions</h3>
            <div className="space-y-2">
              {submissions.slice(0, 5).map(s => (
                <div key={s.id} className="flex items-center gap-3 text-xs glass px-3 py-2 rounded-lg">
                  {s.status === 'ACCEPTED'
                    ? <CheckCircle size={14} className="text-green-400" />
                    : <Clock size={14} className="text-yellow-400" />}
                  <span className={s.status === 'ACCEPTED' ? 'text-green-400 font-semibold' : 'text-yellow-400 font-semibold'}>{s.status}</span>
                  <span className="text-gray-500">{s.language}</span>
                  <span className="text-gray-600 ml-auto">{new Date(s.submittedAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Code Editor */}
      <div className="glass rounded-2xl p-6 shadow space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold">Code Editor</h2>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="glass text-gray-300 text-sm px-3 py-1 rounded-lg outline-none"
          >
            {LANGUAGES.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>

        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          rows={20}
          className="w-full bg-black/40 text-green-300 font-mono text-sm p-4 rounded-xl outline-none resize-none focus:ring-2 focus:ring-indigo-500"
          spellCheck={false}
        />

        <button
          onClick={handleSubmit} disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
        >
          <Send size={16} /> {loading ? 'Submitting...' : 'Submit Solution'}
        </button>

        {result && (
          <div className={`p-4 rounded-xl text-sm font-medium ${result.status === 'ACCEPTED' ? 'bg-green-900/40 text-green-400' : result.status === 'ERROR' ? 'bg-red-900/40 text-red-400' : 'bg-yellow-900/40 text-yellow-400'}`}>
            Status: {result.status}
            {result.message && <p className="text-xs mt-1 opacity-75">{result.message}</p>}
          </div>
        )}
      </div>
    </div>
  )
}
