import { PRODUCTS, SERVICE, LINES, CATS, PHOTO } from './data/products.mjs';
import { POSTS } from './data/posts.mjs';
import { SITE } from './data/site.mjs';
import { page, card, img, U, srcset, esc, money, brand, logo, motto, ojo, starImg, productUrl, lineName, crumbs, breadcrumbLD, ICON } from './lib.mjs';

const unsold = PRODUCTS.filter(p => !p.sold);
const pick = k => PHOTO[k];
const sec = ({ eyebrow, title, href, link, id }) => `<div class="sec-head"><div>${eyebrow ? `<span class="label label--accent eyebrow">${eyebrow}</span>` : ''}<h2${id ? ` id="${id}"` : ''}>${title}</h2></div>${href ? `<a class="arrow-link" href="${href}">${link}</a>` : ''}</div>`;

/* ======================= INICIO ======================= */
export function home() {
  const heroM = pick('blazerRojo'), heroD = pick('edRojoCielo');
  const preload = `<link rel="preload" as="image" media="(max-width:799px), (orientation:portrait)" imagesrcset="${srcset(heroM.id, [500, 800, 1100, 1400])}" imagesizes="100vw" fetchpriority="high">
<link rel="preload" as="image" media="(min-width:800px) and (orientation:landscape)" imagesrcset="${srcset(heroD.id, [1000, 1400, 1900, 2400])}" imagesizes="100vw" fetchpriority="high">`;
  const tiles = [
    ['vintage', 'abrigoCamel', 'Vintage', LINES.vintage.short, 'tienda-vintage.html'],
    ['lujo', 'vestidoBordo', 'Lujo', LINES['lujo'].short, 'tienda-lujo.html'],
    ['upcycling', 'taller3', 'Upcycling', LINES.upcycling.short, 'tienda-upcycling.html'],
  ].map(([k, ph, t, d, h]) => `<a class="tile${k === 'upcycling' ? ' tile--up' : ''}" href="${h}" data-reveal>
    <div class="media">${img(pick(ph), { alt: `Línea ${t}`, sizes: '(min-width:800px) 33vw, 78vw', ws: [480, 720, 1000, 1400], w: 720, h: 900 })}</div>
    ${k === 'upcycling' ? '<span class="tag">Sastrería</span>' : ''}
    <div class="tile__txt"><h3>${t}</h3><p>${d}</p><span class="arrow-link" style="border:0;padding:0">Explorar</span></div></a>`).join('');

  const cats = [['abrigos', 'abrigoCamel'], ['chaquetas', 'cueroNegro'], ['blazers', 'blazerRojo'], ['tejidos', 'cardiganCrudo'], ['vestidos', 'vestidoBordo'], ['carteras', 'carteraGris']]
    .map(([c, ph]) => `<a class="tile" href="tienda.html?cat=${c}"><div class="media">${img(pick(ph), { alt: CATS[c], sizes: '(min-width:1200px) 25vw, (min-width:900px) 30vw, 60vw', ws: [320, 480, 640, 900], w: 480, h: 600 })}</div><div class="tile__txt"><h3 style="font-size:1.15rem">${CATS[c]}</h3></div></a>`).join('');

  const news = unsold.slice(0, 8).map((p, i) => card(p, { sizes: '(min-width:1200px) 25vw, (min-width:900px) 29vw, (min-width:600px) 41vw, 74vw' })).join('');
  const posts = POSTS.slice(0, 3).map(po => postCard(po)).join('');
  const ig = ['abrigoCamel', 'vestidoRojo', 'tallerHilo', 'cueroNegro', 'perchaMadera', 'carteraGris'].map(k => `<a href="${SITE.igUrl}" target="_blank" rel="noopener" aria-label="Ver en Instagram"><div class="media">${img(pick(k), { alt: '', sizes: '(min-width:800px) 16vw, 33vw', ws: [240, 400, 600], w: 400, h: 400 })}</div></a>`).join('');
  const bagK = 'Piezas únicas ★ Curaduría real ★ Envíos a todo Chile ★ Vintage ★ Lujo ★ Upcycling ★ Pago seguro con Flow ★ Mide antes de enamorarte ★ ';
  const mq = (hidden) => `<div class="marquee__group"${hidden ? ' aria-hidden="true"' : ''}>${['Piezas únicas', 'Curaduría real', 'Envíos a todo Chile', 'Vintage · Lujo · Upcycling', 'Pago seguro con Flow'].map(t => `<span>${t}</span>${starImg('rojo-vivo', '')}`).join('')}</div>`;

  const body = `
<section class="hero" aria-label="Portada">
  <div class="hero__media"><picture>
    <source media="(min-width:800px) and (orientation:landscape)" srcset="${srcset(heroD.id, [1000, 1400, 1900, 2400])}" sizes="100vw">
    <img src="${U(heroM.id, 800)}" srcset="${srcset(heroM.id, [500, 800, 1100, 1400])}" sizes="100vw" width="1100" height="1650" alt="Mujer con blazer rojo estructurado sobre fondo urbano" fetchpriority="high" decoding="async" style="--fp-m:${heroM.fp};--fp-d:${heroD.fp}">
  </picture></div>
  <div class="hero__in">
    <h1>Ropa con historia, elegida para ti</h1>
    <p>Vintage, lujo y upcycling con ojo de curadora. Una sola pieza de cada una.</p>
    <div class="btn-row"><a class="btn btn--light" href="tienda.html">Ver lo nuevo</a><a class="btn btn--ghost" href="tienda-upcycling.html">Upcycling</a></div>
  </div>
</section>
<div class="marquee" aria-label="Lo que nos define"><div class="marquee__track">${mq(false)}${mq(true)}</div></div>

<section class="section"><div class="wrap">
  ${sec({ eyebrow: 'Tres formas de elegir', title: 'Cada línea, una historia' })}
  <div class="lines">${tiles}</div>
</div></section>

<section class="section section--tight" style="padding-top:0"><div class="wrap">
  <div class="rail-wrap">
    ${sec({ eyebrow: 'Recién llegadas', title: 'Lo nuevo', href: 'tienda.html', link: 'Ver todo' })}
    <div class="rail" role="list" aria-label="Piezas nuevas">${news.replace(/<article class="card/g, '<article role="listitem" class="card')}</div>
    <div class="rail-nav mt-4" style="justify-content:flex-end"><button class="rail-btn" type="button" data-rail="prev" aria-label="Anterior">←</button><button class="rail-btn" type="button" data-rail="next" aria-label="Siguiente">→</button></div>
  </div>
</div></section>

<section class="section section--soft"><div class="wrap">
  <div class="manifesto" data-reveal>
    <h2>No vendemos ropa usada. Rescatamos piezas que valen la pena.</h2>
    <p>Llevamos más de quince años mirando prendas con otros ojos. Elegimos lo que tiene calidad, historia y estilo; lo limpiamos, lo medimos y lo dejamos listo para ti.</p>
    <a class="arrow-link" href="sagrada.html">Conoce nuestra mirada</a>
  </div>
</div></section>

<section class="split band on-dark" style="background:var(--c-cherry);color:var(--c-champagne)" aria-labelledby="up-h">
  <div class="media">${img(pick('tallerHilo'), { alt: 'Manos cosiendo una prenda en el taller de sastrería', sizes: '(min-width:900px) 50vw, 100vw', ws: [600, 900, 1200, 1600], w: 900, h: 1125 })}</div>
  <div class="split__txt">
    <span class="label" style="color:var(--c-champagne)">Sastrería · Upcycling</span>
    <h2 id="up-h" style="color:var(--c-white)">Lo que ya existe, vuelto a nacer</h2>
    <p style="color:var(--c-champagne)">Prendas de buena calidad que rediseñamos en nuestro taller de sastrería: otro hombro, otro largo, otro cuello. Se venden ya terminadas y cada una sale una sola vez.</p>
    <div class="btn-row"><a class="btn btn--light" href="tienda-upcycling.html">Ver upcycling</a></div>
  </div>
</section>

<section class="section"><div class="wrap">
  ${sec({ eyebrow: 'Explora por prenda', title: 'Todo lo que buscas' })}
  <div class="rail-wrap"><div class="rail rail--cats">${cats}</div></div>
</div></section>

<section class="advice" aria-labelledby="adv-h">
  <div class="media"><div class="iso-ph" style="--iso-bg:var(--c-cherry)"><img src="${brand('isotipo', 'isotipo', 'blanco')}" alt="" width="400" height="400"></div></div>
  <div class="advice__txt">
    <span class="label">Servicio</span>
    <h2 id="adv-h">¿No sabes por dónde empezar?</h2>
    <p>Una sesión uno a uno para armar tu clóset cápsula, elegir esa pieza especial o combinar mejor lo que ya tienes.</p>
    <div><a class="btn" href="asesoria-personalizada.html">Reservar asesoría · ${money(SERVICE.price)}</a></div>
  </div>
</section>

<section class="band on-dark"><div class="wrap eye-band">
  <div data-reveal><span class="label" style="color:var(--band-accent)">La mirada</span>
    <h2 style="margin-top:14px">Ojo de curadora</h2>
    <p style="margin-top:18px;max-width:46ch">Detrás de cada pieza hay una mirada que la eligió. Revisamos tela, costuras, caída e historia antes de que llegue a ti. Si no nos enamora, no entra.</p>
    <div class="mt-6"><a class="btn btn--light" href="sagrada.html">Nuestra historia</a></div></div>
  ${ojo('champagne')}
</div></section>

<section class="section"><div class="wrap wrap--wide">
  ${sec({ eyebrow: 'Blog', title: 'Para mirar con calma', href: 'journal.html', link: 'Ver todo' })}
  <div class="posts posts--3">${posts}</div>
</div></section>

<section class="section section--tight" style="padding-top:0"><div class="wrap wrap--wide">
  <div class="sec-head"><div><span class="label label--accent eyebrow">Instagram</span><h2 class="handle">@${SITE.instagram}</h2></div><a class="arrow-link" href="${SITE.igUrl}" target="_blank" rel="noopener">Seguir</a></div>
  <div class="ig">${ig}</div>
</div></section>

${trust()}`;
  return page({
    title: SITE.name, desc: SITE.desc, page: 'home', active: '', body, preloadImg: preload,
    jsonld: [{ '@context': 'https://schema.org', '@type': 'Store', name: SITE.name, url: './', email: SITE.email, sameAs: [SITE.igUrl], description: SITE.desc, areaServed: 'CL' }],
  });
}

function trust() {
  return `<section aria-label="Por qué comprar en Sagrada"><div class="wrap wrap--wide"><div class="trust">
  <div><h3>Pieza única</h3><p>Cada prenda existe una sola vez. Si es tuya, es solo tuya.</p></div>
  <div><h3>Envío a todo Chile</h3><p>Tarifa fija, sin sorpresas. Retiro sin costo en Santiago.</p></div>
  <div><h3>Pago seguro</h3><p>Tarjetas y transferencia con Flow. Tus datos nunca pasan por nosotras.</p></div>
  <div><h3>Curaduría real</h3><p>Revisamos, limpiamos y medimos cada pieza antes de publicarla.</p></div>
</div></div></section>`;
}

export function postCard(po) {
  const d = new Date(po.date + 'T12:00:00').toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
  return `<article class="post" data-reveal><div class="media">${img(PHOTO[po.photo], { alt: '', sizes: '(min-width:1000px) 33vw, (min-width:700px) 50vw, 100vw', ws: [480, 720, 1000, 1400], w: 720, h: 540 })}</div>
  <div class="meta"><span>${po.cat}</span><span>${d}</span></div>
  <h3><a href="journal-${po.slug}.html">${esc(po.title)}</a></h3><p>${esc(po.excerpt)}</p></article>`;
}

/* ======================= TIENDA ======================= */
export function shop(lineKey) {
  const list = (lineKey ? PRODUCTS.filter(p => p.line === lineKey) : PRODUCTS).slice();
  const L = lineKey ? LINES[lineKey] : null;
  const title = L ? L.name : 'Toda la tienda';
  const slug = L ? L.slug : 'tienda';
  const counts = Object.fromEntries(Object.keys(CATS).map(c => [c, list.filter(p => p.cat === c).length]));
  const intro = {
    vintage: ['Vintage & Pre-loved', 'Piezas de otra época que hoy se ven más actuales que nunca. Cortes que ya no se hacen, telas que ya no existen.', '<span class="label eyebrow-plain">Vintage vibes</span>'],
    'lujo': ['Lujo', 'Marcas de lujo de siempre, de segunda mano, con cariño y listas para otra vida. Misma calidad, mejor historia.', '<span class="label eyebrow-plain">Curated pieces</span>'],
    upcycling: ['Upcycling', 'Prendas reconstruidas en nuestro taller de sastrería. Cada una sale una sola vez, hecha a mano.', `<span class="label" style="color:var(--band-accent);display:inline-flex;gap:10px;align-items:center">${starImg('rojo-vivo', 'star')} Sastrería</span>`],
  }[lineKey] || [null, 'Vintage, lujo y upcycling en un solo lugar. Filtra por línea, por prenda o mira todo junto.', ''];
  const tabs = [['Todo', 'tienda.html', null], ['Vintage', 'tienda-vintage.html', 'vintage'], ['Lujo', 'tienda-lujo.html', 'lujo'], ['Upcycling', 'tienda-upcycling.html', 'upcycling']]
    .map(([t, h, k]) => `<a class="chip${k === 'upcycling' ? ' is-up' : ''}" href="${h}"${(k || null) === (lineKey || null) ? ' aria-current="page"' : ''}>${t}</a>`).join('');
  const chips = `<button class="chip" type="button" data-cat-chip="" aria-pressed="true">Todas</button>` + Object.entries(CATS).filter(([c]) => counts[c]).map(([c, n]) => `<button class="chip" type="button" data-cat-chip="${c}" aria-pressed="false">${CATS[c]}</button>`).join('');
  const catOpts = Object.entries(CATS).filter(([c]) => counts[c]).map(([c, n]) => `<label class="opt"><span>${CATS[c]}<small>(${counts[c]})</small></span><input type="checkbox" name="cat" value="${c}"></label>`).join('');
  const body = `
<section class="shop-hero band on-dark"><div class="wrap">
  ${crumbs([{ label: 'Inicio', href: 'index.html' }, { label: 'Tienda', href: L ? 'tienda.html' : null }, ...(L ? [{ label: L.name }] : [])], 'color:color-mix(in srgb,var(--band-fg) 70%,transparent);padding-top:0')}
  ${intro[2] || ''}
  <h1 style="margin-top:12px">${intro[0] || title}</h1>
  <p>${intro[1]}</p>
</div></section>
<div class="wrap">
  <div class="lines-tabs" aria-label="Líneas">${tabs}</div>
  <div class="chips" role="group" aria-label="Prendas" style="margin-top:6px">${chips.replace(/>([A-Za-zÁ-ú]+)<\/button>/g, '>$1</button>')}</div>
  <div class="toolbar"><div class="toolbar__in">
    <button class="filter-btn" type="button" data-open="#filters" aria-controls="filters" aria-expanded="false"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/></svg>Filtros</button>
    <span class="count" id="count" aria-live="polite">${list.length} piezas</span>
    <div><label class="sr-only" for="sort">Ordenar</label><select id="sort"><option value="new">Lo más nuevo</option><option value="price-asc">Precio: menor a mayor</option><option value="price-desc">Precio: mayor a menor</option></select></div>
  </div></div>
  <div class="shop-layout shop-layout--filters">
    <div class="filters-aside">
      <aside class="drawer drawer--left drawer--filters" id="filters" aria-label="Filtros">
        <div class="drawer__head"><h2 class="label" style="font-size:13px">Filtros</h2><button class="icon-btn" type="button" data-close aria-label="Cerrar filtros">${ICON.close}</button></div>
        <div class="drawer__body"><div class="filters">
          <fieldset><h3>Prenda</h3>${catOpts}</fieldset>
          <fieldset><h3>Precio</h3>
            <label class="opt"><span>Todos</span><input type="radio" name="price" value="" checked></label>
            <label class="opt"><span>Hasta ${money(80000)}</span><input type="radio" name="price" value="0-80000"></label>
            <label class="opt"><span>${money(80000)} – ${money(150000)}</span><input type="radio" name="price" value="80000-150000"></label>
            <label class="opt"><span>${money(150000)} – ${money(250000)}</span><input type="radio" name="price" value="150000-250000"></label>
            <label class="opt"><span>Más de ${money(250000)}</span><input type="radio" name="price" value="250000-"></label></fieldset>
          <fieldset><h3>Disponibilidad</h3><label class="opt"><span>Ocultar las que ya tienen dueña</span><input type="checkbox" id="hide-sold"></label></fieldset>
        </div></div>
        <div class="drawer__foot drawer__foot--stack"><button class="btn btn--block" type="button" data-close>Ver resultados</button><button class="btn btn--block btn--ghost" type="button" data-reset>Limpiar</button></div>
      </aside>
    </div>
    <div>
      <div class="grid" id="grid">${list.map((p, i) => card(p, { eager: i < 4 })).join('')}</div>
      <div class="shop-empty" id="shop-empty"><p class="label">No hay piezas con esos filtros</p><button class="btn btn--ghost" type="button" data-reset>Limpiar filtros</button></div>
    </div>
  </div>
</div>
${trust()}`;
  return page({ title: L ? `${L.name} — tienda` : 'Tienda', desc: L ? L.short + ' Piezas únicas con envío a todo Chile.' : SITE.desc, page: 'shop', active: lineKey || 'tienda', body, scripts: ['shop'],
    jsonld: [breadcrumbLD([{ label: 'Inicio', href: 'index.html' }, { label: 'Tienda', href: 'tienda.html' }, ...(L ? [{ label: L.name }] : [])])] });
}

/* ======================= PRODUCTO ======================= */
export function product(p) {
  const cat = CATS[p.cat], L = LINES[p.line];
  const slides = p.imgs.map((im, i) => `<div class="media">${img(im, { alt: i === 0 ? `${p.title}, ${L.name}` : `${p.title} — foto ${i + 1}`, sizes: '(min-width:1000px) 38vw, 100vw', ws: [480, 720, 1000, 1400, 1800], w: 1000, h: 1250, eager: i === 0 })}</div>`).join('');
  const dots = p.imgs.map((_, i) => `<span${i === 0 ? ' class="on"' : ''}></span>`).join('');
  /* Prototipo: en WooCommerce vendrá del campo "Combina con" (códigos de producto). Aquí se simula con piezas de otras prendas. */
  const rel = unsold.filter(x => x.id !== p.id && x.cat !== p.cat).slice(0, 4);
  const spec = Object.entries(p.measures).map(([k, v]) => `<tr><th scope="row">${k}</th><td>${v} cm</td></tr>`).join('');
  const buy = p.sold
    ? `<div class="sold-box"><strong>Ya tiene dueña</strong><p>Esta pieza era única y ya encontró a su dueña. Si te gustó, mira piezas parecidas o súmate al próximo drop.</p><div class="btn-row"><a class="btn" href="tienda-${p.line}.html">Ver más ${L.name}</a><a class="btn btn--ghost" href="tienda.html">Toda la tienda</a></div></div>`
    : `<div class="pdp__buy"><button class="btn btn--block btn--accent" id="buy-main" type="button" data-add="${p.id}" data-open-cart>Agregar a la bolsa</button><p class="muted" style="font-size:12.5px">Pieza única: al agregarla a tu bolsa no la reservamos. Se confirma cuando pagas.</p></div>`;
  const ld = { '@context': 'https://schema.org', '@type': 'Product', name: p.title, description: p.note, sku: p.id, image: p.imgs.map(i => U(i.id, 1200)), brand: { '@type': 'Brand', name: 'Sagrada Indumentaria' }, category: `${L.name} · ${cat}`, itemCondition: p.line === 'upcycling' ? 'https://schema.org/NewCondition' : 'https://schema.org/UsedCondition', offers: { '@type': 'Offer', priceCurrency: 'CLP', price: p.price, availability: p.sold ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock', url: productUrl(p) } };
  const bc = [{ label: 'Inicio', href: 'index.html' }, { label: 'Tienda', href: 'tienda.html' }, { label: L.name, href: L.slug + '.html' }, { label: p.title }];
  const body = `
<div class="wrap">${crumbs(bc)}</div>
<div class="wrap pdp">
  <div>
    <div class="gallery" id="gallery" tabindex="0" aria-label="Fotos de ${esc(p.title)}">${slides}</div>
    <div class="gallery-dots" id="gallery-dots" aria-hidden="true">${dots}</div>
  </div>
  <div class="pdp__info">
    <div class="stack" style="--stack:10px">
      <a class="label ${p.line === 'upcycling' ? 'label--accent' : 'muted'}" href="${L.slug}.html">${L.name} · ${cat}</a>
      <h1>${esc(p.title)}</h1>
      <p class="pdp__price">${money(p.price)}</p>
    </div>
    ${p.sold ? '' : '<p class="pdp__unique">Pieza única · no vuelve</p>'}
    ${buy}
    <div class="pdp__note"><span class="label">Nota de la curadora</span><p>${esc(p.note)}</p></div>
    <div>
      <details class="acc" open><summary>Medidas (planas)</summary><div class="acc__body"><table class="spec"><tbody>${spec}</tbody></table><p style="font-size:13px">Medimos cada pieza a mano, en plano. Compáralas con una prenda que ya te quede bien.</p></div></details>
      <details class="acc"><summary>Detalles y estado</summary><div class="acc__body"><table class="spec"><tbody><tr><th scope="row">Material</th><td>${esc(p.mats)}</td></tr><tr><th scope="row">Origen</th><td>${esc(p.label)}</td></tr><tr><th scope="row">Estado</th><td>${esc(p.state)}</td></tr><tr><th scope="row">Código</th><td>${p.id}</td></tr></tbody></table></div></details>
      <details class="acc"><summary>Envío y cambios</summary><div class="acc__body"><p>Enviamos a todo Chile con tarifa fija. También puedes retirar sin costo en Santiago.</p><p>Como cada pieza es única, aceptamos cambios por defectos no informados dentro de 7 días. <a class="link" href="preguntas-frecuentes.html#cambios">Ver política</a>.</p></div></details>
    </div>
  </div>
</div>
${rel.length ? `<section class="wrap section related"><div class="sec-head"><h2>Puedes completar tu outfit con</h2><a class="arrow-link" href="tienda.html">Ver todo</a></div><div class="grid">${rel.map(card).join('')}</div></section>` : ''}
${p.sold ? '' : `<div class="buybar" id="buybar"><div class="buybar__t"><b>${esc(p.title)}</b><span class="tnum">${money(p.price)}</span></div><button class="btn btn--accent" type="button" data-add="${p.id}" data-open-cart>Agregar</button></div>`}`;
  return page({ title: p.title, desc: `${p.title} — ${L.name}. ${p.note}`, page: 'product', active: p.line, body, scripts: ['pdp'], jsonld: [ld, breadcrumbLD(bc)], ogImage: U(p.imgs[0].id, 1200) });
}

/* ======================= ASESORÍA (producto intangible) ======================= */
export function advice() {
  const S = SERVICE;
  const slides = [['var(--c-red)', 'blanco'], ['var(--c-velvet)', 'champagne'], ['var(--c-champagne)', 'cereza']].map(([bg, c], i) => `<div class="media"><div class="iso-ph" style="--iso-bg:${bg}"><img src="${brand('isotipo', 'isotipo', c)}" alt="${i === 0 ? 'Isotipo de Sagrada sobre fondo rojo' : ''}" width="400" height="400"></div></div>`).join('');
  const bc = [{ label: 'Inicio', href: 'index.html' }, { label: 'Asesoría personalizada' }];
  const body = `
<div class="wrap">${crumbs(bc)}</div>
<div class="wrap pdp">
  <div><div class="gallery" id="gallery" tabindex="0" aria-label="Imágenes del servicio">${slides}</div><div class="gallery-dots" id="gallery-dots" aria-hidden="true"><span class="on"></span><span></span><span></span></div></div>
  <div class="pdp__info">
    <div class="stack" style="--stack:10px"><span class="label label--accent">Servicio · No requiere envío</span><h1>Asesoría personalizada</h1><p class="pdp__price">${money(S.price)}</p></div>
    <p class="lead">Una sesión de 60 minutos contigo y con nuestra curadora. Armamos tu clóset cápsula, elegimos esa pieza especial o aprendemos a combinar lo que ya tienes.</p>
    <div class="pdp__buy"><button class="btn btn--block btn--accent" id="buy-main" type="button" data-add="${S.id}" data-open-cart>Reservar asesoría</button><p class="muted" style="font-size:12.5px">Después de pagar te escribimos para coordinar día y hora.</p></div>
    <div class="pdp__note"><span class="label">Qué incluye</span><ul class="stars-list" style="margin-top:6px">
      <li>${starImg('rojo', '')}<span>Revisión de tu clóset y de lo que ya amas usar.</span></li>
      <li>${starImg('rojo', '')}<span>Selección de 3 a 5 piezas de la tienda, pensadas para ti.</span></li>
      <li>${starImg('rojo', '')}<span>Ideas para combinar tus piezas nuevas con lo que ya tienes.</span></li></ul></div>
    <div>
      <details class="acc" open><summary>Cómo funciona</summary><div class="acc__body"><p>1. Reservas y pagas aquí. 2. Te escribimos en menos de 24 horas para elegir horario. 3. Nos juntamos por videollamada o, con cita, en persona.</p></div></details>
      <details class="acc"><summary>Para quién es</summary><div class="acc__body"><p>Para quien quiere comprar mejor y menos, para quien no sabe cómo combinar piezas vintage y para quien sueña con una prenda hecha a su medida.</p></div></details>
      <details class="acc"><summary>Cambios y reagendamiento</summary><div class="acc__body"><p>Puedes reagendar sin costo hasta 24 horas antes.</p></div></details>
    </div>
  </div>
</div>
<section class="wrap section related"><div class="sec-head"><h2>Piezas para empezar</h2><a class="arrow-link" href="tienda.html">Ver todo</a></div><div class="grid">${unsold.slice(0, 4).map(card).join('')}</div></section>
<div class="buybar" id="buybar"><div class="buybar__t"><b>Asesoría personalizada</b><span class="tnum">${money(S.price)}</span></div><button class="btn btn--accent" type="button" data-add="${S.id}" data-open-cart>Reservar</button></div>`;
  return page({ title: 'Asesoría personalizada', desc: 'Una sesión de 60 minutos para armar tu clóset cápsula o elegir tu próxima pieza con nuestra curadora.', page: 'product', active: 'asesoria', body, scripts: ['pdp'],
    jsonld: [{ '@context': 'https://schema.org', '@type': 'Service', name: 'Asesoría personalizada', provider: { '@type': 'Organization', name: SITE.name }, offers: { '@type': 'Offer', priceCurrency: 'CLP', price: S.price } }, breadcrumbLD(bc)] });
}

/* ======================= JOURNAL ======================= */
export function journal() {
  const body = `<div class="wrap">${crumbs([{ label: 'Inicio', href: 'index.html' }, { label: 'Blog' }])}
  <header class="page-title"><span class="label label--accent">Blog</span><h1>Para mirar con calma</h1><p class="lead">Guías, historias de taller y trucos para elegir mejor lo que vistes.</p></header>
  <div class="posts" style="padding-bottom:var(--sp-9)">${POSTS.map(postCard).join('')}</div></div>`;
  return page({ title: 'Blog', desc: 'Guías de estilo, historias de taller y cómo elegir piezas vintage, lujo y upcycling.', page: 'journal', active: 'journal', body });
}
export function article(po) {
  const d = new Date(po.date + 'T12:00:00').toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
  const others = POSTS.filter(x => x.slug !== po.slug).slice(0, 3);
  const body = `<article class="article wrap wrap--narrow">${crumbs([{ label: 'Inicio', href: 'index.html' }, { label: 'Blog', href: 'journal.html' }, { label: po.title }])}
  <header class="stack" style="--stack:14px;padding-top:16px"><div class="post meta" style="display:flex;gap:14px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)"><span>${po.cat}</span><span>${d}</span><span>${po.read} min</span></div><h1>${esc(po.title)}</h1><p class="lead">${esc(po.excerpt)}</p></header>
  <div class="media hero-img">${img(PHOTO[po.photo], { alt: '', sizes: '(min-width:900px) 860px, 100vw', ws: [640, 960, 1300, 1800], w: 1300, h: 731, eager: true })}</div>
  <div class="prose">${po.body.map(t => `<p>${esc(t)}</p>`).join('')}</div>
  <div class="mt-7" style="border-top:1px solid var(--line);padding-top:var(--sp-6)"><a class="arrow-link" href="tienda.html">Ver piezas en la tienda</a></div>
</article>
<section class="section"><div class="wrap wrap--wide">${sec({ title: 'Sigue leyendo' })}<div class="posts posts--3">${others.map(postCard).join('')}</div></div></section>`;
  return page({ title: po.title, desc: po.excerpt, page: 'article', active: 'journal', body, ogImage: U(PHOTO[po.photo].id, 1200),
    jsonld: [{ '@context': 'https://schema.org', '@type': 'Article', headline: po.title, datePublished: po.date, author: { '@type': 'Organization', name: SITE.name }, image: U(PHOTO[po.photo].id, 1200), description: po.excerpt }] });
}

/* ======================= NOSOTRAS ======================= */
export function about() {
  const body = `<div class="wrap">${crumbs([{ label: 'Inicio', href: 'index.html' }, { label: 'La marca' }])}
  <header class="page-title"><span class="label label--accent">La marca</span><h1>Sagrada: más de quince años mirando ropa con otros ojos</h1></header></div>
<div class="wrap wrap--wide"><div class="media" style="--ar:21/9;background:var(--soft)">${img(pick('edCampoRojo'), { alt: 'Mujer con chaqueta roja de pie en un campo verde', sizes: '100vw', ws: [800, 1200, 1800, 2400], w: 1800, h: 771, eager: true })}</div></div>
<section class="section"><div class="wrap"><div class="cols-2">
  <div class="stack" style="--stack:20px"><h2>Una pasión que se volvió oficio</h2><p>Sagrada nació de una obsesión simple: las mejores prendas no siempre están en las vitrinas. A veces están en un clóset heredado, en una feria de barrio o en una maleta que viajó desde Europa.</p></div>
  <div class="stack" style="--stack:20px"><p>Desde hace más de quince años las buscamos, las revisamos y las ponemos de nuevo en circulación. Algunas las dejamos tal cual; otras pasan por nuestro taller de sastrería, donde se rediseñan y quedan listas para venderse.</p><p>Nuestra regla es simple: si no nos enamora, no entra. Y si entra, la cuidamos como si fuera nuestra.</p></div>
</div></div></section>
<section class="section section--soft"><div class="wrap"><div class="sec-head"><h2>Cómo elegimos</h2></div><div class="values">
  <div><h3>Calidad</h3><p>Telas nobles, buena confección y marcas que se reconocen por dentro, no solo por la etiqueta.</p></div>
  <div><h3>Historia</h3><p>Preferimos una pieza con pasado interesante antes que una nueva sin carácter.</p></div>
  <div><h3>Cuidado</h3><p>Limpieza, arreglos mínimos y medidas reales. Lo que ves es lo que llega.</p></div>
  <div><h3>Reutilizar</h3><p>Alargar la vida de una prenda es la forma más elegante de ser sustentable.</p></div>
</div></div></section>
<section class="band on-dark"><div class="wrap eye-band"><div><h2>Ojo de curadora</h2><p style="margin-top:18px;max-width:46ch">Esa es nuestra marca: una mirada que se entrena con los años. Conócela en cada pieza y, si quieres, pídenos que la pongamos a tu servicio.</p><div class="btn-row mt-6"><a class="btn btn--light" href="asesoria-personalizada.html">Reservar asesoría</a><a class="btn btn--ghost" href="tienda.html">Ver la tienda</a></div></div>${ojo('champagne')}</div></section>`;
  return page({ title: 'Sagrada, la marca', desc: 'Más de quince años curando vintage, lujo y upcycling. Conoce la mirada de Sagrada.', page: 'about', active: 'sagrada', body });
}

/* ======================= CONTACTO ======================= */
export function contact() {
  const body = `<div class="wrap">${crumbs([{ label: 'Inicio', href: 'index.html' }, { label: 'Contacto' }])}
  <header class="page-title"><span class="label label--accent">Contacto</span><h1>Escríbenos</h1><p class="lead">Una duda sobre una pieza, una pregunta sobre envíos o un pedido que ya hiciste. Te respondemos en menos de 24 horas hábiles.</p></header>
  <div class="cols-2" style="padding-bottom:var(--sp-9)">
    <div><form class="form-grid form-grid--2" data-demo novalidate aria-label="Formulario de contacto">
      <div class="field"><label for="c-n">Nombre</label><input id="c-n" required autocomplete="name"></div>
      <div class="field"><label for="c-e">Correo</label><input id="c-e" type="email" required autocomplete="email"></div>
      <div class="field span-2"><label for="c-m">Motivo</label><select id="c-m"><option>Pregunta sobre una pieza</option><option>Quiero una asesoría</option><option>Un pedido que ya hice</option><option>Otro</option></select></div>
      <div class="field span-2"><label for="c-t">Mensaje</label><textarea id="c-t" required></textarea></div>
      <div class="span-2"><button class="btn" type="submit">Enviar mensaje</button></div>
    </form><p class="form-ok mt-6" data-demo-ok hidden tabindex="-1">Gracias. Recibimos tu mensaje (en el prototipo no se envía nada).</p></div>
    <dl class="contact-card"><div><dt>Correo</dt><dd><a class="link" href="mailto:${SITE.email}">${SITE.email}</a></dd></div><div><dt>Instagram</dt><dd><a class="link" href="${SITE.igUrl}" target="_blank" rel="noopener">@${SITE.instagram}</a></dd></div><div><dt>Atención</dt><dd>Online, de lunes a viernes. Pruebas y retiros con cita previa en Santiago.</dd></div><div><dt>¿Primera vez?</dt><dd><a class="link" href="preguntas-frecuentes.html">Mira las preguntas frecuentes</a></dd></div></dl>
  </div></div>`;
  return page({ title: 'Contacto', desc: 'Escríbenos por una pieza, un pedido o la asesoría. Respondemos en menos de 24 horas hábiles.', page: 'contact', active: 'contacto', body });
}

/* ======================= FAQ ======================= */
export function faq() {
  const G = [
    ['Comprar', 'compras', [['¿Las piezas son únicas?', 'Sí. Cada prenda existe una sola vez. Cuando se vende, aparece como “Ya tiene dueña” para que veas lo que se fue.'], ['¿Puedo reservar una pieza?', 'No reservamos. La pieza es de quien paga primero. Por eso verás un aviso si ya está en la bolsa de otra persona.'], ['¿Cómo sé si me queda?', 'Medimos cada pieza en plano. Compara esas medidas con una prenda tuya que te quede bien.']]],
    ['Envíos', 'envios', [['¿Cuánto cuesta el envío?', 'Tarifa fija: Región Metropolitana $4.990 y resto del país $6.990 (valores de ejemplo en el prototipo). Retiro en Santiago sin costo.'], ['¿Cuánto demora?', 'Despachamos en 1 a 2 días hábiles y el tiempo de llegada depende de tu región.']]],
    ['Cambios', 'cambios', [['¿Aceptan cambios?', 'Por ser piezas únicas no hay cambio por talla. Sí aceptamos cambio o devolución si llega con un defecto que no estaba informado, dentro de 7 días.']]],
    ['Upcycling y asesoría', 'upcycling', [['¿Qué es el upcycling?', 'Es una prenda de buena calidad que rediseñamos en nuestro taller de sastrería y vendemos ya terminada. Cada pieza sale una sola vez.'], ['¿Reciben prendas para arreglar o transformar?', 'No. Solo vendemos piezas ya terminadas, listas para usar.']]],
    ['Pagos', 'pagos', [['¿Cómo pago?', 'Con tarjetas y transferencia a través de Flow. Ni siquiera vemos los datos de tu tarjeta.'], ['¿Piden RUT?', 'Sí, para emitir tu boleta.']]],
  ];
  const body = `<div class="wrap wrap--narrow">${crumbs([{ label: 'Inicio', href: 'index.html' }, { label: 'Preguntas frecuentes' }])}
  <header class="page-title" style="padding-inline:0"><span class="label label--accent">Ayuda</span><h1>Preguntas frecuentes</h1></header>
  ${G.map(([t, id, qs]) => `<section id="${id}" style="padding-bottom:var(--sp-7)"><h2 style="font-size:var(--fs-lg);margin-bottom:16px">${t}</h2>${qs.map(([q, a]) => `<details class="acc"><summary>${q}</summary><div class="acc__body"><p>${a}</p></div></details>`).join('')}</section>`).join('')}
  <p class="muted" style="padding-bottom:var(--sp-9)">¿No encontraste lo que buscabas? <a class="link" href="contacto.html">Escríbenos</a>.</p></div>`;
  return page({ title: 'Preguntas frecuentes', desc: 'Envíos, cambios, medidas, upcycling y pagos en Sagrada Indumentaria.', page: 'faq', active: 'faq', body,
    jsonld: [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: G.flatMap(g => g[2]).map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }] });
}

/* ======================= BOLSA / CHECKOUT / GRACIAS / 404 ======================= */
export function bag() {
  const body = `<div class="wrap">${crumbs([{ label: 'Inicio', href: 'index.html' }, { label: 'Bolsa' }])}
  <div class="co" style="padding-top:0"><div><h1>Tu bolsa</h1><div id="bag-items" class="mt-6"></div></div>
  <aside class="summary" aria-label="Resumen"><h2>Resumen</h2><div class="totals"><div><span>Subtotal</span><span class="tnum" id="bag-sub">$0</span></div><p class="muted" style="font-size:12.5px">El envío se calcula en el siguiente paso.</p></div><a class="btn btn--block btn--accent" id="bag-go" href="checkout.html">Ir a pagar</a><a class="link" href="tienda.html" style="text-align:center">Seguir mirando</a></aside></div></div>`;
  return page({ title: 'Tu bolsa', desc: 'Tu bolsa de compras', page: 'bag', active: '', body, scripts: ['bolsa'] });
}

export function checkout() {
  const body = `<div class="wrap"><div class="steps" aria-label="Pasos"><span>Bolsa</span><span aria-hidden="true">/</span><span class="on" aria-current="step">Datos y pago</span><span aria-hidden="true">/</span><span>Listo</span></div>
  <div class="co" style="padding-top:var(--sp-4)">
  <form id="co-form" novalidate aria-label="Checkout">
    <h1 style="margin-bottom:var(--sp-6)">Finalizar compra</h1>
    <fieldset><legend>1. Tus datos</legend>
      <div class="form-grid form-grid--2">
        <div class="field span-2"><label for="email">Correo</label><input id="email" name="email" type="email" required autocomplete="email" inputmode="email"><span class="err">Ingresa un correo válido</span></div>
        <div class="field"><label for="nombre">Nombre</label><input id="nombre" required autocomplete="given-name"><span class="err">Falta tu nombre</span></div>
        <div class="field"><label for="apellido">Apellido</label><input id="apellido" required autocomplete="family-name"><span class="err">Falta tu apellido</span></div>
        <div class="field"><label for="rut">RUT</label><input id="rut" required inputmode="text" autocomplete="off" placeholder="12.345.678-5" aria-describedby="rut-h"><span class="hint" id="rut-h">Lo usamos para emitir tu boleta.</span><span class="err">Revisa tu RUT</span></div>
        <div class="field"><label for="tel">Teléfono</label><input id="tel" type="tel" required autocomplete="tel" inputmode="tel" placeholder="+56 9 1234 5678"><span class="err">Falta tu teléfono</span></div>
      </div></fieldset>
    <div id="ship-block"><fieldset><legend>2. Envío</legend>
      <div class="form-grid form-grid--2">
        <div class="field"><label for="region">Región</label><select id="region" required autocomplete="address-level1"><option value="">Selecciona</option><option>Región Metropolitana</option><option>Valparaíso</option><option>Biobío</option><option>La Araucanía</option><option>Los Ríos</option><option>Los Lagos</option><option>Otra región</option></select><span class="err">Elige tu región</span></div>
        <div class="field"><label for="comuna">Comuna</label><input id="comuna" required autocomplete="address-level2"><span class="err">Falta tu comuna</span></div>
        <div class="field span-2"><label for="dir">Dirección</label><input id="dir" required autocomplete="street-address"><span class="err">Falta tu dirección</span></div>
      </div>
      <div style="display:grid;gap:10px;margin-top:6px" role="radiogroup" aria-label="Método de envío">
        <label class="radio-card"><input type="radio" name="envio" value="rm"><span><b>Región Metropolitana <em data-price="rm"></em></b><small>1 a 3 días hábiles</small></span></label>
        <label class="radio-card"><input type="radio" name="envio" value="regiones" checked><span><b>Resto de Chile <em data-price="regiones"></em></b><small>2 a 6 días hábiles según región</small></span></label>
        <label class="radio-card"><input type="radio" name="envio" value="retiro"><span><b>Retiro en Santiago <em data-price="retiro"></em></b><small>Con cita previa. Te escribimos al pagar.</small></span></label>
      </div></fieldset></div>
    <p class="form-ok" id="virtual-note" hidden>Tu bolsa solo tiene un servicio: no necesitas dirección ni envío.</p>
    <fieldset><legend>3. Pago</legend>
      <label class="radio-card"><input type="radio" name="pago" value="flow" checked><span><b>Flow <em>Tarjetas y transferencia</em></b><small>Te llevamos a Flow para pagar de forma segura. Volverás aquí al terminar.</small></span></label>
      <label class="check"><input type="checkbox" id="terms" required><span>Acepto las <a class="link" href="preguntas-frecuentes.html#cambios">políticas de envío y cambios</a>. Entiendo que cada pieza es única.</span></label>
      <button class="btn btn--accent btn--block" id="co-pay" type="submit">Pagar con Flow</button>
      <p class="muted" style="font-size:12.5px">Prototipo: no se realiza ningún cobro.</p></fieldset>
  </form>
  <aside class="summary" aria-label="Resumen de tu pedido"><h2>Tu pedido</h2><div id="co-items"></div>
    <div class="totals"><div><span>Subtotal</span><span class="tnum" id="co-sub">$0</span></div><div><span>Envío</span><span class="tnum" id="co-ship">—</span></div><div class="grand"><span>Total</span><span class="tnum" id="co-total">$0</span></div></div></aside>
  </div></div>`;
  return page({ title: 'Finalizar compra', desc: 'Checkout', page: 'checkout', active: '', body, scripts: ['checkout'] });
}

export function thanks() {
  const body = `<div class="center-page"><div class="wrap wrap--narrow" style="display:grid;gap:22px;justify-items:center">
  <img class="iso-big star-spin" src="${brand('elementos', 'estrella', 'rojo')}" alt="" width="200" height="200">
  <span class="label label--accent">Pedido recibido</span><h1 style="font-size:var(--fs-xl)">Gracias por elegirnos</h1>
  <p class="lead" id="t-msg">Te enviamos el detalle por correo. Si tienes cualquier duda, escríbenos.</p>
  <div class="order-box" id="t-box" hidden></div>
  <div class="btn-row" style="justify-content:center"><a class="btn" href="tienda.html">Seguir mirando</a><a class="btn btn--ghost" href="${SITE.igUrl}" target="_blank" rel="noopener">Ver Instagram</a></div></div></div>`;
  return page({ title: 'Gracias', desc: 'Pedido recibido', page: 'thanks', active: '', body, scripts: ['gracias'] });
}

export function notFound() {
  const body = `<div class="center-page"><div class="wrap" style="display:grid;gap:22px;justify-items:center;text-align:center">
  <img class="iso-big" src="${brand('isotipo', 'isotipo', 'rojo')}" alt="" width="200" height="200">
  <span class="label label--accent">Error 404</span><h1 style="font-size:var(--fs-xl)">Esta pieza ya no está</h1>
  <p class="lead">O quizás nunca estuvo. Vuelve a la tienda y mira lo que sí hay.</p><a class="btn" href="tienda.html">Ver la tienda</a></div></div>`;
  return page({ title: 'No encontrada', desc: 'Página no encontrada', page: '404', active: '', body });
}
