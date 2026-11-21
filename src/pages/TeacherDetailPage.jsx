import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchTeacherById, fetchReviews, fetchFavorites, toggleFavorite } from '../services/store';
import BookingModal from '../components/BookingModal';
import ReviewModal from '../components/ReviewModal';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  GraduationCap, 
  Briefcase, 
  Languages, 
  Heart, 
  MessageSquare,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

export default function TeacherDetailPage({ onOpenAuth }) {
  const { id } = useParams();
  const { user } = useAuth();
  const { showToast } = useNotifications();

  const [teacher, setTeacher] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    setLoading(true);
    try {
      const t = await fetchTeacherById(id);
      setTeacher(t);

      const r = await fetchReviews(id);
      setReviews(r);

      const favs = await fetchFavorites(user?.id);
      setIsFavorite(favs.includes(id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleFavorite() {
    const updated = await toggleFavorite(id, user?.id);
    setIsFavorite(updated.includes(id));
    showToast(
      updated.includes(id)
        ? 'Teacher added to favorites ❤️'
        : 'Teacher removed from favorites'
    );
  }

  function handleOpenBooking() {
    if (!user) {
      onOpenAuth();
      showToast('Please sign in to book a lesson');
      return;
    }
    setBookingModalOpen(true);
  }

  function handleOpenReview() {
    if (!user) {
      onOpenAuth();
      showToast('Please sign in to write a review');
      return;
    }
    setReviewModalOpen(true);
  }

  if (loading) {
    return (
      <div className="py-24 text-center text-slate-400 max-w-7xl mx-auto px-4">
        Loading teacher profile...
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="py-24 text-center max-w-lg mx-auto px-4">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Teacher Not Found</h2>
        <p className="text-slate-500 text-sm mb-6">
          The requested educator profile might have been relocated or updated.
        </p>
        <Link
          to="/teachers"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-600 text-white font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Teacher Directory</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Back button */}
      <div className="mb-6">
        <Link
          to="/teachers"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Teachers</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 8 Cols: Teacher Detailed Information */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Profile Card Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="relative">
              <img
                src={teacher.avatar}
                alt={teacher.name}
                className="w-28 h-28 rounded-3xl object-cover ring-4 ring-brand-100 shadow-md"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-brand-700 border border-blue-200/80">
                  {teacher.badge || teacher.subject}
                </span>
                {teacher.is_verified && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/70">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Instructor
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {teacher.name}
              </h1>
              
              <div className="text-sm font-medium text-slate-600 mt-1">
                {teacher.title}
              </div>

              {/* Location & Rating */}
              <div className="flex items-center gap-4 mt-3 text-xs sm:text-sm text-slate-500 flex-wrap">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span className="font-extrabold text-slate-900">{teacher.rating}</span>
                  <span>({teacher.total_reviews} reviews)</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-brand-600" />
                  <span>{teacher.location}</span>
                </div>
                <span>•</span>
                <span className="capitalize font-semibold text-brand-700">
                  {teacher.teaching_mode === 'both' ? 'Online & In-Person' : teacher.teaching_mode}
                </span>
              </div>
            </div>
          </div>

          {/* About & Bio */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              About the Instructor
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {teacher.bio}
            </p>
          </div>

          {/* Qualifications, Experience & Languages */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-5">
              Credentials & Expertise
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-brand-700 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Qualification</div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">{teacher.qualification}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Experience</div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">{teacher.experience_years} Years Active</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
                  <Languages className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Languages</div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">{teacher.languages?.join(', ')}</div>
                </div>
              </div>
            </div>

            {/* Subjects Chips */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Subjects & Specialized Topics Taught:
              </div>
              <div className="flex flex-wrap gap-2">
                {teacher.subjects?.map(s => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                    <span>{s}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Weekly Availability Schedule Matrix */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-600" />
                <span>Weekly Availability Schedule</span>
              </h2>
              <span className="text-xs text-slate-500 font-semibold">Nepal Standard Time</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-xs text-center">
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => {
                const slots = teacher.availability?.[day];
                const hasSlots = slots && slots.length > 0;
                return (
                  <div
                    key={day}
                    className={`p-3 rounded-2xl border ${
                      hasSlots
                        ? 'bg-blue-50/70 border-blue-200 text-slate-800'
                        : 'bg-slate-50 border-slate-200/60 text-slate-400'
                    }`}
                  >
                    <div className="font-extrabold uppercase text-[10px] tracking-wider mb-1.5 text-brand-700">
                      {day.slice(0, 3)}
                    </div>
                    {hasSlots ? (
                      <div className="space-y-1">
                        {slots.map((s, idx) => (
                          <div key={idx} className="bg-white py-1 px-1 rounded-md text-[10px] font-bold text-slate-700 border border-blue-100">
                            {s}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[10px] font-medium">Off Day</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Student Reviews Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Student Reviews & Feedback
                </h2>
                <div className="text-xs text-slate-500 mt-0.5">
                  Verified reviews from completed lessons
                </div>
              </div>

              <button
                onClick={handleOpenReview}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 text-xs font-bold transition-all"
              >
                + Write a Review
              </button>
            </div>

            {reviews.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                No reviews posted yet. Be the first to review after a lesson!
              </div>
            ) : (
              <div className="space-y-4 divide-y divide-slate-100">
                {reviews.map(rev => (
                  <div key={rev.id} className="pt-4 first:pt-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.student_avatar}
                          alt={rev.student_name}
                          className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900">{rev.student_name}</div>
                          <div className="text-[10px] text-slate-400">
                            {new Date(rev.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex text-amber-400 text-xs">
                        {'★'.repeat(rev.rating)}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-12">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right 4 Cols: Sticky Booking Card */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card space-y-6">
            
            {/* Price Header */}
            <div className="flex items-baseline justify-between border-b border-slate-100 pb-5">
              <div>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Lesson Fee</span>
                <div className="text-3xl font-extrabold text-brand-600 mt-0.5">
                  Rs. {teacher.hourly_rate}
                  <span className="text-sm font-normal text-slate-500"> / hr</span>
                </div>
              </div>

              <button
                onClick={handleToggleFavorite}
                className={`p-3 rounded-2xl border transition-all ${
                  isFavorite
                    ? 'border-red-200 bg-red-50 text-red-500'
                    : 'border-slate-200 text-slate-400 hover:text-red-500 hover:bg-slate-50'
                }`}
                title="Save teacher"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500' : ''}`} />
              </button>
            </div>

            {/* Quick Feature Checklist */}
            <div className="space-y-2.5 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Verified academic background check</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Free lesson reschedule up to 12 hrs before</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Direct chat & Zoom/Google Meet links</span>
              </div>
            </div>

            {/* Book Lesson Button */}
            <button
              onClick={handleOpenBooking}
              className="w-full py-3.5 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md hover:shadow-hover hover:-translate-y-0.5 transition-all text-center block"
            >
              Book 1-on-1 Lesson Now
            </button>

            <button
              onClick={handleOpenReview}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs transition-colors"
            >
              Have you studied with this teacher? Leave a Review
            </button>

          </div>
        </div>

      </div>

      {/* Booking Modal */}
      {bookingModalOpen && (
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          teacher={teacher}
          onSuccess={() => {
            showToast('Booking submitted successfully! Track status in your Dashboard.');
          }}
        />
      )}

      {/* Review Modal */}
      {reviewModalOpen && (
        <ReviewModal
          isOpen={reviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          teacher={teacher}
          onSuccess={() => {
            loadData();
          }}
        />
      )}

    </div>
  );
}
