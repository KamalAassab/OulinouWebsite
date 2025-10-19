// Professional Hero Section - Premium Interactive Script
document.addEventListener('DOMContentLoaded', function() {
    // Professional parallax effect
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    const floatingElements = document.querySelector('.floating-elements');
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        const rateFast = scrolled * -0.6;
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
        
        if (floatingElements) {
            floatingElements.style.transform = `translateY(${rateFast}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);

    // Professional number counting animation
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    function animateNumber(element) {
        const text = element.textContent;
        const target = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/\d/g, '');
        let current = 0;
        const increment = target / 60;
        const duration = 2000;
        const stepTime = duration / 60;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, stepTime);
    }

    // Professional bottle interactions
    const showcaseBottles = document.querySelectorAll('.showcase-bottle');
    
    showcaseBottles.forEach((bottle, index) => {
        // Enhanced hover effects
        bottle.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-25px) scale(1.08) rotate(2deg)';
            this.style.zIndex = '15';
            this.style.filter = 'brightness(1.1)';
            
            // Add glow effect
            const glow = this.querySelector('.bottle-glow');
            if (glow) {
                glow.style.opacity = '0.8';
                glow.style.transform = 'scale(1.2)';
            }
        });
        
        bottle.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            this.style.zIndex = '';
            this.style.filter = 'brightness(1)';
            
            const glow = this.querySelector('.bottle-glow');
            if (glow) {
                glow.style.opacity = '0.3';
                glow.style.transform = 'scale(1)';
            }
        });

        // Click interaction
        bottle.addEventListener('click', function() {
            // Add ripple effect
            createRippleEffect(this);
            
            // Navigate to products after animation
            setTimeout(() => {
                window.location.href = 'html/products.php';
            }, 600);
        });
    });

    function createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(201, 169, 110, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1000;
        `;
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Professional scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const featuredSection = document.querySelector('.featured-collections');
            if (featuredSection) {
                featuredSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Featured products professional animation
    const productCards = document.querySelectorAll('.product-card');
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });

    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
        cardObserver.observe(card);
    });

    // Product card hover effects
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-25px) scale(1.03)';
            this.style.zIndex = '10';
            
            const glow = this.querySelector('.product-glow');
            if (glow) {
                glow.style.opacity = '1';
                glow.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '';
            
            const glow = this.querySelector('.product-glow');
            if (glow) {
                glow.style.opacity = '0';
                glow.style.transform = 'scale(1)';
            }
        });

        // Click interaction for product cards
        card.addEventListener('click', function() {
            createRippleEffect(this);
            setTimeout(() => {
                window.location.href = 'html/products.php';
            }, 600);
        });
    });

    // Professional button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.03)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Click animation
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: buttonRipple 0.6s linear;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
                width: 20px;
                height: 20px;
                margin-left: -10px;
                margin-top: -10px;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Professional title typing effect
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleLines = heroTitle.querySelectorAll('span');
        
        titleLines.forEach((line, index) => {
            const text = line.textContent;
            line.textContent = '';
            line.style.opacity = '0';
            
            setTimeout(() => {
                line.style.transition = 'opacity 0.8s ease';
                line.style.opacity = '1';
                typeWriter(line, text, 80);
            }, index * 400);
        });
    }

    function typeWriter(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    // Professional loading sequence
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(60px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }

    // Professional particle system enhancement
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;
            particle.style.left = randomX + '%';
            particle.style.top = randomY + '%';
        }, 4000 + index * 1000);
    });

    // Professional wave animations
    const waves = document.querySelectorAll('.wave');
    waves.forEach((wave, index) => {
        wave.addEventListener('animationiteration', function() {
            const colors = [
                'rgba(201, 169, 110, 0.15)',
                'rgba(212, 175, 55, 0.12)',
                'rgba(184, 148, 31, 0.18)'
            ];
            this.style.borderColor = colors[index % colors.length];
        });
    });

    // Performance optimization
    if (window.innerWidth <= 768) {
        const floatingElements = document.querySelector('.floating-elements');
        if (floatingElements) {
            floatingElements.style.display = 'none';
        }
    }

    // Professional cursor effects
    document.addEventListener('mousemove', function(e) {
        const cursor = document.querySelector('.custom-cursor');
        if (!cursor) {
            const newCursor = document.createElement('div');
            newCursor.className = 'custom-cursor';
            newCursor.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, rgba(201, 169, 110, 0.8), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.1s ease;
                mix-blend-mode: difference;
            `;
            document.body.appendChild(newCursor);
        }
        
        const cursorElement = document.querySelector('.custom-cursor');
        if (cursorElement) {
            cursorElement.style.left = e.clientX - 10 + 'px';
            cursorElement.style.top = e.clientY - 10 + 'px';
        }
    });
});

// Professional CSS animations
const professionalStyles = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes buttonRipple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .custom-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(201, 169, 110, 0.8), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    }
    
    .showcase-bottle {
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .collection-card {
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .btn {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .hero-content {
        transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;

// Inject professional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = professionalStyles;
document.head.appendChild(styleSheet);