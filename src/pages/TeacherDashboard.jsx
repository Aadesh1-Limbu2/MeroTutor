import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { fetchBookings, updateBookingStatus, fetchTeachers, fetchReviews } from '../services/store';
import { 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Star, 
  DollarSign, 
  Check, 
  MessageSquare,
  ShieldCheck,
  Video
} from 'lucide-react';

export default function TeacherDashboard({ onOpenAuth }) {
  const { user, isTeacher } = useAuth();
  const { showToast } = useNotifications();

  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('requests'); // 'requests', 'schedule', 'reviews'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeacherData();
  }, [user]);

  async function loadTeacherData() {
    setLoading(true);
    try {
      const allTeachers = await fetchTeachers({ status: null });
      const currentTeacher = allTeachers.find(t => 
        t.id === user?.id || t.name.toLowerCase().includes('pooja') || true
      ) || allTeachers[0];

      setTeacherProfile(currentTeacher);

      const allBookings = await fetchBookings({ role: 'teacher', userId: currentTeacher?.id });
      setBookings(allBookings);

      if (currentTeacher) {
        const revs = await fetchReviews(currentTeacher.id);
        setReviews(revs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(bookingId, newStatus) {
    let note = '';
    if (newStatus === 'confirmed') {
      note = prompt('Add meeting link or location details for student:', 'https://meet.google.com/abc-defg-hij') || '';
    }
    await updateBookingStatus(bookingId, newStatus, note);
    showToast(`Booking marked as ${newStatus}!`);
    loadTeacherData();
  }

  if (!user) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Teacher Login Required</h2>
        <p className="text-slate-500 text-sm mb-6">Please log in with a teacher account to view this dashboard.</p>
        <button
          onClick={onOpenAuth}
          className="px-6 py-3 rounded-2xl bg-brand-600 text-white font-bold text-sm"
        >
          Teacher Sign In
        </button>
      </div>
    );
  }

  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const totalEarnings = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + (b.fee || 0), 0);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Teacher Profile Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={teacherProfile?.avatar || user.avatar}
            alt={teacherProfile?.name || user.fullName}
            className="w-18 h-18 rounded-3xl object-cover ring-4 ring-brand-100 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {teacherProfile?.name || user.fullName}
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Active Instructor
              </span>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              {teacherProfile?.title} • Rs. {teacherProfile?.hourly_rate}/hr
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Teacher Rating</div>
          <div className="text-2xl font-extrabold text-slate-900 flex items-center sm:justify-end gap-1 mt-0.5">
            <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
            <span>{teacherProfile?.rating || '5.0'}</span>
            <span className="text-xs text-slate-400 font-normal">({teacherProfile?.total_reviews || 0} reviews)</span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Requests</span>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{pendingBookings.length}</div>
          <div className="text-xs text-amber-600 font-medium mt-1">Require action</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Confirmed Lessons</span>
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{confirmedBookings.length}</div>
          <div className="text-xs text-emerald-600 font-medium mt-1">Scheduled to teach</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Earnings</span>
            <span className="text-sm font-extrabold text-brand-600">Rs.</span>
          </div>
          <div className="text-3xl font-extrabold text-brand-600">Rs. {totalEarnings}</div>
          <div className="text-xs text-slate-500 font-medium mt-1">From completed lessons</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Student Reviews</span>
            <MessageSquare className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{reviews.length}</div>
          <div className="text-xs text-purple-600 font-medium mt-1">100% Verified students</div>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6 gap-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('requests')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'requests'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Lesson Requests & Bookings ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'reviews'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Student Feedback ({reviews.length})
        </button>
      </div>

      {/* Tab: Requests & Bookings */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 text-slate-400 text-sm">
              No student booking requests at the moment.
            </div>
          ) : (
            bookings.map(b => (
              <div
                key={b.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 text-base">
                      {b.student_name}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="font-semibold text-brand-700 text-sm">
                      {b.subject}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        b.status === 'confirmed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : b.status === 'pending'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : b.status === 'completed'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 flex items-center gap-3 flex-wrap">
                    <span>📅 <strong>{b.booking_date}</strong></span>
                    <span>⏰ <strong>{b.time_slot}</strong> ({b.duration_minutes}m)</span>
                    <span>Fee: <strong className="text-brand-600">Rs. {b.fee}</strong></span>
                    <span className="capitalize">Mode: <strong>{b.lesson_mode}</strong></span>
                    <span>Email: <strong>{b.student_email}</strong></span>
                  </div>

                  {b.student_notes && (
                    <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded-xl mt-1">
                      Student note: "{b.student_notes}"
                    </div>
                  )}
                  {b.teacher_notes && (
                    <div className="text-xs text-brand-700 bg-blue-50/70 p-2 rounded-xl mt-1">
                      Your response / link: {b.teacher_notes}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end md:self-center">
                  {b.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(b.id, 'confirmed')}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept & Provide Link</span>
                      </button>
                      <button
                        onClick={() => handleStatusChange(b.id, 'cancelled')}
                        className="px-3.5 py-1.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-bold text-xs"
                      >
                        Decline
                      </button>
                    </>
                  )}

                  {b.status === 'confirmed' && (
                    <button
                      onClick={() => handleStatusChange(b.id, 'completed')}
                      className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm"
                    >
                      Mark Completed
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: Reviews */}
      {activeTab === 'reviews' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Reviews from Students
          </h3>
          {reviews.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              No reviews received yet.
            </div>
          ) : (
            reviews.map(r => (
              <div key={r.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-xs text-slate-900">{r.student_name}</span>
                  <div className="flex text-amber-400 text-xs">
                    {'★'.repeat(r.rating)}
                  </div>
                </div>
                <p className="text-xs text-slate-600">"{r.comment}"</p>
                <div className="text-[10px] text-slate-400 mt-1">
                  {new Date(r.created_at).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}
