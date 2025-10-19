// Payment Page JavaScript - Professional Theme
document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const paymentForm = document.getElementById('paymentForm');
    const paymentBtn = document.getElementById('paymentBtn');
    const cardNumberInput = document.getElementById('cardnumber');
    const cvvInput = document.getElementById('cvv');
    const phoneInput = document.getElementById('phone');
    const zipInput = document.getElementById('zip');

    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            const methodType = this.getAttribute('data-method');
            updatePaymentMethod(methodType);
        });
    });

    // Card number formatting
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            
            if (formattedValue.length > 19) {
                formattedValue = formattedValue.substring(0, 19);
            }
            
            e.target.value = formattedValue;
            e.target.classList.add('formatted');
            
            // Update card type icon
            updateCardTypeIcon(value);
            
            // Validate card number
            validateCardNumber(value);
        });
    }

    // CVV input formatting
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9]/gi, '');
            if (value.length > 4) {
                value = value.substring(0, 4);
            }
            e.target.value = value;
        });
    }

    // Phone number formatting
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            let formattedValue = '';
            
            if (value.length > 0) {
                if (value.length <= 3) {
                    formattedValue = `(${value}`;
                } else if (value.length <= 6) {
                    formattedValue = `(${value.substring(0, 3)}) ${value.substring(3)}`;
                } else if (value.length <= 10) {
                    formattedValue = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
                } else {
                    formattedValue = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, 10)}`;
                }
            }
            
            e.target.value = formattedValue;
        });
    }

    // ZIP code formatting
    if (zipInput) {
        zipInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9]/gi, '');
            if (value.length > 5) {
                value = value.substring(0, 5);
            }
            e.target.value = value;
        });
    }

    // Form validation
    const formInputs = document.querySelectorAll('.form-input, .form-select');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });

    // Form submission
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                processPayment();
            }
        });
    }

    // Real-time validation functions
    function validateCardNumber(cardNumber) {
        const cardType = getCardType(cardNumber);
        const isValid = validateCardNumberLuhn(cardNumber);
        
        const cardInput = document.getElementById('cardnumber');
        if (cardNumber.length >= 13) {
            if (isValid) {
                setFieldSuccess(cardInput, 'Valid card number');
            } else {
                setFieldError(cardInput, 'Invalid card number');
            }
        } else {
            clearFieldError(cardInput);
        }
    }

    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name || field.id;
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            setFieldError(field, `${getFieldLabel(field)} is required`);
            return false;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                setFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
            if (!phoneRegex.test(value)) {
                setFieldError(field, 'Please enter a valid phone number');
                return false;
            }
        }

        // ZIP code validation
        if (field.id === 'zip' && value) {
            const zipRegex = /^\d{5}$/;
            if (!zipRegex.test(value)) {
                setFieldError(field, 'Please enter a valid 5-digit ZIP code');
                return false;
            }
        }

        // CVV validation
        if (field.id === 'cvv' && value) {
            const cvvRegex = /^\d{3,4}$/;
            if (!cvvRegex.test(value)) {
                setFieldError(field, 'Please enter a valid CVV');
                return false;
            }
        }

        // If we get here, the field is valid
        if (value) {
            setFieldSuccess(field, 'Valid');
        }
        return true;
    }

    function validateForm() {
        let isValid = true;
        const requiredFields = document.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        // Check terms checkbox
        const termsCheckbox = document.getElementById('terms');
        if (!termsCheckbox.checked) {
            showNotification('Please accept the terms and conditions', 'error');
            isValid = false;
        }

        return isValid;
    }

    // Helper functions
    function updatePaymentMethod(method) {
        const cardFields = document.querySelectorAll('.form-group:not(.full-width)');
        const paypalFields = document.querySelectorAll('.payment-method[data-method="paypal"]');
        
        if (method === 'paypal') {
            cardFields.forEach(field => {
                field.style.display = 'none';
            });
            showNotification('PayPal integration coming soon!', 'info');
        } else {
            cardFields.forEach(field => {
                field.style.display = 'flex';
            });
        }
    }

    function updateCardTypeIcon(cardNumber) {
        const cardType = getCardType(cardNumber);
        const cardIcon = document.querySelector('.card-type-icon i');
        
        if (cardIcon) {
            const iconClass = getCardIconClass(cardType);
            cardIcon.className = iconClass;
        }
    }

    function getCardType(cardNumber) {
        if (cardNumber.startsWith('4')) return 'visa';
        if (cardNumber.startsWith('5') || cardNumber.startsWith('2')) return 'mastercard';
        if (cardNumber.startsWith('3')) return 'amex';
        if (cardNumber.startsWith('6')) return 'discover';
        return 'unknown';
    }

    function getCardIconClass(cardType) {
        const icons = {
            visa: 'fa-brands fa-cc-visa',
            mastercard: 'fa-brands fa-cc-mastercard',
            amex: 'fa-brands fa-cc-amex',
            discover: 'fa-brands fa-cc-discover',
            unknown: 'fa-solid fa-credit-card'
        };
        return icons[cardType] || icons.unknown;
    }

    function validateCardNumberLuhn(cardNumber) {
        if (cardNumber.length < 13) return false;
        
        let sum = 0;
        let isEven = false;
        
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber.charAt(i));
            
            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            
            sum += digit;
            isEven = !isEven;
        }
        
        return sum % 10 === 0;
    }

    function setFieldError(field, message) {
        field.classList.remove('success');
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `<svg class="professional-icon icon-exclamation" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/></svg> ${message}`;
        field.parentNode.appendChild(errorDiv);
    }

    function setFieldSuccess(field, message) {
        field.classList.remove('error');
        field.classList.add('success');
        
        // Remove existing messages
        const existingError = field.parentNode.querySelector('.error-message');
        const existingSuccess = field.parentNode.querySelector('.success-message');
        if (existingError) existingError.remove();
        if (existingSuccess) existingSuccess.remove();
        
        // Add success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `<svg class="professional-icon icon-check" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"/></svg> ${message}`;
        field.parentNode.appendChild(successDiv);
    }

    function clearFieldError(field) {
        field.classList.remove('error', 'success');
        const existingError = field.parentNode.querySelector('.error-message');
        const existingSuccess = field.parentNode.querySelector('.success-message');
        if (existingError) existingError.remove();
        if (existingSuccess) existingSuccess.remove();
    }

    function getFieldLabel(field) {
        const label = field.parentNode.querySelector('.form-label');
        return label ? label.textContent : field.name || field.id;
    }

    function processPayment() {
        // Show loading state
        paymentBtn.disabled = true;
        paymentBtn.querySelector('span').style.display = 'none';
        paymentBtn.querySelector('.btn-loading').style.display = 'block';
        
        // Simulate payment processing
        setTimeout(() => {
            showNotification('Payment processed successfully!', 'success');
            
            // Redirect to confirmation page
            setTimeout(() => {
                window.location.href = 'payment-confirmation.php';
            }, 2000);
        }, 3000);
    }

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

        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
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
});
