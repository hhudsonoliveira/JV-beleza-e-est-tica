/* ============================================
   JV BELEZA & ESTÉTICA - JAVASCRIPT
   ============================================ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initMobileMenu();
    initSmoothScroll();
    initScrollEffects();
    initRevealAnimations();
    initGalleryPreview();
    initTermsModal();
});

// ==================== TRAVA DE ROLAGEM ====================
// Preloader, menu e modal podem se sobrepor. Um contador evita que o primeiro
// a fechar libere a rolagem enquanto outro ainda está aberto.
let scrollLocks = 0;

function lockScroll() {
    scrollLocks++;
    document.body.style.overflow = 'hidden';
}

function unlockScroll() {
    scrollLocks = Math.max(0, scrollLocks - 1);
    if (scrollLocks === 0) document.body.style.overflow = '';
}

// ==================== PRELOADER ====================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    // Já viu a marca nesta sessão, ou pediu menos movimento: sem espera.
    const jaVisto = sessionStorage.getItem('jv-preloader-visto') === '1';
    if (jaVisto || prefersReducedMotion.matches) {
        preloader.remove();
        return;
    }

    lockScroll();

    window.addEventListener('load', function() {
        // Só o suficiente para a marca não piscar na tela.
        setTimeout(function() {
            preloader.classList.add('hidden');
            unlockScroll();
            sessionStorage.setItem('jv-preloader-visto', '1');
            setTimeout(() => preloader.remove(), 400);
        }, 200);
    });
}

// ==================== REVEAL ANIMATIONS ====================
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .fade-in, .reveal-left, .reveal-right, .reveal-scale');

    if (!('IntersectionObserver' in window)) {
        revealElements.forEach(el => el.classList.add('active', 'visible'));
        return;
    }

    // O escalonamento vem das classes .stagger-N no CSS (transition-delay).
    // Nada de atraso extra aqui: os dois se somavam e o resultado variava
    // conforme quantos elementos entravam no mesmo lote do observer.
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active', 'visible');
            revealObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

// ==================== GALLERY PREVIEW (HOMEPAGE) ====================
function initGalleryPreview() {
    // Com preload="none" o vídeo só é baixado quando há intenção de ver.
    // Em telas de toque não há hover, então o poster é o que aparece.
    document.querySelectorAll('.gallery-preview-item video').forEach(video => {
        const item = video.closest('.gallery-preview-item');

        item.addEventListener('mouseenter', () => {
            const p = video.play();
            // Sair antes de o vídeo carregar rejeita a promise; não é erro.
            if (p) p.catch(() => {});
        });

        item.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navMenu) return;

    function abrirMenu() {
        navMenu.classList.add('show');
        navToggle.setAttribute('aria-expanded', 'true');
        lockScroll();
        if (navClose) navClose.focus();
    }

    function fecharMenu({ devolverFoco = false } = {}) {
        if (!navMenu.classList.contains('show')) return;
        navMenu.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
        unlockScroll();
        if (devolverFoco) navToggle.focus();
    }

    navToggle.addEventListener('click', abrirMenu);
    if (navClose) navClose.addEventListener('click', () => fecharMenu({ devolverFoco: true }));

    navLinks.forEach(link => link.addEventListener('click', () => fecharMenu()));

    navMenu.addEventListener('click', (e) => {
        if (e.target === navMenu) fecharMenu({ devolverFoco: true });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') fecharMenu({ devolverFoco: true });
    });
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const alvo = document.getElementById(href.substring(1));
            if (!alvo) return;

            e.preventDefault();

            const header = document.querySelector('.header');
            const alturaHeader = header ? header.offsetHeight : 0;
            // getBoundingClientRect funciona mesmo com pais posicionados;
            // offsetTop mede a partir do offsetParent, não da página.
            const destino = alvo.getBoundingClientRect().top + window.scrollY - alturaHeader;

            window.scrollTo({
                top: destino,
                behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
            });
        });
    });
}

// ==================== SCROLL EFFECTS ====================
// Um único listener, limitado a um quadro. Antes eram dois listeners de scroll
// concorrentes, um deles sem throttle, medindo layout a cada evento.
function initScrollEffects() {
    const header = document.querySelector('.header');
    const secoes = Array.from(document.querySelectorAll('section[id]'));
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));

    let agendado = false;

    function aoRolar() {
        if (agendado) return;
        agendado = true;

        requestAnimationFrame(() => {
            agendado = false;
            const y = window.scrollY;

            if (header) header.classList.toggle('scrolled', y > 50);

            if (!secoes.length) return;

            const posicao = y + 100;
            let atual = '';
            for (const secao of secoes) {
                const topo = secao.offsetTop;
                if (posicao >= topo && posicao < topo + secao.offsetHeight) {
                    atual = secao.id;
                }
            }

            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + atual);
            });
        });
    }

    window.addEventListener('scroll', aoRolar, { passive: true });
    aoRolar();
}

// ==================== TERMOS DE USO E POLÍTICA DE PRIVACIDADE ====================
function initTermsModal() {
    const modal = document.getElementById('terms-modal');
    const openLink = document.getElementById('open-terms-modal');
    const closeBtn = document.getElementById('terms-modal-close');

    if (!modal || !openLink || !closeBtn) return;

    let focoAnterior = null;

    function abrir(e) {
        e.preventDefault();
        focoAnterior = document.activeElement;
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        lockScroll();
        closeBtn.focus();
    }

    function fechar() {
        if (!modal.classList.contains('show')) return;
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        unlockScroll();
        if (focoAnterior) focoAnterior.focus();
    }

    openLink.addEventListener('click', abrir);
    closeBtn.addEventListener('click', fechar);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) fechar();
    });

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('show')) return;

        if (e.key === 'Escape') {
            fechar();
            return;
        }

        // Prende o foco dentro do modal enquanto ele estiver aberto.
        if (e.key !== 'Tab') return;

        const focaveis = modal.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])');
        if (!focaveis.length) return;

        const primeiro = focaveis[0];
        const ultimo = focaveis[focaveis.length - 1];

        if (e.shiftKey && document.activeElement === primeiro) {
            e.preventDefault();
            ultimo.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
            e.preventDefault();
            primeiro.focus();
        }
    });
}

// ==================== API PÚBLICA ====================
window.JVBeauty = {
    scrollToSection: function(sectionId) {
        const secao = document.getElementById(sectionId);
        if (!secao) return;

        const header = document.querySelector('.header');
        const alturaHeader = header ? header.offsetHeight : 0;

        window.scrollTo({
            top: secao.getBoundingClientRect().top + window.scrollY - alturaHeader,
            behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
        });
    },

    openWhatsApp: function(message) {
        const texto = message || 'Olá! Gostaria de agendar um horário';
        window.open('https://wa.me/5571991702820?text=' + encodeURIComponent(texto), '_blank');
    }
};
