// Catálogo de ejemplo. En WooCommerce: cada pieza = producto simple, stock 1, sin backorders.
// Fotos: Unsplash (enlazadas, no descargadas). En producción cada pieza lleva 3–5 fotos reales en formato 4:5.
// fp = punto focal (x% y%) para que el recorte nunca corte lo importante.

export const LINES = {
  'vintage':   { name: 'Vintage & Pre-loved',   slug: 'tienda-vintage',   short: 'Piezas de otra época que hoy se ven más actuales que nunca.' },
  'lujo': { name: 'Lujo', slug: 'tienda-lujo', short: 'Lujo y marcas de siempre, usadas con cariño y listas para otra vida.' },
  'upcycling': { name: 'Upcycling', slug: 'tienda-upcycling', short: 'Prendas reconstruidas en nuestro taller de sastrería. Edición única.' },
};

export const CATS = {
  abrigos: 'Abrigos', chaquetas: 'Chaquetas', blazers: 'Blazers', tejidos: 'Tejidos', vestidos: 'Vestidos', carteras: 'Carteras',
};

const I = (id, fp = '50% 35%') => ({ id, fp });

// Banco de fotos (todas mujer / producto). Clave corta → id Unsplash.
export const PHOTO = {
  abrigoCamel:   I('1539533113208-f6df8cc8b543', '50% 40%'),
  abrigoChoco:   I('1618333453296-9e35280fd6b1', '50% 35%'),
  abrigoLargo:   I('1589400445193-c881a4b0b38a', '50% 35%'),
  gabardina:     I('1676716105765-e19fe6a01851', '50% 40%'),
  abrigoCinto:   I('1633821879282-0c4e91f96232', '50% 40%'),
  abrigoWrap:    I('1550872199-63f4382fe925',   '55% 40%'),
  abrigoCalle:   I('1637102146291-c408b298e22b', '50% 40%'),
  cueroNegro:    I('1602370463198-086436840055', '50% 30%'),
  cueroCuello:   I('1511280303142-0051e93baeeb', '50% 35%'),
  cueroCama:     I('1727515546577-f7d82a47b51d', '50% 50%'),
  cueroMarron:   I('1619731428826-a535570610b1', '50% 35%'),
  cueroSonrisa:  I('1615397815341-bb06f6d55c94', '50% 35%'),
  blazerGris:    I('1608234808654-2a8875faa7fd', '50% 35%'),
  blazerNegro:   I('1566758456102-02bea9470947', '50% 35%'),
  blazerRojo:    I('1762331974989-417a274b2c2b', '50% 30%'),
  blazerVerde:   I('1578432156830-0ca0d7913b7f', '50% 35%'),
  blazerCama:    I('1629511565591-a1d494ad6c58', '50% 40%'),
  blazerPant:    I('1584273143981-41c073dfe8f8', '50% 35%'),
  sweaterRojo:   I('1608984361471-ff566593088f', '50% 40%'),
  cardiganCrudo: I('1588271968087-4c51abe05afc', '50% 45%'),
  vestidoRojo:   I('1651047666890-8eab731ee345', '50% 35%'),
  vestidoAzul:   I('1704775983143-2c83798831db', '50% 35%'),
  vestidoBordo:  I('1773574488221-08b2883a1c80', '50% 35%'),
  vestidoLunar:  I('1653688257587-004cb9193bd4', '50% 40%'),
  vestidoRaya:   I('1784658614357-16e9986a757a', '50% 40%'),
  carteraNegra:  I('1705909237050-7a7625b47fac', '50% 50%'),
  carteraGris:   I('1559563458-527698bf5295',    '50% 50%'),
  carteraPetro:  I('1594223274512-ad4803739b7c', '50% 50%'),
  taller1:       I('1606501126768-b78d4569d3f9', '50% 50%'),
  taller2:       I('1457972657980-4c9fddebec8d', '50% 50%'),
  taller3:       I('1745847655362-fc86d76584b2', '50% 50%'),
  tallerHilo:    I('1568288796918-03e7d93306bd', '50% 50%'),
  perchaTienda:  I('1441984904996-e0b6ba687e04', '50% 50%'),
  perchaMadera:  I('1490481651871-ab68de25d43d', '50% 50%'),
  perchaColor:   I('1445205170230-053b83016050', '50% 50%'),
  // Editoriales horizontales (escritorio)
  edRojoCielo:   I('1662532577856-e8ee8b138a8b', '50% 40%'),
  edBlanco:      I('1638265499174-62c2cb29137a', '50% 40%'),
  edCampoRojo:   I('1778696449956-a2b5fe22d432', '50% 55%'),
  edTrigo:       I('1448376561459-dbe8868fa34c', '50% 45%'),
  edVestidoNegro:I('1717766430321-d8390f663932', '50% 45%'),
  edCosta:       I('1577909687863-91bb3ec12db5', '55% 40%'),
  edCamino:      I('1711467714592-56781075e928', '50% 55%'),
  edEscaleras:   I('1762343287001-b5c8ed1bf773', '50% 50%'),
};

// Medidas planas en cm por categoría (base) — se varían un poco por pieza
const M = {
  abrigos:   { Hombro: 41, Busto: 54, Largo: 105 },
  chaquetas: { Hombro: 39, Busto: 51, Largo: 58 },
  blazers:   { Hombro: 39, Busto: 49, Largo: 68 },
  tejidos:   { Hombro: 38, Busto: 47, Largo: 58 },
  vestidos:  { Hombro: 36, Busto: 46, Largo: 98 },
  carteras:  { Ancho: 28, Alto: 19, Fondo: 11 },
};
const m = (cat, d = 0) => Object.fromEntries(Object.entries(M[cat]).map(([k, v], i) => [k, v + (i === 2 ? d * 2 : d)]));

// Orden: el primero es el más nuevo
const raw = [
  ['abrigo-camel-lana-botonadura-simple', 'Abrigo camel de lana', 'vintage', 'abrigos', 249000, false, ['abrigoCamel', 'abrigoCinto'], 'Lana virgen', 'Etiqueta italiana', 'Excelente', 'Un camel de los de antes: hombro limpio, caída pesada y ese largo que se ve caro con jeans o con vestido. Cero pelusas, forro intacto.'],
  ['blazer-rojo-estructurado', 'Blazer rojo estructurado', 'vintage', 'blazers', 89000, false, ['blazerRojo', 'edCampoRojo'], 'Lana y poliéster', 'Confección europea', 'Muy bueno', 'El rojo que arregla un outfit entero. Hombreras suaves, solapa ancha, un solo botón. Úsalo abierto sobre una polera blanca.'],
  ['chaqueta-cuero-negra-clasica', 'Chaqueta de cuero negra', 'vintage', 'chaquetas', 189000, false, ['cueroNegro', 'cueroCuello'], 'Cuero de cordero', 'Sin etiqueta, hechura impecable', 'Muy bueno', 'Cuero blando, ya con la forma justa. De esas chaquetas que mejoran con el tiempo y que nunca pasan de moda.'],
  ['vestido-bordo-detalle-plumas', 'Vestido bordó con plumas', 'lujo', 'vestidos', 159000, false, ['vestidoBordo', 'edVestidoNegro'], 'Seda y plumas', 'Marca premium europea', 'Excelente', 'Para esa noche en que sí quieres que te miren. Usado una vez. Viene con su bolsa de tela original.'],
  ['blazer-gris-reconstruido', 'Blazer gris reconstruido', 'upcycling', 'blazers', 139000, false, ['blazerPant', 'taller2'], 'Lana fría', 'Intervenido en taller Sagrada', 'Nuevo (intervenido)', 'Un blazer masculino de buena lana al que le cambiamos el hombro, la cintura y el largo. Queda como si lo hubieran hecho para ti.'],
  ['sweater-bordo-cuello-camisa', 'Sweater bordó cuello camisa', 'lujo', 'tejidos', 59000, false, ['sweaterRojo', 'cardiganCrudo'], 'Lana merino', 'Etiqueta inglesa', 'Excelente', 'Punto fino y cuello de camisa asomando. Va con falda midi, con jeans, con todo.'],
  ['abrigo-beige-cinturon', 'Abrigo beige con cinturón', 'vintage', 'abrigos', 229000, false, ['abrigoWrap', 'abrigoCamel'], 'Lana y cachemira', 'Etiqueta italiana', 'Excelente', 'Se cruza y se amarra: sin botones, sin esfuerzo. Largo hasta la pantorrilla.'],
  ['cartera-negra-baulito', 'Cartera negra tipo baulito', 'lujo', 'carteras', 219000, false, ['carteraNegra', 'carteraPetro'], 'Cuero liso', 'Marca de lujo europea', 'Muy bueno', 'Doble asa y herrajes plateados. Entra todo y se ve siempre ordenada. Incluye dustbag.'],
  ['chaqueta-cuero-marron-oversize', 'Chaqueta de cuero marrón', 'vintage', 'chaquetas', 175000, true, ['cueroMarron', 'cueroSonrisa'], 'Cuero vacuno', 'Hechura nacional años 90', 'Bueno', 'Marrón tabaco, hombros anchos y un desgaste noble en los codos. Ya tiene dueña.'],
  ['vestido-lunares-midi', 'Vestido de lunares midi', 'vintage', 'vestidos', 99000, false, ['vestidoLunar', 'vestidoRaya'], 'Viscosa', 'Años 70', 'Muy bueno', 'Escote en V, cintura marcada y vuelo. El vestido de lunares que sí es de verdad de esa época.'],
  ['abrigo-chocolate-oversize', 'Abrigo chocolate oversize', 'lujo', 'abrigos', 169000, false, ['abrigoChoco', 'abrigoLargo'], 'Lana mezcla', 'Marca premium europea', 'Excelente', 'Un abrigo grande, cómodo y sin ruido. Para el invierno del sur.'],
  ['blazer-negro-doble-botonadura', 'Blazer negro doble botonadura', 'lujo', 'blazers', 110000, false, ['blazerNegro', 'blazerGris'], 'Lana fría', 'Marca de sastrería italiana', 'Excelente', 'El blazer negro que todas buscan y pocas encuentran bien cortado. Ya con el largo exacto para pantalón o falda.'],
  ['abrigo-camel-reinterpretado', 'Abrigo camel reinterpretado', 'upcycling', 'abrigos', 205000, false, ['abrigoLargo', 'taller3'], 'Lana', 'Intervenido en taller Sagrada', 'Nuevo (intervenido)', 'Un abrigo clásico al que le sacamos la rigidez: nuevo cuello, nuevo largo, bolsillos más bajos.'],
  ['vestido-azul-marino-satinado', 'Vestido azul marino satinado', 'lujo', 'vestidos', 85000, false, ['vestidoAzul', 'vestidoBordo'], 'Satín', 'Marca chilena de diseño', 'Muy bueno', 'Satín con caída líquida. Sirve igual para un matrimonio que para una cena con amigas.'],
  ['gabardina-clasica-beige', 'Gabardina clásica beige', 'vintage', 'abrigos', 135000, true, ['gabardina', 'abrigoCalle'], 'Algodón impermeable', 'Etiqueta británica', 'Muy bueno', 'Gabardina de verdad, de las que aguantan lluvia de Santiago. Ya tiene dueña.'],
  ['blazer-verde-musgo', 'Blazer verde musgo', 'vintage', 'blazers', 79000, false, ['blazerVerde', 'blazerCama'], 'Lana mezcla', 'Años 80', 'Muy bueno', 'Verde profundo y hombros marcados. Pide pantalón negro y poco más.'],
  ['cardigan-crudo-trenzado', 'Cárdigan crudo trenzado', 'lujo', 'tejidos', 52000, false, ['cardiganCrudo', 'sweaterRojo'], 'Lana y alpaca', 'Confección artesanal', 'Muy bueno', 'Trenzas gruesas y botones de madera. Calentito, suave y sin picar.'],
  ['chaqueta-cuero-reconstruida', 'Chaqueta de cuero reconstruida', 'upcycling', 'chaquetas', 165000, false, ['cueroSonrisa', 'tallerHilo'], 'Cuero y lana', 'Intervenido en taller Sagrada', 'Nuevo (intervenido)', 'Una biker clásica con forro nuevo y puños en lana. Pieza única hecha a mano en el taller.'],
  ['cartera-gris-herrajes', 'Cartera gris con herrajes', 'lujo', 'carteras', 289000, false, ['carteraGris', 'carteraNegra'], 'Cuero grabado', 'Marca de lujo italiana', 'Excelente', 'Gris perla, herrajes dorados. De esas carteras que se heredan.'],
  ['vestido-rojo-fluido', 'Vestido rojo fluido', 'vintage', 'vestidos', 119000, true, ['vestidoRojo', 'edRojoCielo'], 'Crepé', 'Años 90', 'Muy bueno', 'Rojo intenso y espalda abierta. Ya tiene dueña.'],
  ['chaqueta-cuero-biker', 'Chaqueta biker de cuero', 'vintage', 'chaquetas', 210000, false, ['cueroCama', 'cueroNegro'], 'Cuero vacuno', 'Etiqueta italiana', 'Excelente', 'Cierre diagonal, solapa y cinturón en la cintura. Cuero grueso que se ablanda con el uso.'],
  ['vestido-listado-camisero', 'Vestido listado camisero', 'lujo', 'vestidos', 72000, false, ['vestidoRaya', 'vestidoLunar'], 'Algodón', 'Marca chilena de diseño', 'Muy bueno', 'Rayas finas, cinturón de tela y un largo que se ve elegante sin esfuerzo.'],
  ['cartera-petroleo-doble-asa', 'Cartera petróleo doble asa', 'lujo', 'carteras', 129000, true, ['carteraPetro', 'carteraGris'], 'Cuero', 'Marca premium', 'Muy bueno', 'Un color que no se ve en la calle. Ya tiene dueña.'],
  ['blazer-negro-intervenido', 'Blazer negro intervenido', 'upcycling', 'blazers', 119000, false, ['blazerCama', 'taller1'], 'Lana', 'Intervenido en taller Sagrada', 'Nuevo (intervenido)', 'Cortamos, rehicimos hombros y sumamos un forro estampado. Un blazer negro con secreto.'],
  ['abrigo-urbano-reconstruido', 'Abrigo urbano reconstruido', 'upcycling', 'abrigos', 195000, true, ['abrigoCalle', 'tallerHilo'], 'Lana', 'Intervenido en taller Sagrada', 'Nuevo (intervenido)', 'Dos abrigos se convirtieron en uno. Ya tiene dueña.'],
];

export const PRODUCTS = raw.map(([slug, title, line, cat, price, sold, photos, mats, label, state, note], i) => ({
  id: 'SG-' + String(i + 1).padStart(3, '0'),
  slug, title, line, cat, price, sold, mats, label, state, note,
  order: i, // 0 = más nuevo
  imgs: photos.map(k => PHOTO[k]),
  measures: m(cat, (i % 3) - 1),
}));

// Producto intangible (no requiere envío). Su "foto" es el isotipo sobre color de marca.
export const SERVICE = {
  id: 'SG-ASE', slug: 'asesoria-personalizada', title: 'Asesoría personalizada', line: 'servicio', cat: 'servicio',
  price: 25000, sold: false, virtual: true,
};
