import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { fetchBookings, updateBookingStatus, fetchTeachers, fetchFavorites, toggleFavorite } from '../services/store';
import TeacherCard from '../components/TeacherCard';
import BookingModal from '../components/BookingModal';
import { 
  Calendar, 
  Heart, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  User, 
  Video, 
  Search,
  ExternalLink
} from 'lucide-react';

export default function StudentDashboard({ onOpenAuth }) {
  const { user } = useAuth();
  const { showToast } = useNotifications();

  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings', 'favorites', 'profile'
  const [bookings, setBookings] = useState([]);
  const [favoriteTeachers, setFavoriteTeachers] = useState([]);
  const [favoritesIds, setFavoritesIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedTeacherForBooking, setSelectedTeacherForBooking] = useState(null);

  useEffect(() => {
    loadData();
  }, [user]);

  async function loadData() {
    setLoading(true);
    try {
      const b = await fetchBookings({ role: 'student', userId: user?.id });
      setBookings(b);

      const favIds = await fetchFavorites(user?.id);
      setFavoritesIds(favIds);

      const allTeachers = await fetchTeachers();
      setFavoriteTeachers(allTeachers.filter(t => favIds.includes(t.id)));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCancelBooking(bookingId) {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      await updateBookingStatus(bookingId, 'cancelled');
      showToast('Booking cancelled.');
      loadData();
    }
  }

  async function handleToggleFav(teacherId) {
    const updated = await toggleFavorite(teacherId, user?.id);
    setFavoritesIds(updated);
    setFavoriteTeachers(prev => prev.filter(t => updated.includes(t.id)));
    showToast('Updated favorites');
  }

  if (!user) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Sign in required</h2>
        <p className="text-slate-500 text-sm mb-6">Please log in to access your student dashboard.</p>
        <button
          onClick={onOpenAuth}
          className="px-6 py-3 rounded-2xl bg-brand-600 text-white font-bold text-sm"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  const upcomingCount = bookings.filter(b => b.status === 'confirmed').length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.fullName}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-brand-100 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Welcome back, {user.fullName}!
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">
                {user.role}
              </span>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Manage your upcoming lessons, tutors, and learning goals.
            </p>
          </div>
        </div>

        <Link
          to="/teachers"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
        >
          <Search className="w-4 h-4" />
          <span>Find New Tutors</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-600 flex items-center justify-center font-bold">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{bookings.length}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Bookings
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{upcomingCount}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Confirmed Lessons
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{favoriteTeachers.length}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Saved Favorites
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 mb-6 gap-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'bookings'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          My Bookings ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'favorites'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Favorite Teachers ({favoriteTeachers.length})
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'profile'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Profile Details
        </button>
      </div>

      {/* Tab 1: Bookings List */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 mb-1">No bookings yet</h3>
              <p className="text-xs text-slate-500 mb-4">
                Explore our verified teachers and schedule your first 1-on-1 tutoring session.
              </p>
              <Link
                to="/teachers"
                className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs"
              >
                Browse Teachers
              </Link>
            </div>
          ) : (
            bookings.map(b => (
              <div
                key={b.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 text-base">
                      {b.subject} with {b.teacher_name}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        b.status === 'confirmed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : b.status === 'pending'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : b.status === 'cancelled'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 flex items-center gap-3 flex-wrap">
                    <span>📅 Date: <strong>{b.booking_date}</strong></span>
                    <span>⏰ Time: <strong>{b.time_slot}</strong> ({b.duration_minutes} mins)</span>
                    <span>Fee: <strong className="text-brand-600">Rs. {b.fee}</strong></span>
                    <span className="capitalize">Mode: <strong>{b.lesson_mode}</strong></span>
                  </div>

                  {b.student_notes && (
                    <div className="text-xs text-slate-500 italic mt-1">
                      Notes: "{b.student_notes}"
                    </div>
                  )}
                  {b.teacher_notes && (
                    <div className="text-xs text-brand-700 font-medium bg-blue-50/60 p-1.5 rounded-lg mt-1 inline-block">
                      Teacher: {b.teacher_notes}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {b.status === 'confirmed' && (
                    <a
                      href="https://meet.google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Live Video</span>
                    </a>
                  )}

                  {b.status !== 'cancelled' && b.status !== 'completed' && (
                    <button
                      onClick={() => handleCancelBooking(b.id)}
                      className="px-3 py-1.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Favorite Teachers */}
      {activeTab === 'favorites' && (
        <div>
          {favoriteTeachers.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8">
              <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 mb-1">No saved favorites</h3>
              <p className="text-xs text-slate-500 mb-4">
                Click the heart icon on any teacher card to quickly bookmark them here.
              </p>
              <Link
                to="/teachers"
                className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs"
              >
                Browse Teachers
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteTeachers.map(teacher => (
                <TeacherCard
                  key={teacher.id}
                  teacher={teacher}
                  isFavorite={true}
                  onToggleFavorite={handleToggleFav}
                  onBook={t => setSelectedTeacherForBooking(t)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Profile Details */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 max-w-xl space-y-4">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Account Profile
          </h2>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">Full Name</span>
              <div className="font-semibold text-slate-800 mt-0.5">{user.fullName}</div>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">Email</span>
              <div className="font-semibold text-slate-800 mt-0.5">{user.email}</div>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">Role</span>
              <div className="font-semibold text-brand-600 capitalize mt-0.5">{user.role}</div>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">Phone</span>
              <div className="font-semibold text-slate-800 mt-0.5">{user.phone || '+977 9841000000'}</div>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">Address</span>
              <div className="font-semibold text-slate-800 mt-0.5">{user.address || 'Kathmandu, Nepal'}</div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {selectedTeacherForBooking && (
        <BookingModal
          isOpen={Boolean(selectedTeacherForBooking)}
          onClose={() => setSelectedTeacherForBooking(null)}
          teacher={selectedTeacherForBooking}
          onSuccess={() => {
            loadData();
          }}
        />
      )}

    </div>
  );
}
