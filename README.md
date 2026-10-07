# Sagrada Indumentaria — prototipo web

Prototipo navegable en HTML/CSS/JS puro (sin frameworks, sin dependencias) para mostrar a la clienta y,
después, replicar en WordPress + WooCommerce dentro del tema hijo de Kadence.

- **43 páginas**: inicio, tienda (todo + Vintage / Lujo / Upcycling), 25 fichas de producto,
  asesoría (producto intangible), blog (listado + 4 artículos), sagrada (la marca), contacto, preguntas frecuentes,
  bolsa, checkout, gracias y 404.
- **Mobile first**, probado sin desbordes de 320 a 1440 px.
- **Todas las fotos están enlazadas desde Unsplash** (nada descargado). Son de ejemplo.
- `noindex` en todas las páginas + `robots.txt` que bloquea buscadores: se puede compartir el link sin que Google lo indexe.

---

## 1. Verlo en tu computador

```bash
node build.mjs          # (opcional) regenera /docs desde /src
npx serve docs          # o abre /docs con la extensión Live Server de VS Code
```

También funciona abriendo `docs/index.html` directo (no usa módulos ES).

## 2. Publicarlo en GitHub Pages

1. Sube todo el repositorio a GitHub (la carpeta `docs/` ya viene generada).
2. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta **`/docs`**.
3. El link queda como `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/` y es el que le pasas a la clienta.
   Todas las rutas son relativas, así que funciona en la subcarpeta del repo sin cambiar nada.
4. Para que la imagen al compartir en redes (Open Graph) funcione, cambia en `src/lib.mjs` el valor de `ogImage`
   por la URL absoluta de `assets/brand/og-image.png` y corre `node build.mjs`.

---

## 3. Marca: cómo se llaman los archivos

**Logos e isotipo: se usan los PNG originales de Valeria** (recortados al borde del dibujo, con fondo transparente, sin vectorizar),
en 7 colores (el color se aplica sobre el mismo canal alfa original, así los bordes son idénticos). Si Valeria entrega vectores
reales, basta reemplazarlos con **el mismo nombre** (y cambiar la extensión en `brand()` de `src/lib.mjs`).
La estrella y el ojo siguen como SVG/WebP.

```
docs/assets/brand/
├─ logos/      logo-principal-{color}.png          SAGRADA / INDUMENTARIA, apilado
│              logo-secundaria-{color}.png         igual, con la estrella arriba (usado en el footer)
│              logo-horizontal-{color}.png         SAGRADA ✷ INDUMENTARIA (estrella al medio)
│              logo-horizontal-simple-{color}.png  SAGRADA INDUMENTARIA (usado en el header)
├─ isotipo/    isotipo-{color}.png
├─ elementos/  estrella-{color}.svg
│              ojo-700.webp / ojo-1200.webp        el ojo (trama de puntos), PNG trasparente convertido a WebP
├─ favicon.svg · apple-touch-icon.png · icon-512.png · og-image.png
```

`{color}` puede ser: `negro`, `blanco`, `rojo` (Milano Red #B80B0C), `rojo-vivo` (#D70304),
`cereza` (#7F0F1D), `terciopelo` (#520E0D) y `champagne` (#E5DED6).

| Archivo original de Valeria | Nombre en el prototipo |
|---|---|
| Sagrada Versión principal | `logos/logo-principal-*` |
| Sagrada Versión secundaria | `logos/logo-secundaria-*` |
| Sagrada Versión horizontal | `logos/logo-horizontal-*` |
| Sagrada Versión horizontal 2 | `logos/logo-horizontal-simple-*` |
| Sagrada isotipo | `isotipo/isotipo-*` |
| Elemento Estrella | `elementos/estrella-*` |
| Elemento Ojo / Diseño sin título (el ojo solo) | `elementos/ojo-700.webp`, `ojo-1200.webp` |

### Dónde se usa cada elemento

| Elemento | Uso en el sitio |
|---|---|
| Logo horizontal simple (negro) | Header (cabe en móvil sin cortarse) |
| Logo secundaria (blanco) | Footer |
| Isotipo | Favicon, "foto" del producto Asesoría (sobre Milano Red, Red Velvet y Champagne), bolsa/checkout, 404 |
| Estrella | Separador de la franja que avanza, viñetas, etiqueta "Sastrería", pantalla de gracias (gira lento; se detiene con `prefers-reduced-motion`) |
| Ojo + estrella | Banda "Ojo de curadora" (inicio y La marca). Estrella en Champagne, a la mitad del tamaño original |

### Dudas de marca para Valeria
1. **Los rojos de los archivos no coinciden con la paleta aprobada.** Los archivos usan `#D70304` (rojo), `#950617` (cereza) y `#5F0605` (terciopelo);
   la paleta aprobada dice `#B80B0C`, `#7F0F1D` y `#520E0D`. Vectoricé usando los hex de la paleta y dejé además `rojo-vivo` (#D70304),
   que se usa **solo** sobre fondos oscuros porque ahí el Milano Red pierde contraste. ¿Son dos rojos a propósito o es un desfase de exportación?
2. Los archivos vienen cuadrados de 2000 px con mucho margen; para el sitio se recortaron al borde del dibujo.
3. El isotipo es un cuadrado con la estrella calada: en el header chico se lee mejor el logo horizontal que el isotipo.

---

## 4. Tipografías

| Familia | Dónde | Notas |
|---|---|---|
| **Garet Book** | Todo el sitio, un solo peso | Declarada como 400 con `font-synthesis: none` (no hay negritas falsas). Los títulos van en MAYÚSCULA con `font-feature-settings: "case"`. Precargada (`preload`) con `font-display: swap` y un *fallback* con métricas ajustadas (sin salto de layout). |
| **Garet Heavy** | Reserva | Declarada pero sin usar todavía. |
| **Wreck** / **Soft Boheme** | Disponibles (`.motto-script`, `.motto-soft`) | Los lemas "Curated pieces" y "Vintage vibes" se sacaron del sitio (ahora son texto normal en Garet), por eso no se descargan. Soft Boheme no trae `¿ ¡ · —`. |
| **Scota Demo** | **No se publica** | Está en `src/fonts-reserva/`. Es la tipografía del logo; el logo ya viene dibujado. |

> ⚠️ **Licencias**: Garet y Wreck declaran restricciones de incrustación web y Soft Boheme es de uso comercial con licencia. Confirmar
> licencia web antes de publicar el sitio definitivo (tú te encargas, según lo hablado).

---

## 5. Colores y probador de paleta

Los 6 colores aprobados son variables en `src/css/01-tokens.css`. **Paleta elegida: Champagne** (fondo champagne, negro y rojo). Es la que viene por defecto (`data-theme="champan"` en `<html>`);
el probador de paleta (`lab.js`) ya se eliminó. Las otras combinaciones siguen definidas en `01-tokens.css`:

`?theme=noir` (blanco y negro, base) · `champan` · `cereza` · `terciopelo` · `rojo`

Reglas de contraste (WCAG AA) que ya respeta el CSS: el rojo como texto solo sobre blanco o champagne; sobre negro/terciopelo solo en tamaños grandes o decorativo;
Champagne sobre colores oscuros es el mejor par; blanco sobre champagne no.


---

## 6. Imágenes: reglas para que nunca se vean mal

El problema típico (fotos zoomeadas o distintas según el dispositivo) se evita así:

1. **Caja de proporción fija** (`.media`, `aspect-ratio` 4:5) con `object-fit: cover` y un **punto focal por foto** (`--fp`, definido en `src/data/products.mjs`).
2. **Fotos de producto siempre 4:5 verticales**, mínimo 1200 px de ancho. La ficha tiene 2–5 fotos (en el prototipo, 2 de ejemplo).
3. **Heros y banners a ancho completo**: foto **vertical para móvil y horizontal para escritorio** con `<picture>` (corte en 800 px, cada una con su punto focal).
4. Todas llevan `width`/`height`, `srcset`/`sizes`, `loading="lazy"` (menos la del primer pantallazo, con `fetchpriority="high"`) y no se agrandan más allá de su tamaño real.
5. Las piezas **Ya tiene dueña** siguen en el catálogo (foto atenuada + etiqueta, precio tachado, sin botón de compra) y van al final al ordenar.

Fotos: Unsplash (enlazadas). Para la versión real, subir las fotos de cada pieza a la biblioteca de medios de WordPress.

---

## 7. De prototipo a WordPress (tema hijo de Kadence)

| Prototipo | WordPress / WooCommerce |
|---|---|
| `lib.mjs → header()/footer()/overlays()` | `header.php`, `footer.php` del hijo (o *hooks* de Kadence) |
| `lib.mjs → card()` | `woocommerce/content-product.php` |
| `pages.mjs → shop()` | `woocommerce/archive-product.php` + taxonomía `linea` (vintage, lujo, upcycling) y `product_cat` (prenda) |
| `pages.mjs → product()` | `woocommerce/single-product.php` + atributos de medidas + campo "nota de la curadora" |
| `pages.mjs → advice()` | Producto **virtual** (sin envío) con imagen = isotipo sobre fondo de marca |
| Producto "Ya tiene dueña" | Stock 1, sin *backorders*, "mostrar productos agotados" activado + plantilla de etiqueta |
| `checkout.html` + `checkout.js` | `woocommerce/checkout/form-checkout.php` + campo RUT (validación módulo 11 incluida en `checkout.js`) |
| Envío fijo (RM / regiones / retiro) | Zonas de envío con tarifa plana |
| `journal*.html` | Entradas del blog (`single.php`, `home.php`) |
| `styles.css` | `style.css` del hijo (ya usa variables y `@layer`, se copia casi igual) |
| JS | Se encola con `wp_enqueue_script` (sin dependencias) |

Plugins sugeridos (pocos): WooCommerce, Flow, SMTP (ya instalados) + uno de SEO. Nada más.

---

## 8. Cosas que son de ejemplo y hay que confirmar

- Precios, medidas, materiales y notas de curadora de las 25 piezas.
- Tarifas de envío ($4.990 / $6.990 / retiro gratis) y precio de la **asesoría ($25.000)** — se presenta a la clienta como opción.
- Texto "**Ya tiene dueña**" para las vendidas (alternativas: "Ya encontró casa", "Adoptada", "Se fue").
- Textos de inicio, La marca, preguntas frecuentes y blog (los archivos siguen llamándose journal*.html por ahora): redactados desde el Instagram, las referencias y el formulario; revisar tono con la clienta.
- "Más de quince años" (dato del formulario) y horarios de atención.
- Dirección/retiro en Santiago.
- Los nombres de las líneas: **Vintage · Lujo · Upcycling** (Upcycling se distingue con la etiqueta "Sastrería" en el menú).

## 9. Accesibilidad y rendimiento (lo que ya está resuelto)

Enlace "saltar al contenido", foco visible, cajones con trampa de foco y `inert`, `aria-live` en bolsa/filtros, objetivos táctiles ≥ 44 px,
campos de 16 px (sin zoom en iOS), `prefers-reduced-motion`, contenido visible sin JS (el JS solo agrega filtros, bolsa, buscador y checkout),
CSS en un solo archivo, JS sin dependencias, fuente precargada, datos estructurados (Store, Product, Article, FAQ, Breadcrumb).
