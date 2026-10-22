# Vitagraf · nueva web (maquetas)

Maquetas de la nueva landing de Vitagraf, imprenta de Mercedes (Buenos Aires) desde 1924.

- **Sitio elegido:** `maquetas/estudio.html` (dirección E «Estudio»). La raíz redirige ahí.
- **Catálogo:** `maquetas/catalogo.html` (productos por línea, fichas con fotos provisorias y consulta múltiple por WhatsApp).
- **Todas las maquetas:** `maquetas/index.html` (A Degradé, B Pliego, C Tu marca, D Papel, E Estudio).
- `maquetas/comun.js`: datos del negocio, rubros y armador de consultas por WhatsApp.
- `maquetas/estudio-base.css` y `estudio-base.js`: base compartida de inicio y catálogo (estilos, decoración en movimiento, gota de tinta, objetos de cada línea).
- `assets/`: logo, fotos de historia, logos de clientes y cuadros sacados de reels de Instagram.
- `docs/relevamiento.md`: relevamiento del sitio actual y del Instagram.

HTML estático con GSAP + ScrollTrigger y Lenis por CDN. Para verlo en local:

```bash
php -S 127.0.0.1:8040 -t .
```
