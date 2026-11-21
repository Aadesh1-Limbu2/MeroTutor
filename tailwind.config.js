/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        pastel: {
          blue: {
            bg: '#eef6ff',
            border: '#dbeafe',
            icon: '#2563eb'
          },
          green: {
            bg: '#f0fdf4',
            border: '#dcfce7',
            icon: '#10b981'
          },
          amber: {
            bg: '#fffbeb',
            border: '#fef3c7',
            icon: '#f59e0b'
          },
          purple: {
            bg: '#faf5ff',
            border: '#f3e8ff',
            icon: '#8b5cf6'
          }
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '14px',
        '3xl': '20px'
      },
      boxShadow: {
        'card': '0 4px 14px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
        'hover': '0 16px 32px -8px rgba(37, 99, 235, 0.12), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
        'float': '0 12px 28px -4px rgba(15, 23, 42, 0.12), 0 4px 10px -2px rgba(15, 23, 42, 0.06)',
      }
    },
  },
  plugins: [],
}
