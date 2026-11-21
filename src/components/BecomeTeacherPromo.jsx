import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function BecomeTeacherPromo() {
  return (
    <div className="bg-gradient-to-br from-white via-blue-50/60 to-indigo-50/40 rounded-3xl border-2 border-brand-200/90 p-8 shadow-card text-center relative overflow-hidden flex flex-col items-center">
      
      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-600 via-sky-400 to-emerald-400" />

      {/* Small education-themed illustration */}
      <div className="w-20 h-20 rounded-3xl bg-blue-100/70 border border-blue-200/80 flex items-center justify-center mb-5 text-brand-600 shadow-sm">
        <svg viewBox="0 0 100 100" className="w-14 h-14" fill="none">
          <circle cx="50" cy="50" r="42" fill="#dbeafe" opacity="0.6"/>
          {/* Graduation Cap */}
          <path d="M50 24L26 36L50 48L74 36L50 24Z" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2.5" strokeLinejoin="round"/>
          <path d="M68 40V54C68 54 69.5 56 69.5 58C69.5 60 67 61 67 61" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Open Book */}
          <path d="M34 50V68C39 65 46 66 50 69C54 66 61 65 66 68V50" stroke="#2563eb" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M50 50V69" stroke="#2563eb" strokeWidth="2.8" strokeLinecap="round"/>
        </svg>
      </div>

      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-brand-800 mb-3">
        Join Our Faculty
      </span>

      <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-2">
        Ready to Share Your Knowledge?
      </h3>

      <p className="text-slate-600 text-sm leading-relaxed mb-6">
        Become a teacher or coach and start helping others today!
      </p>

      {/* Bulleted perks */}
      <div className="w-full text-left space-y-2.5 mb-7 text-xs sm:text-sm font-semibold text-slate-700">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <span>Set your own hourly teaching fees</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <span>Flexible online or in-person schedule</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <span>100% free application with zero fees</span>
        </div>
      </div>

      {/* Apply Now button */}
      <Link
        to="/become-a-teacher"
        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md hover:shadow-hover hover:-translate-y-0.5 transition-all"
      >
        <span>Apply Now</span>
        <ArrowRight className="w-4 h-4" />
      </Link>

    </div>
  );
}
