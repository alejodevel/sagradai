/* SAGRADA · carrito (localStorage), cajón de bolsa y buscador. Cada pieza es única: cantidad siempre 1. */
(function () {
  'use strict';
  var U = window.SG_UI, DATA = window.SG_DATA || { products: [] }, KEY = 'sagrada-bolsa-v1';
  var $ = U.$, $$ = U.$$;
  function load() { try { var a = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
  function save(a) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} }
  var items = load().filter(function (id) { return find(id) && !find(id).sold; });
  function find(id) { return DATA.products.filter(function (p) { return p.id === id; })[0]; }
  function list() { return items.map(find).filter(Boolean); }

  function render() {
    var ps = list(), body = $('#cart-body'), foot = $('#cart-foot'), cnt = $$('[data-cart-count]');
    cnt.forEach(function (c) { c.textContent = ps.length; c.hidden = !ps.length; });
    $$('[data-add]').forEach(function (b) {
      var inBag = items.indexOf(b.getAttribute('data-add')) > -1;
      if (b.hasAttribute('data-keep')) return;
      b.setAttribute('aria-pressed', inBag);
    });
    if (!body) return;
    if (!ps.length) {
      body.innerHTML = '<div class="cart-empty"><p class="label">Tu bolsa está vacía</p><p class="muted">Cada pieza es única. Si te enamoras de una, no la dejes pasar.</p><a class="btn" href="tienda.html">Ver la tienda</a></div>';
      if (foot) foot.hidden = true; return;
    }
    body.innerHTML = ps.map(function (p) {
      var thumb = p.virtual ? '<div class="media"><div class="iso-ph"><img src="assets/brand/isotipo/isotipo-blanco.png" alt="" width="60" height="60"></div></div>'
        : '<div class="media"><img src="' + p.thumb + '" alt="" width="160" height="200" style="object-position:' + p.fp + '"></div>';
      return '<div class="cart-item"><a href="' + p.url + '">' + thumb + '</a><div><h4><a href="' + p.url + '">' + p.title + '</a></h4><p class="label muted">' + p.lineName + '</p>' +
        '<button class="rm" data-rm="' + p.id + '" type="button">Quitar</button></div><div class="tnum">' + U.money(p.price) + '</div></div>';
    }).join('');
    var sub = ps.reduce(function (s, p) { return s + p.price; }, 0);
    $('#cart-sub').textContent = U.money(sub);
    if (foot) foot.hidden = false;
  }
  function add(id, open) {
    var p = find(id); if (!p || p.sold) return;
    if (items.indexOf(id) > -1) { U.toast('Esta pieza ya está en tu bolsa'); if (open) U.openDrawer($('#cart-drawer')); return; }
    items.push(id); save(items); render();
    if (open) U.openDrawer($('#cart-drawer')); else U.toast('Agregada a tu bolsa');
  }
  function remove(id) { items = items.filter(function (x) { return x !== id; }); save(items); render(); }
  function clear() { items = []; save(items); render(); }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-add]');
    if (a) { e.preventDefault(); add(a.getAttribute('data-add'), a.hasAttribute('data-open-cart')); return; }
    var r = e.target.closest('[data-rm]'); if (r) { remove(r.getAttribute('data-rm')); document.dispatchEvent(new Event('sg:cart')); }
  });
  window.SG_CART = { items: list, add: add, remove: remove, clear: clear, subtotal: function () { return list().reduce(function (s, p) { return s + p.price; }, 0); } };
  window.addEventListener('storage', function () { items = load(); render(); document.dispatchEvent(new Event('sg:cart')); });
  render();

  /* ---- Buscador ---- */
  var sp = $('#search'), si = $('#search-input'), sr = $('#search-res');
  if (sp && si && sr) {
    document.addEventListener('sg:drawer-open', function () {});
    $$('[data-search-open]').forEach(function (b) { b.addEventListener('click', function () { sp.classList.add('is-open'); sp.removeAttribute('inert'); setTimeout(function () { si.focus(); }, 80); }); });
    var close = function () { sp.classList.remove('is-open'); sp.setAttribute('inert', ''); };
    sp.setAttribute('inert', '');
    $$('[data-search-close]').forEach(function (b) { b.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    var norm = function (s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); };
    si.addEventListener('input', function () {
      var q = norm(si.value.trim()); if (q.length < 2) { sr.innerHTML = ''; return; }
      var r = DATA.products.filter(function (p) { return norm(p.title + ' ' + p.lineName + ' ' + p.catName).indexOf(q) > -1; }).slice(0, 8);
      sr.innerHTML = r.length ? r.map(function (p) {
        return '<a href="' + p.url + '"><span class="media" style="--ar:4/5">' + (p.virtual ? '<span class="iso-ph"><img src="assets/brand/isotipo/isotipo-blanco.png" alt="" width="40" height="40"></span>' : '<img src="' + p.thumb + '" alt="" width="56" height="70" style="object-position:' + p.fp + '">') + '</span><span>' + p.title + '<br><span class="label muted">' + p.lineName + (p.sold ? ' · Ya tiene dueña' : '') + '</span></span><span class="tnum">' + U.money(p.price) + '</span></a>';
      }).join('') : '<p class="muted">No encontramos nada con ese nombre. Prueba con "abrigo", "cuero" o "vestido".</p>';
    });
  }
})();
