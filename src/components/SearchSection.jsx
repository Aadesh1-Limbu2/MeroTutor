import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Sparkles } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

export const CATEGORIES = [
  { id: 'all', label: 'All Subjects', emoji: '🌟' },
  { id: 'math', label: 'Mathematics', emoji: '📐' },
  { id: 'science', label: 'Science', emoji: '🔬' },
  { id: 'english', label: 'English', emoji: '📖' },
  { id: 'nepali', label: 'Nepali', emoji: '🇳🇵' },
  { id: 'coding', label: 'Coding', emoji: '💻' },
  { id: 'football', label: 'Football Coach', emoji: '⚽' },
  { id: 'more', label: 'More Categories', emoji: '➕' }
];

export default function SearchSection({ initialCategory = 'all', onFilterChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const navigate = useNavigate();
  const { showToast } = useNotifications();

  function handleSubmit(e) {
    e.preventDefault();
    if (onFilterChange) {
      onFilterChange({ search: searchQuery, category: selectedCategory });
    } else {
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      if (selectedCategory !== 'all') params.set('category', selectedCategory);
      navigate(`/teachers?${params.toString()}`);
    }
  }

  function handleCategoryClick(catId) {
    if (catId === 'more') {
      showToast('More subjects available: Classical Music, Guitar, IELTS, Swimming, Chess & Accountancy!');
      navigate('/teachers');
      return;
    }

    setSelectedCategory(catId);
    if (onFilterChange) {
      onFilterChange({ search: searchQuery, category: catId });
    } else {
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      if (catId !== 'all') params.set('category', catId);
      navigate(`/teachers?${params.toString()}`);
    }
  }

  return (
    <section className="relative z-20 -mt-8 sm:-mt-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200/90 hover:shadow-hover transition-all">
        
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 text-center tracking-tight mb-5">
          Find Your Ideal Instructor
        </h2>

        {/* Prominent Search Bar Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 flex items-center bg-blue-50/50 hover:bg-blue-50/80 focus-within:bg-white border-2 border-slate-200 focus-within:border-brand-600 rounded-2xl px-4 py-1 transition-all shadow-sm">
            <Search className="w-5 h-5 text-brand-600 flex-shrink-0 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search for a teacher (e.g. Math, Coding, Football)..."
              className="w-full bg-transparent border-none text-slate-900 placeholder-slate-400 text-sm sm:text-base font-medium py-2.5 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-slate-600 p-1"
                title="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-sm hover:shadow transition-all"
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </button>
        </form>

        {/* Clickable Subject Categories */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
            Popular Categories:
          </span>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-brand-600 border border-slate-200'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
