import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { 
  Bell, 
  User, 
  Menu, 
  X, 
  BookOpen, 
  CheckCircle, 
  LogOut, 
  LayoutDashboard, 
  Shield, 
  GraduationCap, 
  Calendar,
  Check
} from 'lucide-react';

export default function Navbar({ onOpenAuth }) {
  const { user, logout, switchDemoRole, isStudent, isTeacher, isAdmin } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllRead } = useNotifications();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo: MeroTutor with Graduation Cap & Open Book */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 flex items-center justify-center text-brand-600 shadow-sm group-hover:scale-105 group-hover:shadow-md transition-all">
            <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor">
              <path d="M16 4L3 10L16 16L29 10L16 4Z" fill="#3b82f6" stroke="#2563eb" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M25 12V18C25 18 26 19 26 21C26 22.5 24.5 23 24.5 23" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M7 16V25C10 23.5 13.5 24 16 26C18.5 24 22 23.5 25 25V16" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 16V26" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
              Mero<span className="text-brand-600">Tutor</span>
            </span>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
              Learn • Teach • Grow
            </span>
          </div>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3.5 py-2 rounded-2xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-blue-50 text-brand-600 border border-blue-200/70'
                  : 'text-slate-600 hover:text-brand-600 hover:bg-slate-100/70'
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/teachers"
            className={({ isActive }) =>
              `px-3.5 py-2 rounded-2xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-blue-50 text-brand-600 border border-blue-200/70'
                  : 'text-slate-600 hover:text-brand-600 hover:bg-slate-100/70'
              }`
            }
          >
            Find a Teacher
          </NavLink>

          <NavLink
            to="/become-a-teacher"
            className={({ isActive }) =>
              `px-3.5 py-2 rounded-2xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-blue-50 text-brand-600 border border-blue-200/70'
                  : 'text-slate-600 hover:text-brand-600 hover:bg-slate-100/70'
              }`
            }
          >
            Become a Teacher
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-3.5 py-2 rounded-2xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-blue-50 text-brand-600 border border-blue-200/70'
                  : 'text-slate-600 hover:text-brand-600 hover:bg-slate-100/70'
              }`
            }
          >
            About Us
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `px-3.5 py-2 rounded-2xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-blue-50 text-brand-600 border border-blue-200/70'
                  : 'text-slate-600 hover:text-brand-600 hover:bg-slate-100/70'
              }`
            }
          >
            Contact
          </NavLink>

          {/* Quick Dashboard link for authenticated user */}
          {user && (
            <NavLink
              to={
                isAdmin
                  ? '/admin'
                  : isTeacher
                  ? '/teacher-dashboard'
                  : '/dashboard'
              }
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-2xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200'
                }`
              }
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </NavLink>
          )}
        </nav>

        {/* Right Action Icons: Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="relative w-10 h-10 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-brand-600 flex items-center justify-center transition-all shadow-sm"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Notification Popup Dropdown */}
            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="bg-brand-100 text-brand-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs text-brand-600 hover:text-brand-700 font-semibold"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-slate-400 text-sm">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markAsRead(n.id)}
                        className={`px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors ${
                          !n.is_read ? 'bg-blue-50/50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="text-base mt-0.5">
                            {n.type === 'booking' ? '📅' : n.type === 'approval' ? '🎓' : '💬'}
                          </span>
                          <div className="flex-1">
                            <div className="font-semibold text-xs text-slate-900 flex items-center justify-between">
                              <span>{n.title}</span>
                              {!n.is_read && (
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-600"></span>
                              )}
                            </div>
                            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                              {n.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Button / Dropdown */}
          <div className="relative" ref={profileRef}>
            {user ? (
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pr-2.5 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200 transition-all shadow-sm"
                aria-label="User profile menu"
              >
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className="w-8 h-8 rounded-xl object-cover ring-2 ring-brand-200"
                />
                <span className="hidden sm:inline-block text-xs font-bold text-slate-800 max-w-[100px] truncate">
                  {user.fullName.split(' ')[0]}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-brand-100 text-brand-700 hidden lg:inline-block">
                  {user.role}
                </span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-sm transition-all"
              >
                Sign In
              </button>
            )}

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && user && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                {/* User quick badge */}
                <div className="p-3 bg-slate-50 rounded-xl mb-2 flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-11 h-11 rounded-xl object-cover ring-2 ring-white"
                  />
                  <div className="overflow-hidden">
                    <div className="font-bold text-sm text-slate-900 truncate">
                      {user.fullName}
                    </div>
                    <div className="text-xs text-slate-500 truncate">{user.email}</div>
                    <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">
                      {user.role} Account
                    </span>
                  </div>
                </div>

                {/* Dashboard Nav Links */}
                <div className="space-y-1 border-b border-slate-100 pb-2 mb-2 text-sm">
                  {isStudent && (
                    <Link
                      to="/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-brand-700 font-medium transition-colors"
                    >
                      <Calendar className="w-4 h-4 text-brand-600" />
                      <span>My Bookings & Lessons</span>
                    </Link>
                  )}

                  {isTeacher && (
                    <Link
                      to="/teacher-dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-brand-700 font-medium transition-colors"
                    >
                      <GraduationCap className="w-4 h-4 text-brand-600" />
                      <span>Teacher Dashboard</span>
                    </Link>
                  )}

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-brand-700 font-medium transition-colors"
                    >
                      <Shield className="w-4 h-4 text-brand-600" />
                      <span>Admin Control Center</span>
                    </Link>
                  )}
                </div>

                {/* Role Switcher (For smooth testing of Student, Parent, Teacher, Admin) */}
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                  Switch Demo Persona
                </div>
                <div className="grid grid-cols-2 gap-1 mb-2">
                  <button
                    onClick={() => {
                      switchDemoRole('student');
                      setProfileDropdownOpen(false);
                      navigate('/dashboard');
                    }}
                    className={`text-xs py-1.5 px-2 rounded-lg font-semibold transition-all ${
                      user.role === 'student'
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Student
                  </button>
                  <button
                    onClick={() => {
                      switchDemoRole('parent');
                      setProfileDropdownOpen(false);
                      navigate('/dashboard');
                    }}
                    className={`text-xs py-1.5 px-2 rounded-lg font-semibold transition-all ${
                      user.role === 'parent'
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Parent
                  </button>
                  <button
                    onClick={() => {
                      switchDemoRole('teacher');
                      setProfileDropdownOpen(false);
                      navigate('/teacher-dashboard');
                    }}
                    className={`text-xs py-1.5 px-2 rounded-lg font-semibold transition-all ${
                      user.role === 'teacher'
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Teacher
                  </button>
                  <button
                    onClick={() => {
                      switchDemoRole('admin');
                      setProfileDropdownOpen(false);
                      navigate('/admin');
                    }}
                    className={`text-xs py-1.5 px-2 rounded-lg font-semibold transition-all ${
                      user.role === 'admin'
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Admin
                  </button>
                </div>

                {/* Log Out */}
                <button
                  onClick={() => {
                    logout();
                    setProfileDropdownOpen(false);
                    navigate('/');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 text-sm font-semibold transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-700"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-700 hover:bg-blue-50 hover:text-brand-600"
          >
            Home
          </NavLink>
          <NavLink
            to="/teachers"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-700 hover:bg-blue-50 hover:text-brand-600"
          >
            Find a Teacher
          </NavLink>
          <NavLink
            to="/become-a-teacher"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-700 hover:bg-blue-50 hover:text-brand-600"
          >
            Become a Teacher
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-700 hover:bg-blue-50 hover:text-brand-600"
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-700 hover:bg-blue-50 hover:text-brand-600"
          >
            Contact
          </NavLink>
          {user && (
            <Link
              to={isAdmin ? '/admin' : isTeacher ? '/teacher-dashboard' : '/dashboard'}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl font-semibold text-sm bg-brand-50 text-brand-700 border border-brand-200"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
