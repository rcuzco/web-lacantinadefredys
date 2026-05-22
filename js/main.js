/* ============================================================
   La Cantina de Fredy's — Main JavaScript
   Depends on: GSAP + ScrollTrigger (loaded before this file)
============================================================ */

/* ============================================================
   CONFIGURACIÓN DEL RESTAURANTE
   Edita solo este bloque para actualizar los datos de contacto
============================================================ */
const RESTAURANT = {
  name:         "La Cantina de Fredy's",
  phone:        "+34911887741",
  phoneDisplay: "+34 911 887 741",
  whatsappNum:  "34911887741",
  whatsappMsg:  "Hola, me gustaría hacer una consulta sobre La Cantina de Fredy's.",
  // TODO: Actualizar dirección real
  address:      "Dirección pendiente de confirmar, Madrid, España",
  // TODO: Actualizar URL de Google Maps real
  mapsUrl:      "https://maps.google.com/?q=La+Cantina+de+Fredys"
};

/* ============================================================
   APLICAR DATOS DE CONTACTO A TODOS LOS ELEMENTOS
============================================================ */
(function applyContactData() {
  const waUrl = `https://wa.me/${RESTAURANT.whatsappNum}?text=${encodeURIComponent(RESTAURANT.whatsappMsg)}`;

  // WhatsApp links
  const waIds = ['wa-link', 'hero-wa', 'menu-wa', 'mobile-wa', 'footer-wa', 'header-wa', 'wa-float'];
  waIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = waUrl;
  });

  // Maps links
  ['maps-btn', 'maps-btn-2'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = RESTAURANT.mapsUrl;
  });

  // Phone
  const phoneLink = document.getElementById('phone-link');
  if (phoneLink) {
    phoneLink.href = `tel:${RESTAURANT.phone}`;
    phoneLink.textContent = RESTAURANT.phoneDisplay;
  }
  const footerPhone = document.getElementById('footer-phone');
  if (footerPhone) {
    footerPhone.href = `tel:${RESTAURANT.phone}`;
    footerPhone.textContent = RESTAURANT.phoneDisplay;
  }

  // Address display
  const addrEl = document.getElementById('address-display');
  if (addrEl) addrEl.textContent = RESTAURANT.address;

  // Copyright year
  const yearEl = document.getElementById('copy-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

/* ============================================================
   TEMA CLARO / OSCURO
============================================================ */
(function initTheme() {
  const toggle   = document.getElementById('btn-theme');
  const icon     = document.getElementById('theme-icon');
  const label    = document.getElementById('theme-label');
  const root     = document.documentElement;
  const PREF_KEY = 'cantina-theme';

  const getSystemTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      icon.className    = 'fa-solid fa-sun';
      label.textContent = 'Modo claro';
    } else {
      icon.className    = 'fa-solid fa-moon';
      label.textContent = 'Modo oscuro';
    }
  }

  const saved = localStorage.getItem(PREF_KEY);
  applyTheme(saved || getSystemTheme());

  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(PREF_KEY, next);
  });
})();

/* ============================================================
   MENÚ HAMBURGUESA
============================================================ */
(function initHamburger() {
  const btn     = document.getElementById('hamburger');
  const overlay = document.getElementById('nav-mobile');

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    overlay.classList.toggle('open', !expanded);
    document.body.style.overflow = !expanded ? 'hidden' : '';
  });

  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      btn.setAttribute('aria-expanded', 'false');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Cerrar con ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      btn.setAttribute('aria-expanded', 'false');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      btn.focus();
    }
  });
})();

/* ============================================================
   HEADER SCROLL STATE
============================================================ */
(function initHeaderScroll() {
  const header   = document.getElementById('header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 80);
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ============================================================
   ACTIVE NAV LINK
============================================================ */
(function initActiveNav() {
  const links    = document.querySelectorAll('.nav-desktop a[href^="#"]');
  const sections = document.querySelectorAll('main section[id]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
})();

/* ============================================================
   HORARIO — RESALTAR DÍA ACTUAL
============================================================ */
(function highlightToday() {
  const today = new Date().getDay();
  const cards  = document.querySelectorAll('.horario-card[data-day]');
  cards.forEach(card => {
    if (parseInt(card.dataset.day) === today) {
      card.classList.add('today');
      const badge = document.createElement('span');
      badge.className = 'horario-badge';
      badge.textContent = 'Hoy';
      badge.setAttribute('aria-label', 'Horario de hoy');
      card.appendChild(badge);
    }
  });
})();

/* ============================================================
   GSAP ANIMATIONS
============================================================ */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

(function initAnimations() {
  if (prefersReducedMotion) {
    // Show everything without animation
    document.querySelectorAll('.gsap-fade, .dish-card').forEach(el => {
      el.style.opacity   = '1';
      el.style.transform = 'none';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ── Hero entrance ──
  const heroTl = gsap.timeline({ delay: 0.2 });
  heroTl
    .fromTo('.hero-logo',     { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9,  ease: 'power3.out' })
    .fromTo('.hero-badge',    { y: 16,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.7,  ease: 'power2.out' }, '-=0.5')
    .fromTo('.hero-title',    { y: 32,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out' }, '-=0.5')
    .fromTo('.hero-subtitle', { y: 20,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.7,  ease: 'power2.out' }, '-=0.5')
    .fromTo('.hero-actions',  { y: 18,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.7,  ease: 'power2.out' }, '-=0.4');

  // ── Hero parallax ──
  gsap.to('.hero-content', {
    y: 80,
    scrollTrigger: {
      trigger: '.hero',
      start:   'top top',
      end:     'bottom top',
      scrub:   true
    }
  });

  // ── Generic gsap-fade reveals ──
  gsap.utils.toArray('.gsap-fade').forEach(el => {
    gsap.fromTo(el,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger:       el,
          start:         'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // ── Dish cards staggered ──
  gsap.utils.toArray('.dish-card').forEach((card, i) => {
    gsap.to(card, {
      y: 0, opacity: 1,
      duration: 0.7,
      ease: 'power3.out',
      delay: (i % 4) * 0.08,
      scrollTrigger: {
        trigger:       card,
        start:         'top 92%',
        toggleActions: 'play none none none'
      }
    });
  });

  // ── Gallery items ──
  gsap.utils.toArray('.gi').forEach((item, i) => {
    gsap.fromTo(item,
      { scale: 0.94, opacity: 0 },
      {
        scale: 1, opacity: 1,
        duration: 0.65,
        ease: 'power2.out',
        delay: (i % 4) * 0.07,
        scrollTrigger: {
          trigger:       item,
          start:         'top 92%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // ── Price card pop ──
  gsap.fromTo('.dia-price-card',
    { scale: 0.88, opacity: 0 },
    {
      scale: 1, opacity: 1,
      duration: 0.75,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger:       '.dia-price-card',
        start:         'top 88%',
        toggleActions: 'play none none none'
      }
    }
  );

  // ── Horario cards stagger ──
  gsap.utils.toArray('.horario-card').forEach((card, i) => {
    gsap.fromTo(card,
      { y: 24, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.55,
        ease: 'power2.out',
        delay: i * 0.06,
        scrollTrigger: {
          trigger:       card,
          start:         'top 92%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
})();

/* ============================================================
   LIGHTBOX
============================================================ */
(function initLightbox() {
  const lb        = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');
  const lbCounter = document.getElementById('lb-counter');
  const btnClose  = document.getElementById('lb-close');
  const btnPrev   = document.getElementById('lb-prev');
  const btnNext   = document.getElementById('lb-next');

  // Collect all gallery images in document order
  const imgs = Array.from(
    document.querySelectorAll('.gi img, .strip-item img')
  );

  let current = 0;

  function open(index) {
    current = index;
    lbImg.src = imgs[current].src;
    lbImg.alt = imgs[current].alt;
    lbCaption.textContent = imgs[current].alt;
    lbCounter.textContent = `${current + 1} / ${imgs.length}`;
    lb.classList.add('open');
    lb.focus();
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    lbImg.classList.add('fade');
    setTimeout(() => {
      current = (current + dir + imgs.length) % imgs.length;
      lbImg.src = imgs[current].src;
      lbImg.alt = imgs[current].alt;
      lbCaption.textContent = imgs[current].alt;
      lbCounter.textContent = `${current + 1} / ${imgs.length}`;
      lbImg.classList.remove('fade');
    }, 180);
  }

  // Open on image click
  imgs.forEach((img, i) => {
    img.parentElement.addEventListener('click', () => open(i));
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', () => navigate(-1));
  btnNext.addEventListener('click', () => navigate(1));

  // Close on backdrop click
  lb.addEventListener('click', e => {
    if (e.target === lb) close();
  });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  // Touch swipe
  let touchStartX = 0;
  lb.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1);
  });
})();
