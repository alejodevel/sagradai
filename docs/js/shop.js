/* SAGRADA · filtros y orden de la tienda (mejora progresiva: sin JS se ve todo el catálogo). */
(function () {
  'use strict';
  var U = window.SG_UI, $ = U.$, $$ = U.$$;
  var grid = $('#grid'); if (!grid) return;
  var cards = $$('.grid > [data-cat]'), count = $('#count'), empty = $('#shop-empty'), sort = $('#sort');
  var state = { cats: [], hideSold: false, price: '' };
  function inPrice(p, r) { if (!r) return true; var a = r.split('-'); return p >= +a[0] && (a[1] === '' || p <= +a[1]); }
  function apply() {
    var shown = 0;
    cards.forEach(function (c) {
      var ok = (!state.cats.length || state.cats.indexOf(c.dataset.cat) > -1) && (!state.hideSold || c.dataset.sold !== '1') && inPrice(+c.dataset.price, state.price);
      c.hidden = !ok; if (ok) shown++;
    });
    count.textContent = shown + (shown === 1 ? ' pieza' : ' piezas');
    empty.classList.toggle('is-on', shown === 0);
    $$('[data-cat-chip]').forEach(function (b) { var on = b.dataset.catChip === '' ? !state.cats.length : state.cats.indexOf(b.dataset.catChip) > -1; b.setAttribute('aria-pressed', on); });
    $$('input[name="cat"]').forEach(function (i) { i.checked = state.cats.indexOf(i.value) > -1; });
  }
  function order() {
    var v = sort.value, arr = cards.slice();
    var by = { new: function (a, b) { return a.dataset.order - b.dataset.order; }, 'price-asc': function (a, b) { return a.dataset.price - b.dataset.price; }, 'price-desc': function (a, b) { return b.dataset.price - a.dataset.price; } }[v];
    arr.sort(function (a, b) { // las ya adoptadas siempre al final
      if (a.dataset.sold !== b.dataset.sold) return a.dataset.sold === '1' ? 1 : -1; return by(a, b);
    }).forEach(function (c) { grid.appendChild(c); });
  }
  $$('[data-cat-chip]').forEach(function (b) { b.addEventListener('click', function () { var v = b.dataset.catChip; state.cats = v ? (state.cats[0] === v ? [] : [v]) : []; apply(); }); });
  $$('input[name="cat"]').forEach(function (i) { i.addEventListener('change', function () { state.cats = $$('input[name="cat"]:checked').map(function (x) { return x.value; }); apply(); }); });
  var hs = $('#hide-sold'); if (hs) hs.addEventListener('change', function () { state.hideSold = hs.checked; apply(); });
  $$('input[name="price"]').forEach(function (i) { i.addEventListener('change', function () { state.price = i.value; apply(); }); });
  sort.addEventListener('change', order);
  $$('[data-reset]').forEach(function (b) { b.addEventListener('click', function () { state = { cats: [], hideSold: false, price: '' }; if (hs) hs.checked = false; var all = $('input[name="price"][value=""]'); if (all) all.checked = true; apply(); }); });
  var q = new URLSearchParams(location.search).get('cat'); if (q) state.cats = [q];
  /* Filtros: cajón en móvil, panel fijo en escritorio */
  var fd = $('#filters'), mq = window.matchMedia('(min-width:1100px)');
  function sync() { if (!fd) return; if (mq.matches) { fd.removeAttribute('inert'); fd.removeAttribute('role'); fd.removeAttribute('aria-modal'); } else { fd.setAttribute('role', 'dialog'); fd.setAttribute('aria-modal', 'true'); if (!fd.classList.contains('is-open')) fd.setAttribute('inert', ''); } }
  mq.addEventListener('change', sync); sync();
  order(); apply();
})();
