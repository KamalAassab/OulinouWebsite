// Profile Page JavaScript - Professional Theme
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Avatar upload functionality
    const avatarContainer = document.querySelector('.avatar-container');
    if (avatarContainer) {
        avatarContainer.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.style.width = '100%';
                        img.style.height = '100%';
                        img.style.objectFit = 'cover';
                        img.style.borderRadius = '50%';
                        
                        // Replace the icon with the uploaded image
                        avatarContainer.innerHTML = '';
                        avatarContainer.appendChild(img);
                        
                        // Add overlay back
                        const overlay = document.createElement('div');
                        overlay.className = 'avatar-overlay';
                        overlay.innerHTML = '<svg class="professional-icon icon-camera" viewBox="0 0 24 24"><path d="M12 15.5C13.66 15.5 15 14.16 15 12.5S13.66 9.5 12 9.5 9 10.84 9 12.5 10.34 15.5 12 15.5ZM20 4H16.83L15 2H9L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V6H8.05L9.88 4H14.12L15.95 6H20V18Z"/></svg>';
                        avatarContainer.appendChild(overlay);
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        });
    }

    // Order filter functionality
    const filterSelect = document.querySelector('.filter-select');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            const selectedFilter = this.value;
            const orderCards = document.querySelectorAll('.order-card');
            
            orderCards.forEach(card => {
                const statusBadge = card.querySelector('.order-status-badge');
                const status = statusBadge.textContent.toLowerCase();
                
                if (selectedFilter === 'all' || status.includes(selectedFilter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }


    // Form validation and submission
    const settingsForms = document.querySelectorAll('.settings-form');
    settingsForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formType = this.closest('.settings-section').querySelector('h3').textContent;
            
            // Simulate form submission
            showNotification(`${formType} updated successfully!`, 'success');
        });
    });

    // Password strength indicator
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        input.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            updatePasswordStrength(this, strength);
        });
    });

    // Reorder functionality
    const reorderButtons = document.querySelectorAll('.btn-secondary');
    reorderButtons.forEach(button => {
        if (button.textContent.includes('Reorder')) {
            button.addEventListener('click', function() {
                const orderCard = this.closest('.order-card');
                const productName = orderCard.querySelector('.item-info h4').textContent;
                
                showNotification(`${productName} added to cart for reorder!`, 'success');
                updateCartCount();
            });
        }
    });

    // Track order functionality
    const trackButtons = document.querySelectorAll('.btn-primary');
    trackButtons.forEach(button => {
        if (button.textContent.includes('Track')) {
            button.addEventListener('click', function() {
                showNotification('Redirecting to tracking page...', 'info');
                // In a real application, this would redirect to the tracking page
            });
        }
    });

});

// Helper Functions
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <svg class="professional-icon icon-${getNotificationIcon(type)}" viewBox="0 0 24 24"><path d="${getNotificationPath(type)}"/></svg>
            <span>${message}</span>
        </div>
    `;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check',
        error: 'exclamation',
        warning: 'warning',
        info: 'info'
    };
    return icons[type] || 'info';
}

function getNotificationPath(type) {
    const paths = {
        success: 'M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z',
        error: 'M12 2C6.47 2 2 6.47 2 12S6.47 22 12 22 22 17.53 22 12 17.53 2 12 2ZM17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59Z',
        warning: 'M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z',
        info: 'M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z'
    };
    return paths[type] || paths.info;
}

function getNotificationColor(type) {
    const colors = {
        success: 'linear-gradient(135deg, #22c55e, #16a34a)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
        info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
    };
    return colors[type] || colors.info;
}

function updateCartCount() {
    if (typeof window.updateCartCount === "function") {
        window.updateCartCount();
    } else {
        // Fallback to original method
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            const currentCount = parseInt(cartCountElement.textContent) || 0;
            cartCountElement.textContent = currentCount + 1;
            cartCountElement.style.animation = 'pulse 0.5s ease-in-out';
        }
    }
}

function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return Math.min(strength, 5);
}

function updatePasswordStrength(input, strength) {
    // Remove existing strength indicator
    const existingIndicator = input.parentNode.querySelector('.password-strength');
    if (existingIndicator) {
        existingIndicator.remove();
    }

    if (strength > 0) {
        const indicator = document.createElement('div');
        indicator.className = 'password-strength';
        indicator.innerHTML = `
            <div class="strength-bar">
                <div class="strength-fill" style="width: ${(strength / 5) * 100}%"></div>
            </div>
            <span class="strength-text">${getStrengthText(strength)}</span>
        `;

        indicator.style.cssText = `
            margin-top: 0.5rem;
            font-size: 0.8rem;
        `;

        const strengthBar = indicator.querySelector('.strength-bar');
        strengthBar.style.cssText = `
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
            overflow: hidden;
            margin-bottom: 0.25rem;
        `;

        const strengthFill = indicator.querySelector('.strength-fill');
        strengthFill.style.cssText = `
            height: 100%;
            background: ${getStrengthColor(strength)};
            transition: width 0.3s ease;
        `;

        const strengthText = indicator.querySelector('.strength-text');
        strengthText.style.cssText = `
            color: ${getStrengthColor(strength)};
            font-weight: 500;
        `;

        input.parentNode.appendChild(indicator);
    }
}

function getStrengthText(strength) {
    const texts = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return texts[Math.min(strength - 1, 4)] || 'Very Weak';
}

function getStrengthColor(strength) {
    const colors = ['#ef4444', '#f59e0b', '#eab308', '#22c55e', '#16a34a'];
    return colors[Math.min(strength - 1, 4)] || '#ef4444';
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.8);
        }
    }

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .notification-content i {
        font-size: 1.1rem;
    }
`;
document.head.appendChild(style);
