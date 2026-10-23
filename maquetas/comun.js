/*
 * Lo que comparten las tres maquetas: los datos del negocio (sacados de
 * vitagraf.com.ar y de @vitagraf.imprenta, nada inventado), los enlaces a
 * WhatsApp, el armador de consultas y el scroll suave.
 *
 * Cada maqueta pinta los datos con su propio estilo usando los ganchos
 * data-servicios, data-consulta, data-clientes y data-wa.
 */
(() => {
    const VITA = {
        whatsapp: '5492324675433',
        whatsappVisible: '2324 67-5433',
        telefono: '(2324) 43-3011',
        email: 'vitagraf@gmail.com',
        direccion: 'Calle 22 Nº 261 (e/ 11 y 13)',
        localidad: 'Mercedes, Buenos Aires',
        horario: 'Lunes a viernes de 8 a 17 hs, corrido',
        mapa: 'https://www.google.com/maps/search/?api=1&query=C.+22+261%2C+B6600+Mercedes%2C+Provincia+de+Buenos+Aires%2C+Argentina',
        mapaEmbebido: 'https://maps.google.com/maps?q=C.+22+261,+B6600+Mercedes,+Provincia+de+Buenos+Aires,+Argentina&z=16&output=embed',

        // Agrupados por lo que necesita el cliente, no por máquina. Los
        // colores son los de los destacados del Instagram.
        servicios: [
            {
                clave: 'local', color: '#f15a24', icono: 'cartel',
                titulo: 'Cartelería y vidrieras',
                pregunta: 'Quiero que se vea mi local',
                resumen: 'Que tu negocio se vea desde la vereda.',
                foto: '../assets/img/fachada.webp',
                productos: ['Carteles en lona', 'Carteles en PVC para exterior e interior', 'Letras corpóreas en polyfan', 'Ploteo de vidrieras y exteriores', 'Ploteo de muebles, heladeras y exhibidores', 'Flybanners'],
            },
            {
                clave: 'etiquetas', color: '#e4007c', icono: 'etiqueta',
                titulo: 'Etiquetas y stickers',
                pregunta: 'Necesito etiquetas para mis productos',
                resumen: 'Adhesivas, colgantes y DTF, en la medida que necesites.',
                foto: '../assets/img/trabajo-planilla.webp',
                productos: ['Etiquetas adhesivas', 'Etiquetas colgantes para ropa, bolsas y botellas', 'Stickers DTF: brillo, relieve y resistentes al agua', 'Calcos chicos, en tiempo récord'],
            },
            {
                clave: 'packaging', color: '#22a565', icono: 'bolsa',
                titulo: 'Bolsas y packaging',
                pregunta: 'Quiero bolsas o cajas con mi marca',
                resumen: 'Que tu cliente te recuerde desde el empaque.',
                foto: '../assets/img/trabajo-bolsa.webp',
                productos: ['Bolsas en papel blanco, Kraft y cartulina', 'Cajas para pizzas, empanadas y hamburguesas', 'Cierres de bolsa adhesivos', 'Hacemos envíos'],
            },
            {
                clave: 'papeleria', color: '#8cc63f', icono: 'tarjeta',
                titulo: 'Papelería e imagen de empresa',
                pregunta: 'Necesito papelería para mi empresa',
                resumen: 'Tarjetas, carpetas y todo lo que entregás en mano.',
                foto: '../assets/img/trabajo-tarjeta.webp',
                productos: ['Tarjetas personales', 'Carpetas de presentación', 'Sellos con tu logo', 'Calendarios', 'Volantes en offset'],
            },
            {
                clave: 'eventos', color: '#29abe2', icono: 'stand',
                titulo: 'Stands, vehículos y merchandising',
                pregunta: 'Tengo un evento o quiero regalos con mi marca',
                resumen: 'Tu marca en movimiento y en cada detalle.',
                foto: '../assets/img/trabajo-plotter.webp',
                productos: ['Gráfica para stands', 'Ploteo de vehículos', 'Tazas y vasos con tu marca'],
            },
            {
                clave: 'editorial', color: '#fbb03b', icono: 'libro',
                titulo: 'Libros y anuarios',
                pregunta: 'Quiero imprimir un libro o un anuario',
                resumen: 'Producción editorial completa, de la prueba al encuadernado.',
                foto: '../assets/img/trabajo-pliegos.webp',
                productos: ['Libros de cuentos y novelas', 'Cómics y artbooks', 'Anuarios escolares y de empresas'],
            },
        ],

        pasos: [
            ['Contanos qué necesitás', 'Por WhatsApp, por teléfono o en el local. Con una foto o una idea alcanza.'],
            ['Te asesoramos', 'Material, medida y cantidad. Revisamos tu archivo o lo diseñamos con vos.'],
            ['Lo producimos acá', 'Offset, digital, DTF, corte y troquelado en nuestro taller de Mercedes.'],
            ['Retirás o te lo enviamos', 'Con entregas programadas para que llegue cuando lo necesitás.'],
        ],

        clientes: [
            ['Cruz de Palo', 'cruz-de-palo'], ['Dasein', 'dasein'], ['Angus Brother', 'angus-brother'],
            ['Chicago Cafetería', 'chicago'], ['Universidad Nacional de Luján', 'unlu'], ['Agrale', 'agrale'],
            ['Clínica Güemes', 'clinica-guemes'], ['Municipalidad de Mercedes', 'mercedes'], ['Almacén de Vinos 1812', 'vinos-1812'],
            ['De\'Roca', 'de-roca'], ['Breaking Burger', 'breaking-burger'], ['Moler', 'moler'],
            ['ISCM', 'iscm'], ['San Martín', 'san-martin'], ['Cruz Azul', 'cruz-azul'],
            ['San Andrés de Giles', 'san-andres-de-giles'], ['CAM CNC', 'camcnc'], ['Magromer', 'magromer'],
        ],

        wa(texto) {
            return 'https://wa.me/' + VITA.whatsapp + '?text=' + encodeURIComponent(texto || '¡Hola! Vengo del sitio web y quería hacerles una consulta.');
        },
    };
    window.VITA = VITA;

    const $ = (s, c = document) => c.querySelector(s);
    const $$ = (s, c = document) => [...c.querySelectorAll(s)];
    const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

    // Íconos de línea propios, uno por rubro (24×24, trazo 1.8).
    const ICONOS = {
        cartel: '<path d="M3 4h18v10H3z"/><path d="M8 14v6M16 14v6M6 20h12"/>',
        etiqueta: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
        bolsa: '<path d="M5 8h14l-1 13H6z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/>',
        tarjeta: '<rect x="3" y="6" width="18" height="12" rx="1"/><path d="M7 10h6M7 14h4"/>',
        stand: '<path d="M4 20V5l8-2 8 2v15"/><path d="M4 9h16M9 20v-6h6v6"/>',
        libro: '<path d="M12 6c-2-1.5-5-2-9-2v15c4 0 7 .5 9 2 2-1.5 5-2 9-2V4c-4 0-7 .5-9 2z"/><path d="M12 6v15"/>',
        wa: '<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2z"/>',
        flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    };
    VITA.icono = (n, clase = 'ico') => '<svg class="' + clase + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONOS[n] || '') + '</svg>';

    // Pinta las plantillas que deja cada maqueta (<template data-servicio>)
    // reemplazando {{campo}}. Así cada una decide su HTML.
    function pintar(contenedor, plantilla, lista) {
        const molde = plantilla.innerHTML;
        contenedor.insertAdjacentHTML('beforeend', lista.map((d, i) => molde.replace(/\{\{(\w+)\}\}/g, (_, k) => {
            if (k === 'i') return String(i + 1).padStart(2, '0');
            if (k === 'iconoSvg') return VITA.icono(d.icono);
            if (k === 'lista') return d.productos.map((p) => '<li>' + esc(p) + '</li>').join('');
            if (k === 'waUrl') return esc(VITA.wa('¡Hola! Vengo del sitio web y quería consultar por ' + d.titulo.toLowerCase() + '.'));
            return esc(d[k] ?? '');
        })).join(''));
    }
    $$('[data-servicios]').forEach((c) => pintar(c, $('template', c), VITA.servicios));
    $$('[data-pasos]').forEach((c) => pintar(c, $('template', c), VITA.pasos.map(([titulo, texto]) => ({ titulo, texto }))));
    $$('[data-clientes]').forEach((c) => pintar(c, $('template', c), VITA.clientes.map(([nombre, logo]) => ({ nombre, logo }))));
    $$('[data-wa]').forEach((a) => { a.href = VITA.wa(a.dataset.wa); a.target = '_blank'; a.rel = 'noopener'; });
    $$('[data-dato]').forEach((el) => { el.textContent = VITA[el.dataset.dato]; });

    /*
     * Armador de consulta: rubro → producto → para cuándo / cantidad → abre
     * WhatsApp con todo escrito. Es la herramienta comercial de la página.
     */
    $$('[data-consulta]').forEach((form) => {
        const rubros = $('[data-rubros]', form);
        const productos = $('[data-productos]', form);
        // la vista previa puede estar dentro del formulario o afuera, apuntando a él
        const vista = $('[data-vista]', form) || $('[data-vista-de="' + form.id + '"]');
        const estado = { rubro: null, productos: new Set() };

        rubros.innerHTML = VITA.servicios.map((s) => '<button type="button" class="chip" style="--c:' + s.color + '" data-rubro="' + s.clave + '" aria-pressed="false">' + VITA.icono(s.icono) + '<span>' + esc(s.titulo) + '</span></button>').join('');

        const texto = () => {
            const s = VITA.servicios.find((x) => x.clave === estado.rubro);
            const d = new FormData(form);
            const l = ['¡Hola Vitagraf! Vengo del sitio web.'];
            if (s) l.push('Quiero consultar por ' + s.titulo.toLowerCase() + (estado.productos.size ? ': ' + [...estado.productos].join(', ').toLowerCase() : '') + '.');
            if (d.get('cantidad')) l.push('Cantidad aproximada: ' + d.get('cantidad') + '.');
            if (d.get('diseno')) l.push(d.get('diseno') + '.');
            if (d.get('detalle')) l.push(d.get('detalle'));
            if (d.get('nombre')) l.push('Soy ' + d.get('nombre') + '.');
            return l.join('\n');
        };
        const refrescar = () => { if (vista) vista.textContent = texto(); };

        rubros.addEventListener('click', (e) => {
            const b = e.target.closest('[data-rubro]');
            if (! b) return;
            estado.rubro = b.dataset.rubro;
            estado.productos.clear();
            $$('[data-rubro]', rubros).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
            const s = VITA.servicios.find((x) => x.clave === estado.rubro);
            productos.innerHTML = s.productos.map((p) => '<button type="button" class="chip chip-chico" style="--c:' + s.color + '" data-producto="' + esc(p) + '" aria-pressed="false">' + esc(p) + '</button>').join('');
            productos.closest('[data-paso-productos]')?.removeAttribute('hidden');
            form.style.setProperty('--rubro', s.color);
            refrescar();
        });
        productos.addEventListener('click', (e) => {
            const b = e.target.closest('[data-producto]');
            if (! b) return;
            const p = b.dataset.producto;
            estado.productos.has(p) ? estado.productos.delete(p) : estado.productos.add(p);
            b.setAttribute('aria-pressed', String(estado.productos.has(p)));
            refrescar();
        });
        form.addEventListener('input', refrescar);
        form.addEventListener('change', refrescar);
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            window.open(VITA.wa(texto()), '_blank', 'noopener');
        });
        // Desde cualquier botón con data-elegir="clave" se llega al armador con el rubro marcado.
        $$('[data-elegir]').forEach((a) => a.addEventListener('click', () => {
            $('[data-rubro="' + a.dataset.elegir + '"]', rubros)?.click();
        }));
        refrescar();
    });

    /*
     * Movimiento. Con «reducir movimiento» activado el sitio sigue animado
     * (las escenas cuentan el trabajo de la imprenta), pero en modo suave:
     * sin scroll con inercia, con menos zoom de cámara y con la decoración
     * casi quieta, que es lo que marea. Las páginas leen VITA.suave.
     * El modo quieto (todo estático) queda solo para las capturas: ?captura.
     */
    const QUIETO = new URLSearchParams(location.search).has('captura');
    const SUAVE = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (QUIETO) document.documentElement.classList.add('quieto');
    if (SUAVE) document.documentElement.classList.add('suave');
    VITA.quieto = QUIETO;
    VITA.suave = SUAVE;

    if (! QUIETO && window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        if (window.Lenis && ! SUAVE) {
            const lenis = new Lenis({ lerp: 0.1 });
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((t) => lenis.raf(t * 1000));
            gsap.ticker.lagSmoothing(0);
            VITA.lenis = lenis;
            $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
                const destino = $(a.getAttribute('href'));
                if (! destino) return;
                e.preventDefault();
                lenis.scrollTo(destino, { offset: -70, duration: 1.4 });
            }));
        }
    }

    // Apariciones simples que usan las tres maquetas: [data-aparecer].
    VITA.aparecer = () => {
        if (QUIETO || ! window.gsap) return;
        $$('[data-aparecer]').forEach((el) => {
            gsap.from(el.dataset.aparecer === 'hijos' ? el.children : el, {
                y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.07,
                scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            });
        });
    };
})();
