import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Heart, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

export default function TeacherCard({ teacher, onBook, isFavorite, onToggleFavorite }) {
  const { user } = useAuth();
  const { showToast } = useNotifications();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-brand-300 p-6 shadow-sm hover:shadow-card hover:-translate-y-1 transition-all flex flex-col relative group">
      
      {/* Top Row: Avatar, Online Dot, Details, Favorite Heart */}
      <div className="flex items-start gap-4 mb-4">
        
        {/* Avatar with Online Indicator */}
        <div className="relative flex-shrink-0">
          <img
            src={teacher.avatar}
            alt={teacher.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 shadow-sm"
          />
          <span
            className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white"
            title="Available for bookings"
          />
        </div>

        {/* Name & Title */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap mb-1">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-brand-700 border border-blue-200/60">
              {teacher.badge || teacher.subject}
            </span>
            {teacher.is_verified && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Verified
              </span>
            )}
          </div>

          <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors truncate">
            {teacher.name}
          </h3>

          {/* Star Rating */}
          <div className="flex items-center gap-1.5 mt-1 text-xs">
            <div className="flex text-amber-400">
              {'★'.repeat(5)}
            </div>
            <span className="font-extrabold text-slate-900">{teacher.rating}</span>
            <span className="text-slate-400">({teacher.total_reviews} reviews)</span>
          </div>
        </div>

        {/* Favorite Heart Button */}
        {onToggleFavorite && (
          <button
            onClick={() => onToggleFavorite(teacher.id)}
            className={`p-2 rounded-xl transition-colors ${
              isFavorite
                ? 'bg-red-50 text-red-500'
                : 'text-slate-400 hover:text-red-500 hover:bg-slate-50'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
            aria-label="Toggle favorite"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        )}
      </div>

      {/* Bio excerpt */}
      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4 flex-1">
        {teacher.bio}
      </p>

      {/* Details Row: Location & Hourly Fee */}
      <div className="border-t border-slate-100 pt-3.5 pb-4 space-y-2 text-xs">
        <div className="flex items-center justify-between text-slate-600">
          <span className="flex items-center gap-1.5 text-slate-500 font-medium">
            <MapPin className="w-3.5 h-3.5 text-brand-600" />
            Location:
          </span>
          <span className="font-semibold text-slate-800">{teacher.location}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500 font-medium">Teaching Fee:</span>
          <span className="text-base font-extrabold text-brand-600">
            Rs. {teacher.hourly_rate}
            <span className="text-xs font-normal text-slate-400"> / hr</span>
          </span>
        </div>
      </div>

      {/* Actions: View Profile & Book */}
      <div className="grid grid-cols-2 gap-2 mt-auto">
        <Link
          to={`/teachers/${teacher.id}`}
          className="inline-flex items-center justify-center py-2 px-3 rounded-xl border border-slate-200 hover:border-brand-300 bg-slate-50 hover:bg-brand-50 text-slate-700 hover:text-brand-700 text-xs font-bold transition-all text-center"
        >
          View Profile
        </Link>
        <button
          onClick={() => (onBook ? onBook(teacher) : null)}
          className="inline-flex items-center justify-center py-2 px-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-all text-center"
        >
          Book Lesson
        </button>
      </div>

    </div>
  );
}
