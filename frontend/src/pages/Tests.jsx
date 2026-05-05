import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { Clock, ChevronRight, FlaskConical, CheckCircle, BarChart2 } from 'lucide-react'

export default function Tests() {
  const [tests, setTests] = useState([])
  const [results, setResults] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/tests').then(r => setTests(r.data))
    api.get('/tests/results').then(r => setResults(r.data))
  }, [])

  const getResult = (testId) => results.find(r => r.test?.id === testId)
  const attempted = tests.filter(t => getResult(t.id)).length
  const avgScore = results.length > 0
    ? Math.round(results.reduce((sum, r) => sum + (r.totalQuestions > 0 ? (r.score / r.totalQuestions) * 100 : 0), 0) / results.length)
    : null

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold"><span className="gradient-text" style={{background:'linear-gradient(135deg,#c084fc,#818cf8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Mock Tests</span></h1>
        <p className="text-slate-400 text-sm mt-1">{tests.length} test{tests.length !== 1 ? 's' : ''} available — simulate real interview conditions</p>
      </div>

      {tests.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <div className="glass rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-indigo-400">{tests.length}</p>
            <p className="text-slate-500 text-xs mt-0.5">Total Tests</p>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-400">{attempted}</p>
            <p className="text-slate-500 text-xs mt-0.5">Attempted</p>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${avgScore !== null ? (avgScore >= 70 ? 'text-green-400' : avgScore >= 40 ? 'text-yellow-400' : 'text-red-400') : 'text-slate-600'}`}>
              {avgScore !== null ? `${avgScore}%` : '—'}
            </p>
            <p className="text-slate-500 text-xs mt-0.5">Avg Score</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tests.map(test => {
          const result = getResult(test.id)
          const pct = result && result.totalQuestions > 0 ? Math.round((result.score / result.totalQuestions) * 100) : null
          return (
            <div key={test.id} className="glass rounded-2xl p-6 space-y-3 hover:border-purple-500/30 transition border border-white/5">
              <div className="flex items-start justify-between">
                <h2 className="text-white font-semibold">{test.title}</h2>
                {test.company && (
                  <span className="text-xs bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 px-2 py-1 rounded-lg">{test.company}</span>
                )}
              </div>

              <div className="flex items-center gap-2 text-slate-400 text-sm flex-wrap">
                <Clock size={14} />
                <span>{test.durationMinutes} min</span>
                <span className="text-slate-600">•</span>
                <span>{test.problemIds?.length || 0} questions</span>
              </div>

              {result ? (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1"><CheckCircle size={12} className="text-green-400" /> Last score</span>
                    <span className={`font-bold ${pct >= 70 ? 'text-green-400' : pct >= 40 ? 'text-yellow-400' : 'text-red-400'}`}>{result.score}/{result.totalQuestions} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full transition-all ${pct >= 70 ? 'bg-green-500' : pct >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <BarChart2 size={12} /> Not attempted yet
                </div>
              )}

              <button onClick={() => navigate(`/tests/${test.id}`)}
                className="btn-primary w-full flex items-center justify-center gap-2 text-white text-sm font-semibold py-2 rounded-xl">
                {result ? 'Retake Test' : 'Start Test'} <ChevronRight size={16} />
              </button>
            </div>
          )
        })}
        {tests.length === 0 && (
          <div className="col-span-3 text-center text-slate-500 py-16">
            <FlaskConical size={36} className="mx-auto mb-3 text-slate-700" />
            <p>No tests available yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
