import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { createBooking } from '../services/store';
import { X, Calendar, Clock, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, teacher, onSuccess }) {
  const { user } = useAuth();
  const { showToast } = useNotifications();

  const [subject, setSubject] = useState(teacher?.subjects?.[0] || teacher?.subject || 'Mathematics');
  const [lessonMode, setLessonMode] = useState(teacher?.teaching_mode === 'in_person' ? 'in_person' : 'online');
  const [bookingDate, setBookingDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('16:00 - 17:00');
  const [duration, setDuration] = useState(60);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !teacher) return null;

  const totalFee = (teacher.hourly_rate * (duration / 60)).toFixed(0);

  async function handleBook(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      await createBooking({
        student_id: user?.id || 'usr-student-1',
        student_name: user?.fullName || 'Student Learner',
        student_email: user?.email || 'student@merotutor.com',
        teacher_id: teacher.id,
        teacher_name: teacher.name,
        subject,
        lesson_mode: lessonMode,
        booking_date: bookingDate,
        time_slot: timeSlot,
        duration_minutes: Number(duration),
        fee: Number(totalFee),
        student_notes: notes
      });

      showToast(`Booking request sent to ${teacher.name}! View in Dashboard.`);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      showToast('Error booking lesson: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-float border border-slate-200 relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with Teacher Mini Info */}
        <div className="flex items-center gap-4 border-b border-slate-100 pb-5 mb-5">
          <img
            src={teacher.avatar}
            alt={teacher.name}
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-200"
          />
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
              Book a Lesson
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">
              {teacher.name}
            </h2>
            <div className="text-xs text-slate-500">
              Rs. {teacher.hourly_rate} / hr • {teacher.location}
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleBook} className="space-y-4">
          
          {/* Subject Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Select Subject
            </label>
            <select
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-600"
            >
              {teacher.subjects?.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Lesson Mode */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Lesson Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setLessonMode('online')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                  lessonMode === 'online'
                    ? 'border-brand-600 bg-brand-50 text-brand-700 shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-600'
                }`}
              >
                💻 Online (Live Video)
              </button>
              <button
                type="button"
                onClick={() => setLessonMode('in_person')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                  lessonMode === 'in_person'
                    ? 'border-brand-600 bg-brand-50 text-brand-700 shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-600'
                }`}
              >
                🏠 In-Person / Home
              </button>
            </div>
          </div>

          {/* Date & Time Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Date
              </label>
              <div className="relative flex items-center">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="date"
                  required
                  value={bookingDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setBookingDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-brand-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Time Slot
              </label>
              <div className="relative flex items-center">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <select
                  value={timeSlot}
                  onChange={e => setTimeSlot(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-brand-600"
                >
                  <option value="09:00 - 10:00">09:00 - 10:00 AM</option>
                  <option value="11:00 - 12:00">11:00 - 12:00 PM</option>
                  <option value="14:00 - 15:00">02:00 - 03:00 PM</option>
                  <option value="16:00 - 17:00">04:00 - 05:00 PM</option>
                  <option value="17:00 - 18:00">05:00 - 06:00 PM</option>
                  <option value="18:00 - 19:00">06:00 - 07:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[60, 90, 120].map(mins => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setDuration(mins)}
                  className={`py-1.5 rounded-xl border text-xs font-bold transition-all ${
                    duration === mins
                      ? 'border-brand-600 bg-brand-50 text-brand-700'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                >
                  {mins} Minutes
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Learning Goals / Notes for Teacher
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. Focus on SEE mock questions, calculus fundamentals, or speaking fluency..."
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-600"
            />
          </div>

          {/* Total Fee Summary Card */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-medium">Total Lesson Fee:</span>
              <div className="text-xs text-slate-400">Pay directly after lesson confirmation</div>
            </div>
            <div className="text-right">
              <span className="text-xl font-extrabold text-brand-600">Rs. {totalFee}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-4"
          >
            {submitting ? (
              <span>Submitting Request...</span>
            ) : (
              <>
                <span>Confirm & Send Booking Request</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
