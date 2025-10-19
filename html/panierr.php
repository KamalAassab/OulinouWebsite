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
            </div>
            
            <!-- Empty Cart State -->
            <div class="empty-cart" id="empty-cart" style="display: none;">
                <h2>Your Cart is Empty</h2>
                <p>Discover our exquisite collection of luxury fragrances</p>
                <a href="products.php" class="btn">
                    <i class="fa-solid fa-shopping-bag"></i>
                    Start Shopping
                </a>
            </div>
            
            <!-- Cart Summary -->
            <div class="cart-summary" id="cart-summary" style="display: none;">
                <h3>Order Summary</h3>
                <div class="cart-total">
                    <span class="cart-total-label">Total:</span>
                    <span class="cart-total-amount" id="cart-total">0 DHS</span>
                </div>
            </div>
            
            <!-- Professional Checkout Section -->
            <div class="checkout-section" id="checkout-section" style="display: none;">
                <form action="payment.php" method="get">
                    <button type="submit" class="but">
                        <i class="fa-solid fa-credit-card"></i>
                        <span>Proceed to Checkout</span>
                    </button>
                </form>
            </div>
        </div>
    </section>

    <?php include 'footer.php'; ?>
</body>
</html>
