// ==================== Invitation Page Rose Petals ====================
// Create falling petals for invitation page
function createInvitationPetals() {
    const petalsContainer = document.querySelector('.invitation-petals-container');
    if (!petalsContainer) return;

    const petalColors = ['#FF69B4', '#FFB6C1', '#FF1493', '#FFC0CB', '#FFE4E1'];

    for (let i = 0; i < 30; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${petalColors[Math.floor(Math.random() * petalColors.length)]};
            border-radius: 50% 0 50% 0;
            left: ${Math.random() * 100}%;
            top: -10%;
            opacity: ${Math.random() * 0.5 + 0.3};
            animation: fall ${Math.random() * 5 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        petalsContainer.appendChild(petal);
    }
}

// Create falling hearts
function createFallingHearts() {
    const petalsContainer = document.querySelector('.invitation-petals-container');
    if (!petalsContainer) return;

    // Clear existing petals
    petalsContainer.innerHTML = '';

    for (let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 10 + 5}px;
            left: ${Math.random() * 100}%;
            top: -10%;
            opacity: ${Math.random() * 0.6 + 0.4};
            animation: fall ${Math.random() * 4 + 8}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        petalsContainer.appendChild(heart);
    }
}

// Observe couple section to trigger hearts
function initHeartsObserver() {
    const coupleSection = document.querySelector('.couple-section');
    if (coupleSection) {
        let petalsActive = true;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && petalsActive) {
                    petalsActive = false;
                    createFallingHearts();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(coupleSection);
    }
}

// ==================== Falling Petals (Landing Page) ====================
function createLandingPetals() {
    const petalsContainer = document.querySelector('.rose-petals-container');
    if (!petalsContainer) return;

    const petalColors = ['#FF69B4', '#FFB6C1', '#FF1493', '#FFC0CB'];

    for (let i = 0; i < 20; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${petalColors[Math.floor(Math.random() * petalColors.length)]};
            border-radius: 50% 0 50% 0;
            left: ${Math.random() * 100}%;
            top: -10%;
            opacity: ${Math.random() * 0.5 + 0.3};
            animation: fall ${Math.random() * 5 + 8}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        petalsContainer.appendChild(petal);
    }
}

// ==================== Open Invitation Page Logic =====================
const openInvitationPage = document.getElementById('openInvitationPage');
const openInvitationBtn = document.getElementById('openInvitationBtn');
const mainContent = document.getElementById('mainContent');
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
let isPlaying = false;

// Open invitation button click handler
if (openInvitationBtn && openInvitationPage && mainContent) {
    openInvitationBtn.addEventListener('click', () => {
        // PLAY MUSIC IMMEDIATELY
        if (backgroundMusic) {
            backgroundMusic.play().then(() => {
                isPlaying = true;
                if (musicToggle) {
                    musicToggle.classList.add('playing');
                    musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                }
            }).catch(err => {
                console.error('Initial audio play failed:', err);
            });
        }

        // Fade out open invitation page
        openInvitationPage.classList.remove('active');

        // Show main content after animation
        setTimeout(() => {
            openInvitationPage.style.display = 'none';
            mainContent.style.display = 'block';

            // Re-trigger scroll animations and petals
            initAnimations();
            createInvitationPetals();
            initHeartsObserver();

            setTimeout(() => {
                mainContent.classList.add('active');
                document.body.style.overflow = 'auto';
            }, 50);
        }, 600);
    });
}

// ==================== Music Player Controls ====================
if (musicToggle && backgroundMusic) {
    backgroundMusic.volume = 0.6;

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            backgroundMusic.pause();
            musicToggle.classList.remove('playing');
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            backgroundMusic.play().then(() => {
                musicToggle.classList.add('playing');
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(err => {
                console.error('Audio play failed:', err);
            });
        }
        isPlaying = !isPlaying;
    });
}

// ==================== Countdown Timer ====================
const weddingDate = new Date(2026, 9, 16, 8, 45, 0).getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (isNaN(distance) || distance < 0) {
        ['days', 'hours', 'minutes', 'seconds'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = '0';
        });
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    animateValue('days', days);
    animateValue('hours', hours);
    animateValue('minutes', minutes);
    animateValue('seconds', seconds);
}

function animateValue(id, newValue) {
    const element = document.getElementById(id);
    if (!element) return;

    const currentValue = parseInt(element.textContent) || 0;

    if (currentValue !== newValue) {
        element.style.transform = 'rotateX(90deg)';
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'rotateX(0deg)';
        }, 150);
    }
}

// ==================== Scroll Animations ====================
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.couple-card, .couple-divider-ampersand, .venue-card, .gallery-item, .message-content');

    animatedElements.forEach((el, index) => {
        el.classList.add('scroll-animate');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// ==================== Gallery Lightbox ====================
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    let currentImageIndex = 0;
    const images = Array.from(galleryItems);

    galleryItems.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox(img.src);
        });
    });

    const placeholders = document.querySelectorAll('.gallery-placeholder');
    placeholders.forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            alert('Happy Moments images coming soon!');
        });
    });

    function openLightbox(src) {
        if (!lightboxImage || !lightbox) return;
        lightboxImage.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    function closeLightbox() {
        if (lightbox) lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImage.src = images[currentImageIndex].src;
    });

    if (lightboxNext) lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImage.src = images[currentImageIndex].src;
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowLeft') lightboxPrev.click();
        else if (e.key === 'ArrowRight') lightboxNext.click();
    });
}

// ==================== Initialize ====================
window.addEventListener('load', () => {
    createLandingPetals();
    setInterval(updateCountdown, 1000);
    updateCountdown();
    initLightbox();

    // Smooth scroll for internal links
    const scrollDownBtn = document.querySelector('.scroll-down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('#couple');
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
});
