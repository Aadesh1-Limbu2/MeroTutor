import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

import HomePage from './pages/HomePage';
import TeachersPage from './pages/TeachersPage';
import TeacherDetailPage from './pages/TeacherDetailPage';
import BecomeTeacherPage from './pages/BecomeTeacherPage';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

import { isSupabaseConfigured } from './services/supabase';
import { Database, CheckCircle, Info } from 'lucide-react';

export default function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showConfigNotice, setShowConfigNotice] = useState(!isSupabaseConfigured);

  function openAuth(mode = 'login') {
    setAuthMode(mode);
    setAuthModalOpen(true);
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* Backend Status Top Bar */}
      {showConfigNotice && (
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-brand-700 text-white text-xs px-4 py-2 flex items-center justify-between shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center gap-2 font-medium">
            <Info className="w-4 h-4 flex-shrink-0 text-amber-300" />
            <span>
              <strong>Full-Stack Ready:</strong> Running with interactive seed database. To link your live Supabase project, provide <code className="bg-white/20 px-1 py-0.5 rounded font-mono">VITE_SUPABASE_URL</code> in <code className="bg-white/20 px-1 py-0.5 rounded font-mono">.env</code>.
            </span>
          </div>
          <button
            onClick={() => setShowConfigNotice(false)}
            className="text-white/80 hover:text-white text-xs ml-3 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar onOpenAuth={() => openAuth('login')} />

      {/* Main Content Router */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onOpenAuth={() => openAuth('login')} />} />
          <Route path="/teachers" element={<TeachersPage onOpenAuth={() => openAuth('login')} />} />
          <Route path="/teachers/:id" element={<TeacherDetailPage onOpenAuth={() => openAuth('login')} />} />
          <Route path="/become-a-teacher" element={<BecomeTeacherPage onOpenAuth={() => openAuth('login')} />} />
          <Route path="/dashboard" element={<StudentDashboard onOpenAuth={() => openAuth('login')} />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard onOpenAuth={() => openAuth('login')} />} />
          <Route path="/admin" element={<AdminDashboard onOpenAuth={() => openAuth('login')} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}
