// Helpers y partes reutilizables. En WordPress: cada función = un template-part del tema hijo.
import { SITE, NAV } from './data/site.mjs';
import { LINES, CATS } from './data/products.mjs';

export const money = n => '$' + new Intl.NumberFormat('es-CL').format(n);
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---------- Marca ---------- */
export const brand = (group, name, color) => `assets/brand/${group}/${name}-${color}.${group === 'logos' || group === 'isotipo' ? 'png' : 'svg'}`;
export const logo = (kind, color, cls = '', alt = '') => { const k = {'horizontal-simple':'logo-horizontal-simple', principal:'logo-principal', secundaria:'logo-secundaria', horizontal:'logo-horizontal'}[kind]; const D = {"logo-principal": [1400, 443], "logo-secundaria": [1400, 796], "logo-horizontal": [1400, 160], "logo-horizontal-simple": [1400, 96], "isotipo": [800, 800]}; return `<img class="${cls}" src="${brand('logos', 'logo-' + kind, color)}" alt="${esc(alt)}" width="${D[k][0]}" height="${D[k][1]}">`; };
export const starImg = (color = 'rojo', cls = 'star') => `<img class="${cls}" src="${brand('elementos', 'estrella', color)}" alt="" width="20" height="20" aria-hidden="true">`;
export const motto = (which, color, alt) => which === 'curated'
  ? `<img class="motto motto--curated" src="${brand('elementos', 'curated-pieces', color)}" alt="${esc(alt || 'Curated pieces')}" width="1692" height="351">`
  : `<img class="motto motto--vintage" src="${brand('elementos', 'vintage-vibes', color)}" alt="${esc(alt || 'Vintage vibes')}" width="1683" height="225">`;
export const ojo = (starColor = 'champagne') => `<div class="ojo" role="img" aria-label="Un ojo y una estrella: la mirada de la curadora">
  <img class="ojo__eye" src="assets/brand/elementos/ojo-700.webp" srcset="assets/brand/elementos/ojo-700.webp 700w, assets/brand/elementos/ojo-1200.webp 1200w" sizes="(min-width:900px) 520px, 90vw" alt="" width="700" height="390" loading="lazy" decoding="async">
  <img class="ojo__star star-spin" src="${brand('elementos', 'estrella', starColor)}" alt="" width="654" height="645" loading="lazy" decoding="async">
</div>`;

/* ---------- Imágenes (Unsplash enlazadas, nunca descargadas) ---------- */
export const U = (id, w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=max&q=72&w=${w}`;
export const srcset = (id, ws) => ws.map(w => `${U(id, w)} ${w}w`).join(', ');
export function img(photo, { alt = '', sizes = '100vw', ws = [400, 640, 900, 1200], eager = false, w = 800, h = 1000, cls = '', extra = '' } = {}) {
  return `<img${cls ? ` class="${cls}"` : ''} src="${U(photo.id, ws[1] || ws[0])}" srcset="${srcset(photo.id, ws)}" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"'} style="--fp:${photo.fp}; object-position:${photo.fp}" ${extra}>`;
}
export const thumb = p => U(p.imgs[0].id, 200);

/* ---------- Producto ---------- */
export const productUrl = p => `producto-${p.slug}.html`;
export const lineName = p => (LINES[p.line] || { name: 'Servicio' }).name;

export function card(p, { eager = false, sizes = '(min-width:1100px) 25vw, (min-width:700px) 33vw, 50vw' } = {}) {
  const up = p.line === 'upcycling';
  return `<article class="card${p.sold ? ' is-sold' : ''}" data-cat="${p.cat}" data-line="${p.line}" data-price="${p.price}" data-sold="${p.sold ? 1 : 0}" data-order="${p.order}">
  <div class="card__media media">
    ${img(p.imgs[0], { alt: `${p.title} — ${lineName(p)}`, sizes, ws: [320, 480, 640, 900], eager, w: 640, h: 800 })}
    ${p.imgs[1] ? img(p.imgs[1], { alt: '', sizes, ws: [320, 480, 640, 900], w: 640, h: 800, cls: 'alt', extra: 'aria-hidden="true"' }) : ''}
    ${p.sold ? '<span class="badge badge--sold">Ya tiene dueña</span>' : p.order < 3 ? '<span class="badge badge--new">Nuevo</span>' : ''}
    ${up && !p.sold ? '<span class="badge badge--up">Upcycling</span>' : ''}
    ${p.sold ? '' : `<button class="quick-add" type="button" data-add="${p.id}" aria-label="Agregar ${esc(p.title)} a la bolsa">+</button>`}
  </div>
  <div class="card__body">
    <span class="card__line${up ? ' is-up' : ''}">${lineName(p)} · ${CATS[p.cat]}</span>
    <h3 class="card__title"><a href="${productUrl(p)}">${esc(p.title)}</a></h3>
    <span class="card__price tnum">${p.sold ? `<span class="sr-only">Vendida. </span>` : ''}${money(p.price)}</span>
  </div>
</article>`;
}

/* ---------- <head> ---------- */
export function head({ title, desc, page, extraHead = '', ogImage = 'assets/brand/og-image.png', jsonld = [], preloadImg = '' }) {
  const t = title === SITE.name ? title : `${title} — ${SITE.short}`;
  return `<!doctype html>
<html lang="es-CL" data-theme="champan">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(t)}</title>
<meta name="description" content="${esc(desc || SITE.desc)}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#000000">
<meta property="og:type" content="website"><meta property="og:locale" content="es_CL">
<meta property="og:title" content="${esc(t)}"><meta property="og:description" content="${esc(desc || SITE.desc)}">
<meta property="og:image" content="${ogImage}">
<link rel="icon" href="assets/brand/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="assets/brand/apple-touch-icon.png">
<link rel="preconnect" href="https://images.unsplash.com" crossorigin>
<link rel="preload" href="assets/fonts/garet-book.woff2" as="font" type="font/woff2" crossorigin>
${preloadImg}
<link rel="stylesheet" href="styles.css">
${extraHead}
${jsonld.map(j => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
</head>
<body data-page="${page}">`;
}

/* ---------- Header / Drawer / Search / Cart / Footer ---------- */
const ICON = {
  bag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 5 5"/></svg>',
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8h18M3 16h18"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19"/></svg>',
};
export { ICON };

export function header(active = '') {
  const navL = NAV.slice(0, 4), navR = NAV.slice(4);
  const li = n => `<li><a href="${n.href}"${active === n.id ? ' aria-current="page"' : ''}${n.id === 'upcycling' ? ' class="is-up"' : ''}>${n.label}${n.flag ? `<small>${n.flag}</small>` : ''}</a></li>`;
  return `<a class="skip" href="#main">Saltar al contenido</a>
<div class="announce"><p>Cada pieza es única · Envíos a todo Chile · <a href="preguntas-frecuentes.html#envios">Ver envíos</a></p></div>
<header class="header">
  <div class="header__in">
    <div class="header__side">
      <button class="icon-btn burger" type="button" data-open="#nav-drawer" aria-controls="nav-drawer" aria-expanded="false" aria-label="Abrir menú">${ICON.menu}</button>
      <nav class="nav-desktop" aria-label="Tienda"><ul>${navL.map(li).join('')}</ul></nav>
    </div>
    <a class="logo" href="index.html" aria-label="Sagrada Indumentaria — inicio">${logo('horizontal-simple', 'negro', '', '')}</a>
    <div class="header__side header__side--end">
      <nav class="nav-desktop" aria-label="Más"><ul>${navR.map(li).join('')}</ul></nav>
      <button class="icon-btn search-btn" type="button" data-search-open aria-label="Buscar">${ICON.search}</button>
      <button class="icon-btn" type="button" data-open="#cart-drawer" aria-controls="cart-drawer" aria-expanded="false" aria-label="Abrir bolsa">${ICON.bag}<span class="count" data-cart-count hidden>0</span></button>
    </div>
  </div>
</header>`;
}

export function overlays() {
  return `<div class="scrim" id="scrim" aria-hidden="true"></div>
<aside class="drawer drawer--left" id="nav-drawer" aria-label="Menú" role="dialog" aria-modal="true">
  <div class="drawer__head">${logo('horizontal-simple', 'negro', '', 'Sagrada Indumentaria').replace('<img class=""', '<img style="height:15px;width:auto"')}<button class="icon-btn" type="button" data-close aria-label="Cerrar menú">${ICON.close}</button></div>
  <div class="drawer__body">
    <nav class="nav-m" aria-label="Menú principal"><ul>
      ${NAV.map(n => `<li><a href="${n.href}"${n.id === 'upcycling' ? ' class="is-up"' : ''}>${n.label}${n.flag ? `<small>${n.flag}</small>` : ''}</a></li>`).join('')}
    </ul></nav>
    <div class="nav-m-sub">
      <button class="link" type="button" data-search-open data-close style="text-align:left;min-height:44px">Buscar en la tienda</button>
      <a href="${SITE.igUrl}" class="link" rel="noopener" target="_blank">Instagram @${SITE.instagram}</a>
    </div>
  </div>
</aside>
<aside class="drawer drawer--right" id="cart-drawer" aria-label="Tu bolsa" role="dialog" aria-modal="true">
  <div class="drawer__head"><h2 class="label" style="font-size:13px">Tu bolsa</h2><button class="icon-btn" type="button" data-close aria-label="Cerrar bolsa">${ICON.close}</button></div>
  <div class="drawer__body" id="cart-body"></div>
  <div class="drawer__foot" id="cart-foot" hidden>
    <div class="totals"><div><span>Subtotal</span><span class="tnum" id="cart-sub">$0</span></div><p class="muted" style="font-size:12px">El envío se calcula en el checkout. Cada pieza es única: no hay stock extra.</p></div>
    <div class="btn-row mt-4" style="display:grid"><a class="btn btn--block btn--accent" href="checkout.html">Ir a pagar</a><a class="btn btn--block btn--ghost" href="bolsa.html">Ver bolsa</a></div>
  </div>
</aside>
<div class="search" id="search" role="dialog" aria-modal="true" aria-label="Buscar">
  <div class="search__in">
    <div class="search__bar"><label class="sr-only" for="search-input">Buscar productos</label><input id="search-input" type="search" placeholder="Buscar…" autocomplete="off"><button class="icon-btn" type="button" data-search-close aria-label="Cerrar buscador">${ICON.close}</button></div>
    <div class="search__res" id="search-res" aria-live="polite"></div>
  </div>
</div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>`;
}

export function consent() {
  return `<p class="consent">Al suscribirte aceptas recibir correos con novedades y promociones de Sagrada. Puedes darte de baja cuando quieras. Tratamos tus datos según nuestra <a href="politica-de-privacidad.html">política de privacidad</a>.</p>`;
}

export function footer() {
  return `<footer class="footer on-dark">
  <div class="wrap wrap--wide">
    <div class="footer__top">
      <div class="footer__news">
        <a class="footer__logo" href="index.html">${logo('secundaria', 'blanco', '', 'Sagrada Indumentaria')}</a>
        <h3 style="margin-top:28px">Entérate primero de cada drop</h3>
        <p class="muted" style="font-size:14px">Una vez a la semana, las piezas nuevas. Cuando salen, se van rápido.</p>
        <form data-demo aria-label="Newsletter" novalidate><label class="sr-only" for="nl">Tu correo</label><input id="nl" type="email" required placeholder="Tu correo" autocomplete="email"><button type="submit">Quiero</button></form>
        <p class="form-ok" data-demo-ok hidden tabindex="-1" style="margin-top:12px;color:var(--c-black)">Listo. Revisa tu correo para confirmar.</p>
        ${consent()}
      </div>
      <div class="footer__cols">
        <div><h4>Tienda</h4><ul>
          <li><a href="tienda.html">Todo</a></li><li><a href="tienda-vintage.html">Vintage &amp; Pre-loved</a></li><li><a href="tienda-lujo.html">Lujo</a></li><li><a href="tienda-upcycling.html">Upcycling</a></li><li><a href="asesoria-personalizada.html">Asesoría</a></li></ul></div>
        <div><h4>Ayuda</h4><ul>
          <li><a href="preguntas-frecuentes.html">Preguntas frecuentes</a></li><li><a href="preguntas-frecuentes.html#envios">Envíos</a></li><li><a href="preguntas-frecuentes.html#cambios">Cambios</a></li><li><a href="contacto.html">Contacto</a></li><li><a href="politica-de-privacidad.html">Privacidad</a></li></ul></div>
        <div><h4>Sagrada</h4><ul>
          <li><a href="sagrada.html">La marca</a></li><li><a href="journal.html">Blog</a></li><li><a href="${SITE.igUrl}" target="_blank" rel="noopener">Instagram</a></li><li><a href="mailto:${SITE.email}">${SITE.email}</a></li></ul></div>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© 2026 Sagrada Indumentaria. Prototipo de diseño — Volantín Creativo.</span>
      <span class="pay" aria-label="Medios de pago">${starImg('blanco', 'star')} <span>Flow</span><span>Tarjetas</span><span>Transferencia</span></span>
    </div>
  </div>
</footer>`;
}

export function scripts(extra = []) {
  return `<script src="assets/data.js" defer></script>
<script src="js/core.js" defer></script>
<script src="js/cart.js" defer></script>
${extra.map(s => `<script src="js/${s}.js" defer></script>`).join('\n')}
</body>
</html>`;
}

export const crumbs = (items, style = '') => `<nav class="crumbs"${style ? ` style="${style}"` : ''} aria-label="Migas de pan"><ol>${items.map((c, i) => `<li>${c.href ? `<a href="${c.href}">${esc(c.label)}</a>` : `<span aria-current="page">${esc(c.label)}</span>`}</li>`).join('')}</ol></nav>`;
export const breadcrumbLD = items => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, ...(c.href ? { item: c.href } : {}) })) });

export function page({ title, desc, page: pg, active, body, scripts: sc = [], jsonld = [], preloadImg = '', extraHead = '', ogImage }) {
  return head({ title, desc, page: pg, jsonld, preloadImg, extraHead, ogImage }) + '\n' + header(active) + '\n<main id="main">\n' + body + '\n</main>\n' + footer() + '\n' + overlays() + '\n' + scripts(sc);
}
