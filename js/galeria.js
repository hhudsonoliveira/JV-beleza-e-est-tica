/* ============================================
   GALERIA - LIGHTBOX JAVASCRIPT
   JV BELEZA & ESTÉTICA
   ============================================ */

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    initGallery();
    initLightbox();
});

// ==================== GALLERY INITIALIZATION ====================
let galleryItems = [];
let currentIndex = 0;

function initGallery() {
    // Get all gallery items
    const items = document.querySelectorAll('.gallery-item');

    // Convert NodeList to Array and store media info
    galleryItems = Array.from(items).map(item => {
        const type = item.dataset.type;
        const index = parseInt(item.dataset.index);
        let src = '';

        if (type === 'image') {
            src = item.querySelector('img').src;
        } else if (type === 'video') {
            src = item.querySelector('video source').src;
        }

        return {
            type: type,
            src: src,
            index: index,
            element: item
        };
    });

    // Add click event to each gallery item
    items.forEach((item, index) => {
        item.addEventListener('click', function() {
            const itemIndex = parseInt(this.dataset.index);
            openLightbox(itemIndex);
        });
    });

    // Update total items counter
    updateTotalCounter();
}

// ==================== LIGHTBOX FUNCTIONALITY ====================
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const currentIndexSpan = document.getElementById('current-index');

function initLightbox() {
    // Close button
    lightboxClose.addEventListener('click', closeLightbox);

    // Navigation buttons
    lightboxPrev.addEventListener('click', showPrevious);
    lightboxNext.addEventListener('click', showNext);

    // Click outside to close
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevious();
                break;
            case 'ArrowRight':
                showNext();
                break;
        }
    });

    // Prevent scrolling when lightbox is open
    lightbox.addEventListener('transitionend', function() {
        if (lightbox.classList.contains('active')) {
            document.body.classList.add('lightbox-open');
        } else {
            document.body.classList.remove('lightbox-open');
        }
    });
}

// ==================== OPEN LIGHTBOX ====================
function openLightbox(index) {
    currentIndex = index;
    lightbox.classList.add('active');
    displayMedia(currentIndex);
    updateCounter();
}

// ==================== CLOSE LIGHTBOX ====================
function closeLightbox() {
    lightbox.classList.remove('active');

    // Stop and remove any playing video
    const video = lightboxContent.querySelector('video');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }

    // Clear content after animation
    setTimeout(() => {
        lightboxContent.innerHTML = '';
    }, 300);
}

// ==================== DISPLAY MEDIA ====================
function displayMedia(index) {
    // Clear previous content
    lightboxContent.innerHTML = '';

    const item = galleryItems[index];

    if (item.type === 'image') {
        // Create image element
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = `JV Beleza e Estética - Imagem ${index + 1}`;
        img.style.opacity = '0';

        // Fade in after load
        img.addEventListener('load', function() {
            setTimeout(() => {
                this.style.transition = 'opacity 0.3s ease';
                this.style.opacity = '1';
            }, 10);
        });

        lightboxContent.appendChild(img);

    } else if (item.type === 'video') {
        // Create video element
        const video = document.createElement('video');
        video.controls = true;
        video.autoplay = true;
        video.loop = true;
        video.style.opacity = '0';

        const source = document.createElement('source');
        source.src = item.src;
        source.type = 'video/mp4';

        video.appendChild(source);

        // Fade in after metadata loads
        video.addEventListener('loadedmetadata', function() {
            setTimeout(() => {
                this.style.transition = 'opacity 0.3s ease';
                this.style.opacity = '1';
            }, 10);
        });

        // Handle video errors
        video.addEventListener('error', function() {
            console.error('Erro ao carregar vídeo:', item.src);
            const errorMsg = document.createElement('p');
            errorMsg.textContent = 'Erro ao carregar o vídeo';
            errorMsg.style.color = 'white';
            errorMsg.style.fontSize = '1.2rem';
            lightboxContent.appendChild(errorMsg);
        });

        lightboxContent.appendChild(video);
    }

    updateCounter();
}

// ==================== NAVIGATION ====================
function showPrevious() {
    // Pause current video if playing
    const currentVideo = lightboxContent.querySelector('video');
    if (currentVideo) {
        currentVideo.pause();
    }

    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = galleryItems.length - 1;
    }

    displayMedia(currentIndex);
}

function showNext() {
    // Pause current video if playing
    const currentVideo = lightboxContent.querySelector('video');
    if (currentVideo) {
        currentVideo.pause();
    }

    currentIndex++;
    if (currentIndex >= galleryItems.length) {
        currentIndex = 0;
    }

    displayMedia(currentIndex);
}

// ==================== UPDATE COUNTER ====================
function updateCounter() {
    currentIndexSpan.textContent = currentIndex + 1;
}

function updateTotalCounter() {
    const totalItemsSpan = document.getElementById('total-items');
    if (totalItemsSpan) {
        totalItemsSpan.textContent = galleryItems.length;
    }
}

// ==================== TOUCH SUPPORT FOR MOBILE ====================
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left - show next
            showNext();
        } else {
            // Swiped right - show previous
            showPrevious();
        }
    }
}

// ==================== PRELOAD ADJACENT IMAGES ====================
function preloadAdjacentMedia() {
    const prevIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : galleryItems.length - 1;
    const nextIndex = currentIndex + 1 < galleryItems.length ? currentIndex + 1 : 0;

    // Preload previous
    if (galleryItems[prevIndex].type === 'image') {
        const img = new Image();
        img.src = galleryItems[prevIndex].src;
    }

    // Preload next
    if (galleryItems[nextIndex].type === 'image') {
        const img = new Image();
        img.src = galleryItems[nextIndex].src;
    }
}

// ==================== VIDEO THUMBNAIL GENERATION ====================
// Generate thumbnail for videos on load
document.addEventListener('DOMContentLoaded', function() {
    const videoElements = document.querySelectorAll('.gallery-item video');

    videoElements.forEach(video => {
        // Set time to 1 second to get a good thumbnail
        video.currentTime = 1;

        // Add poster attribute if needed
        video.addEventListener('loadeddata', function() {
            this.pause();
        });
    });
});

// ==================== LAZY LOADING FOR GALLERY ITEMS ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const img = item.querySelector('img');
                const video = item.querySelector('video');

                if (img && img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }

                if (video && video.dataset.src) {
                    const source = video.querySelector('source');
                    if (source && source.dataset.src) {
                        source.src = source.dataset.src;
                        source.removeAttribute('data-src');
                        video.load();
                    }
                }

                observer.unobserve(item);
            }
        });
    }, {
        rootMargin: '50px'
    });

    document.querySelectorAll('.gallery-item').forEach(item => {
        imageObserver.observe(item);
    });
}

// ==================== ANIMATIONS ====================
// Add entrance animations to gallery items
window.addEventListener('load', () => {
    const items = document.querySelectorAll('.gallery-item');

    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';

            requestAnimationFrame(() => {
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            });
        }, index * 50);
    });
});

// ==================== UTILITIES ====================
// Check if media is loaded
function isMediaLoaded(element) {
    if (element.tagName === 'IMG') {
        return element.complete && element.naturalHeight !== 0;
    } else if (element.tagName === 'VIDEO') {
        return element.readyState >= 2; // HAVE_CURRENT_DATA
    }
    return false;
}

// Get media dimensions
function getMediaDimensions(element) {
    if (element.tagName === 'IMG') {
        return {
            width: element.naturalWidth,
            height: element.naturalHeight
        };
    } else if (element.tagName === 'VIDEO') {
        return {
            width: element.videoWidth,
            height: element.videoHeight
        };
    }
    return { width: 0, height: 0 };
}

// ==================== EXPORT FUNCTIONS ====================
window.GalleryLightbox = {
    open: openLightbox,
    close: closeLightbox,
    next: showNext,
    previous: showPrevious,
    getCurrentIndex: () => currentIndex,
    getTotalItems: () => galleryItems.length
};

// ==================== CONSOLE MESSAGE ====================
console.log('%c📸 Galeria JV Beleza & Estética', 'color: #d4a574; font-size: 16px; font-weight: bold;');
console.log('%cLightbox com navegação completa ativa', 'color: #5c3a1e; font-size: 12px;');
