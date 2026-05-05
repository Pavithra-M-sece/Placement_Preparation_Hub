import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { Clock, CheckCircle } from 'lucide-react'

export default function TakeTest() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [test, setTest] = useState(null)
  const [problems, setProblems] = useState([])
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => {
    api.get(`/tests`).then(r => {
      const t = r.data.find(t => t.id === Number(id))
      if (!t) return
      setTest(t)
      setTimeLeft(t.durationMinutes * 60)
      const ids = t.problemIds || []
      Promise.all(ids.map(pid => api.get(`/problems/${pid}`))).then(res =>
        setProblems(res.map(r => r.data))
      )
    })
  }, [id])

  useEffect(() => {
    if (timeLeft <= 0 || submitted) return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); handleSubmit(); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [timeLeft > 0, submitted])

  const handleSubmit = async () => {
    if (submitted) return
    clearInterval(timerRef.current)
    setSubmitted(true)
    try {
      const { data } = await api.post(`/tests/${id}/submit`, answers)
      setResult(data)
    } catch (err) {
      console.error(err)
    }
  }

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const secs = String(timeLeft % 60).padStart(2, '0')

  if (!test) return <div className="p-6 text-gray-400">Loading test...</div>

  if (result) return (
    <div className="p-6 flex items-center justify-center min-h-[60vh]">
      <div className="glass rounded-2xl p-10 text-center shadow space-y-4 max-w-md w-full">
        <CheckCircle size={48} className="text-green-400 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Test Submitted!</h2>
        <p className="text-gray-400">Your score</p>
        <p className="text-5xl font-bold text-indigo-400">{result.score}<span className="text-2xl text-gray-500">/{result.totalQuestions}</span></p>
        <button onClick={() => navigate('/tests')} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition">
          Back to Tests
        </button>
      </div>
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">{test.title}</h1>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-lg ${timeLeft < 60 ? 'bg-red-900/40 text-red-400' : 'glass text-white'}`}>
          <Clock size={18} /> {mins}:{secs}
        </div>
      </div>

      <div className="space-y-6">
        {problems.map((p, i) => (
          <div key={p.id} className="glass rounded-2xl p-6 shadow space-y-4">
            <div className="flex items-start gap-3">
              <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-lg">Q{i + 1}</span>
              <div>
                <h3 className="text-white font-semibold">{p.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{p.description}</p>
              </div>
            </div>
            <textarea
              rows={4}
              placeholder="Write your answer or code here..."
              value={answers[p.id] || ''}
              onChange={e => setAnswers({ ...answers, [p.id]: e.target.value })}
              className="w-full bg-black/40 text-gray-200 font-mono text-sm p-3 rounded-xl outline-none resize-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl text-lg transition"
      >
        Submit Test
      </button>
    </div>
  )
}
