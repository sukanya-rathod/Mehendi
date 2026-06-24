/* ========================================
   MEHENDI MARVEL - JavaScript Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== PAGE LOADER =====
  const pageLoader = document.getElementById('pageLoader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      pageLoader.classList.add('hidden');
      setTimeout(() => pageLoader.remove(), 500);
    }, 1600);
  });

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar background on scroll
    if (scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav link based on scroll position
    updateActiveNav();
  });

  // ===== BACK TO TOP =====
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== ACTIVE NAV LINK ON SCROLL =====
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  // ===== SMOOTH SCROLL FOR NAV LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        navLinks.classList.remove('active');
        navHamburger.classList.remove('active');
      }
    });
  });

  // ===== MOBILE HAMBURGER MENU =====
  const navHamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');

  navHamburger.addEventListener('click', () => {
    navHamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navHamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navHamburger.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navHamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ===== DESIGNS GALLERY FILTER =====
  const designTabs = document.querySelectorAll('.designs-tab');
  const galleryItems = document.querySelectorAll('.gallery-item');

  designTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      designTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      // Filter gallery items with animation
      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          item.style.display = '';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ===== SCROLL REVEAL ANIMATIONS =====
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // ===== BOOKING FORM SUBMISSION =====
  const bookingForm = document.getElementById('bookingForm');

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(bookingForm);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Show success message
    const submitBtn = bookingForm.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Booking Request Sent!';
    submitBtn.style.background = 'linear-gradient(135deg, #2d8a4e 0%, #48bb78 100%)';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
      bookingForm.reset();
    }, 3000);

    // Show a toast notification
    showToast('✨ Thank you! We\'ll contact you within 24 hours to confirm your booking.');
  });

  // ===== TOAST NOTIFICATION =====
  function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: linear-gradient(135deg, #1A0F0A 0%, #2C1810 100%);
      color: #fff;
      padding: 1rem 2rem;
      border-radius: 12px;
      font-family: 'Outfit', sans-serif;
      font-size: 0.95rem;
      box-shadow: 0 8px 40px rgba(0,0,0,0.3);
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.3s ease, transform 0.3s ease;
      max-width: 90%;
      text-align: center;
      border: 1px solid rgba(201, 168, 76, 0.3);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // ===== PARALLAX EFFECT ON HERO =====
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(${1 + scrolled * 0.0003}) translateY(${scrolled * 0.3}px)`;
      }
    });
  }

  // ===== SET MIN DATE FOR EVENT DATE INPUT =====
  const eventDateInput = document.getElementById('eventDate');
  if (eventDateInput) {
    const today = new Date().toISOString().split('T')[0];
    eventDateInput.setAttribute('min', today);
  }

});
