// Professional Navbar Enhancement Script
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    const navLinks = document.querySelectorAll('#navbar a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced sticky navbar behavior
    const navbar = document.querySelector('.container');
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Always keep navbar visible (remove hide on scroll down)
        navbar.style.transform = 'translateY(0)';
        
        // Enhanced background blur effect when scrolled
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.1)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
            navbar.style.borderBottom = '1px solid rgba(201, 169, 110, 0.2)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = 'none';
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);

    // Add active state to current page
    const currentPage = window.location.pathname;
    const navItems = document.querySelectorAll('#navbar a');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && currentPage.includes(href.split('/').pop())) {
            item.classList.add('active');
        }
    });

    // Logo hover effect enhancement
    const logo = document.querySelector('.logo-text');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(1deg)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    // Cart count animation (now handled by cart-counter.js)
    function animateCartCount() {
        if (typeof window.animateCartCount === 'function') {
            window.animateCartCount();
        }
    }

    // Listen for cart updates (now handled by cart-counter.js)
    window.addEventListener('storage', function(e) {
        if (e.key === 'cart') {
            if (typeof window.updateCartCount === 'function') {
                window.updateCartCount();
            }
            animateCartCount();
        }
    });

    // Mobile menu toggle (if needed for future mobile optimization)
    function createMobileToggle() {
        const header = document.querySelector('header');
        const navbar = document.querySelector('#navbar');
        
        if (window.innerWidth <= 768) {
            // Create mobile menu button
            const mobileToggle = document.createElement('button');
            mobileToggle.innerHTML = '<svg class="professional-icon icon-menu" viewBox="0 0 24 24"><path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z"/></svg>';
            mobileToggle.className = 'mobile-toggle';
            mobileToggle.style.cssText = `
                display: none;
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 10px;
            `;
            
            if (!document.querySelector('.mobile-toggle')) {
                header.appendChild(mobileToggle);
                
                mobileToggle.addEventListener('click', function() {
                    navbar.classList.toggle('mobile-open');
                });
            }
        }
    }

    // Initialize mobile functionality
    createMobileToggle();
    window.addEventListener('resize', createMobileToggle);

    // Add loading animation to logo
    if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            logo.style.transition = 'all 0.8s ease-out';
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0)';
        }, 100);
    }

    // Professional typing effect for logo (optional)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Uncomment to enable typing effect
    // if (logo) {
    //     typeWriter(logo, 'OULINOU', 150);
    // }

    // User Dropdown Functionality
    const userDropdowns = document.querySelectorAll('.user-dropdown');
    
    userDropdowns.forEach((dropdown, index) => {
        const toggle = dropdown.querySelector('.user-toggle');
        const menu = dropdown.querySelector('.user-menu');
        
        if (toggle && menu) {
            // Toggle dropdown on click
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns
                userDropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
            
            // Close dropdown when pressing Escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    dropdown.classList.remove('active');
                }
            });
            
            // Prevent menu clicks from closing dropdown
            menu.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    });
});

// CSS for mobile menu (injected via JavaScript)
const mobileStyles = `
    @media (max-width: 768px) {
        .mobile-toggle {
            display: block !important;
        }
        
        #navbar.mobile-open {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(26, 26, 26, 0.98);
            backdrop-filter: blur(15px);
            padding: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        
        #navbar:not(.mobile-open) {
            display: none;
        }
    }
`;

// Inject mobile styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileStyles;
document.head.appendChild(styleSheet);
