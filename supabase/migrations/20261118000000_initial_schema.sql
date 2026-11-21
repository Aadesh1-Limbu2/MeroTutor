-- ============================================================================
-- MeroTutor Database Architecture & Initial Schema
-- Full Relational Schema with Roles, RLS Policies, Triggers & Seed Data
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. Profiles Table (Extends Supabase auth.users)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'parent', 'teacher', 'admin')) DEFAULT 'student',
  avatar_url TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 2. Teachers Table (1:1 with profiles where role = 'teacher')
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.teachers (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  bio TEXT NOT NULL,
  qualification TEXT NOT NULL,
  experience_years INTEGER NOT NULL DEFAULT 1 CHECK (experience_years >= 0),
  hourly_rate NUMERIC(10,2) NOT NULL DEFAULT 500 CHECK (hourly_rate >= 0),
  location TEXT NOT NULL,
  teaching_mode TEXT NOT NULL CHECK (teaching_mode IN ('online', 'in_person', 'both')) DEFAULT 'both',
  subjects TEXT[] NOT NULL DEFAULT '{}',
  languages TEXT[] NOT NULL DEFAULT '{"Nepali", "English"}',
  approval_status TEXT NOT NULL CHECK (approval_status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  is_verified BOOLEAN NOT NULL DEFAULT false,
  rating NUMERIC(3,2) NOT NULL DEFAULT 5.00 CHECK (rating >= 1.00 AND rating <= 5.00),
  total_reviews INTEGER NOT NULL DEFAULT 0 CHECK (total_reviews >= 0),
  availability JSONB NOT NULL DEFAULT '{
    "monday": ["16:00-18:00"],
    "tuesday": ["16:00-18:00"],
    "wednesday": ["16:00-18:00"],
    "thursday": ["16:00-18:00"],
    "friday": ["16:00-18:00"],
    "saturday": ["10:00-14:00"],
    "sunday": ["10:00-14:00"]
  }'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 3. Subjects Catalog Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 4. Bookings Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES public.teachers(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  lesson_mode TEXT NOT NULL CHECK (lesson_mode IN ('online', 'in_person')) DEFAULT 'online',
  booking_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  fee NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')) DEFAULT 'pending',
  student_notes TEXT,
  teacher_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 5. Reviews Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES public.teachers(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 6. Favorites Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES public.teachers(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (student_id, teacher_id)
);

-- ----------------------------------------------------------------------------
-- 7. Notifications Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('booking', 'approval', 'review', 'system')) DEFAULT 'system',
  link TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 8. Indexes for High-Performance Queries
-- ----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_teachers_approval_status ON public.teachers(approval_status);
CREATE INDEX IF NOT EXISTS idx_teachers_rating ON public.teachers(rating DESC);
CREATE INDEX IF NOT EXISTS idx_teachers_hourly_rate ON public.teachers(hourly_rate);
CREATE INDEX IF NOT EXISTS idx_teachers_location ON public.teachers(location);
CREATE INDEX IF NOT EXISTS idx_teachers_subjects ON public.teachers USING GIN(subjects);
CREATE INDEX IF NOT EXISTS idx_bookings_student_id ON public.bookings(student_id);
CREATE INDEX IF NOT EXISTS idx_bookings_teacher_id ON public.bookings(teacher_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_reviews_teacher_id ON public.reviews(teacher_id);
CREATE INDEX IF NOT EXISTS idx_favorites_student_id ON public.favorites(student_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id_unread ON public.notifications(user_id) WHERE is_read = false;

-- ----------------------------------------------------------------------------
-- 9. Automated Triggers & Functions
-- ----------------------------------------------------------------------------

-- Function: Auto-create Profile upon Supabase Auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: Call handle_new_user on auth.users insert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function: Update Teacher Rating & Total Reviews on new Review
CREATE OR REPLACE FUNCTION public.handle_review_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.teachers
  SET
    rating = (
      SELECT ROUND(COALESCE(AVG(rating), 5.0)::numeric, 2)
      FROM public.reviews
      WHERE teacher_id = NEW.teacher_id
    ),
    total_reviews = (
      SELECT COUNT(*)
      FROM public.reviews
      WHERE teacher_id = NEW.teacher_id
    ),
    updated_at = now()
  WHERE id = NEW.teacher_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_review_added ON public.reviews;
CREATE TRIGGER on_review_added
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.handle_review_stats();

-- Function: Auto update timestamp
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_teachers_updated_at
  BEFORE UPDATE ON public.teachers
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 10. Row Level Security (RLS) Policies
-- ----------------------------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Teachers Policies
CREATE POLICY "Approved teachers are viewable by everyone"
  ON public.teachers FOR SELECT
  USING (
    approval_status = 'approved'
    OR auth.uid() = id
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Teachers can insert their own application"
  ON public.teachers FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Teachers can update own profile"
  ON public.teachers FOR UPDATE
  USING (
    auth.uid() = id
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Subjects Policies
CREATE POLICY "Subjects are readable by all"
  ON public.subjects FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage subjects"
  ON public.subjects FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Bookings Policies
CREATE POLICY "Users can view their own bookings"
  ON public.bookings FOR SELECT
  USING (
    auth.uid() = student_id
    OR auth.uid() = teacher_id
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Students can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Teachers and Students can update their bookings"
  ON public.bookings FOR UPDATE
  USING (
    auth.uid() = student_id
    OR auth.uid() = teacher_id
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Reviews Policies
CREATE POLICY "Reviews are viewable by everyone"
  ON public.reviews FOR SELECT
  USING (true);

CREATE POLICY "Students can post reviews for their bookings"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = student_id);

-- Favorites Policies
CREATE POLICY "Users can view own favorites"
  ON public.favorites FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Users can add favorites"
  ON public.favorites FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Users can remove favorites"
  ON public.favorites FOR DELETE
  USING (auth.uid() = student_id);

-- Notifications Policies
CREATE POLICY "Users can view and update own notifications"
  ON public.notifications FOR ALL
  USING (auth.uid() = user_id);

-- ----------------------------------------------------------------------------
-- 11. Storage Setup Instructions (Buckets: 'avatars', 'documents')
-- ----------------------------------------------------------------------------
-- Insert buckets into storage.buckets if using Supabase Storage
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true), ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- ----------------------------------------------------------------------------
-- 12. Seed Data for Subjects & Sample Verified Teachers
-- ----------------------------------------------------------------------------
INSERT INTO public.subjects (name, slug, category, icon, description)
VALUES
  ('Mathematics', 'mathematics', 'Academics', '📐', 'Algebra, Geometry, Calculus, Statistics, SEE and +2 Math'),
  ('Physics & Science', 'science', 'Academics', '🔬', 'General Science, Physics, Chemistry, Biology & Laboratory'),
  ('English & IELTS', 'english', 'Languages', '📖', 'Grammar, Spoken Fluency, Literature, IELTS & TOEFL Prep'),
  ('Nepali Language', 'nepali', 'Languages', '🇳🇵', 'Nepali Byakaran, Sahitya, Reading & Writing for all levels'),
  ('Coding & IT', 'coding', 'Technology', '💻', 'Python, JavaScript, Web Development, Algorithms & Scratch for kids'),
  ('Football Coaching', 'football', 'Sports', '⚽', 'Physical fitness, ball control, tactics, youth training & drills'),
  ('Music & Guitar', 'music', 'Arts', '🎸', 'Guitar, Keyboard, Classical Nepali Vocal & Music Theory'),
  ('Economics & Account', 'economics', 'Commerce', '📊', 'High school & college Accounting, Business Studies & Economics')
ON CONFLICT (name) DO NOTHING;
