/* SAGRADA · confirmación de pedido (lee el pedido simulado) */
(function () {
  'use strict';
  var o; try { o = JSON.parse(sessionStorage.getItem('sagrada-pedido') || 'null'); } catch (e) {}
  var box = document.getElementById('t-box'); if (!o || !box) return;
  box.hidden = false;
  box.innerHTML = '<div style="display:flex;justify-content:space-between"><span>Pedido</span><span>' + o.n + '</span></div><div style="display:flex;justify-content:space-between"><span>Total</span><span>' + o.total + '</span></div><p class="muted">' + o.items.join(' · ') + '</p>' + (o.virtual ? '<p>Te escribiremos a <b>' + o.email + '</b> para agendar tu asesoría.</p>' : '<p>Te avisaremos a <b>' + o.email + '</b> cuando salga tu pedido.</p>');
})();
