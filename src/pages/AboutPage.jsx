import React from 'react';
import { Target, Compass, HeartHandshake, ShieldCheck, Users, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-brand-700 border border-blue-200 mb-3">
          Our Story & Purpose
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Democratizing Quality 1-on-1 Mentorship Across Nepal
        </h1>
        <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
          MeroTutor was established to eliminate geographical barriers and bring transparency, trust, and modern digital tools to private education and athletic coaching.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-brand-600 flex items-center justify-center mx-auto mb-5 shadow-sm">
            <Target className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Our Mission</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            To empower students in every city, town, and village to learn from the very best educators and sports coaches with tailored 1-on-1 attention.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-sm">
            <Compass className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Our Vision</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            To build South Asia's most trusted, student-centric learning marketplace where qualified instructors achieve financial independence and learners thrive.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm text-center">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-5 shadow-sm">
            <HeartHandshake className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Core Values</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Academic integrity, safety, transparent reviews, affordability, and genuine empathy for every student's individual learning journey.
          </p>
        </div>

      </div>

      {/* Story & Background */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-card max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Why We Built MeroTutor
        </h2>
        <p className="text-slate-600 text-base leading-relaxed">
          Traditionally, finding a qualified tutor in Nepal relied on word-of-mouth recommendations, unverified paper flyers pasted on street pillars, or high commission agencies with zero accountability. Students often struggled with mismatched teaching styles, while dedicated teachers had no platform to showcase their true credentials and student testimonials.
        </p>
        <p className="text-slate-600 text-base leading-relaxed">
          MeroTutor changes this paradigm by offering a transparent, verified education marketplace. Students and parents can review complete profiles, video introductions, hourly rates, verified degrees, and authentic student ratings before booking a single session.
        </p>
      </div>

    </div>
  );
}
