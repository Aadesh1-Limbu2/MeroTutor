import React from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../context/NotificationContext';

export default function Footer() {
  const { showToast } = useNotifications();

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 flex items-center justify-center text-brand-600 shadow-sm">
                <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" stroke="currentColor">
                  <path d="M16 4L3 10L16 16L29 10L16 4Z" fill="#3b82f6" stroke="#2563eb" strokeWidth="1.8" />
                  <path d="M7 16V25C10 23.5 13.5 24 16 26C18.5 24 22 23.5 25 25V16" stroke="#1d4ed8" strokeWidth="2" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-slate-900 leading-none">
                  Mero<span className="text-brand-600">Tutor</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  Learn • Teach • Grow
                </span>
              </div>
            </Link>
            
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm mb-6">
              MeroTutor is Nepal's premier educational tutoring & coaching marketplace. We connect students and lifelong learners with verified academic teachers, IT mentors, and athletic coaches.
            </p>

            <div className="flex items-center gap-2">
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map(social => (
                <button
                  key={social}
                  onClick={() => showToast(`Visiting MeroTutor ${social} page...`)}
                  className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-brand-50 hover:text-brand-600 border border-slate-200 text-slate-500 text-xs font-semibold flex items-center justify-center transition-all shadow-sm"
                  title={social}
                >
                  {social[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 tracking-tight uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link to="/" className="hover:text-brand-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/teachers" className="hover:text-brand-600 transition-colors">
                  Find a Teacher
                </Link>
              </li>
              <li>
                <Link to="/become-a-teacher" className="hover:text-brand-600 transition-colors">
                  Become a Teacher
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Subjects */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 tracking-tight uppercase mb-4">
              Top Subjects
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link to="/teachers?category=math" className="hover:text-brand-600 transition-colors">
                  Mathematics & Calculus
                </Link>
              </li>
              <li>
                <Link to="/teachers?category=science" className="hover:text-brand-600 transition-colors">
                  Physics & Science
                </Link>
              </li>
              <li>
                <Link to="/teachers?category=coding" className="hover:text-brand-600 transition-colors">
                  Python & Web Dev
                </Link>
              </li>
              <li>
                <Link to="/teachers?category=football" className="hover:text-brand-600 transition-colors">
                  Football Coaching
                </Link>
              </li>
              <li>
                <Link to="/teachers?category=english" className="hover:text-brand-600 transition-colors">
                  English & IELTS Prep
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 tracking-tight uppercase mb-4">
              Contact Us
            </h4>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-start gap-2.5">
                <span className="text-base">📍</span>
                <span>Tinkune, Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-base">✉️</span>
                <span>support@merotutor.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-base">📞</span>
                <span>+977 (01) 411-2345</span>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Support Available 7 Days/Wk
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-200 py-6 bg-slate-50 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 MeroTutor – Learn • Teach • Grow. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => showToast('Privacy Policy details')} className="hover:text-brand-600">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => showToast('Terms of Service details')} className="hover:text-brand-600">
              Terms of Service
            </button>
            <span>•</span>
            <button onClick={() => showToast('Trust & Safety Guidelines')} className="hover:text-brand-600">
              Trust & Safety
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
