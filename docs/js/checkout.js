/* SAGRADA · checkout de prototipo: resumen desde la bolsa, validación de RUT (módulo 11), envío fijo y simulación de pago con Flow. */
(function () {
  'use strict';
  var U = window.SG_UI, C = window.SG_CART, $ = U.$, $$ = U.$$;
  var form = $('#co-form'); if (!form) return;

  /* ---- RUT chileno ---- */
  function cleanRut(v) { return (v || '').replace(/[^0-9kK]/g, '').toUpperCase(); }
  function fmtRut(v) { v = cleanRut(v); if (v.length < 2) return v; var b = v.slice(0, -1), dv = v.slice(-1); return b.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + dv; }
  function validRut(v) {
    v = cleanRut(v); if (v.length < 8) return false;
    var body = v.slice(0, -1), dv = v.slice(-1), s = 0, m = 2;
    for (var i = body.length - 1; i >= 0; i--) { s += +body[i] * m; m = m === 7 ? 2 : m + 1; }
    var r = 11 - (s % 11), exp = r === 11 ? '0' : r === 10 ? 'K' : String(r);
    return exp === dv;
  }
  var rut = $('#rut'); rut.addEventListener('input', function () { var p = rut.selectionStart; rut.value = fmtRut(rut.value); });

  /* ---- Resumen y envío ---- */
  var SHIP = { rm: 4990, regiones: 6990, retiro: 0 };
  function items() { return C.items(); }
  function onlyVirtual() { var it = items(); return it.length && it.every(function (p) { return p.virtual; }); }
  function shipCost() { if (onlyVirtual()) return 0; var r = form.elements.envio ? form.elements.envio.value : 'regiones'; return SHIP[r] || 0; }
  function render() {
    var it = items(), box = $('#co-items'), sub = it.reduce(function (s, p) { return s + p.price; }, 0), ship = shipCost();
    if (!it.length) { box.innerHTML = '<p class="muted">Tu bolsa está vacía. <a class="link" href="tienda.html">Volver a la tienda</a>.</p>'; $('#co-pay').disabled = true; }
    else { $('#co-pay').disabled = false; box.innerHTML = it.map(function (p) { return '<div class="cart-item"><div class="media">' + (p.virtual ? '<div class="iso-ph"><img src="assets/brand/isotipo/isotipo-blanco.svg" alt="" width="60" height="60"></div>' : '<img src="' + p.thumb + '" alt="" width="160" height="200" style="object-position:' + p.fp + '">') + '</div><div><h4>' + p.title + '</h4><p class="label muted">' + p.lineName + '</p></div><div class="tnum">' + U.money(p.price) + '</div></div>'; }).join(''); }
    var v = onlyVirtual();
    $('#ship-block').hidden = v; $('#virtual-note').hidden = !v;
    $('#co-sub').textContent = U.money(sub); $('#co-ship').textContent = v ? 'No aplica' : (ship ? U.money(ship) : 'Gratis'); $('#co-total').textContent = U.money(sub + ship);
    $$('.radio-card [data-price]').forEach(function (b) { b.textContent = SHIP[b.getAttribute('data-price')] ? U.money(SHIP[b.getAttribute('data-price')]) : 'Gratis'; });
  }
  document.addEventListener('sg:cart', render); form.addEventListener('change', render); render();

  /* ---- Validación accesible ---- */
  function bad(input, on) { var f = input.closest('.field'); if (f) f.classList.toggle('is-bad', on); input.setAttribute('aria-invalid', on ? 'true' : 'false'); }
  form.addEventListener('submit', function (e) {
    e.preventDefault(); var first = null;
    $$('input[required],select[required]', form).forEach(function (i) {
      if (i.closest('[hidden]')) { bad(i, false); return; }
      var ok = i.value.trim() !== '' && (i.type !== 'email' || /^\S+@\S+\.\S+$/.test(i.value)) && (i.id !== 'rut' || validRut(i.value));
      bad(i, !ok); if (!ok && !first) first = i;
    });
    var terms = $('#terms'); if (!terms.checked) { terms.closest('.check').style.outline = '2px solid #b80b0c'; if (!first) first = terms; } else terms.closest('.check').style.outline = '';
    if (first) { first.focus(); first.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
    if (!items().length) return;
    var order = { n: 'SG-' + Math.floor(100000 + Math.random() * 900000), total: $('#co-total').textContent, items: items().map(function (p) { return p.title; }), email: form.elements.email.value, virtual: onlyVirtual() };
    try { sessionStorage.setItem('sagrada-pedido', JSON.stringify(order)); } catch (er) {}
    C.clear(); location.href = 'gracias.html';
  });
  $$('input,select', form).forEach(function (i) { i.addEventListener('blur', function () { if (i.hasAttribute('required') && !i.closest('[hidden]')) { var ok = i.value.trim() !== '' && (i.id !== 'rut' || validRut(i.value)); bad(i, !ok); } }); });
})();
