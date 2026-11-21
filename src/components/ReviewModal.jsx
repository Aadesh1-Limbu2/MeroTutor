import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { submitReview } from '../services/store';
import { X, Star, ArrowRight } from 'lucide-react';

export default function ReviewModal({ isOpen, onClose, teacher, onSuccess }) {
  const { user } = useAuth();
  const { showToast } = useNotifications();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !teacher) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) {
      showToast('Please provide a comment for your review');
      return;
    }

    setSubmitting(true);
    try {
      await submitReview({
        teacher_id: teacher.id,
        student_name: user?.fullName || 'Verified Learner',
        student_avatar: user?.avatar,
        rating,
        comment
      });

      showToast(`Thank you for reviewing ${teacher.name}!`);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      showToast('Error submitting review: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-float border border-slate-200 relative animate-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <img
            src={teacher.avatar}
            alt={teacher.name}
            className="w-16 h-16 rounded-2xl object-cover mx-auto mb-3 ring-2 ring-brand-200"
          />
          <h2 className="text-xl font-extrabold text-slate-900">
            Review {teacher.name}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Share your learning experience to help other students
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Star Rating Picker */}
          <div className="text-center">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Your Rating
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-7 h-7 ${
                      (hoverRating || rating) >= star
                        ? 'fill-amber-400 text-amber-500'
                        : 'text-slate-200'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-slate-600 mt-1 inline-block">
              {rating === 5 ? 'Excellent (5.0)' :
               rating === 4 ? 'Very Good (4.0)' :
               rating === 3 ? 'Average (3.0)' :
               rating === 2 ? 'Below Average (2.0)' : 'Poor (1.0)'}
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Review Comments
            </label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="What did you like about the teaching style, clarity of concepts, punctuality, and materials provided?"
              className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-4"
          >
            {submitting ? 'Submitting...' : 'Post Review'}
          </button>
        </form>

      </div>
    </div>
  );
}
