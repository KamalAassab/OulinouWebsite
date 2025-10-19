<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up - Oulinou Parfums</title>
    <link rel="icon" href="../assets/images/logo-alt.png">
    <link rel="stylesheet" href="../assets/styles/professional-icons.css">
    <script src="../assets/scripts/professional-icons.js" defer></script>
    <link rel="stylesheet" href="../assets/styles/global-background.css">
    <link rel="stylesheet" href="../assets/styles/header.css">
    <link rel="stylesheet" href="../assets/styles/footer.css">
    <link rel="stylesheet" href="../assets/styles/icons.css">
    <link rel="stylesheet" href="../assets/styles/auth/auth-forms.css">
    <script src="../assets/scripts/icon-replacer.js" defer></script>
    <script src="../assets/scripts/auth-forms.js" defer></script>
</head>
<body>
    <?php if (session_status() === PHP_SESSION_NONE) { session_start(); } include 'header.php'; ?>

    <!-- Professional Signup Section -->
    <div class="auth-container">
        <div class="auth-card">
            <!-- Professional Brand Header -->
            <div class="auth-header">
                <a href="../index.php" class="auth-logo">OULINOU</a>
                <h1 class="auth-title">Join Our Community</h1>
                <p class="auth-subtitle">Create your account and discover luxury fragrances</p>
            </div>

            <!-- Professional Signup Form -->
            <form class="auth-form" id="signupForm" method="POST" action="signup.php">
                <!-- Full Name Field -->
                <div class="form-group">
                    <input 
                        type="text" 
                        id="fullName" 
                        name="fullName" 
                        class="form-input" 
                        placeholder="Enter your full name"
                        required
                        autocomplete="name"
                    >
                    <div class="error-message" id="fullNameError" style="display: none;">
                        <svg class="professional-icon icon-exclamation" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/></svg>
                        <span>Please enter your full name</span>
                    </div>
                </div>

                <!-- Email Field -->
                <div class="form-group">
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        class="form-input" 
                        placeholder="Enter your email address"
                        required
                        autocomplete="email"
                    >
                    <div class="error-message" id="emailError" style="display: none;">
                        <svg class="professional-icon icon-exclamation" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/></svg>
                        <span>Please enter a valid email address</span>
                    </div>
                </div>

                <!-- Password Field -->
                <div class="form-group">
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        class="form-input" 
                        placeholder="Create a strong password"
                        required
                        autocomplete="new-password"
                    >
                    <div class="error-message" id="passwordError" style="display: none;">
                        <svg class="professional-icon icon-exclamation" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/></svg>
                        <span>Password must be at least 8 characters</span>
                    </div>
                    <!-- Password Strength Indicator -->
                    <div id="passwordStrength" style="margin-top: 0.5rem; display: none;">
                        <div style="display: flex; gap: 0.25rem; margin-bottom: 0.5rem;">
                            <div class="strength-bar" style="height: 4px; background: #ef4444; border-radius: 2px; flex: 1;"></div>
                            <div class="strength-bar" style="height: 4px; background: #f59e0b; border-radius: 2px; flex: 1;"></div>
                            <div class="strength-bar" style="height: 4px; background: #10b981; border-radius: 2px; flex: 1;"></div>
                        </div>
                        <div id="strengthText" style="font-size: 0.8rem; color: var(--text-muted);"></div>
                    </div>
                </div>

                <!-- Confirm Password Field -->
                <div class="form-group">
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        class="form-input" 
                        placeholder="Confirm your password"
                        required
                        autocomplete="new-password"
                    >
                    <div class="error-message" id="confirmPasswordError" style="display: none;">
                        <svg class="professional-icon icon-exclamation" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/></svg>
                        <span>Passwords do not match</span>
                    </div>
                </div>

                <!-- Terms and Conditions -->
                <div style="margin: 1rem 0;">
                    <label style="display: flex; align-items: flex-start; gap: 0.5rem; color: var(--text-secondary); font-size: 0.9rem; cursor: pointer; line-height: 1.4;">
                        <input type="checkbox" name="terms" required style="accent-color: var(--accent-gold); margin-top: 0.2rem;">
                        <span>I agree to the <a href="privacy.php" class="auth-link" target="_blank">Terms of Service</a> and <a href="privacy.php" class="auth-link" target="_blank">Privacy Policy</a></span>
                    </label>
                    <div class="error-message" id="termsError" style="display: none;">
                        <svg class="professional-icon icon-exclamation" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/></svg>
                        <span>You must agree to the terms and conditions</span>
                    </div>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="auth-button" id="signupButton">
                    <span class="button-text">Create Account</span>
                    <svg class="professional-icon icon-signup button-icon" style="margin-left: 0.5rem;" viewBox="0 0 24 24"><path d="M15 12C17.21 12 19 10.21 19 8S17.21 4 15 4 11 5.79 11 8 12.79 12 15 12ZM15 14C12.33 14 7 15.34 7 18V20H23V18C23 15.34 17.67 14 15 14ZM6 12C8.21 12 10 10.21 10 8S8.21 4 6 4 2 5.79 2 8 3.79 12 6 12ZM6 14C3.33 14 -2 15.34 -2 18V20H8V18C8 15.34 3.67 14 6 14Z"/></svg>
                </button>

                <!-- Success/Error Messages -->
                <div id="formMessages" style="margin-top: 1rem;"></div>
            </form>

            <!-- Professional Footer -->
            <div class="auth-footer">
                <p>Already have an account?</p>
                <a href="login.php" class="auth-link">
                    <svg class="professional-icon icon-signin" viewBox="0 0 24 24"><path d="M11 7L9.6 8.4L12.2 11H2V13H12.2L9.6 15.6L11 17L16 12L11 7ZM20 19H12V21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3H12V5H20V19Z"/></svg>
                    Sign In
                </a>
            </div>
        </div>
    </div>

    <?php include 'footer.php'; ?>

    <!-- Professional Auth JavaScript -->
    <script>
        // Professional form validation and interactions
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('signupForm');
            const fullNameInput = document.getElementById('fullName');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirmPassword');
            const signupButton = document.getElementById('signupButton');
            const formMessages = document.getElementById('formMessages');
            const termsCheckbox = document.querySelector('input[name="terms"]');


            // Real-time validation
            fullNameInput.addEventListener('input', function() {
                validateFullName(this);
            });

            emailInput.addEventListener('input', function() {
                validateEmail(this);
            });

            passwordInput.addEventListener('input', function() {
                validatePassword(this);
                updatePasswordStrength(this.value);
            });

            confirmPasswordInput.addEventListener('input', function() {
                validateConfirmPassword(this);
            });

            // Form submission
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateForm()) {
                    submitForm();
                }
            });

            // Validation functions
            function validateFullName(input) {
                const isValid = input.value.trim().length >= 2;
                
                if (input.value && !isValid) {
                    showError('fullNameError', 'Please enter your full name (at least 2 characters)');
                    input.classList.add('form-error');
                } else {
                    hideError('fullNameError');
                    input.classList.remove('form-error');
                }
                
                return isValid;
            }

            function validateEmail(input) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const isValid = emailRegex.test(input.value);
                
                if (input.value && !isValid) {
                    showError('emailError', 'Please enter a valid email address');
                    input.classList.add('form-error');
                } else {
                    hideError('emailError');
                    input.classList.remove('form-error');
                }
                
                return isValid;
            }

            function validatePassword(input) {
                const isValid = input.value.length >= 8;
                
                if (input.value && !isValid) {
                    showError('passwordError', 'Password must be at least 8 characters');
                    input.classList.add('form-error');
                } else {
                    hideError('passwordError');
                    input.classList.remove('form-error');
                }
                
                return isValid;
            }

            function validateConfirmPassword(input) {
                const isValid = input.value === passwordInput.value;
                
                if (input.value && !isValid) {
                    showError('confirmPasswordError', 'Passwords do not match');
                    input.classList.add('form-error');
                } else {
                    hideError('confirmPasswordError');
                    input.classList.remove('form-error');
                }
                
                return isValid;
            }

            function validateTerms() {
                const isValid = termsCheckbox.checked;
                
                if (!isValid) {
                    showError('termsError', 'You must agree to the terms and conditions');
                } else {
                    hideError('termsError');
                }
                
                return isValid;
            }

            function validateForm() {
                const fullNameValid = validateFullName(fullNameInput);
                const emailValid = validateEmail(emailInput);
                const passwordValid = validatePassword(passwordInput);
                const confirmPasswordValid = validateConfirmPassword(confirmPasswordInput);
                const termsValid = validateTerms();
                
                return fullNameValid && emailValid && passwordValid && confirmPasswordValid && termsValid;
            }

            function updatePasswordStrength(password) {
                const strengthIndicator = document.getElementById('passwordStrength');
                const strengthText = document.getElementById('strengthText');
                const strengthBars = document.querySelectorAll('.strength-bar');
                
                if (password.length === 0) {
                    strengthIndicator.style.display = 'none';
                    return;
                }
                
                strengthIndicator.style.display = 'block';
                
                let strength = 0;
                let strengthLabel = '';
                let strengthColor = '';
                
                if (password.length >= 8) strength++;
                if (/[a-z]/.test(password)) strength++;
                if (/[A-Z]/.test(password)) strength++;
                if (/[0-9]/.test(password)) strength++;
                if (/[^A-Za-z0-9]/.test(password)) strength++;
                
                if (strength <= 2) {
                    strengthLabel = 'Weak';
                    strengthColor = '#ef4444';
                } else if (strength <= 3) {
                    strengthLabel = 'Medium';
                    strengthColor = '#f59e0b';
                } else {
                    strengthLabel = 'Strong';
                    strengthColor = '#10b981';
                }
                
                strengthText.textContent = `Password strength: ${strengthLabel}`;
                strengthText.style.color = strengthColor;
                
                strengthBars.forEach((bar, index) => {
                    if (index < strength) {
                        bar.style.background = strengthColor;
                    } else {
                        bar.style.background = '#374151';
                    }
                });
            }

            function showError(errorId, message) {
                const errorElement = document.getElementById(errorId);
                errorElement.querySelector('span').textContent = message;
                errorElement.style.display = 'flex';
            }

            function hideError(errorId) {
                document.getElementById(errorId).style.display = 'none';
            }

            function submitForm() {
                // Show loading state
                signupButton.classList.add('loading');
                signupButton.disabled = true;
                signupButton.querySelector('.button-text').textContent = 'Creating Account...';

                // Simulate form submission (replace with actual submission)
                setTimeout(() => {
                    // Reset button state
                    signupButton.classList.remove('loading');
                    signupButton.disabled = false;
                    signupButton.querySelector('.button-text').textContent = 'Create Account';

                    // Show success message
                    showMessage('success', 'Account created successfully! Welcome to Oulinou!');
                    
                    // Redirect after success
                    setTimeout(() => {
                        window.location.href = '../index.php';
                    }, 3000);
                }, 2500);
            }

            function showMessage(type, message) {
                formMessages.innerHTML = `
                    <div class="${type === 'success' ? 'success-message' : 'error-message'}">
                        <svg class="professional-icon icon-${type === 'success' ? 'check' : 'exclamation'}" viewBox="0 0 24 24"><path d="${type === 'success' ? 'M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z' : 'M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z'}"/></svg>
                        <span>${message}</span>
                    </div>
                `;
            }
        });
    </script>
</body>
</html>