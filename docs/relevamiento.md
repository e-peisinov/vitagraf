# Vitagraf 2 · Relevamiento (2026-10-22)

Landing comercial para Vitagraf. El dueño pidió que sea **moderna y profesional, pero sobre
todo una herramienta comercial**: fácil de navegar, que cualquier empresa encuentre rápido
lo que necesita y pueda consultar.

Es un proyecto aparte de `htdocs/vitagraf`, que fue el rediseño anterior con la
metáfora de «la vidriera de Calle 22».

## Datos (del sitio y del Instagram)

- Imprenta de Mercedes (Bs. As.) desde 1924, hoy a cargo de la tercera generación.
- Calle 22 Nº 261 (entre 11 y 13), B6600 Mercedes.
- Horario: lunes a viernes de 8 a 17 hs, corrido (sale de la bio de IG).
- WhatsApp 2324 67-5433 · teléfono fijo 433011 (en un posteo de IG; falta confirmar la característica 2324) · vitagraf@gmail.com.
- Redes: IG @vitagraf.imprenta (119 posteos, ~2.3 k seguidores), Facebook /vitagraf, TikTok @vitagraf.imprenta.
- Lema de la fachada histórica: «gráfica por gráficos».

## Lo que venden

**En el sitio actual:** cartelería (lona, PVC, ploteos, flybanners, corpóreos en polyfan), etiquetas
adhesivas y colgantes, bolsas (blanco, Kraft, cartulina) y producción editorial (libros, cómics,
artbooks, anuarios).

**Lo que suma el Instagram** y el sitio no muestra:

- Cajas para pizza, empanadas y hamburguesas (Manhattan, Locos por la Pizza).
- Stickers DTF y calcos chicos.
- Vasos y tazas.
- Stands.
- Ploteo de vehículos.
- Papelería corporativa: tarjetas, carpetas, sellos y calendarios.
- Volantes en offset.
- Diseño.
- Envíos.
- «Kit emprendedor» con bolsas, sello, tarjetas, cierres y calcos.
- Troqueladora nueva.

**Destacados de IG** (cada uno con su color): Publiled, Offset, Digital, Carteles, Corpóreos,
Editorial y Bolsas.

## Marca

- Logo: libro abierto en dos naranjas (`#ff9d4d` / `#ff7300`) sobre «Vitagraf» en serif ornamentada.
  El archivo tiene la palabra en blanco. Se hizo `assets/img/logo-oscuro.webp` para usarlo sobre fondo claro.
- Placas de IG: fondo blanco con degradé magenta→naranja en los bordes, sans pesada negra, palabras
  resaltadas en naranja y una pastilla naranja con flecha.
- La fachada histórica tiene el logo en verde.

## Material

`assets/` reúne lo que ya había en `htdocs/vitagraf/public`: logo, fotos de historia, fachada,
18 logos de clientes y 3 reels. A eso se suman cuadros sacados de los reels (`trabajo-*.webp`, 432×768).
**Faltan fotos originales de trabajos terminados**: cajas, vasos, carteles colocados, vehículos y libros.

## Maquetas

`/vitagraf2/maquetas/`: A «Degradé», B «Pliego», C «Tu marca, en todas partes». Las tres usan
`comun.js` para los datos, el armador de consulta para WhatsApp y Lenis. Son HTML estático con GSAP
y ScrollTrigger por CDN, sin WebGL. Para verlas: `php -S 127.0.0.1:8040 -t C:\xampp\htdocs\vitagraf2`.
