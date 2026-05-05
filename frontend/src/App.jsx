import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Problems from './pages/Problems'
import ProblemDetail from './pages/ProblemDetail'
import Tests from './pages/Tests'
import TakeTest from './pages/TakeTest'
import Companies from './pages/Companies'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import Roadmap from './pages/Roadmap'
import Leaderboard from './pages/Leaderboard'
import Bookmarks from './pages/Bookmarks'
import Jobs from './pages/Jobs'
import Schedule from './pages/Schedule'

const pageBg = {
  '/dashboard':   'page-dashboard',
  '/problems':    'page-problems',
  '/jobs':        'page-jobs',
  '/tests':       'page-tests',
  '/companies':   'page-companies',
  '/roadmap':     'page-roadmap',
  '/leaderboard': 'page-leaderboard',
  '/schedule':    'page-schedule',
  '/profile':     'page-profile',
  '/bookmarks':   'page-bookmarks',
  '/admin':       'page-admin',
}

function AppLayout() {
  const location = useLocation()
  const base = '/' + location.pathname.split('/')[1]
  const bgClass = pageBg[base] || 'page-dashboard'

  return (
    <div className={`min-h-screen dot-grid text-white ${bgClass}`}>
      <Navbar />
      <main className="max-w-7xl mx-auto fade-in">
        <Outlet />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/"         element={<Navigate to="/dashboard" replace />} />

          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route path="/dashboard"    element={<Dashboard />} />
            <Route path="/problems"     element={<Problems />} />
            <Route path="/problems/:id" element={<ProblemDetail />} />
            <Route path="/tests"        element={<Tests />} />
            <Route path="/tests/:id"    element={<TakeTest />} />
            <Route path="/companies"    element={<Companies />} />
            <Route path="/roadmap"      element={<Roadmap />} />
            <Route path="/leaderboard"  element={<Leaderboard />} />
            <Route path="/bookmarks"    element={<Bookmarks />} />
            <Route path="/jobs"         element={<Jobs />} />
            <Route path="/schedule"     element={<Schedule />} />
            <Route path="/profile"      element={<Profile />} />
            <Route path="/admin"        element={
              <ProtectedRoute adminOnly>
                <Admin />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
