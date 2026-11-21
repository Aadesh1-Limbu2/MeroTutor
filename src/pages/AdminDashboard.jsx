import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { 
  fetchTeachers, 
  updateTeacherApproval, 
  fetchBookings, 
  fetchAdminStats 
} from '../services/store';
import { 
  Shield, 
  Users, 
  GraduationCap, 
  Calendar, 
  DollarSign, 
  Check, 
  X, 
  AlertCircle,
  Eye,
  CheckCircle2
} from 'lucide-react';

export default function AdminDashboard({ onOpenAuth }) {
  const { user, isAdmin } = useAuth();
  const { showToast } = useNotifications();

  const [stats, setStats] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending', 'teachers', 'bookings'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdminData();
  }, [user]);

  async function loadAdminData() {
    setLoading(true);
    try {
      const s = await fetchAdminStats();
      setStats(s);

      const allTeachers = await fetchTeachers({ status: null });
      setTeachers(allTeachers);

      const allBookings = await fetchBookings({ role: 'admin' });
      setBookings(allBookings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleApproveTeacher(teacherId) {
    await updateTeacherApproval(teacherId, 'approved', true);
    showToast('Teacher application approved & verified badge awarded! 🎉');
    loadAdminData();
  }

  async function handleRejectTeacher(teacherId) {
    if (window.confirm('Reject this teacher application?')) {
      await updateTeacherApproval(teacherId, 'rejected', false);
      showToast('Teacher application rejected.');
      loadAdminData();
    }
  }

  if (!user) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Admin Sign In Required</h2>
        <p className="text-slate-500 text-sm mb-6">Please log in as an administrator to access this area.</p>
        <button
          onClick={onOpenAuth}
          className="px-6 py-3 rounded-2xl bg-brand-600 text-white font-bold text-sm"
        >
          Sign In
        </button>
      </div>
    );
  }

  const pendingTeachers = teachers.filter(t => t.approval_status === 'pending');
  const approvedTeachers = teachers.filter(t => t.approval_status === 'approved');

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-brand-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
              Admin Control Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            MeroTutor Platform Administration
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Review teacher applications, manage users, and supervise lesson bookings.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
          Signed in as: <strong className="text-white">{user.fullName}</strong>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Learners</div>
          <div className="text-3xl font-extrabold text-slate-900">{stats?.totalStudents || 1420}</div>
          <div className="text-xs text-emerald-600 font-medium mt-1">Across 15+ cities</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Pending Teacher Apps</div>
          <div className="text-3xl font-extrabold text-amber-600">{pendingTeachers.length}</div>
          <div className="text-xs text-amber-600 font-medium mt-1">Require vetting</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Active Verified Tutors</div>
          <div className="text-3xl font-extrabold text-brand-600">{approvedTeachers.length}</div>
          <div className="text-xs text-slate-500 font-medium mt-1">Live in marketplace</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Bookings</div>
          <div className="text-3xl font-extrabold text-slate-900">{bookings.length}</div>
          <div className="text-xs text-emerald-600 font-medium mt-1">Rs. {stats?.totalRevenue || 0} volume</div>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6 gap-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('pending')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'pending'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>Pending Applications</span>
          {pendingTeachers.length > 0 && (
            <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-extrabold flex items-center justify-center">
              {pendingTeachers.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('teachers')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'teachers'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Approved Tutors ({approvedTeachers.length})
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'bookings'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          System Bookings ({bookings.length})
        </button>
      </div>

      {/* Tab: Pending Applications */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          {pendingTeachers.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No pending applications</h3>
              <p className="text-xs text-slate-500 mt-1">All teacher applicants have been vetted and approved.</p>
            </div>
          ) : (
            pendingTeachers.map(t => (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-6 border-2 border-amber-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-100"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-base text-slate-900">{t.name}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                        Pending Review
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-brand-700">
                      {t.subject} • Rs. {t.hourly_rate}/hr
                    </div>
                    <div className="text-xs text-slate-500">
                      🎓 Qualification: <strong>{t.qualification}</strong> ({t.experience_years} yrs exp)
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                      "{t.bio}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                  <button
                    onClick={() => handleApproveTeacher(t.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve & Verify</span>
                  </button>
                  <button
                    onClick={() => handleRejectTeacher(t.id)}
                    className="px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-bold text-xs"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: Approved Teachers Directory */}
      {activeTab === 'teachers' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase">
                <tr>
                  <th className="p-4">Teacher</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Fee / hr</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {approvedTeachers.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="p-4 flex items-center gap-3">
                      <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="font-bold text-slate-900">{t.name}</div>
                        <div className="text-[10px] text-slate-400">{t.qualification}</div>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-brand-700">{t.subject}</td>
                    <td className="p-4 text-slate-600">{t.location}</td>
                    <td className="p-4 font-bold text-slate-900">Rs. {t.hourly_rate}</td>
                    <td className="p-4 font-bold text-amber-500">★ {t.rating}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Verified & Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: System Bookings */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase">
                <tr>
                  <th className="p-4">Student</th>
                  <th className="p-4">Teacher</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Date & Time</th>
                  <th className="p-4">Fee</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {bookings.map(b => (
                  <tr key={b.id} className="hover:bg-slate-50">
                    <td className="p-4 font-bold text-slate-900">{b.student_name}</td>
                    <td className="p-4 text-slate-700">{b.teacher_name}</td>
                    <td className="p-4 text-brand-700 font-semibold">{b.subject}</td>
                    <td className="p-4 text-slate-600">{b.booking_date} ({b.time_slot})</td>
                    <td className="p-4 font-bold text-slate-900">Rs. {b.fee}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
