import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchNotifications, markNotificationAsRead, markAllNotificationsRead } from '../services/store';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    const data = await fetchNotifications();
    setNotifications(data);
  }

  const unreadCount = notifications.filter(n => !n.is_read).length;

  async function markAsRead(id) {
    const updated = await markNotificationAsRead(id);
    setNotifications(updated);
  }

  async function markAllRead() {
    const updated = await markAllNotificationsRead();
    setNotifications(updated);
  }

  function showToast(message, type = 'info') {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllRead,
    refreshNotifications: loadNotifications,
    showToast
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
          <div className="bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-float flex items-center gap-3 border border-slate-800 text-sm font-medium">
            <span>✨</span>
            <span>{toastMessage.message}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white text-xs ml-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
