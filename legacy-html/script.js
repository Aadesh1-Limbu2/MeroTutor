/**
 * TutorHub – Learn • Teach • Grow
 * Interactive Client Script
 * Handles search filtering, category pill toggles, responsive nav, and toast feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation elements
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const notifBtn = document.getElementById('notif-btn');
  const profileBtn = document.getElementById('profile-btn');

  // Search & Category Filter elements
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search');
  const categoryPills = document.querySelectorAll('.cat-pill');
  const teacherCards = document.querySelectorAll('.teacher-card');
  const moreCategoriesBtn = document.getElementById('more-categories-btn');

  let activeCategory = 'all';

  // ----------------------------------------------------
  // 1. Mobile Menu Toggle
  // ----------------------------------------------------
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close mobile nav when clicking any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // ----------------------------------------------------
  // 2. Active Navigation Highlighting on Scroll
  // ----------------------------------------------------
  const sections = document.querySelectorAll('section[id], footer[id]');
  
  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // ----------------------------------------------------
  // 3. Search Bar & Category Filtering
  // ----------------------------------------------------
  function filterTeachers() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let matchCount = 0;

    teacherCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardText = card.textContent.toLowerCase();

      // Check category match
      const matchesCategory = (activeCategory === 'all') || (cardCategory === activeCategory);
      // Check query text match
      const matchesQuery = query === '' || cardText.includes(query);

      if (matchesCategory && matchesQuery) {
        card.style.display = 'flex';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Toggle clear search button
    if (clearSearchBtn) {
      clearSearchBtn.style.display = query.length > 0 ? 'inline-block' : 'none';
    }

    return matchCount;
  }

  // Live search input listener
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      filterTeachers();
    });
  }

  // Clear search input
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
        filterTeachers();
      }
    });
  }

  // Search button form submission
  window.handleSearch = function() {
    const query = searchInput ? searchInput.value.trim() : '';
    const results = filterTeachers();
    
    // Smooth scroll to the results area
    const teachersSec = document.getElementById('find-teacher');
    if (teachersSec) {
      teachersSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (query) {
      showToast(`Found ${results} teacher(s) matching "${query}"`);
    } else {
      showToast('Showing all featured tutors and coaches');
    }
  };

  // Clickable Category Pills
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cat = pill.getAttribute('data-category');

      if (cat === 'more') {
        showToast('More categories available: Music, Art, IELTS, Swimming, Chess & more!');
        return;
      }

      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = cat;

      const results = filterTeachers();
      
      const categoryNames = {
        all: 'All Subjects',
        math: 'Mathematics',
        science: 'Science & Physics',
        english: 'English & Literature',
        nepali: 'Nepali Language',
        coding: 'Coding & Development',
        football: 'Football Coaching'
      };

      const name = categoryNames[cat] || cat;
      showToast(`Filtered by ${name} (${results} found)`);

      // Scroll smoothly down to the teachers section if user clicked pill in search card
      const teachersSec = document.getElementById('find-teacher');
      if (teachersSec && window.pageYOffset < teachersSec.offsetTop - 300) {
        teachersSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Global helper for footer links
  window.filterBySubject = function(categoryKey) {
    const matchingPill = document.querySelector(`.cat-pill[data-category="${categoryKey}"]`);
    if (matchingPill) {
      matchingPill.click();
    }
  };

  // ----------------------------------------------------
  // 4. Notifications & Profile Interactions
  // ----------------------------------------------------
  if (notifBtn) {
    notifBtn.addEventListener('click', () => {
      showToast('🔔 2 new updates: Special 20% discount on first Math trial lesson!');
    });
  }

  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      showToast('👤 Signed in as Guest Student. Welcome to TutorHub!');
    });
  }

  // ----------------------------------------------------
  // 5. Toast Feedback Notification
  // ----------------------------------------------------
  let toastTimeout;
  window.showToast = function(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };
});
