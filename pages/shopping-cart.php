<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shopping Cart - Oulinou Parfums</title>
    <link rel="icon" href="../assets/images/logo-alt.png">
    <link rel="stylesheet" href="../assets/styles/professional-icons.css">
    <script src="../assets/scripts/professional-icons.js" defer></script>
    <link rel="stylesheet" href="../css/global-background.css">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/panier.css">
    <link rel="stylesheet" href="../css/icons.css">
    <script src="../js/panier.js" defer></script>
    <script src="../js/icon-replacer.js" defer></script>
</head>
<body>
    <?php if (session_status() === PHP_SESSION_NONE) { session_start(); } include 'header.php'; ?>

    <!-- Professional Cart Section -->
    <section class="cart-section">
        <div class="cart-container">
            <div class="cart-header">
                <h1 class="cart-title">Your Shopping Cart</h1>
                <p class="cart-subtitle">Review your selected fragrances and proceed to checkout</p>
                <div class="cart-divider"></div>
            </div>

            <!-- Professional Cart Items -->
            <div class="main-content" id="cart-items">
                <!-- Cart items will be dynamically loaded here -->
            </div>
            
            <!-- Loading State -->
            <div class="cart-loading" id="cart-loading" style="display: none;">
                <div class="cart-spinner"></div>
                <div class="cart-loading-text">Loading your cart...</div>
            </div>
            
            <!-- Empty Cart State -->
            <div class="empty-cart" id="empty-cart" style="display: none;">
                <h2>Your Cart is Empty</h2>
                <p>Discover our exquisite collection of luxury fragrances</p>
                <button class="btn" onclick="window.location.href='products.php'">
                    <svg class="professional-icon icon-shop" viewBox="0 0 24 24"><path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/></svg>
                    Start Shopping
                </button>
            </div>
            
            <!-- Cart Summary Sidebar -->
            <div class="cart-summary" id="cart-summary" style="display: none;">
                <h3>Order Summary</h3>
                <div class="cart-total">
                    <span class="cart-total-label">Total:</span>
                    <span class="cart-total-amount" id="cart-total">0 DHS</span>
                </div>
                
                <!-- Professional Checkout Section -->
                <div class="checkout-section" id="checkout-section">
                    <form action="payment.php" method="get">
                        <button type="submit" class="but">
                            <svg class="professional-icon icon-credit-card" viewBox="0 0 24 24"><path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V8H20V18ZM20 6H4V6H20Z"/></svg>
                            <span>Proceed to Checkout</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <?php include 'footer.php'; ?>
</body>
</html>
