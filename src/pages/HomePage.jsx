import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SearchSection from '../components/SearchSection';
import FeatureCards from '../components/FeatureCards';
import TeacherCard from '../components/TeacherCard';
import BecomeTeacherPromo from '../components/BecomeTeacherPromo';
import BookingModal from '../components/BookingModal';
import { fetchTeachers, fetchFavorites, toggleFavorite } from '../services/store';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HomePage({ onOpenAuth }) {
  const { user } = useAuth();
  const { showToast } = useNotifications();

  const [featuredTeachers, setFeaturedTeachers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedTeacherForBooking, setSelectedTeacherForBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeatured();
  }, []);

  async function loadFeatured() {
    setLoading(true);
    try {
      const teachers = await fetchTeachers({ status: 'approved' });
      // Get the 4 main featured categories: Math, Science, Football, Coding
      const math = teachers.find(t => t.category === 'math') || teachers[0];
      const science = teachers.find(t => t.category === 'science') || teachers[1];
      const football = teachers.find(t => t.category === 'football') || teachers[2];
      const coding = teachers.find(t => t.category === 'coding') || teachers[3];

      const topFour = [math, science, football, coding].filter(Boolean);
      setFeaturedTeachers(topFour);

      const favs = await fetchFavorites(user?.id);
      setFavorites(favs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleFavorite(teacherId) {
    const updated = await toggleFavorite(teacherId, user?.id);
    setFavorites(updated);
    showToast(
      updated.includes(teacherId)
        ? 'Added teacher to favorites ❤️'
        : 'Removed teacher from favorites'
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

  return (
    <div>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Prominent Search Section */}
      <SearchSection />

      {/* 3. Platform Features (4 Pastel Cards) */}
      <FeatureCards />

      {/* 4. Featured Teachers Section + Become a Teacher Banner */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & View All Button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-brand-700 border border-blue-200 mb-2">
              Verified Mentors
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Teachers
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Meet some of our top-rated tutors and coaches.
            </p>
          </div>

          <Link
            to="/teachers"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-brand-300 text-slate-800 hover:text-brand-700 text-sm font-bold shadow-sm transition-all self-start sm:self-auto"
          >
            <span>View All Teachers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Layout: 4 Teacher Cards + Become a Teacher Promotional Sidebar Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Grid: 4 Featured Teacher Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {loading ? (
              <div className="col-span-2 py-16 text-center text-slate-400">
                Loading verified teachers...
              </div>
            ) : (
              featuredTeachers.map(teacher => (
                <TeacherCard
                  key={teacher.id}
                  teacher={teacher}
                  isFavorite={favorites.includes(teacher.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onBook={handleBook}
                />
              ))
            )}
          </div>

          {/* Right Sidebar: Become a Teacher Banner */}
          <div className="lg:col-span-4 sticky top-24">
            <BecomeTeacherPromo />
          </div>

        </div>

      </section>

      {/* Booking Modal */}
      {selectedTeacherForBooking && (
        <BookingModal
          isOpen={Boolean(selectedTeacherForBooking)}
          onClose={() => setSelectedTeacherForBooking(null)}
          teacher={selectedTeacherForBooking}
          onSuccess={() => {
            showToast('Booking submitted successfully! You can track it in your Dashboard.');
          }}
        />
      )}
    </div>
  );
}
