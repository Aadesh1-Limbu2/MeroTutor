# MeroTutor – Learn • Teach • Grow

A modern, full-stack educational tutoring & coaching marketplace built with **React**, **Tailwind CSS**, and **Supabase (PostgreSQL, Auth, Storage, RLS)**.

---

## 🌟 Features

- **Branded Design**: Clean, modern, trustworthy UI preserving the original MeroTutor aesthetic with soft blues, pastels, rounded squircle corners, and high-contrast typography.
- **Relational PostgreSQL Architecture**: Complete database schema with foreign keys, indexes, triggers, and Row Level Security (RLS) policies.
- **Role-Based System**: Dedicated functionality for **Students**, **Parents**, **Teachers**, and **Admins**.
- **Supabase Authentication**: Email/Password registration, Login, and Google OAuth integration.
- **Teacher Marketplace & Search**: Prominent search bar with clickable subject category pills, advanced filters (subject, price, location, mode), and live results.
- **Teacher Profiles**: Detailed views featuring qualifications, bio, subject tags, experience, weekly availability matrix, and student reviews.
- **Booking & Scheduling**: Interactive booking wizard allowing students to book lessons (online/in-person), calculate fees, and add notes.
- **Reviews & Ratings**: 1 to 5 star ratings and student feedback with automated teacher rating updates.
- **Dashboards**:
  - **Student / Parent Dashboard**: My Bookings, live video lesson links, favorite teachers, cancellation.
  - **Teacher Dashboard**: Request management (Accept/Decline/Complete), earnings summary, reviews.
  - **Admin Control Center**: Teacher application vetting, verification badges, user oversight, platform metrics.
- **In-App Notifications**: Real-time notifications for booking updates, approvals, and platform alerts.
- **Dual Engine**: Operates seamlessly with an interactive demo database out-of-the-box, and connects to live Supabase with one `.env` configuration.

---

## 🚀 Quick Start

### 1. Development Server
```bash
npm run dev
```
Visit `http://localhost:5173` in your browser.

### 2. Production Build
```bash
npm run build
```
Optimized static build output is generated in `/dist`.

### 3. Production Preview
```bash
npm run preview
```

---

## 🗄️ Database Setup (Supabase)

1. Open your Supabase project dashboard at [supabase.com](https://supabase.com).
2. Go to **SQL Editor**.
3. Open and run the migration script:
   [`supabase/migrations/20261118000000_initial_schema.sql`](./supabase/migrations/20261118000000_initial_schema.sql)
4. Add your project credentials to `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
5. Read [`DATABASE.md`](./DATABASE.md) for full ER diagrams, RLS documentation, and trigger explanations.

---

## 🎭 Demo Personas

You can instantly switch personas using the **user profile menu** in the top navigation bar:
- **Student**: `student@merotutor.com` (Aayush Maharjan)
- **Parent**: `parent@merotutor.com` (Ramesh Sharma)
- **Teacher**: `pooja.math@merotutor.com` (Pooja Sharma)
- **Admin**: `admin@merotutor.com` (Platform Admin)

---

## 🚢 Deploy to Vercel

1. Push this repository to GitHub or GitLab.
2. In Vercel, click **Add New Project** and select this repository.
3. Framework Preset: **Vite**.
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click **Deploy**.
