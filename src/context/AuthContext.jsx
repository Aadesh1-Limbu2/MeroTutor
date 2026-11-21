import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabase';

const AuthContext = createContext(null);

export const DEMO_USERS = {
  student: {
    id: 'usr-student-1',
    email: 'student@merotutor.com',
    fullName: 'Aayush Maharjan',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    phone: '+977 9841234567',
    address: 'Kathmandu, Nepal'
  },
  parent: {
    id: 'usr-parent-1',
    email: 'parent@merotutor.com',
    fullName: 'Ramesh Sharma',
    role: 'parent',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    phone: '+977 9851098765',
    address: 'Lalitpur, Nepal'
  },
  teacher: {
    id: 't-1',
    email: 'pooja.math@merotutor.com',
    fullName: 'Pooja Sharma',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    phone: '+977 9812345678',
    address: 'Kathmandu, Nepal'
  },
  admin: {
    id: 'usr-admin-1',
    email: 'admin@merotutor.com',
    fullName: 'Platform Admin',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    phone: '+977 9801122334',
    address: 'Tinkune, Kathmandu, Nepal'
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('merotutor_auth_user');
      return saved ? JSON.parse(saved) : DEMO_USERS.student;
    } catch {
      return DEMO_USERS.student;
    }
  });
  const [loading, setLoading] = useState(false);

  // Sync session with Supabase if configured
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          syncSupabaseProfile(session.user);
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          syncSupabaseProfile(session.user);
        } else {
          // If signed out from Supabase, retain demo or reset
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  async function syncSupabaseProfile(authUser) {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (profile) {
        const userData = {
          id: profile.id,
          email: profile.email,
          fullName: profile.full_name,
          role: profile.role,
          avatar: profile.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
          phone: profile.phone,
          address: profile.address
        };
        setUser(userData);
        localStorage.setItem('merotutor_auth_user', JSON.stringify(userData));
      }
    } catch (e) {
      console.error('Failed to sync profile', e);
    }
  }

  // Email / Password Login
  async function login(email, password) {
    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.user) {
          await syncSupabaseProfile(data.user);
        }
        return { success: true };
      }

      // Demo login matching email prefix
      const matchKey = Object.keys(DEMO_USERS).find(k => 
        email.toLowerCase().includes(k)
      ) || 'student';

      const loggedUser = {
        ...DEMO_USERS[matchKey],
        email
      };

      setUser(loggedUser);
      localStorage.setItem('merotutor_auth_user', JSON.stringify(loggedUser));
      return { success: true, user: loggedUser };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }

  // Registration with Role
  async function register(email, password, fullName, role = 'student') {
    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role
            }
          }
        });
        if (error) throw error;
        return { success: true, user: data.user };
      }

      // Demo registration
      const newUser = {
        id: `usr-${Date.now()}`,
        email,
        fullName,
        role,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        phone: '+977 98XXXXXXXX',
        address: 'Nepal'
      };

      setUser(newUser);
      localStorage.setItem('merotutor_auth_user', JSON.stringify(newUser));
      return { success: true, user: newUser };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }

  // Google OAuth Login
  async function loginWithGoogle() {
    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin
          }
        });
        if (error) throw error;
        return { success: true, data };
      }

      // Simulated Google OAuth login
      const googleUser = {
        id: 'usr-google-1',
        email: 'learner.google@gmail.com',
        fullName: 'Google User',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        phone: '+977 9840000000',
        address: 'Kathmandu, Nepal'
      };

      setUser(googleUser);
      localStorage.setItem('merotutor_auth_user', JSON.stringify(googleUser));
      return { success: true, user: googleUser };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }

  // Logout
  async function logout() {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('merotutor_auth_user');
  }

  // Fast Role Switcher for Testing/Demo
  function switchDemoRole(role) {
    if (DEMO_USERS[role]) {
      setUser(DEMO_USERS[role]);
      localStorage.setItem('merotutor_auth_user', JSON.stringify(DEMO_USERS[role]));
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
    switchDemoRole,
    isAuthenticated: Boolean(user),
    isStudent: user?.role === 'student' || user?.role === 'parent',
    isParent: user?.role === 'parent',
    isTeacher: user?.role === 'teacher',
    isAdmin: user?.role === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
