/* SAGRADA · ficha de producto: puntos de galería (móvil) y barra de compra fija. */
(function () {
  'use strict';
  var U = window.SG_UI, $ = U.$, $$ = U.$$;
  var g = $('#gallery'), dots = $$('#gallery-dots span');
  if (g && dots.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting && e.intersectionRatio > .6) { var i = $$('#gallery > *').indexOf(e.target); dots.forEach(function (d, k) { d.classList.toggle('on', k === i); }); } }); }, { root: g, threshold: [.6] });
    $$('#gallery > *').forEach(function (s) { io.observe(s); });
  }
  var main = $('#buy-main'), bar = $('#buybar');
  if (main && bar && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { es.forEach(function (e) { bar.classList.toggle('is-on', !e.isIntersecting && e.boundingClientRect.top < 0); }); }).observe(main);
  }
})();
