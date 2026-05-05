/* ======================================================
   PROMPTS — Global Site Scripts
   Works across all 5 pages: index, about, portfolio,
   prompts-repo, contact
   ====================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Typewriter Effect ────────────────────────────────
     Only runs on the homepage (index.html) where the
     #hero-title element exists.
  ──────────────────────────────────────────────────────── */
  const titleEl = document.getElementById('hero-title');
  const subtitleEl = document.getElementById('hero-subtitle');
  const cursorEl = document.getElementById('cursor');

  if (titleEl && subtitleEl && cursorEl) {
    const titleText = 'Prompts';
    const subtitleText = 'Post Production House / AI-studio';

    const TYPING_SPEED = 90;   // ms per character
    const PAUSE_BETWEEN = 500;  // pause between title & subtitle

    let charIndex = 0;
    let phase = 'title'; // 'title' | 'subtitle'

    function type() {
      if (phase === 'title') {
        if (charIndex < titleText.length) {
          titleEl.textContent += titleText[charIndex];
          charIndex++;
          setTimeout(type, TYPING_SPEED);
        } else {
          // Title done → pause then start subtitle
          charIndex = 0;
          phase = 'subtitle';
          // Move cursor size to match subtitle
          cursorEl.style.fontSize = 'clamp(1.2rem, 2.2vw, 1.65rem)';
          setTimeout(type, PAUSE_BETWEEN);
        }
      } else if (phase === 'subtitle') {
        if (charIndex < subtitleText.length) {
          subtitleEl.textContent += subtitleText[charIndex];
          charIndex++;
          setTimeout(type, TYPING_SPEED + 15); // slightly slower for subtitle
        }
        // After subtitle finishes the cursor keeps blinking via CSS
      }
    }

    // Kick off the typewriter after a brief initial delay
    setTimeout(type, 600);
  }


  /* ── Scroll Reveal (IntersectionObserver) ────────────── */
  const revealEls = document.querySelectorAll('.reveal-on-scroll');

  if (revealEls.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target); // only once
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => revealObserver.observe(el));
  }


  /* ── Header Scroll Shadow ────────────────────────────── */
  const header = document.getElementById('site-header');

  if (header) {
    function onScroll() {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial check
  }


  /* ── Mobile Nav Toggle ───────────────────────────────── */
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const navOverlay = document.getElementById('nav-overlay');

  if (navToggle && mainNav) {
    function openNav() {
      navToggle.classList.add('open');
      mainNav.classList.add('open');
      if (navOverlay) navOverlay.classList.add('open');
      document.body.style.overflow = 'hidden'; // prevent background scroll
    }

    function closeNav() {
      navToggle.classList.remove('open');
      mainNav.classList.remove('open');
      if (navOverlay) navOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', () => {
      if (mainNav.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close nav when overlay is clicked
    if (navOverlay) {
      navOverlay.addEventListener('click', closeNav);
    }

    // Close nav when a link is clicked
    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeNav);
    });

    // Close nav on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) {
        closeNav();
      }
    });
  }


  /* ── Contact Form Handler ────────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simulate submission
      const submitBtn = contactForm.querySelector('[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1200);
    });
  }

});
