/* Parish Educational Consulting — interactions
   Nav drawer, scroll reveals (3-layer fallback), GSAP parallax + model line, contact form. */
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

  /* ---------- Consultation form: POST to /api/contact ----------
     The endpoint sends the request through Resend to the practice inbox.
     Validation runs here first so the visitor sees field-level errors
     without a round trip; the server validates again regardless, since
     nothing sent from a browser can be trusted. */
  var form = document.getElementById('consult-form');
  if (form) {
    var statusEl = document.getElementById('consult-status');
    var submitBtn = document.getElementById('consult-submit');
    var btnLabel = submitBtn ? submitBtn.querySelector('.btn-label') : null;
    var FALLBACK = 'Please email parisheducationalconsultingllc@gmail.com or call (662) 822-6283.';

    var v = function (id) {
      var el = form.querySelector('#' + id);
      return el ? el.value.trim() : '';
    };

    var setFieldError = function (field, msg) {
      var input = form.querySelector('#f-' + field);
      var slot = document.getElementById('e-' + field);
      if (!input || !slot) return;
      if (msg) {
        slot.textContent = msg;
        slot.hidden = false;
        input.setAttribute('aria-invalid', 'true');
      } else {
        slot.textContent = '';
        slot.hidden = true;
        input.removeAttribute('aria-invalid');
      }
    };

    var clearErrors = function () {
      ['name', 'district', 'email'].forEach(function (f) { setFieldError(f, ''); });
    };

    var showStatus = function (msg, kind) {
      if (!statusEl) return;
      statusEl.textContent = msg;
      statusEl.className = 'form-status is-' + kind;
      statusEl.hidden = false;
    };

    var setSending = function (sending) {
      if (!submitBtn) return;
      submitBtn.disabled = sending;
      submitBtn.classList.toggle('is-sending', sending);
      if (btnLabel) btnLabel.textContent = sending ? 'Sending...' : 'Send Consultation Request';
    };

    /* Clear a field's error as soon as the visitor starts fixing it. */
    ['name', 'district', 'email'].forEach(function (f) {
      var input = form.querySelector('#f-' + f);
      if (input) input.addEventListener('input', function () { setFieldError(f, ''); });
    });

    var validate = function () {
      var errors = {};
      if (!v('f-name')) errors.name = 'Please enter your name.';
      if (!v('f-district')) errors.district = 'Please enter your district or school.';
      var email = v('f-email');
      if (!email) errors.email = 'Please enter your email address.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = 'Please enter a valid email address.';
      return errors;
    };

    var showSuccess = function (name) {
      var panel = document.createElement('div');
      panel.className = 'form-success';
      panel.setAttribute('tabindex', '-1');

      var mark = document.createElement('div');
      mark.className = 'form-success-mark';
      mark.setAttribute('aria-hidden', 'true');
      mark.textContent = '✓';

      var heading = document.createElement('h3');
      heading.textContent = 'Request sent';

      /* The whole name is used rather than a first-name split, which turns
         "Dr. Angela Reeves" into "Dr." and reads as a glitch. Set through
         textContent so a name can never inject markup here. */
      var lead = document.createElement('p');
      lead.textContent = 'Thank you' + (name ? ', ' + name : '') +
        '. Your consultation request has reached Parish Educational Consulting, ' +
        'and a copy of your details is on its way to our inbox.';

      var next = document.createElement('p');
      next.className = 'form-success-next';
      next.appendChild(document.createTextNode(
        'We reply to every request, usually within two business days. ' +
        'If your timeline is tighter than that, call '));
      var tel = document.createElement('a');
      tel.href = 'tel:+16628226283';
      tel.textContent = '(662) 822-6283';
      next.appendChild(tel);
      next.appendChild(document.createTextNode('.'));

      panel.appendChild(mark);
      panel.appendChild(heading);
      panel.appendChild(lead);
      panel.appendChild(next);

      form.hidden = true;
      form.parentNode.appendChild(panel);
      panel.focus();
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();

      var errors = validate();
      var bad = Object.keys(errors);
      if (bad.length) {
        bad.forEach(function (f) { setFieldError(f, errors[f]); });
        showStatus('Please check the highlighted fields.', 'error');
        var first = form.querySelector('#f-' + bad[0]);
        if (first) first.focus();
        return;
      }

      if (statusEl) statusEl.hidden = true;
      setSending(true);

      fetch(form.getAttribute('action'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: v('f-name'),
          role: v('f-role'),
          district: v('f-district'),
          email: v('f-email'),
          phone: v('f-phone'),
          area: v('f-area'),
          message: v('f-message'),
          website: v('f-website')
        })
      }).then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          return { ok: res.ok, data: data };
        });
      }).then(function (r) {
        if (r.ok && r.data.ok) {
          showSuccess(v('f-name'));
          return;
        }
        setSending(false);
        /* Server-side field errors win over the generic message. */
        if (r.data.fields) {
          Object.keys(r.data.fields).forEach(function (f) { setFieldError(f, r.data.fields[f]); });
        }
        showStatus((r.data.error || 'Something went wrong sending your request.') +
          (r.data.fields ? '' : ' ' + FALLBACK), 'error');
      }).catch(function () {
        setSending(false);
        showStatus('We could not reach the server. ' + FALLBACK, 'error');
      });
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
