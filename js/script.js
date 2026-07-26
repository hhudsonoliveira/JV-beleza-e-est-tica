/* ============================================
   JV BELEZA & ESTÉTICA - JAVASCRIPT
   ============================================ */

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initMobileMenu();
    initSmoothScroll();
    initScrollEffects();
    initIntersectionObserver();
    initRevealAnimations();
    initGalleryPreview();
    initTermsModal();
});

// ==================== GALLERY PREVIEW (HOMEPAGE) ====================
function initGalleryPreview() {
    const items = document.querySelectorAll('.gallery-preview-item video');

    items.forEach(video => {
        const item = video.closest('.gallery-preview-item');

        item.addEventListener('mouseenter', () => video.play());
        item.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });
}

// ==================== PRELOADER ====================
function initPreloader() {
    const preloader = document.getElementById('preloader');

    if (!preloader) return;

    // Hide preloader after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
            document.body.style.overflow = ''; // Allow scrolling
        }, 1900);
    });

    // Prevent scrolling while preloader is visible
    document.body.style.overflow = 'hidden';
}

// ==================== REVEAL ANIMATIONS ====================
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .fade-in, .reveal-left, .reveal-right, .reveal-scale');

    if (!('IntersectionObserver' in window)) {
        revealElements.forEach(el => {
            el.classList.add('active');
            el.classList.add('visible');
        });
        return;
    }

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for multiple elements
                setTimeout(() => {
                    entry.target.classList.add('active');
                    entry.target.classList.add('visible');
                }, index * 100);

                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav-link');

    // Open menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
    }

    // Close menu
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    navMenu.addEventListener('click', (e) => {
        if (e.target === navMenu) {
            navMenu.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                e.preventDefault();

                // Get header height for offset
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;

                // Calculate position
                const targetPosition = targetSection.offsetTop - headerHeight;

                // Smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== SCROLL EFFECTS ====================
function initScrollEffects() {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        // Add/remove scrolled class to header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ==================== INTERSECTION OBSERVER (FADE IN ANIMATIONS) ====================
function initIntersectionObserver() {
    const fadeElements = document.querySelectorAll('.fade-in');

    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback: just show all elements
        fadeElements.forEach(el => el.classList.add('visible'));
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a small delay for staggered animation
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);

                // Stop observing this element
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// ==================== UTILITIES ====================

// Debounce function for performance optimization
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;

        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ==================== ACTIVE NAV LINK ON SCROLL ====================
// Track which section is currently in view and highlight the corresponding nav link
window.addEventListener('scroll', debounce(() => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    const scrollPosition = window.scrollY + 100; // Offset for better UX

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, 100));

// ==================== PRELOAD CRITICAL CONTENT ====================
// Ensure smooth initial load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Remove any loading overlays if present
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Lazy load images if needed (already implemented via native loading="lazy")
// But we can add a fallback for older browsers
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    console.log('Native lazy loading supported');
} else {
    // Fallback for browsers that don't support lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ==================== ERROR HANDLING ====================
// Global error handler for graceful degradation
window.addEventListener('error', (e) => {
    console.error('Error occurred:', e.error);
    // Could send to analytics or logging service here
});

// ==================== CONSOLE MESSAGE ====================
console.log('%c🌿 JV Beleza & Estética 🌿', 'color: #c9a24b; font-size: 20px; font-weight: bold;');
console.log('%cWebsite desenvolvido com HTML, CSS e JavaScript puro', 'color: #3f5b47; font-size: 12px;');
console.log('%cContato: (71) 99170-2820', 'color: #b4694a; font-size: 12px;');

// ==================== TERMOS DE USO E POLÍTICA DE PRIVACIDADE ====================
function initTermsModal() {
    const modal = document.getElementById('terms-modal');
    const openLink = document.getElementById('open-terms-modal');
    const closeBtn = document.getElementById('terms-modal-close');

    if (!modal || !openLink || !closeBtn) return;

    openLink.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
}

// ==================== EXPORT FUNCTIONS (if needed) ====================
// These functions can be called from outside if needed
window.JVBeauty = {
    scrollToSection: function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = section.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },

    openWhatsApp: function(message = 'Olá! Gostaria de agendar um horário') {
        const whatsappNumber = '5571991702820';
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    }
};
