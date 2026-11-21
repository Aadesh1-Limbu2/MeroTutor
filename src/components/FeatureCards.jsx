import React from 'react';
import { ShieldCheck, Zap, BookMarked, Users2 } from 'lucide-react';

const FEATURES = [
  {
    id: 1,
    title: 'Trusted Platform',
    subtitle: 'Verified Teachers & Coaches',
    description: 'Every instructor undergoes academic credential checks, identity verification, and background screening.',
    bgClass: 'bg-pastel-blue-bg border-pastel-blue-border',
    iconBgClass: 'bg-white text-pastel-blue-icon shadow-sm',
    icon: ShieldCheck
  },
  {
    id: 2,
    title: 'Easy & Fast',
    subtitle: 'Find or Apply in Minutes',
    description: 'Effortlessly browse subjects, compare profiles, check hourly fees, and book lessons with instant confirmation.',
    bgClass: 'bg-pastel-green-bg border-pastel-green-border',
    iconBgClass: 'bg-white text-pastel-green-icon shadow-sm',
    icon: Zap
  },
  {
    id: 3,
    title: 'Wide Range',
    subtitle: 'Subjects & Sports',
    description: 'From school syllabus and engineering entrance preparation to guitar lessons, coding bootcamps, and football drills.',
    bgClass: 'bg-pastel-amber-bg border-pastel-amber-border',
    iconBgClass: 'bg-white text-pastel-amber-icon shadow-sm',
    icon: BookMarked
  },
  {
    id: 4,
    title: 'Supportive Community',
    subtitle: 'Learn and Grow Together',
    description: 'Join thousands of students and educators building a smarter, encouraging educational network across Nepal.',
    bgClass: 'bg-pastel-purple-bg border-pastel-purple-border',
    iconBgClass: 'bg-white text-pastel-purple-icon shadow-sm',
    icon: Users2
  }
];

export default function FeatureCards() {
  return (
    <section className="py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-brand-700 border border-blue-200 mb-3">
            Why Choose MeroTutor
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Designed for Exceptional Learning
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Everything you need to master your academics, acquire digital skills, or excel in athletics with verified 1-on-1 mentorship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(feat => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className={`p-7 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-card flex flex-col ${feat.bgClass}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${feat.iconBgClass}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {feat.title}
                </h3>
                <div className="text-xs font-bold text-brand-700 mb-2">
                  {feat.subtitle}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mt-auto">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
