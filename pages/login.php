<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign In - Oulinou Parfums</title>
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

    <!-- Professional Login Section -->
    <div class="auth-container">
        <div class="auth-card">
            <!-- Professional Brand Header -->
            <div class="auth-header">
                <a href="../index.php" class="auth-logo">OULINOU</a>
                <h1 class="auth-title">Welcome Back</h1>
                <p class="auth-subtitle">Sign in to your account to continue your journey</p>
            </div>

            <!-- Professional Login Form -->
            <form class="auth-form" id="loginForm" method="POST" action="login.php">
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
                        placeholder="Enter your password"
                        required
                        autocomplete="current-password"
                    >
                    <div class="error-message" id="passwordError" style="display: none;">
                        <svg class="professional-icon icon-exclamation" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/></svg>
                        <span>Password is required</span>
                    </div>
                </div>

                <!-- Remember Me & Forgot Password -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin: 1rem 0;">
                    <label style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary); font-size: 0.9rem; cursor: pointer;">
                        <input type="checkbox" name="remember" style="accent-color: var(--accent-gold);">
                        Remember me
                    </label>
                    <a href="#" class="auth-link" id="forgotPassword">
                        Forgot Password?
                    </a>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="auth-button" id="loginButton">
                    <span class="button-text">Sign In</span>
                    <svg class="professional-icon icon-arrow-right button-icon" style="margin-left: 0.5rem;" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z"/></svg>
                </button>

                <!-- Success/Error Messages -->
                <div id="formMessages" style="margin-top: 1rem;"></div>
            </form>

            <!-- Professional Footer -->
            <div class="auth-footer">
                <p>Don't have an account?</p>
                <a href="signup.php" class="auth-link">
                    <svg class="professional-icon icon-signup" viewBox="0 0 24 24"><path d="M15 12C17.21 12 19 10.21 19 8S17.21 4 15 4 11 5.79 11 8 12.79 12 15 12ZM15 14C12.33 14 7 15.34 7 18V20H23V18C23 15.34 17.67 14 15 14ZM6 12C8.21 12 10 10.21 10 8S8.21 4 6 4 2 5.79 2 8 3.79 12 6 12ZM6 14C3.33 14 -2 15.34 -2 18V20H8V18C8 15.34 3.67 14 6 14Z"/></svg>
                    Create Account
                </a>
            </div>
        </div>
    </div>

    <?php include 'footer.php'; ?>

    <!-- Professional Auth JavaScript -->
    <script>
        // Professional form validation and interactions
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('loginForm');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const loginButton = document.getElementById('loginButton');
            const formMessages = document.getElementById('formMessages');


            // Real-time validation
            emailInput.addEventListener('input', function() {
                validateEmail(this);
            });

            passwordInput.addEventListener('input', function() {
                validatePassword(this);
            });

            // Form submission
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateForm()) {
                    submitForm();
                }
            });

            // Validation functions
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
                const isValid = input.value.length >= 6;
                
                if (input.value && !isValid) {
                    showError('passwordError', 'Password must be at least 6 characters');
                    input.classList.add('form-error');
                } else {
                    hideError('passwordError');
                    input.classList.remove('form-error');
                }
                
                return isValid;
            }

            function validateForm() {
                const emailValid = validateEmail(emailInput);
                const passwordValid = validatePassword(passwordInput);
                
                return emailValid && passwordValid;
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
                loginButton.classList.add('loading');
                loginButton.disabled = true;
                loginButton.querySelector('.button-text').textContent = 'Signing In...';

                // Simulate form submission (replace with actual submission)
                setTimeout(() => {
                    // Reset button state
                    loginButton.classList.remove('loading');
                    loginButton.disabled = false;
                    loginButton.querySelector('.button-text').textContent = 'Sign In';

                    // Show success message
                    showMessage('success', 'Welcome back! Redirecting...');
                    
                    // Redirect after success
                    setTimeout(() => {
                        window.location.href = '../index.php';
                    }, 2000);
                }, 2000);
            }

            function showMessage(type, message) {
                formMessages.innerHTML = `
                    <div class="${type === 'success' ? 'success-message' : 'error-message'}">
                        <svg class="professional-icon icon-${type === 'success' ? 'check' : 'exclamation'}" viewBox="0 0 24 24"><path d="${type === 'success' ? 'M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z' : 'M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z'}"/></svg>
                        <span>${message}</span>
                    </div>
                `;
            }

            // Forgot password functionality
            document.getElementById('forgotPassword').addEventListener('click', function(e) {
                e.preventDefault();
                showMessage('success', 'Password reset link sent to your email!');
            });
        });
    </script>
</body>
</html>