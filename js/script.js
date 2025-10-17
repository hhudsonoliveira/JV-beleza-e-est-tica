/* ============================================
   JV BELEZA & ESTÉTICA - JAVASCRIPT
   ============================================ */

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScroll();
    initScrollEffects();
    initScrollToTop();
    initIntersectionObserver();
    initFormValidation();
    initPhoneMask();
});

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

// ==================== SCROLL TO TOP BUTTON ====================
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');

    if (!scrollTopBtn) return;

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // Scroll to top when clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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

// ==================== FORM VALIDATION ====================
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form fields
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();
        const formMessage = document.getElementById('form-message');

        // Validation
        let errors = [];

        if (name === '' || name.length < 3) {
            errors.push('Por favor, insira seu nome completo.');
        }

        if (phone === '' || phone.length < 14) {
            errors.push('Por favor, insira um telefone válido.');
        }

        if (service === '') {
            errors.push('Por favor, selecione um serviço.');
        }

        if (message === '' || message.length < 10) {
            errors.push('Por favor, escreva uma mensagem com pelo menos 10 caracteres.');
        }

        // Show errors or success
        if (errors.length > 0) {
            showFormMessage(formMessage, errors.join(' '), 'error');
        } else {
            // Send to WhatsApp
            sendToWhatsApp(name, phone, service, message);

            // Show success message
            showFormMessage(formMessage, 'Redirecionando para o WhatsApp...', 'success');

            // Reset form
            contactForm.reset();
        }
    });
}

// Show form message
function showFormMessage(element, message, type) {
    element.textContent = message;
    element.className = `form-message ${type}`;
    element.style.display = 'block';

    // Hide message after 5 seconds
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

// Send form data to WhatsApp
function sendToWhatsApp(name, phone, service, message) {
    const whatsappNumber = '5571991702820';

    const whatsappMessage = `*Nova mensagem do site!*%0A%0A` +
        `*Nome:* ${encodeURIComponent(name)}%0A` +
        `*Telefone:* ${encodeURIComponent(phone)}%0A` +
        `*Serviço de Interesse:* ${encodeURIComponent(service)}%0A` +
        `*Mensagem:* ${encodeURIComponent(message)}`;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    // Open WhatsApp in new tab after a short delay
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
    }, 1000);
}

// ==================== PHONE MASK ====================
function initPhoneMask() {
    const phoneInput = document.getElementById('phone');

    if (!phoneInput) return;

    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove all non-digits

        // Limit to 11 digits (Brazilian phone)
        if (value.length > 11) {
            value = value.slice(0, 11);
        }

        // Apply mask
        if (value.length > 0) {
            if (value.length <= 2) {
                value = `(${value}`;
            } else if (value.length <= 7) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
            }
        }

        e.target.value = value;
    });

    // Prevent non-numeric input
    phoneInput.addEventListener('keypress', function(e) {
        const char = String.fromCharCode(e.which);
        if (!/[0-9]/.test(char)) {
            e.preventDefault();
        }
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
console.log('%c🌟 JV Beleza & Estética 🌟', 'color: #d4a574; font-size: 20px; font-weight: bold;');
console.log('%cWebsite desenvolvido com HTML, CSS e JavaScript puro', 'color: #5c3a1e; font-size: 12px;');
console.log('%cContato: (71) 99170-2820', 'color: #e8a080; font-size: 12px;');

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
    },

    showFormMessage: showFormMessage
};
