<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Secure Payment - Oulinou Parfums</title>
    <link rel="icon" href="../assets/images/logo-alt.png">
    <link rel="stylesheet" href="../assets/styles/professional-icons.css">
    <script src="../assets/scripts/professional-icons.js" defer></script>
    <link rel="stylesheet" href="../assets/styles/global-background.css">
    <link rel="stylesheet" href="../assets/styles/header.css">
    <link rel="stylesheet" href="../assets/styles/footer.css">
    <link rel="stylesheet" href="../assets/styles/icons.css">
    <link rel="stylesheet" href="../assets/styles/payment.css">
    <script src="../assets/scripts/icon-replacer.js" defer></script>
    <script src="../assets/scripts/payment.js" defer></script>
</head>
<body>
    <?php if (session_status() === PHP_SESSION_NONE) { session_start(); } include 'header.php'; ?>
    <!-- Professional Payment Section -->
    <section class="payment-section">
        <div class="container">
            <div class="payment-header">
                <h1 class="payment-title">Secure Payment</h1>
                <p class="payment-subtitle">Complete your purchase with confidence</p>
                <div class="security-badges">
                    <div class="security-badge">
                        <i class="fa-solid fa-shield-halved"></i>
                        <span>SSL Secured</span>
                    </div>
                    <div class="security-badge">
                        <i class="fa-solid fa-lock"></i>
                        <span>256-bit Encryption</span>
                    </div>
                </div>
            </div>

            <div class="payment-content">
                <div class="payment-form-container">
                    <form action="payment-confirmation.php" method="POST" class="payment-form" id="paymentForm">
                        <!-- Shipping Information -->
                        <div class="form-section">
                            <div class="section-header">
                                <h2>
                                    <i class="fa-solid fa-truck"></i>
                                    Shipping Information
                                </h2>
                                <div class="section-divider"></div>
                            </div>
                            
                            <div class="form-grid">
                                <div class="form-group">
                                    <label for="fullName" class="form-label">Full Name</label>
                                    <input type="text" id="fullName" name="fullName" class="form-input" placeholder="Enter your full name" required>
                                </div>
                                
                                <div class="form-group">
                                    <label for="email" class="form-label">Email Address</label>
                                    <input type="email" id="email" name="email" class="form-input" placeholder="your.email@example.com" required>
                                </div>
                                
                                <div class="form-group">
                                    <label for="phone" class="form-label">Phone Number</label>
                                    <input type="tel" id="phone" name="phone" class="form-input" placeholder="+1 (555) 123-4567" required>
                                </div>
                                
                                <div class="form-group full-width">
                                    <label for="address" class="form-label">Shipping Address</label>
                                    <input type="text" id="address" name="address" class="form-input" placeholder="123 Main Street, Apt 4B" required>
                                </div>
                                
                                <div class="form-group">
                                    <label for="city" class="form-label">City</label>
                                    <input type="text" id="city" name="city" class="form-input" placeholder="New York" required>
                                </div>
                                
                                <div class="form-group">
                                    <label for="zip" class="form-label">Postal Code</label>
                                    <input type="text" id="zip" name="zip" class="form-input" placeholder="10001" required>
                                </div>
                                
                                <div class="form-group">
                                    <label for="country" class="form-label">Country</label>
                                    <select id="country" name="country" class="form-select" required>
                                        <option value="">Select Country</option>
                                        <option value="US">United States</option>
                                        <option value="CA">Canada</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="FR">France</option>
                                        <option value="DE">Germany</option>
                                        <option value="ES">Spain</option>
                                        <option value="IT">Italy</option>
                                        <option value="MA">Morocco</option>
                                        <option value="AE">United Arab Emirates</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Payment Information -->
                        <div class="form-section">
                            <div class="section-header">
                                <h2>
                                    <i class="fa-solid fa-credit-card"></i>
                                    Payment Details
                                </h2>
                                <div class="section-divider"></div>
                            </div>
                            
                            <div class="payment-methods">
                                <div class="payment-method active" data-method="card">
                                    <i class="fa-solid fa-credit-card"></i>
                                    <span>Credit/Debit Card</span>
                                </div>
                                <div class="payment-method" data-method="paypal">
                                    <i class="fa-brands fa-paypal"></i>
                                    <span>PayPal</span>
                                </div>
                            </div>
                            
                            <div class="accepted-cards">
                                <span class="accepted-label">We Accept:</span>
                                <div class="card-icons">
                                    <img src="../assets/images/payment-visa.png" alt="Visa" class="card-icon">
                                    <img src="../assets/images/payment-mastercard.png" alt="Mastercard" class="card-icon">
                                    <img src="../assets/images/payment-amex.png" alt="American Express" class="card-icon">
                                </div>
                            </div>
                            
                            <div class="form-grid">
                                <div class="form-group full-width">
                                    <label for="cardname" class="form-label">Name on Card</label>
                                    <input type="text" id="cardname" name="cardname" class="form-input" placeholder="John Doe" required>
                                </div>
                                
                                <div class="form-group full-width">
                                    <label for="cardnumber" class="form-label">Card Number</label>
                                    <div class="card-input-container">
                                        <input type="text" id="cardnumber" name="cardnumber" class="form-input card-input" placeholder="1234 5678 9012 3456" required maxlength="19">
                                        <div class="card-type-icon">
                                            <i class="fa-solid fa-credit-card"></i>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="expmonth" class="form-label">Expiry Month</label>
                                    <select id="expmonth" name="expmonth" class="form-select" required>
                                        <option value="">Month</option>
                                        <option value="01">01 - January</option>
                                        <option value="02">02 - February</option>
                                        <option value="03">03 - March</option>
                                        <option value="04">04 - April</option>
                                        <option value="05">05 - May</option>
                                        <option value="06">06 - June</option>
                                        <option value="07">07 - July</option>
                                        <option value="08">08 - August</option>
                                        <option value="09">09 - September</option>
                                        <option value="10">10 - October</option>
                                        <option value="11">11 - November</option>
                                        <option value="12">12 - December</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label for="expyear" class="form-label">Expiry Year</label>
                                    <select id="expyear" name="expyear" class="form-select" required>
                                        <option value="">Year</option>
                                        <option value="24">2024</option>
                                        <option value="25">2025</option>
                                        <option value="26">2026</option>
                                        <option value="27">2027</option>
                                        <option value="28">2028</option>
                                        <option value="29">2029</option>
                                        <option value="30">2030</option>
                                        <option value="31">2031</option>
                                        <option value="32">2032</option>
                                        <option value="33">2033</option>
                                        <option value="34">2034</option>
                                        <option value="35">2035</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label for="cvv" class="form-label">CVV</label>
                                    <div class="cvv-container">
                                        <input type="text" id="cvv" name="cvv" class="form-input cvv-input" placeholder="123" required maxlength="4">
                                        <div class="cvv-help">
                                            <i class="fa-solid fa-question-circle" title="3-digit code on the back of your card"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Order Summary -->
                        <div class="form-section">
                            <div class="section-header">
                                <h2>
                                    <i class="fa-solid fa-receipt"></i>
                                    Order Summary
                                </h2>
                                <div class="section-divider"></div>
                            </div>
                            
                            <div class="order-summary">
                                <div class="summary-item">
                                    <span class="item-name">Intense Collection Perfume</span>
                                    <span class="item-price">$89.99</span>
                                </div>
                                <div class="summary-item">
                                    <span class="item-name">Jazz Collection Perfume</span>
                                    <span class="item-price">$79.99</span>
                                </div>
                                <div class="summary-item">
                                    <span class="item-name">Shipping</span>
                                    <span class="item-price">$9.99</span>
                                </div>
                                <div class="summary-item">
                                    <span class="item-name">Tax</span>
                                    <span class="item-price">$12.60</span>
                                </div>
                                <div class="summary-divider"></div>
                                <div class="summary-total">
                                    <span class="total-label">Total</span>
                                    <span class="total-price">$192.57</span>
                                </div>
                            </div>
                        </div>

                        <!-- Terms and Submit -->
                        <div class="form-section">
                            <div class="terms-container">
                                <label class="terms-checkbox">
                                    <input type="checkbox" id="terms" name="terms" required>
                                    <span class="checkmark"></span>
                                    <span class="terms-text">
                                        I agree to the <a href="pages/privacy-policy.php" target="_blank">Terms of Service</a> and <a href="pages/privacy-policy.php" target="_blank">Privacy Policy</a>
                                    </span>
                                </label>
                            </div>
                            
                            <button type="submit" class="payment-btn" id="paymentBtn">
                                <i class="fa-solid fa-lock"></i>
                                <span>Complete Secure Payment</span>
                                <div class="btn-loading" style="display: none;">
                                    <i class="fa-solid fa-spinner fa-spin"></i>
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</body>
<?php include 'footer.php'; ?>
</html>
