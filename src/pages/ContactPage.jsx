import React, { useState } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { MapPin, Mail, Phone, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const { showToast } = useNotifications();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      showToast('Thank you! Your message has been received. Our team will contact you shortly.');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setSubmitting(false);
    }, 600);
  }

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-brand-700 border border-blue-200 mb-3">
          Get in Touch
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          We're Here to Help You Learn & Teach
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Have questions about finding a tutor, booking lessons, or joining our verified teaching faculty? Reach out anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Contact Cards */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-600 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Headquarters</h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Tinkune, Subidhanagar, Kathmandu, Nepal
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Email Support</h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                support@merotutor.com
              </p>
              <p className="text-slate-400 text-xs mt-0.5">Average response time: &lt; 2 hours</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Telephone Support</h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                +977 (01) 411-2345 / 9801122334
              </p>
              <p className="text-slate-400 text-xs mt-0.5">Sunday - Friday, 7:00 AM - 8:00 PM</p>
            </div>
          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-card">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-6">
            Send Us a Direct Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Ramesh Karki"
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="ramesh@example.com"
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Subject
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="e.g. Inquiry regarding Grade 12 Math tutoring"
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Message Details *
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="How can we assist you today? Feel free to ask about tutor verification, rates, or scheduling..."
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-600"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
