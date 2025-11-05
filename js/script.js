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

    // Get form fields
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const serviceInput = document.getElementById('service');
    const messageInput = document.getElementById('message');

    // REGEX PATTERNS
    // Regex para nome: apenas letras (incluindo acentuação), espaços e apóstrofo, entre 3 e 50 caracteres
    const nameRegex = /^[A-Za-zÀ-ÿ\s']{3,50}$/;

    // Regex para telefone brasileiro: aceita formatos (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
    // Também aceita variações com/sem parênteses, espaços ou hífen
    const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

    // Regex para telefone (apenas dígitos): 10 ou 11 dígitos (DDD + número)
    const phoneDigitsRegex = /^\d{10,11}$/;

    // Add real-time validation on blur (when user leaves field)
    nameInput.addEventListener('blur', function() {
        validateField(nameInput, nameRegex, 'Nome deve conter apenas letras e ter entre 3 e 50 caracteres');
    });

    phoneInput.addEventListener('blur', function() {
        const phoneValue = phoneInput.value.replace(/\D/g, ''); // Remove non-digits
        if (!phoneDigitsRegex.test(phoneValue)) {
            showFieldError(phoneInput, 'Telefone deve conter DDD e 8 ou 9 dígitos (ex: (71) 99999-9999)');
        } else {
            clearFieldError(phoneInput);
        }
    });

    messageInput.addEventListener('blur', function() {
        if (messageInput.value.trim().length < 10) {
            showFieldError(messageInput, 'Mensagem deve ter pelo menos 10 caracteres');
        } else {
            clearFieldError(messageInput);
        }
    });

    // Form submit validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const service = serviceInput.value;
        const message = messageInput.value.trim();
        const formMessage = document.getElementById('form-message');

        // Clear previous errors
        clearAllFieldErrors();

        // Validation array
        let isValid = true;
        let errors = [];

        // Validate name with regex
        if (name === '') {
            showFieldError(nameInput, 'Por favor, insira seu nome completo');
            errors.push('Nome é obrigatório');
            isValid = false;
        } else if (name.length < 3) {
            showFieldError(nameInput, 'Nome deve ter pelo menos 3 caracteres');
            errors.push('Nome muito curto');
            isValid = false;
        } else if (name.length > 50) {
            showFieldError(nameInput, 'Nome deve ter no máximo 50 caracteres');
            errors.push('Nome muito longo');
            isValid = false;
        } else if (!nameRegex.test(name)) {
            showFieldError(nameInput, 'Nome deve conter apenas letras e espaços');
            errors.push('Nome contém caracteres inválidos');
            isValid = false;
        }

        // Validate phone with regex
        const phoneDigits = phone.replace(/\D/g, ''); // Remove all non-digits for validation

        if (phone === '') {
            showFieldError(phoneInput, 'Por favor, insira seu telefone');
            errors.push('Telefone é obrigatório');
            isValid = false;
        } else if (!phoneDigitsRegex.test(phoneDigits)) {
            showFieldError(phoneInput, 'Telefone deve ter 10 ou 11 dígitos incluindo DDD (ex: (71) 99999-9999)');
            errors.push('Telefone inválido');
            isValid = false;
        } else if (!phoneRegex.test(phone)) {
            showFieldError(phoneInput, 'Formato de telefone inválido. Use: (XX) XXXXX-XXXX');
            errors.push('Formato de telefone incorreto');
            isValid = false;
        }

        // Validate service selection
        if (service === '') {
            showFieldError(serviceInput, 'Por favor, selecione um serviço');
            errors.push('Serviço não selecionado');
            isValid = false;
        }

        // Validate message
        if (message === '') {
            showFieldError(messageInput, 'Por favor, escreva uma mensagem');
            errors.push('Mensagem é obrigatória');
            isValid = false;
        } else if (message.length < 10) {
            showFieldError(messageInput, 'Mensagem deve ter pelo menos 10 caracteres');
            errors.push('Mensagem muito curta');
            isValid = false;
        } else if (message.length > 500) {
            showFieldError(messageInput, 'Mensagem deve ter no máximo 500 caracteres');
            errors.push('Mensagem muito longa');
            isValid = false;
        }

        // Show errors or success
        if (!isValid) {
            showFormMessage(formMessage, 'Por favor, corrija os erros no formulário antes de enviar.', 'error');

            // Scroll to first error
            const firstError = contactForm.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            // All validations passed
            // Send to WhatsApp
            sendToWhatsApp(name, phone, service, message);

            // Show success message
            showFormMessage(formMessage, 'Redirecionando para o WhatsApp...', 'success');

            // Reset form after delay
            setTimeout(() => {
                contactForm.reset();
                clearAllFieldErrors();
            }, 1500);
        }
    });
}

// Validate individual field with regex
function validateField(input, regex, errorMessage) {
    const value = input.value.trim();

    if (value === '' || !regex.test(value)) {
        showFieldError(input, errorMessage);
        return false;
    } else {
        clearFieldError(input);
        return true;
    }
}

// Show error message for a specific field
function showFieldError(input, message) {
    const formGroup = input.closest('.form-group');

    // Remove existing error message if any
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }

    // Add error class
    formGroup.classList.add('error');
    input.classList.add('error');

    // Create and append error message
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    formGroup.appendChild(errorElement);
}

// Clear error for a specific field
function clearFieldError(input) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.remove('error');
    input.classList.remove('error');

    const errorElement = formGroup.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Clear all field errors
function clearAllFieldErrors() {
    const errorFields = document.querySelectorAll('.form-group.error');
    errorFields.forEach(field => {
        field.classList.remove('error');
    });

    const errorInputs = document.querySelectorAll('.form-input.error');
    errorInputs.forEach(input => {
        input.classList.remove('error');
    });

    const errorMessages = document.querySelectorAll('.field-error');
    errorMessages.forEach(msg => {
        msg.remove();
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
