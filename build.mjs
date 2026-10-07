// Generador del prototipo: node build.mjs  →  escribe todo en /docs (listo para GitHub Pages).
import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync } from 'node:fs';
import { PRODUCTS, SERVICE, LINES, CATS } from './src/data/products.mjs';
import { POSTS } from './src/data/posts.mjs';
import { thumb, productUrl, lineName } from './src/lib.mjs';
import * as P from './src/pages.mjs';

const out = (f, c) => { writeFileSync('docs/' + f, c); };
mkdirSync('docs/js', { recursive: true });

// CSS: un solo archivo (una petición)
const css = readdirSync('src/css').sort().map(f => readFileSync('src/css/' + f, 'utf8')).join('\n');
out('styles.css', css);
// JS: se copia tal cual (sin build, sin módulos: funciona también abriendo el archivo directo)
for (const f of readdirSync('src/js')) copyFileSync('src/js/' + f, 'docs/js/' + f);

// Datos mínimos para bolsa/buscador (en WordPress: lo reemplaza la API de WooCommerce / fragmentos del carrito)
const data = [...PRODUCTS, SERVICE].map(p => p.virtual
  ? { id: p.id, title: p.title, price: p.price, sold: false, virtual: true, url: 'asesoria-personalizada.html', thumb: '', fp: '50% 50%', lineName: 'Servicio', catName: 'Asesoría' }
  : { id: p.id, title: p.title, price: p.price, sold: p.sold, virtual: false, url: productUrl(p), thumb: thumb(p), fp: p.imgs[0].fp, lineName: lineName(p), catName: CATS[p.cat] });
out('assets/data.js', 'window.SG_DATA=' + JSON.stringify({ products: data }) + ';');

out('index.html', P.home());
out('tienda.html', P.shop(null));
for (const k of Object.keys(LINES)) out(LINES[k].slug + '.html', P.shop(k));
for (const p of PRODUCTS) out(productUrl(p), P.product(p));
out('asesoria-personalizada.html', P.advice());
out('journal.html', P.journal());
for (const po of POSTS) out(`journal-${po.slug}.html`, P.article(po));
out('sagrada.html', P.about());
out('contacto.html', P.contact());
out('preguntas-frecuentes.html', P.faq());
out('bolsa.html', P.bag());
out('checkout.html', P.checkout());
out('gracias.html', P.thanks());
out('404.html', P.notFound());
out('robots.txt', 'User-agent: *\nDisallow: /\n');
console.log('OK:', readdirSync('docs').filter(f => f.endsWith('.html')).length, 'páginas HTML');
