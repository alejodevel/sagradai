/* SAGRADA · core: cajones, buscador, revelado, toast, rieles, formularios simples. Sin dependencias. */
(function () {
  'use strict';
  var d = document, root = d.documentElement;
  root.classList.add('js');
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var fmt = new Intl.NumberFormat('es-CL');
  var money = function (n) { return '$' + fmt.format(n); };

  /* ---- Toast ---- */
  var toastEl, toastT;
  function toast(msg) {
    toastEl = toastEl || $('#toast');
    if (!toastEl) return;
    toastEl.textContent = msg; toastEl.classList.add('is-on');
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2600);
  }

  /* ---- Cajones (menú, carrito, filtros) con foco gestionado ---- */
  var scrim = $('#scrim'), openEl = null, lastFocus = null;
  var focusable = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])';
  function openDrawer(el, trigger) {
    if (!el) return;
    closeDrawers(true);
    lastFocus = trigger || d.activeElement; openEl = el;
    el.classList.add('is-open'); el.removeAttribute('inert'); if (scrim) scrim.classList.add('is-open');
    root.style.overflow = 'hidden';
    $$('[aria-controls="' + el.id + '"]').forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
    var f = $(focusable, el); if (f) setTimeout(function () { f.focus({ preventScroll: true }); }, 60);
    document.dispatchEvent(new CustomEvent('sg:drawer-open', { detail: el.id }));
  }
  function closeDrawers(silent) {
    if (!openEl) return;
    var el = openEl; openEl = null;
    el.classList.remove('is-open'); if (scrim) scrim.classList.remove('is-open');
    if (el.classList.contains('drawer') && !(el.classList.contains('drawer--filters') && window.matchMedia('(min-width:1100px)').matches)) el.setAttribute('inert', '');
    root.style.overflow = '';
    $$('[aria-controls="' + el.id + '"]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    if (!silent && lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  $$('.drawer:not(.drawer--filters)').forEach(function (el) { el.setAttribute('inert', ''); });
  d.addEventListener('click', function (e) {
    var o = e.target.closest('[data-open]');
    if (o) { e.preventDefault(); openDrawer($(o.getAttribute('data-open')), o); return; }
    if (e.target.closest('[data-close]') || e.target === scrim) { closeDrawers(); }
  });
  d.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDrawers();
    if (e.key === 'Tab' && openEl) { /* trampa de foco */
      var f = $$(focusable, openEl).filter(function (x) { return x.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  window.matchMedia('(min-width:1280px)').addEventListener('change', function (m) { if (m.matches && openEl && openEl.id === 'nav-drawer') closeDrawers(true); });

  /* ---- Revelado al hacer scroll (con failsafe: nada se queda invisible) ---- */
  var rev = $$('[data-reveal]');
  if (rev.length && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
    rev.forEach(function (el) { io.observe(el); });
    setTimeout(function () { rev.forEach(function (el) { el.classList.add('in'); }); }, 2500);
  } else { rev.forEach(function (el) { el.classList.add('in'); }); }

  /* ---- Rieles con flechas ---- */
  $$('.rail-wrap').forEach(function (w) {
    var rail = $('.rail', w), prev = $('[data-rail="prev"]', w), next = $('[data-rail="next"]', w);
    if (!rail || !prev || !next) return;
    function step() { var c = rail.children[0]; return c ? c.getBoundingClientRect().width + 24 : 300; }
    function upd() { prev.disabled = rail.scrollLeft < 8; next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8; }
    prev.addEventListener('click', function () { rail.scrollBy({ left: -step() * 2, behavior: 'smooth' }); });
    next.addEventListener('click', function () { rail.scrollBy({ left: step() * 2, behavior: 'smooth' }); });
    rail.addEventListener('scroll', function () { window.requestAnimationFrame(upd); }, { passive: true });
    window.addEventListener('resize', upd); upd();
  });

  /* ---- Formularios de prototipo (newsletter, contacto) ---- */
  $$('form[data-demo]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!f.checkValidity()) { f.reportValidity(); return; }
      var out = $('[data-demo-ok]', f.parentNode) || $('[data-demo-ok]');
      if (out) { out.hidden = false; out.focus && out.focus(); }
      f.reset();
      toast('Listo (prototipo: no se envió nada)');
    });
  });

  /* ---- Header: sombra al hacer scroll ---- */
  var hd = $('.header');
  if (hd) { var on = function () { hd.style.boxShadow = window.scrollY > 8 ? '0 6px 24px rgba(0,0,0,.05)' : 'none'; }; on(); window.addEventListener('scroll', on, { passive: true }); }

  window.SG_UI = { $: $, $$: $$, money: money, toast: toast, openDrawer: openDrawer, closeDrawers: closeDrawers };
})();
