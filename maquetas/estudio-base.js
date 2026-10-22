/*
 * Piezas compartidas de la dirección «Estudio» (inicio y catálogo):
 * decoración en movimiento, gota de tinta detrás de los títulos, el objeto
 * ilustrado de cada línea de producto y el recálculo de medidas.
 * Necesita gsap + ScrollTrigger y comun.js (VITA) cargados antes, y en la
 * página los símbolos SVG #sticker y #libro-logo.
 */
(() => {
    const $ = (s, c = document) => c.querySelector(s);
    const $$ = (s, c = document) => [...c.querySelectorAll(s)];
    const anima = () => ! VITA.quieto && !! window.gsap;

    const COLORES = {
        naranja: ['#ff7300', '#ffb070', '#ff7300', '#8a3c00'],
        kraft: ['#c8a273', '#e6c9a0', '#c8a273', '#6e5536'],
        hueso: ['#f2eee8', '#ffffff', '#e6e0d6', '#8d877f'],
        grafito: ['#2a2724', '#5a544d', '#2a2724', '#0d0c0b'],
    };
    const stickerSvg = '<svg viewBox="-48 -48 96 96"><use href="#sticker"/></svg>';
    const registroSvg = (c) => '<svg viewBox="-50 -50 100 100" fill="none" stroke="' + c + '" stroke-width="2"><circle r="26"/><circle r="12"/><path d="M-46 0H46M0 -46V46"/></svg>';

    /*
     * Decoración. DECOR tiene, por cada contenedor [data-decor="nombre"], una
     * lista de piezas: [tipo, x, y (% de su zona), tamaño en rem, profundidad
     * (0 cerca, 1 lejos: la lejana se mueve menos y va desenfocada), color,
     * se ve en el celular]. `sinScroll` lista los contenedores cuyo
     * movimiento de scroll arma la página (por ejemplo, un riel horizontal).
     */
    function decorar(DECOR, { sinScroll = [] } = {}) {
        const piezas = [];
        $$('[data-decor]').forEach((cont) => {
            (DECOR[cont.dataset.decor] || []).forEach(([tipo, x, y, t, prof, color, movil = true]) => {
                const [c, c1, c2, c3] = COLORES[color];
                const el = document.createElement('div');
                el.className = 'deco' + (prof >= 0.75 ? ' lejos' : '') + (movil ? '' : ' no-movil') + (tipo === 'registro' ? ' registro-deco' : '');
                el.style.cssText = '--x:' + x + '%;--y:' + y + '%;--t:' + t + 'rem;--c:' + c + ';--c1:' + c1 + ';--c2:' + c2 + ';--c3:' + c3;
                const adentro = tipo === 'cubo' ? '<div class="cubo"><i></i><i></i><i></i><i></i><i></i><i></i></div>'
                    : tipo === 'esfera' ? '<div class="esfera"></div>'
                    : tipo === 'disco' ? '<div class="disco">' + stickerSvg + stickerSvg + '</div>'
                    : registroSvg(color === 'grafito' ? 'rgba(13,12,11,.35)' : 'rgba(242,238,232,.3)');
                el.innerHTML = '<div class="deco-in">' + adentro + '</div>';
                cont.append(el);
                piezas.push({ el, tipo, prof, cont });
            });
        });
        // pose de reposo, que también vale para el modo quieto
        piezas.forEach(({ el, tipo }) => {
            const n = el.querySelector('.cubo, .disco');
            if (n) n.style.transform = tipo === 'cubo' ? 'rotateX(-24deg) rotateY(38deg)' : 'rotateY(-25deg)';
        });
        if (! anima()) return piezas;

        // cada pieza flota y gira a su ritmo; las lejanas, más lento
        piezas.forEach(({ el, tipo, prof }, i) => {
            const lento = 1 + prof * 1.5;
            gsap.to(el.querySelector('.deco-in'), { y: gsap.utils.random(-26, -14), x: gsap.utils.random(-8, 8), duration: gsap.utils.random(3.2, 4.8) * lento, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.17 });
            if (tipo === 'cubo') gsap.to(el.querySelector('.cubo'), { rotateY: '+=360', rotateX: '+=180', duration: gsap.utils.random(16, 24) * lento, ease: 'none', repeat: -1 });
            if (tipo === 'disco') gsap.to(el.querySelector('.disco'), { rotateY: '+=360', duration: gsap.utils.random(7, 10) * lento, ease: 'none', repeat: -1 });
            if (tipo === 'registro') gsap.to(el.querySelector('svg'), { rotate: 360, duration: 40 * lento, ease: 'none', repeat: -1 });
        });

        // con el scroll cada pieza viaja según su profundidad: las cercanas se mueven más
        piezas.filter((p) => ! sinScroll.includes(p.cont.dataset.decor)).forEach(({ el, prof, cont }) => {
            gsap.fromTo(el, { yPercent: (1 - prof) * 160 }, { yPercent: -(1 - prof) * 260, ease: 'none', scrollTrigger: { trigger: cont.closest('section') || cont, start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
        });

        // y siguen un poco al mouse, como si se moviera la cámara
        if (matchMedia('(pointer: fine)').matches) {
            const seguir = piezas.map(({ el, prof }) => ({ x: gsap.quickTo(el, 'x', { duration: 1.4, ease: 'power3.out' }), y: gsap.quickTo(el, 'y', { duration: 1.4, ease: 'power3.out' }), k: (1 - prof) * 28 + 4 }));
            addEventListener('pointermove', (e) => {
                const dx = e.clientX / innerWidth - 0.5, dy = e.clientY / innerHeight - 0.5;
                seguir.forEach((p) => { p.x(-dx * p.k); p.y(-dy * p.k); });
            }, { passive: true });
        }
        return piezas;
    }

    // gota de tinta: cae, golpea y se abre en una mancha suave detrás del título
    function gotas(selector) {
        $$(selector).forEach((h) => {
            h.classList.add('con-gota');
            h.insertAdjacentHTML('afterbegin', '<span class="gota-lugar" aria-hidden="true"><span class="mancha"><svg viewBox="-60 -60 120 120"><g fill="#ff7300"><circle r="42"/><circle cx="46" cy="-18" r="6"/><circle cx="-40" cy="30" r="5"/><circle cx="20" cy="50" r="3.5"/><circle cx="-48" cy="-22" r="3"/><circle cx="54" cy="12" r="2.5"/></g></svg></span><span class="onda"></span><span class="gota"></span></span>');
            if (! anima()) return;
            const g = $('.gota-lugar', h);
            const t = gsap.timeline({ scrollTrigger: { trigger: h, start: 'top 82%', once: true } });
            t.fromTo($('.gota', g), { y: -170, opacity: 0, scaleY: 1.3 }, { y: 0, opacity: 1, scaleY: 1, duration: 0.6, ease: 'power2.in' })
             .to($('.gota', g), { scaleY: 0.25, scaleX: 1.8, opacity: 0, duration: 0.25, ease: 'power2.out' })
             .fromTo($('.mancha', g), { scale: 0.15, opacity: 0, rotate: gsap.utils.random(-40, 40) }, { scale: 1, opacity: 0.2, rotate: '+=12', duration: 1.3, ease: 'expo.out' }, '<')
             .fromTo($('.onda', g), { scale: 0.2, opacity: 0.7 }, { scale: 1.7, opacity: 0, duration: 1.4, ease: 'power2.out' }, '<');
        });
    }

    /*
     * Todo lo que depende de medidas se recalcula cuando terminan de cargar
     * las fuentes y cada vez que cambia el alto de la página: si no, al
     * recargar a mitad del scroll quedan posiciones viejas.
     */
    function medidasVivas() {
        if (! anima()) return;
        document.fonts?.ready.then(() => ScrollTrigger.refresh());
        let altoPrevio = 0, pendiente = 0;
        new ResizeObserver(() => {
            const alto = document.body.scrollHeight;
            if (Math.abs(alto - altoPrevio) < 2) return;
            altoPrevio = alto;
            clearTimeout(pendiente);
            pendiente = setTimeout(() => ScrollTrigger.refresh(), 200);
        }).observe(document.body);
    }

    // el objeto ilustrado de cada línea de producto (claves de VITA.servicios)
    const OBJETOS = {
        local: '<svg viewBox="0 0 200 200"><defs><linearGradient id="o1" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#ffb070"/><stop offset="1" stop-color="#ff7300"/></linearGradient></defs><rect x="20" y="52" width="160" height="70" rx="10" fill="#1a1714"/><rect x="26" y="58" width="148" height="58" rx="6" fill="url(#o1)"/><text x="100" y="96" text-anchor="middle" font-family="Geist" font-weight="700" font-size="26" letter-spacing="-1" fill="#1a1714">TU LOCAL</text><rect x="60" y="122" width="6" height="40" fill="#3a3530"/><rect x="134" y="122" width="6" height="40" fill="#3a3530"/><rect x="40" y="160" width="120" height="6" rx="3" fill="#2a2724"/></svg>',
        etiquetas: '<svg viewBox="0 0 200 200"><circle cx="70" cy="100" r="54" fill="#f2eee8"/><circle cx="70" cy="100" r="22" fill="#2a2724"/><circle cx="70" cy="100" r="16" fill="#161412"/><path d="M70 46 H190 V154 H70" fill="#f2eee8"/><use href="#sticker" transform="translate(112 100) scale(.42)"/><use href="#sticker" transform="translate(160 100) scale(.42)"/><circle cx="70" cy="100" r="54" fill="none" stroke="#d8d2c9" stroke-width="1"/></svg>',
        packaging: '<svg viewBox="0 0 200 200"><path d="M76 66 V50 Q76 30 100 30 Q124 30 124 50 V66" fill="none" stroke="#1a1714" stroke-width="5" stroke-linecap="round"/><path d="M46 60 H154 L160 180 H40 Z" fill="#c8a273"/><path d="M46 60 H154 L150 72 H50 Z" fill="#000" opacity=".12"/><use href="#sticker" transform="translate(100 122) scale(.55)"/></svg>',
        papeleria: '<svg viewBox="0 0 200 200"><g transform="rotate(-10 100 100)"><rect x="34" y="66" width="140" height="84" rx="5" fill="#1a1714"/></g><g transform="rotate(4 100 100)"><rect x="28" y="56" width="140" height="84" rx="5" fill="#f2eee8"/><use href="#libro-logo" transform="translate(62 96) scale(.8)"/><text x="88" y="94" font-family="Geist" font-weight="700" font-size="12" fill="#1a1714">Tu Nombre</text><rect x="88" y="102" width="56" height="3" rx="1.5" fill="#c9c2b8"/><rect x="88" y="110" width="40" height="3" rx="1.5" fill="#c9c2b8"/></g></svg>',
        eventos: '<svg viewBox="0 0 200 200"><path d="M70 180 V30 Q120 30 140 70 Q150 110 120 150 L84 150" fill="#ff7300"/><path d="M70 30 V180" stroke="#2a2724" stroke-width="4"/><text transform="translate(108 140) rotate(-90)" font-family="Geist" font-weight="700" font-size="16" letter-spacing="1" fill="#1a1714">TU MARCA</text><ellipse cx="70" cy="182" rx="26" ry="6" fill="#2a2724"/></svg>',
        editorial: '<svg viewBox="0 0 200 200"><rect x="56" y="30" width="104" height="146" rx="4" fill="#2a2724"/><rect x="48" y="24" width="104" height="146" rx="4" fill="#f2eee8"/><rect x="48" y="24" width="10" height="146" fill="#d8d2c9"/><text x="104" y="74" text-anchor="middle" font-family="Geist" font-weight="700" font-size="16" letter-spacing="-.5" fill="#1a1714">Anuario</text><text x="104" y="90" text-anchor="middle" font-family="Geist Mono" font-size="7" letter-spacing="1.5" fill="#8d877f">PROMOCIÓN 2026</text><use href="#libro-logo" transform="translate(104 130) scale(1.1)"/></svg>',
    };
    const objeto = (clave) => OBJETOS[clave] || '';

    window.ESTUDIO = { decorar, gotas, medidasVivas, objeto };
})();
