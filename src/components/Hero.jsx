import React from 'react';
import { Link } from 'react-router-dom';
import { Search, UserPlus, Sparkles, Star, BookOpen, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-sky-50/40 to-slate-50 pt-12 pb-16 lg:pt-16 lg:pb-24">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Subtitle, CTA Buttons */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-200/80 text-brand-700 text-xs font-bold shadow-sm mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Nepal's Premier 1-on-1 Tutoring & Coaching Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-6">
              Find the Perfect Teacher or{' '}
              <span className="bg-gradient-to-r from-brand-600 to-sky-500 bg-clip-text text-transparent">
                Share Your Skills!
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mb-8">
              Learn from the best tutors and coaches, or become a teacher and inspire others. Together, let's build a smarter community!
            </p>

            {/* Two Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10 w-full sm:w-auto">
              <Link
                to="/teachers"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-bold text-base shadow-md hover:shadow-hover hover:-translate-y-0.5 transition-all"
              >
                <Search className="w-5 h-5" />
                <span>Find a Teacher</span>
              </Link>

              <Link
                to="/become-a-teacher"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-brand-300 text-slate-800 hover:text-brand-700 font-bold text-base shadow-sm hover:shadow transition-all"
              >
                <UserPlus className="w-5 h-5 text-brand-600" />
                <span>Become a Teacher</span>
              </Link>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200/80 w-full max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">1,800+</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                  Verified Tutors
                </div>
              </div>
              <div className="border-l border-slate-200 pl-6">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">4.9 ★</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                  Average Rating
                </div>
              </div>
              <div className="border-l border-slate-200 pl-6">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">30k+</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                  Lessons Taught
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Realistic image of two young students smiling and welcoming */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Soft decorative background circles */}
              <div className="absolute -top-6 -right-6 w-72 h-72 rounded-full bg-blue-100/70 -z-10" />
              <div className="absolute -bottom-6 -left-6 w-56 h-56 rounded-full bg-amber-100/60 -z-10" />

              {/* Main Student Photography */}
              <div className="relative rounded-3xl overflow-hidden shadow-float border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                  alt="Two smiling young students holding books welcoming visitors to MeroTutor"
                  className="w-full h-[440px] object-cover hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
              </div>

              {/* Floating Top Badge */}
              <div className="absolute top-6 -left-6 bg-white rounded-2xl p-3 shadow-float border border-slate-100 flex items-center gap-3 animate-float-slow">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center font-bold text-lg shadow-sm">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Top Rated Mentors</div>
                  <div className="text-[11px] text-slate-500">100% Background Checked</div>
                </div>
              </div>

              {/* Floating Bottom Badge */}
              <div className="absolute bottom-6 -right-6 bg-white rounded-2xl p-3 shadow-float border border-slate-100 flex items-center gap-3 animate-float-delay">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-600 flex items-center justify-center font-bold text-lg shadow-sm">
                  <BookOpen className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Active Learners</div>
                  <div className="text-[11px] text-slate-500">Online & Home Lessons</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
