import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TeacherCard from '../components/TeacherCard';
import BookingModal from '../components/BookingModal';
import { fetchTeachers, fetchFavorites, toggleFavorite } from '../services/store';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { Search, Filter, SlidersHorizontal, MapPin, X } from 'lucide-react';

const SUBJECT_OPTIONS = [
  { value: 'all', label: 'All Subjects' },
  { value: 'math', label: 'Mathematics' },
  { value: 'science', label: 'Science & Physics' },
  { value: 'english', label: 'English & IELTS' },
  { value: 'nepali', label: 'Nepali Language' },
  { value: 'coding', label: 'Coding / Python / IT' },
  { value: 'football', label: 'Football Coaching' },
  { value: 'music', label: 'Music & Guitar' },
  { value: 'economics', label: 'Economics & Account' }
];

export default function TeachersPage({ onOpenAuth }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { showToast } = useNotifications();

  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [maxFee, setMaxFee] = useState(1500);
  const [teachingMode, setTeachingMode] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Booking Modal State
  const [selectedTeacherForBooking, setSelectedTeacherForBooking] = useState(null);

  useEffect(() => {
    loadTeachers();
  }, [category, maxFee, teachingMode, selectedLocation]);

  async function loadTeachers() {
    setLoading(true);
    try {
      const data = await fetchTeachers({
        search: searchQuery,
        category,
        maxFee: maxFee < 1500 ? maxFee : null,
        mode: teachingMode
      });

      // Filter location client-side if needed
      const filtered = selectedLocation === 'all'
        ? data
        : data.filter(t => t.location.toLowerCase().includes(selectedLocation.toLowerCase()));

      setTeachers(filtered);

      const favs = await fetchFavorites(user?.id);
      setFavorites(favs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    loadTeachers();
  }

  async function handleToggleFavorite(teacherId) {
    const updated = await toggleFavorite(teacherId, user?.id);
    setFavorites(updated);
    showToast(
      updated.includes(teacherId)
        ? 'Added to favorites ❤️'
        : 'Removed from favorites'
    );
  }

  function handleBook(teacher) {
    if (!user) {
      onOpenAuth();
      showToast('Please sign in to book a lesson');
      return;
    }
    setSelectedTeacherForBooking(teacher);
  }

  function resetFilters() {
    setSearchQuery('');
    setCategory('all');
    setMaxFee(1500);
    setTeachingMode('all');
    setSelectedLocation('all');
    setSearchParams({});
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Explore Verified Teachers & Coaches
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-1">
          Browse verified educators across Nepal. Filter by subject, price, location, and teaching mode.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200 mb-8 space-y-4">
        
        {/* Main Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 flex items-center bg-slate-50 border border-slate-200 focus-within:border-brand-600 rounded-2xl px-4 py-1">
            <Search className="w-5 h-5 text-slate-400 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by teacher name, subject, or keywords (e.g. Calculus, Python, SEE)..."
              className="w-full bg-transparent border-none text-slate-900 text-sm font-medium py-2.5 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </form>

        {/* Filter Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-xs">
          
          {/* Subject Dropdown */}
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Subject Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold text-slate-800 bg-slate-50 focus:bg-white focus:outline-none"
            >
              {SUBJECT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Location Dropdown */}
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Location
            </label>
            <select
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold text-slate-800 bg-slate-50 focus:bg-white focus:outline-none"
            >
              <option value="all">All Locations (Nepal & Online)</option>
              <option value="Kathmandu">Kathmandu</option>
              <option value="Lalitpur">Lalitpur</option>
              <option value="Bhaktapur">Bhaktapur</option>
              <option value="Pokhara">Pokhara</option>
              <option value="Online">Online Remote Only</option>
            </select>
          </div>

          {/* Teaching Mode */}
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Teaching Mode
            </label>
            <select
              value={teachingMode}
              onChange={e => setTeachingMode(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold text-slate-800 bg-slate-50 focus:bg-white focus:outline-none"
            >
              <option value="all">All Modes (Online + In-Person)</option>
              <option value="online">Online Live Classes</option>
              <option value="in_person">In-Person / Home Tutoring</option>
            </select>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex justify-between font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              <span>Max Fee</span>
              <span className="text-brand-600 font-extrabold">Rs. {maxFee}/hr</span>
            </div>
            <input
              type="range"
              min={500}
              max={1500}
              step={50}
              value={maxFee}
              onChange={e => setMaxFee(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
          </div>

        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm font-semibold text-slate-600">
          Showing <span className="text-slate-900 font-bold">{teachers.length}</span> verified teacher(s)
        </div>

        {(category !== 'all' || searchQuery || maxFee < 1500 || selectedLocation !== 'all' || teachingMode !== 'all') && (
          <button
            onClick={resetFilters}
            className="text-xs font-bold text-brand-600 hover:text-brand-700 underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Teachers Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">Loading teachers...</div>
      ) : teachers.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-8">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">No teachers found</h3>
          <p className="text-slate-500 text-sm mb-4">
            Try adjusting your search criteria or reset filters to see all available tutors.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map(teacher => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              isFavorite={favorites.includes(teacher.id)}
              onToggleFavorite={handleToggleFavorite}
              onBook={handleBook}
            />
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {selectedTeacherForBooking && (
        <BookingModal
          isOpen={Boolean(selectedTeacherForBooking)}
          onClose={() => setSelectedTeacherForBooking(null)}
          teacher={selectedTeacherForBooking}
          onSuccess={() => {
            showToast('Booking request sent successfully!');
          }}
        />
      )}

    </div>
  );
}
