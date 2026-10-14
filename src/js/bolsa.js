/* SAGRADA · página de bolsa */
(function () {
  'use strict';
  var U = window.SG_UI, C = window.SG_CART, $ = U.$;
  var box = $('#bag-items'); if (!box) return;
  function render() {
    var ps = C.items();
    $('#bag-sub').textContent = U.money(C.subtotal());
    $('#bag-go').setAttribute('aria-disabled', ps.length ? 'false' : 'true'); if (!ps.length) $('#bag-go').removeAttribute('href'); else $('#bag-go').setAttribute('href', 'checkout.html');
    box.innerHTML = ps.length ? ps.map(function (p) {
      var th = p.virtual ? '<div class="media"><div class="iso-ph"><img src="assets/brand/isotipo/isotipo-blanco.png" alt="" width="60" height="60"></div></div>' : '<div class="media"><img src="' + p.thumb + '" alt="" width="160" height="200" style="object-position:' + p.fp + '"></div>';
      return '<div class="cart-item" style="grid-template-columns:96px 1fr auto"><a href="' + p.url + '">' + th + '</a><div><h4><a href="' + p.url + '">' + p.title + '</a></h4><p class="label muted">' + p.lineName + ' · Pieza única</p><button class="rm" type="button" data-rm="' + p.id + '">Quitar</button></div><div class="tnum">' + U.money(p.price) + '</div></div>';
    }).join('') : '<div class="cart-empty" style="justify-items:start;text-align:left"><p class="label">Tu bolsa está vacía</p><a class="btn" href="tienda.html">Ver la tienda</a></div>';
  }
  document.addEventListener('sg:cart', render); render();
})();
