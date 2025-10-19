// Professional Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Professional form animations and interactions
    initializeAuthAnimations();
    initializeFormValidation();
    initializePasswordStrength();
    initializeProfessionalEffects();
});

// Professional Animation System
function initializeAuthAnimations() {
    // Staggered animation for form elements
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            group.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });

    // Professional logo animation
    const logo = document.querySelector('.auth-logo');
    if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'scale(0.8) rotate(-5deg)';
        
        setTimeout(() => {
            logo.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            logo.style.opacity = '1';
            logo.style.transform = 'scale(1) rotate(0deg)';
        }, 100);
    }

    // Professional button hover effects
    const buttons = document.querySelectorAll('.auth-button, .auth-button-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Professional Form Validation System
function initializeFormValidation() {
    const inputs = document.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
        // Professional focus effects
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });

        // Professional typing effects
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.style.borderColor = 'var(--accent-gold)';
                this.style.background = 'rgba(201, 169, 110, 0.05)';
            } else {
                this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                this.style.background = 'rgba(255, 255, 255, 0.05)';
            }
        });
    });
}

// Professional Password Strength System
function initializePasswordStrength() {
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    passwordInputs.forEach(input => {
        input.addEventListener('input', function() {
            const strength = calculatePasswordStrength(this.value);
            updatePasswordStrengthIndicator(this, strength);
        });
    });
}

function calculatePasswordStrength(password) {
    let strength = 0;
    let feedback = [];
    
    if (password.length >= 8) strength++;
    else feedback.push('At least 8 characters');
    
    if (/[a-z]/.test(password)) strength++;
    else feedback.push('Lowercase letters');
    
    if (/[A-Z]/.test(password)) strength++;
    else feedback.push('Uppercase letters');
    
    if (/[0-9]/.test(password)) strength++;
    else feedback.push('Numbers');
    
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    else feedback.push('Special characters');
    
    return { strength, feedback };
}

function updatePasswordStrengthIndicator(input, { strength, feedback }) {
    const strengthIndicator = input.parentElement.querySelector('.strength-indicator');
    if (!strengthIndicator) return;
    
    const bars = strengthIndicator.querySelectorAll('.strength-bar');
    const text = strengthIndicator.querySelector('.strength-text');
    
    bars.forEach((bar, index) => {
        if (index < strength) {
            bar.style.background = getStrengthColor(strength);
        } else {
            bar.style.background = '#374151';
        }
    });
    
    if (text) {
        text.textContent = getStrengthLabel(strength);
        text.style.color = getStrengthColor(strength);
    }
}

function getStrengthColor(strength) {
    if (strength <= 2) return '#ef4444';
    if (strength <= 3) return '#f59e0b';
    return '#10b981';
}

function getStrengthLabel(strength) {
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Medium';
    return 'Strong';
}

// Professional Effects System
function initializeProfessionalEffects() {
    // Professional ripple effect for buttons
    const buttons = document.querySelectorAll('.auth-button, .auth-button-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });

    // Professional floating animation for auth card
    const authCard = document.querySelector('.auth-card');
    if (authCard) {
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = (e.clientX / window.innerWidth) - 0.5;
            mouseY = (e.clientY / window.innerHeight) - 0.5;
            
            authCard.style.transform = `translateY(-10px) scale(1.02) rotateX(${mouseY * 5}deg) rotateY(${mouseX * 5}deg)`;
        });
        
        document.addEventListener('mouseleave', function() {
            authCard.style.transform = 'translateY(0) scale(1) rotateX(0deg) rotateY(0deg)';
        });
    }

    // Professional typing animation for inputs
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.letterSpacing = '0.5px';
            this.style.transition = 'letter-spacing 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.style.letterSpacing = 'normal';
        });
    });
}

// Professional Ripple Effect
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation CSS
const rippleCSS = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Professional Loading States
function showLoadingState(button, text = 'Loading...') {
    button.classList.add('loading');
    button.disabled = true;
    button.querySelector('.button-text').textContent = text;
}

function hideLoadingState(button, originalText) {
    button.classList.remove('loading');
    button.disabled = false;
    button.querySelector('.button-text').textContent = originalText;
}

// Professional Success/Error Messages
function showProfessionalMessage(type, message, duration = 5000) {
    const messageContainer = document.getElementById('formMessages');
    if (!messageContainer) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = `${type === 'success' ? 'success-message' : 'error-message'}`;
    messageElement.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem;
        border-radius: 10px;
        margin: 1rem 0;
        animation: slideInUp 0.5s ease;
        background: ${type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
        border: 1px solid ${type === 'success' ? 'var(--success-green)' : 'var(--error-red)'};
    `;
    
    messageElement.innerHTML = `
        <i class="fa-solid fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    messageContainer.appendChild(messageElement);
    
    // Auto remove after duration
    setTimeout(() => {
        messageElement.style.animation = 'slideOutDown 0.5s ease';
        setTimeout(() => {
            messageElement.remove();
        }, 500);
    }, duration);
}

// Add slide animations
const slideCSS = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOutDown {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
`;

const slideStyle = document.createElement('style');
slideStyle.textContent = slideCSS;
document.head.appendChild(slideStyle);

// Professional Form Submission
function submitFormWithAnimation(form, callback) {
    const button = form.querySelector('.auth-button, .auth-button-secondary');
    const originalText = button.querySelector('.button-text').textContent;
    
    showLoadingState(button, 'Processing...');
    
    // Simulate professional form submission
    setTimeout(() => {
        hideLoadingState(button, originalText);
        if (callback) callback();
    }, 2000);
}

// Export functions for global use
window.authProfessional = {
    showLoadingState,
    hideLoadingState,
    showProfessionalMessage,
    submitFormWithAnimation,
    createRippleEffect
};
