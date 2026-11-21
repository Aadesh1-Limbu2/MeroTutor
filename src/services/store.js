import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEYS = {
  TEACHERS: 'merotutor_teachers_v1',
  BOOKINGS: 'merotutor_bookings_v1',
  REVIEWS: 'merotutor_reviews_v1',
  FAVORITES: 'merotutor_favorites_v1',
  NOTIFICATIONS: 'merotutor_notifications_v1',
  PROFILES: 'merotutor_profiles_v1',
  CURRENT_USER: 'merotutor_current_user_v1'
};

// Initial Seed Teachers matching the marketplace specification
export const SEED_TEACHERS = [
  {
    id: 't-1',
    name: 'Pooja Sharma',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    title: 'Senior Mathematics & Calculus Specialist',
    subject: 'Mathematics',
    subjects: ['Mathematics', 'Calculus', 'SEE Math', '+2 Mathematics', 'Algebra'],
    category: 'math',
    badge: '📐 Mathematics Teacher',
    qualification: 'M.Sc. Mathematics, Tribhuvan University',
    experience_years: 7,
    hourly_rate: 800,
    rating: 4.9,
    total_reviews: 124,
    location: 'Kathmandu & Online',
    teaching_mode: 'both',
    approval_status: 'approved',
    is_verified: true,
    bio: 'Dedicated to making complex calculus and algebra intuitive and enjoyable for high school, SEE, and +2 students. Personalized step-by-step problem-solving methods.',
    languages: ['Nepali', 'English'],
    availability: {
      monday: ['16:00 - 18:00', '18:00 - 20:00'],
      tuesday: ['16:00 - 18:00', '18:00 - 20:00'],
      wednesday: ['16:00 - 18:00'],
      thursday: ['16:00 - 18:00', '18:00 - 20:00'],
      friday: ['16:00 - 18:00'],
      saturday: ['10:00 - 13:00', '14:00 - 17:00'],
      sunday: ['10:00 - 13:00']
    }
  },
  {
    id: 't-2',
    name: 'Dr. Arati Gautam',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    title: 'Assistant Professor & Science Mentor',
    subject: 'Science',
    subjects: ['Physics', 'General Science', 'Chemistry', 'IOE Entrance Prep'],
    category: 'science',
    badge: '🔬 Science Teacher',
    qualification: 'Ph.D. in Physics, Kathmandu University',
    experience_years: 9,
    hourly_rate: 950,
    rating: 5.0,
    total_reviews: 98,
    location: 'Lalitpur & Online',
    teaching_mode: 'both',
    approval_status: 'approved',
    is_verified: true,
    bio: 'Specialist in conceptual physics and mechanics. Helping students crack medical and engineering entrance exams through experimental demonstrations and visual notes.',
    languages: ['Nepali', 'English', 'Hindi'],
    availability: {
      monday: ['17:00 - 19:00'],
      wednesday: ['17:00 - 19:00'],
      friday: ['17:00 - 19:00'],
      saturday: ['09:00 - 12:00', '15:00 - 18:00']
    }
  },
  {
    id: 't-3',
    name: 'Coach Bikram Thapa',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    title: 'Certified Youth Football & Fitness Coach',
    subject: 'Football Coach',
    subjects: ['Football Coaching', 'Agility & Fitness', 'Tactical Drills', 'Ball Control'],
    category: 'football',
    badge: '⚽ Football Coach',
    qualification: 'ANFA / AFC "B" Licensed Coaching Certificate',
    experience_years: 6,
    hourly_rate: 850,
    rating: 4.9,
    total_reviews: 86,
    location: 'Pokhara Ground & In-Person',
    teaching_mode: 'in_person',
    approval_status: 'approved',
    is_verified: true,
    bio: 'Passionate about nurturing grassroots football talent. Focus on passing accuracy, speed, agility, discipline, match temperament, and athletic nutrition.',
    languages: ['Nepali', 'English'],
    availability: {
      tuesday: ['06:30 - 08:30', '16:30 - 18:30'],
      thursday: ['06:30 - 08:30', '16:30 - 18:30'],
      saturday: ['07:00 - 11:00'],
      sunday: ['07:00 - 11:00']
    }
  },
  {
    id: 't-4',
    name: 'David K.C.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    title: 'Senior Software Engineer & Coding Tutor',
    subject: 'Coding',
    subjects: ['Coding', 'Python', 'JavaScript', 'React', 'Data Structures & Algorithms'],
    category: 'coding',
    badge: '💻 Coding Instructor',
    qualification: 'B.E. Computer Engineering, Pulchowk Campus',
    experience_years: 6,
    hourly_rate: 1100,
    rating: 5.0,
    total_reviews: 142,
    location: 'Remote & Online Live',
    teaching_mode: 'online',
    approval_status: 'approved',
    is_verified: true,
    bio: 'Guiding beginners, high schoolers, and college students to master modern programming languages from scratch through live project building and interactive exercises.',
    languages: ['English', 'Nepali'],
    availability: {
      monday: ['18:00 - 21:00'],
      wednesday: ['18:00 - 21:00'],
      friday: ['18:00 - 21:00'],
      saturday: ['13:00 - 18:00'],
      sunday: ['13:00 - 18:00']
    }
  },
  {
    id: 't-5',
    name: 'Sunita K.C.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    title: 'English Language & IELTS Master Instructor',
    subject: 'English',
    subjects: ['English', 'IELTS Prep', 'TOEFL', 'Academic Writing', 'Spoken Fluency'],
    category: 'english',
    badge: '📖 English Instructor',
    qualification: 'M.A. English Literature, Certified IELTS Band 8.5',
    experience_years: 8,
    hourly_rate: 900,
    rating: 4.8,
    total_reviews: 73,
    location: 'Kathmandu & Online',
    teaching_mode: 'both',
    approval_status: 'approved',
    is_verified: true,
    bio: 'Dedicated English tutor with over 8 years experience helping learners conquer speech anxiety, master grammar, and score 7.5+ in IELTS.',
    languages: ['English', 'Nepali'],
    availability: {
      monday: ['15:00 - 18:00'],
      tuesday: ['15:00 - 18:00'],
      wednesday: ['15:00 - 18:00'],
      thursday: ['15:00 - 18:00']
    }
  },
  {
    id: 't-6',
    name: 'Suresh Adhikari',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    title: 'Nepali Byakaran & Sahitya Teacher',
    subject: 'Nepali',
    subjects: ['Nepali', 'Byakaran', 'SEE Nepali', '+2 Nepali Sahitya'],
    category: 'nepali',
    badge: '🇳🇵 Nepali Teacher',
    qualification: 'M.A. Nepali, Tribhuvan University',
    experience_years: 11,
    hourly_rate: 700,
    rating: 4.9,
    total_reviews: 58,
    location: 'Bhaktapur & Online',
    teaching_mode: 'both',
    approval_status: 'approved',
    is_verified: true,
    bio: 'Experienced educator passionate about teaching Nepali grammar, essay writing, and literature for school and board examinations.',
    languages: ['Nepali', 'Newari', 'English'],
    availability: {
      saturday: ['08:00 - 12:00', '14:00 - 18:00'],
      sunday: ['08:00 - 12:00']
    }
  }
];

export const SEED_REVIEWS = [
  {
    id: 'r-1',
    teacher_id: 't-1',
    student_name: 'Aayush Maharjan',
    student_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'Pooja maam made Class 12 Calculus so much easier! Her visual graph explanations were a lifesaver.',
    created_at: '2026-11-10T10:00:00Z'
  },
  {
    id: 'r-2',
    teacher_id: 't-1',
    student_name: 'Sneha Pandey',
    student_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'Patient, highly knowledgeable and always willing to solve extra mock problems. Scored A+ in SEE.',
    created_at: '2026-11-05T14:30:00Z'
  },
  {
    id: 'r-3',
    teacher_id: 't-2',
    student_name: 'Bipin Rijal',
    student_avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'Dr. Arati is phenomenal. The way she connects physics concepts to everyday life made IOE prep fun.',
    created_at: '2026-11-12T09:15:00Z'
  },
  {
    id: 'r-4',
    teacher_id: 't-4',
    student_name: 'Kritika Sharma',
    student_avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'David sir helped me build my very first React web app from scratch. Incredible coding instructor!',
    created_at: '2026-11-14T16:00:00Z'
  }
];

export const SEED_BOOKINGS = [
  {
    id: 'b-101',
    student_id: 'usr-student-1',
    student_name: 'Aayush Maharjan',
    student_email: 'aayush@example.com',
    teacher_id: 't-1',
    teacher_name: 'Pooja Sharma',
    subject: 'Mathematics',
    lesson_mode: 'online',
    booking_date: '2026-11-20',
    time_slot: '16:00 - 17:00',
    duration_minutes: 60,
    fee: 800,
    status: 'confirmed',
    student_notes: 'Need help with derivative applications and optimization problems.',
    teacher_notes: 'Meeting link sent on Zoom.',
    created_at: '2026-11-15T08:30:00Z'
  },
  {
    id: 'b-102',
    student_id: 'usr-student-1',
    student_name: 'Aayush Maharjan',
    student_email: 'aayush@example.com',
    teacher_id: 't-4',
    teacher_name: 'David K.C.',
    subject: 'Coding',
    lesson_mode: 'online',
    booking_date: '2026-11-22',
    time_slot: '18:00 - 19:00',
    duration_minutes: 60,
    fee: 1100,
    status: 'pending',
    student_notes: 'Starting Python loops and functions review.',
    teacher_notes: '',
    created_at: '2026-11-17T11:00:00Z'
  }
];

// Local Storage Helper
function getStored(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage write error', e);
  }
}

// Initialize Local Data Store if empty
export function initLocalStore() {
  if (!getStored(STORAGE_KEYS.TEACHERS, null)) {
    setStored(STORAGE_KEYS.TEACHERS, SEED_TEACHERS);
  }
  if (!getStored(STORAGE_KEYS.REVIEWS, null)) {
    setStored(STORAGE_KEYS.REVIEWS, SEED_REVIEWS);
  }
  if (!getStored(STORAGE_KEYS.BOOKINGS, null)) {
    setStored(STORAGE_KEYS.BOOKINGS, SEED_BOOKINGS);
  }
  if (!getStored(STORAGE_KEYS.FAVORITES, null)) {
    setStored(STORAGE_KEYS.FAVORITES, ['t-1', 't-4']);
  }
  if (!getStored(STORAGE_KEYS.NOTIFICATIONS, null)) {
    setStored(STORAGE_KEYS.NOTIFICATIONS, [
      {
        id: 'n-1',
        title: 'Booking Confirmed!',
        message: 'Pooja Sharma confirmed your Mathematics lesson for Nov 20 at 16:00.',
        type: 'booking',
        is_read: false,
        created_at: '2026-11-15T09:00:00Z'
      },
      {
        id: 'n-2',
        title: 'Welcome to MeroTutor',
        message: 'Explore verified tutors and coaches across Nepal or apply to teach.',
        type: 'system',
        is_read: false,
        created_at: '2026-11-14T08:00:00Z'
      }
    ]);
  }
}

// ----------------------------------------------------------------------------
// DATA ACCESS API (Transparent Supabase with Local Fallback)
// ----------------------------------------------------------------------------

export async function fetchTeachers({ search = '', category = 'all', maxFee, mode, status = 'approved' } = {}) {
  initLocalStore();

  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('teachers').select('*, profiles(*)');
      if (status) query = query.eq('approval_status', status);
      if (category && category !== 'all') {
        query = query.contains('subjects', [category]);
      }
      if (maxFee) query = query.lte('hourly_rate', maxFee);
      if (mode && mode !== 'all') query = query.eq('teaching_mode', mode);

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data.map(t => ({
          ...t,
          name: t.profiles?.full_name || t.name,
          avatar: t.profiles?.avatar_url || t.avatar
        }));
      }
    } catch (e) {
      console.warn('Supabase fetch failed, falling back to local store:', e);
    }
  }

  // Local fallback
  const allTeachers = getStored(STORAGE_KEYS.TEACHERS, SEED_TEACHERS);
  return allTeachers.filter(t => {
    if (status && t.approval_status !== status) return false;
    
    // Category match
    if (category && category !== 'all') {
      const catMatch = t.category === category || 
        t.subjects.some(s => s.toLowerCase().includes(category.toLowerCase()));
      if (!catMatch) return false;
    }

    // Search query match
    if (search.trim()) {
      const q = search.toLowerCase();
      const textMatch = 
        t.name.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q) ||
        t.subjects.some(s => s.toLowerCase().includes(q));
      if (!textMatch) return false;
    }

    // Fee match
    if (maxFee && t.hourly_rate > Number(maxFee)) return false;

    // Mode match
    if (mode && mode !== 'all' && t.teaching_mode !== 'both' && t.teaching_mode !== mode) {
      return false;
    }

    return true;
  });
}

export async function fetchTeacherById(id) {
  initLocalStore();
  const teachers = getStored(STORAGE_KEYS.TEACHERS, SEED_TEACHERS);
  return teachers.find(t => t.id === id) || null;
}

export async function submitTeacherApplication(teacherData) {
  initLocalStore();
  const teachers = getStored(STORAGE_KEYS.TEACHERS, SEED_TEACHERS);

  const newTeacher = {
    id: `t-${Date.now()}`,
    name: teacherData.name,
    avatar: teacherData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    title: teacherData.title || `${teacherData.subject} Instructor`,
    subject: teacherData.subject,
    subjects: teacherData.subjects?.length ? teacherData.subjects : [teacherData.subject],
    category: (teacherData.subject || '').toLowerCase().includes('math') ? 'math' :
              (teacherData.subject || '').toLowerCase().includes('science') ? 'science' :
              (teacherData.subject || '').toLowerCase().includes('code') ? 'coding' :
              (teacherData.subject || '').toLowerCase().includes('football') ? 'football' : 'other',
    badge: `🎓 ${teacherData.subject} Instructor`,
    qualification: teacherData.qualification,
    experience_years: Number(teacherData.experience_years) || 1,
    hourly_rate: Number(teacherData.hourly_rate) || 600,
    rating: 5.0,
    total_reviews: 0,
    location: teacherData.location || 'Kathmandu & Online',
    teaching_mode: teacherData.teaching_mode || 'both',
    approval_status: 'pending',
    is_verified: false,
    bio: teacherData.bio,
    languages: teacherData.languages || ['Nepali', 'English'],
    availability: teacherData.availability || {
      monday: ['17:00 - 19:00'],
      wednesday: ['17:00 - 19:00'],
      saturday: ['10:00 - 14:00']
    },
    created_at: new Date().toISOString()
  };

  teachers.push(newTeacher);
  setStored(STORAGE_KEYS.TEACHERS, teachers);

  // Send admin notification
  addNotification({
    title: 'New Teacher Application',
    message: `${newTeacher.name} applied to teach ${newTeacher.subject}. Review application in Admin Dashboard.`,
    type: 'approval'
  });

  return newTeacher;
}

export async function updateTeacherApproval(teacherId, status, isVerified = false) {
  initLocalStore();
  const teachers = getStored(STORAGE_KEYS.TEACHERS, SEED_TEACHERS);
  const index = teachers.findIndex(t => t.id === teacherId);
  if (index !== -1) {
    teachers[index].approval_status = status;
    if (status === 'approved') {
      teachers[index].is_verified = isVerified;
    }
    setStored(STORAGE_KEYS.TEACHERS, teachers);

    addNotification({
      title: status === 'approved' ? 'Application Approved! 🎉' : 'Application Update',
      message: status === 'approved' 
        ? 'Congratulations! Your teacher profile is now active on MeroTutor.'
        : 'Your teacher application was declined. You may update your credentials.',
      type: 'approval'
    });

    return teachers[index];
  }
  return null;
}

// Bookings
export async function fetchBookings({ role, userId } = {}) {
  initLocalStore();
  const bookings = getStored(STORAGE_KEYS.BOOKINGS, SEED_BOOKINGS);
  if (!role || role === 'admin') return bookings;
  if (role === 'teacher') return bookings.filter(b => b.teacher_id === userId || true);
  return bookings;
}

export async function createBooking(bookingData) {
  initLocalStore();
  const bookings = getStored(STORAGE_KEYS.BOOKINGS, SEED_BOOKINGS);

  const newBooking = {
    id: `b-${Date.now()}`,
    student_id: bookingData.student_id || 'usr-student-1',
    student_name: bookingData.student_name || 'Aayush Maharjan',
    student_email: bookingData.student_email || 'student@merotutor.com',
    teacher_id: bookingData.teacher_id,
    teacher_name: bookingData.teacher_name,
    subject: bookingData.subject,
    lesson_mode: bookingData.lesson_mode || 'online',
    booking_date: bookingData.booking_date,
    time_slot: bookingData.time_slot,
    duration_minutes: bookingData.duration_minutes || 60,
    fee: bookingData.fee,
    status: 'pending',
    student_notes: bookingData.student_notes || '',
    teacher_notes: '',
    created_at: new Date().toISOString()
  };

  bookings.unshift(newBooking);
  setStored(STORAGE_KEYS.BOOKINGS, bookings);

  addNotification({
    title: 'Booking Request Submitted',
    message: `Your booking request with ${newBooking.teacher_name} for ${newBooking.booking_date} is pending confirmation.`,
    type: 'booking'
  });

  return newBooking;
}

export async function updateBookingStatus(bookingId, newStatus, notes = '') {
  initLocalStore();
  const bookings = getStored(STORAGE_KEYS.BOOKINGS, SEED_BOOKINGS);
  const index = bookings.findIndex(b => b.id === bookingId);
  if (index !== -1) {
    bookings[index].status = newStatus;
    if (notes) bookings[index].teacher_notes = notes;
    setStored(STORAGE_KEYS.BOOKINGS, bookings);

    addNotification({
      title: `Booking ${newStatus.toUpperCase()}`,
      message: `Your lesson with ${bookings[index].teacher_name} is now ${newStatus}.`,
      type: 'booking'
    });

    return bookings[index];
  }
  return null;
}

// Reviews
export async function fetchReviews(teacherId) {
  initLocalStore();
  const reviews = getStored(STORAGE_KEYS.REVIEWS, SEED_REVIEWS);
  return reviews.filter(r => r.teacher_id === teacherId);
}

export async function submitReview({ teacher_id, student_name, student_avatar, rating, comment }) {
  initLocalStore();
  const reviews = getStored(STORAGE_KEYS.REVIEWS, SEED_REVIEWS);
  const newReview = {
    id: `r-${Date.now()}`,
    teacher_id,
    student_name: student_name || 'Verified Student',
    student_avatar: student_avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    rating: Number(rating) || 5,
    comment,
    created_at: new Date().toISOString()
  };

  reviews.unshift(newReview);
  setStored(STORAGE_KEYS.REVIEWS, reviews);

  // Recalculate teacher rating in store
  const teachers = getStored(STORAGE_KEYS.TEACHERS, SEED_TEACHERS);
  const tIndex = teachers.findIndex(t => t.id === teacher_id);
  if (tIndex !== -1) {
    const teacherReviews = reviews.filter(r => r.teacher_id === teacher_id);
    const avg = teacherReviews.reduce((sum, r) => sum + r.rating, 0) / teacherReviews.length;
    teachers[tIndex].rating = Number(avg.toFixed(1));
    teachers[tIndex].total_reviews = teacherReviews.length;
    setStored(STORAGE_KEYS.TEACHERS, teachers);
  }

  addNotification({
    title: 'New Review Posted',
    message: `Thank you for reviewing your lesson! Your feedback was published.`,
    type: 'review'
  });

  return newReview;
}

// Favorites
export async function fetchFavorites(studentId = 'usr-student-1') {
  initLocalStore();
  return getStored(STORAGE_KEYS.FAVORITES, ['t-1', 't-4']);
}

export async function toggleFavorite(teacherId, studentId = 'usr-student-1') {
  initLocalStore();
  const favorites = getStored(STORAGE_KEYS.FAVORITES, []);
  let updated;
  if (favorites.includes(teacherId)) {
    updated = favorites.filter(id => id !== teacherId);
  } else {
    updated = [...favorites, teacherId];
  }
  setStored(STORAGE_KEYS.FAVORITES, updated);
  return updated;
}

// Notifications
export async function fetchNotifications() {
  initLocalStore();
  return getStored(STORAGE_KEYS.NOTIFICATIONS, []);
}

export async function addNotification(notification) {
  initLocalStore();
  const list = getStored(STORAGE_KEYS.NOTIFICATIONS, []);
  const newItem = {
    id: `n-${Date.now()}`,
    title: notification.title,
    message: notification.message,
    type: notification.type || 'system',
    is_read: false,
    created_at: new Date().toISOString()
  };
  list.unshift(newItem);
  setStored(STORAGE_KEYS.NOTIFICATIONS, list);
  return newItem;
}

export async function markNotificationAsRead(id) {
  initLocalStore();
  const list = getStored(STORAGE_KEYS.NOTIFICATIONS, []);
  const updated = list.map(n => n.id === id ? { ...n, is_read: true } : n);
  setStored(STORAGE_KEYS.NOTIFICATIONS, updated);
  return updated;
}

export async function markAllNotificationsRead() {
  initLocalStore();
  const list = getStored(STORAGE_KEYS.NOTIFICATIONS, []);
  const updated = list.map(n => ({ ...n, is_read: true }));
  setStored(STORAGE_KEYS.NOTIFICATIONS, updated);
  return updated;
}

// Admin platform statistics
export async function fetchAdminStats() {
  initLocalStore();
  const teachers = getStored(STORAGE_KEYS.TEACHERS, SEED_TEACHERS);
  const bookings = getStored(STORAGE_KEYS.BOOKINGS, SEED_BOOKINGS);

  const pendingTeachers = teachers.filter(t => t.approval_status === 'pending');
  const approvedTeachers = teachers.filter(t => t.approval_status === 'approved');
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.fee || 0), 0);

  return {
    totalStudents: 1420,
    totalTeachers: teachers.length,
    approvedTeachers: approvedTeachers.length,
    pendingApplications: pendingTeachers.length,
    totalBookings: bookings.length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    totalRevenue
  };
}
