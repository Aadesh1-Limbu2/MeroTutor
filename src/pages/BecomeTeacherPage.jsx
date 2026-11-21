import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { submitTeacherApplication } from '../services/store';
import { 
  GraduationCap, 
  CheckCircle2, 
  Upload, 
  MapPin, 
  BookOpen, 
  DollarSign, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function BecomeTeacherPage({ onOpenAuth }) {
  const { user } = useAuth();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [location, setLocation] = useState('Kathmandu & Online');
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [subjectsList, setSubjectsList] = useState('Mathematics, Calculus, SEE Math');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('3');
  const [hourlyRate, setHourlyRate] = useState('800');
  const [teachingMode, setTeachingMode] = useState('both');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !bio.trim() || !qualification.trim()) {
      showToast('Please complete all required fields');
      return;
    }

    setSubmitting(true);
    try {
      const parsedSubjects = subjectsList
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      await submitTeacherApplication({
        name,
        email,
        phone,
        location,
        title: title || `${subject} Instructor`,
        subject,
        subjects: parsedSubjects.length ? parsedSubjects : [subject],
        qualification,
        experience_years: Number(experience),
        hourly_rate: Number(hourlyRate),
        teaching_mode: teachingMode,
        bio,
        avatar
      });

      showToast('Application submitted successfully! Our academic team will review it within 24 hours. 🎉');
      navigate('/teachers');
    } catch (err) {
      showToast('Error submitting application: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-brand-700 border border-blue-200 mb-3">
          Join Nepal's Leading Faculty
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Teach on MeroTutor & Inspire
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Share your passion with ambitious students, set your own hourly fee, and build an independent tutoring brand.
        </p>
      </div>

      {/* Perks summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
          <span className="text-xs font-bold text-slate-700">Set your own hourly teaching fees</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
          <span className="text-xs font-bold text-slate-700">Flexible online and home schedule</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
          <span className="text-xs font-bold text-slate-700">Direct booking & verified students</span>
        </div>
      </div>

      {/* Application Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-card">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-6 pb-4 border-b border-slate-100 flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-brand-600" />
          <span>Instructor Application Form</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Pooja Sharma"
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="pooja@example.com"
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+977 98XXXXXXXX"
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                City / Location
              </label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. Kathmandu, Lalitpur, Pokhara or Online"
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
              />
            </div>
          </div>

          {/* Professional Credentials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Professional Title / Tagline *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Senior Mathematics & Calculus Specialist"
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Primary Subject *
              </label>
              <select
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 bg-slate-50 focus:bg-white focus:outline-none"
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Physics / Chemistry / Science</option>
                <option value="English">English / IELTS Prep</option>
                <option value="Nepali">Nepali Language & Sahitya</option>
                <option value="Coding">Coding / Python / Web Development</option>
                <option value="Football Coach">Football Coaching & Fitness</option>
                <option value="Music">Music / Classical Guitar</option>
                <option value="Economics">Economics & Accountancy</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Specific Topics / Subjects Taught (comma separated)
            </label>
            <input
              type="text"
              value={subjectsList}
              onChange={e => setSubjectsList(e.target.value)}
              placeholder="e.g. Mathematics, Calculus, Algebra, SEE Math"
              className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Highest Qualification *
              </label>
              <input
                type="text"
                required
                value={qualification}
                onChange={e => setQualification(e.target.value)}
                placeholder="e.g. M.Sc. Mathematics, TU"
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Teaching Experience (Years)
              </label>
              <input
                type="number"
                min={0}
                max={40}
                value={experience}
                onChange={e => setExperience(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Hourly Teaching Fee (Rs.) *
              </label>
              <input
                type="number"
                min={300}
                max={5000}
                step={50}
                required
                value={hourlyRate}
                onChange={e => setHourlyRate(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm font-bold text-brand-600 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Teaching Mode
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'online', label: '💻 Online Only' },
                { id: 'in_person', label: '🏠 In-Person / Home' },
                { id: 'both', label: '✨ Both Modes' }
              ].map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setTeachingMode(m.id)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                    teachingMode === m.id
                      ? 'border-brand-600 bg-brand-50 text-brand-700 shadow-sm'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Teacher Bio & Teaching Methodology *
            </label>
            <textarea
              required
              rows={4}
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Describe your teaching approach, past student results, passion for the subject, and what makes your lessons engaging..."
              className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Profile Picture URL
            </label>
            <input
              type="url"
              value={avatar}
              onChange={e => setAvatar(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-base shadow-md hover:shadow-hover hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              {submitting ? 'Submitting Application...' : 'Submit Teacher Application for Review'}
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-center text-xs text-slate-400 mt-3">
              By submitting, you agree to MeroTutor's Teacher Verification & Safety Code of Conduct.
            </p>
          </div>

        </form>
      </div>

    </div>
  );
}
