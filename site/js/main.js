/* Parish Educational Consulting — interactions
   Nav drawer, scroll reveals (3-layer fallback), GSAP parallax + model line, mailto form. */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Sticky nav shade ---------- */
  var nav = document.querySelector('.nav');
  function onScrollNav() {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- Mobile drawer ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  function setDrawer(open) {
    toggle.setAttribute('aria-expanded', String(open));
    links.classList.toggle('open', open);
    document.body.classList.toggle('drawer-open', open);
  }
  toggle.addEventListener('click', function () {
    setDrawer(toggle.getAttribute('aria-expanded') !== 'true');
  });
  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) setDrawer(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setDrawer(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) setDrawer(false);
  });

  /* ---------- Scroll reveal: IO + timed fallbacks ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  function showAll(els) {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  if (reducedMotion || !('IntersectionObserver' in window)) {
    showAll(revealEls);
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px 50px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });

    // Layer 2: after 600ms, reveal anything within 2x viewport height.
    setTimeout(function () {
      revealEls.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 2) el.classList.add('in');
      });
    }, 600);

    // Layer 3: after 3s, force-reveal everything. Nothing may stay invisible.
    setTimeout(function () { showAll(revealEls); }, 3000);
  }

  /* ---------- GSAP: parallax + Impact Model progress line ---------- */
  var modelFill = document.querySelector('.model-line .fill');

  function settleModelLine() {
    if (modelFill) modelFill.style.transform = 'none';
  }

  if (!reducedMotion && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Founder portrait drift.
    document.querySelectorAll('[data-parallax]').forEach(function (el) {
      gsap.to(el, {
        yPercent: parseFloat(el.getAttribute('data-parallax')) || -6,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    // Gold line draws between Assess, Align, Accelerate.
    if (modelFill) {
      var vertical = window.matchMedia('(max-width: 860px)').matches;
      gsap.fromTo(modelFill,
        vertical ? { scaleY: 0 } : { scaleX: 0 },
        {
          scaleY: 1, scaleX: 1, ease: 'none',
          scrollTrigger: {
            trigger: '.model-track',
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: true
          }
        });
    }
  } else {
    // No GSAP (CDN blocked) or reduced motion: settle the line fully drawn.
    settleModelLine();
  }
  // Safety: whatever happens, the line may not stay empty.
  setTimeout(settleModelLine, 4000);

  /* ---------- Consultation form: mailto compose ----------
     Swap for Formspree/Netlify Forms per README (one-line change). */
  var form = document.getElementById('consult-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) {
        var el = form.querySelector('#' + id);
        return el ? el.value.trim() : '';
      };
      var subject = 'Consultation Request: ' + (v('f-district') || v('f-name'));
      var body = [
        'Name: ' + v('f-name'),
        'Role: ' + v('f-role'),
        'District / School: ' + v('f-district'),
        'Email: ' + v('f-email'),
        'Phone: ' + v('f-phone'),
        'Area of need: ' + v('f-area'),
        '',
        v('f-message')
      ].join('\n');
      window.location.href = 'mailto:parisheducationalconsultingllc@gmail.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
