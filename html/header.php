<?php

?>

<div class="container">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../assets/styles/header.css">
    <link rel="stylesheet" href="../assets/styles/icons.css">
    <script src="../assets/scripts/navigation.js" defer></script>
    <script src="../assets/scripts/icon-loader.js" defer></script>
    <script src="../assets/scripts/cart-counter.js" defer></script>
    <script src="../js/icon-replacer.js" defer></script>
    <nav>
        <header>
            <!-- Professional OULINOU Text Logo -->
            <a href="../index.php" class="logo-text">OULINOU</a>
            <ul id="navbar" class="nav-menu">
                <li class="nav-item"><a href="../index.php" class="nav-link"><i class="fa-solid fa-house"></i>&nbsp;Home</a></li>
                <li class="nav-item"><a href="products.php" class="nav-link"><i class="fa-solid fa-shop"></i>&nbsp;&nbsp;Shop</a></li>
                <li class="nav-item"><a href="aboutus.php" class="nav-link"><i class="fa-solid fa-circle-info"></i>&nbsp;About us</a></li>

                <?php if (isset($_SESSION['user_id'])): ?>
                    <!-- User dropdown menu for logged in users -->
                    <li class="nav-item user-dropdown">
                        <a href="#" class="nav-link user-toggle">
                            <i class="fa-solid fa-user"></i>
                            <span>Account</span>
                            <i class="fa-solid fa-chevron-down dropdown-arrow"></i>
                        </a>
                        <ul class="user-menu">
                            <li><a href="profile.php" class="user-menu-item"><i class="fa-solid fa-user-circle"></i> Profile</a></li>
                            <!-- <li><a href="orders.php" class="user-menu-item"><i class="fa-solid fa-box"></i> Orders</a></li> -->
                            <li><a href="logout.php" class="user-menu-item"><i class="fa-solid fa-right-from-bracket"></i> Logout</a></li>
                        </ul>
                    </li>
                <?php else: ?>
                    <!-- User dropdown menu for guests -->
                    <li class="nav-item user-dropdown">
                        <a href="#" class="nav-link user-toggle">
                            <i class="fa-solid fa-user"></i>
                            <span>Account</span>
                            <i class="fa-solid fa-chevron-down dropdown-arrow"></i>
                        </a>
                        <ul class="user-menu">
                            <li><a href="login.php" class="user-menu-item"><i class="fa-solid fa-arrow-right-to-bracket"></i> Sign In</a></li>
                            <li><a href="signup.php" class="user-menu-item"><i class="fa-solid fa-user-plus"></i> Sign Up</a></li>
                        </ul>
                    </li>
                <?php endif; ?>

                <li class="nav-item"><a href="panierr.php" class="nav-link"><i class="fa-solid fa-bag-shopping"></i>&nbsp;&nbsp;Cart <span
                            id="cart-count"></span></a></li>
            </ul>
        </header>
    </nav>
</div>