// ============================================
// PARTICLE GENERATION
// ============================================

/**
 * Creates floating particles for background effect
 */
function generateParticles() {
    const container = document.getElementById('particleContainer');
    const particleCount = window.innerWidth > 768 ? 50 : 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        // Random animation duration
        const duration = 15 + Math.random() * 15;
        const delay = Math.random() * 5;

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';

        container.appendChild(particle);
    }
}

/**
 * Regenerate particles periodically
 */
setInterval(() => {
    const particles = document.querySelectorAll('.particle');
    if (particles.length < 30) {
        generateParticles();
    }
}, 5000);

// ============================================
// SCROLL FUNCTIONALITY
// ============================================

/**
 * Scroll to specific section
 * @param {number} sectionIndex - The section to scroll to
 */
function scrollToSection(sectionIndex) {
    const section = document.getElementById(`section-${sectionIndex}`);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Update active dot indicator based on scroll position
 */
function updateActiveDot() {
    const sections = document.querySelectorAll('.section');
    const dots = document.querySelectorAll('.nav-indicator .dot');
    let currentSection = 0;

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            currentSection = index;
        }
    });

    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSection].classList.add('active');
}

/**
 * Add click event listeners to navigation dots
 */
document.querySelectorAll('.nav-indicator .dot').forEach(dot => {
    dot.addEventListener('click', () => {
        const sectionIndex = dot.getAttribute('data-section');
        scrollToSection(sectionIndex);
    });
});

// Update dots on scroll
window.addEventListener('scroll', updateActiveDot);

// ============================================
// SECTION 3: COMPATIBILITY METER ANIMATION
// ============================================

/**
 * Trigger compatibility meter animation when section 3 comes into view
 */
function animateCompatibilityMeter() {
    const section = document.getElementById('section-2');
    const rect = section.getBoundingClientRect();
    const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;

    // Check if animation hasn't already run
    if (isVisible && !section.dataset.animated) {
        section.dataset.animated = 'true';
        
        const fill = document.getElementById('compatibilityFill');
        const percentValue = document.getElementById('percentageValue');

        // Animate the fill bar
        fill.style.width = '99%';

        // Animate the percentage counter
        let currentValue = 0;
        const targetValue = 99;
        const duration = 2000; // 2 seconds
        const startTime = Date.now();

        const updatePercentage = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            currentValue = Math.floor(progress * targetValue);
            percentValue.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updatePercentage);
            }
        };

        updatePercentage();
    }
}

window.addEventListener('scroll', animateCompatibilityMeter);

// ============================================
// SECTION 4: TIMELINE ANIMATION
// ============================================

/**
 * Trigger timeline animations when they come into view
 */
function animateTimeline() {
    const timelineDots = document.querySelectorAll('.timeline-dot');

    timelineDots.forEach((dot, index) => {
        const rect = dot.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.8;

        if (isVisible && !dot.dataset.animated) {
            dot.dataset.animated = 'true';
            dot.style.animation = `pulse 1s ease-out ${index * 0.1}s`;
        }
    });
}

window.addEventListener('scroll', animateTimeline);

// ============================================
// SECTION 6: RESPONSE HANDLING
// ============================================

/**
 * Handle response to the final question
 * @param {string} response - The user's response ('yes' or 'absolutely')
 */
function handleResponse(response) {
    const buttons = document.querySelectorAll('.question-buttons');
    const message = document.getElementById('celebrationMessage');

    // Hide buttons with animation
    buttons.forEach(btn => {
        btn.style.animation = 'fadeOut 0.5s ease-out forwards';
    });

    // Show celebration after delay
    setTimeout(() => {
        buttons.forEach(btn => {
            btn.style.display = 'none';
        });
        message.style.display = 'block';
        
        // Add celebration animation to the page
        celebrateResponse();
    }, 500);
}

/**
 * Create celebration effect
 */
function celebrateResponse() {
    // Create confetti-like particles
    const container = document.getElementById('particleContainer');
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = `hsl(${Math.random() * 60 + 210}, 100%, 50%)`;
        confetti.style.borderRadius = '50%';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '200';

        container.appendChild(confetti);

        // Animate confetti fall
        const duration = 2 + Math.random() * 1;
        const xOffset = (Math.random() - 0.5) * 400;
        
        confetti.animate([
            {
                transform: 'translateY(0) translateX(0) rotate(0deg)',
                opacity: 1
            },
            {
                transform: `translateY(${window.innerHeight}px) translateX(${xOffset}px) rotate(720deg)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        // Remove element after animation
        setTimeout(() => confetti.remove(), duration * 1000);
    }
}

// ============================================
// CARD STAGGER ANIMATIONS
// ============================================

/**
 * Initialize staggered animations for cards when they come into view
 */
function initializeCardAnimations() {
    const evidenceCards = document.querySelectorAll('.evidence-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                // Animation delay is already in CSS, just ensure it plays
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
            }
        });
    }, { threshold: 0.1 });

    evidenceCards.forEach(card => observer.observe(card));
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all page elements on load
 */
document.addEventListener('DOMContentLoaded', () => {
    generateParticles();
    initializeCardAnimations();
    updateActiveDot();

    // Hide scroll hint after 3 seconds
    setTimeout(() => {
        const hint = document.getElementById('scrollHint');
        if (hint) {
            hint.style.opacity = '0';
        }
    }, 3000);
});

// ============================================
// RESPONSIVE ADJUSTMENTS
// ============================================

/**
 * Adjust particle count on window resize
 */
window.addEventListener('resize', () => {
    const container = document.getElementById('particleContainer');
    const particles = document.querySelectorAll('.particle');
    
    if (window.innerWidth <= 768 && particles.length > 20) {
        // Remove excess particles on smaller screens
        for (let i = 20; i < particles.length; i++) {
            particles[i].remove();
        }
    }
});
