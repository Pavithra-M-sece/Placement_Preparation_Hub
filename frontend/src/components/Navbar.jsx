import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogOut, Code2, Bookmark, Trophy, Map, Menu, X, Briefcase, CalendarDays, LayoutDashboard, Code, FlaskConical, Building2, User } from 'lucide-react'

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={14} /> },
  { to: '/jobs',      label: 'Jobs',       icon: <Briefcase size={14} /> },
  { to: '/schedule',  label: 'Schedule',   icon: <CalendarDays size={14} /> },
  { to: '/problems',  label: 'Problems',   icon: <Code size={14} /> },
  { to: '/tests',     label: 'Tests',      icon: <FlaskConical size={14} /> },
  { to: '/companies', label: 'Companies',  icon: <Building2 size={14} /> },
  { to: '/roadmap',   label: 'Roadmap',    icon: <Map size={14} /> },
  { to: '/leaderboard', label: 'Ranks',    icon: <Trophy size={14} /> },
  { to: '/bookmarks', label: 'Saved',      icon: <Bookmark size={14} /> },
  { to: '/profile',   label: 'Profile',    icon: <User size={14} /> },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const handleLogout = () => { logout(); navigate('/login') }
  const isActive = (to) => location.pathname === to || location.pathname.startsWith(to + '/')

  return (
    <nav className="navbar sticky top-0 z-50 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2.5 group">
          <div className="p-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 group-hover:bg-indigo-600/30 transition">
            <Code2 size={18} className="text-indigo-400" />
          </div>
          <span className="text-lg font-bold gradient-text tracking-tight">PlacementHub</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(({ to, label, icon }) => (
            <Link key={to} to={to}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                isActive(to)
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}>
              <span className={isActive(to) ? 'text-indigo-400' : 'text-slate-500'}>{icon}</span>
              {label}
            </Link>
          ))}
          {user?.role === 'ADMIN' && (
            <Link to="/admin"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isActive('/admin')
                  ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                  : 'text-yellow-500 hover:bg-yellow-500/10'
              }`}>
              Admin
            </Link>
          )}
          <button onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all ml-1">
            <LogOut size={13} /> Logout
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
          onClick={() => setOpen(o => !o)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden mt-3 flex flex-col gap-1 border-t border-white/5 pt-3 pb-2">
          {navLinks.map(({ to, label, icon }) => (
            <Link key={to} to={to} onClick={() => setOpen(false)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive(to)
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}>
              {icon}{label}
            </Link>
          ))}
          {user?.role === 'ADMIN' && (
            <Link to="/admin" onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium text-yellow-400 hover:bg-yellow-500/10 transition">
              Admin
            </Link>
          )}
          <button onClick={handleLogout}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition">
            <LogOut size={15} /> Logout
          </button>
        </div>
      )}
    </nav>
  )
}
