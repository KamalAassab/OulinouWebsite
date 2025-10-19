<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Profile - Oulinou Parfums</title>
    <link rel="icon" href="../assets/images/logo-alt.png">
    <link rel="stylesheet" href="../assets/styles/professional-icons.css">
    <script src="../assets/scripts/professional-icons.js" defer></script>
    <link rel="stylesheet" href="../assets/styles/global-background.css">
    <link rel="stylesheet" href="../assets/styles/header.css">
    <link rel="stylesheet" href="../assets/styles/footer.css">
    <link rel="stylesheet" href="../assets/styles/icons.css">
    <link rel="stylesheet" href="../assets/styles/profile.css">
    <script src="../assets/scripts/icon-replacer.js" defer></script>
    <script src="../assets/scripts/profile.js" defer></script>
</head>
<body>
    <?php if (session_status() === PHP_SESSION_NONE) { session_start(); } include 'header.php'; ?>

    <!-- Professional Profile Section -->
    <section class="profile-section">
        <div class="container">
            <div class="profile-header">
                <div class="profile-avatar">
                    <div class="avatar-container">
                        <i class="fa-solid fa-user-circle"></i>
                        <div class="avatar-overlay">
                            <i class="fa-solid fa-camera"></i>
                        </div>
                    </div>
                </div>
                <div class="profile-info">
                    <h1 class="profile-name">Welcome, <?php echo isset($_SESSION['username']) ? htmlspecialchars($_SESSION['username']) : 'User'; ?></h1>
                    <p class="profile-email"><?php echo isset($_SESSION['email']) ? htmlspecialchars($_SESSION['email']) : 'user@example.com'; ?></p>
                    <div class="profile-stats">
                        <div class="stat-item">
                            <span class="stat-number">12</span>
                            <span class="stat-label">Orders</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">3</span>
                            <span class="stat-label">Favorites</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">2</span>
                            <span class="stat-label">Reviews</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="profile-content">
                <div class="profile-tabs">
                    <button class="tab-btn active" data-tab="overview">
                        <i class="fa-solid fa-chart-line"></i>
                        Overview
                    </button>
                    <button class="tab-btn" data-tab="orders">
                        <i class="fa-solid fa-box"></i>
                        Orders
                    </button>
                    <button class="tab-btn" data-tab="settings">
                        <i class="fa-solid fa-gear"></i>
                        Settings
                    </button>
                </div>

                <div class="tab-content">
                    <!-- Overview Tab -->
                    <div class="tab-panel active" id="overview">
                        <div class="overview-grid">
                            <div class="overview-card">
                                <div class="card-header">
                                    <h3>Recent Orders</h3>
                                    <a href="#" class="view-all">View All</a>
                                </div>
                                <div class="order-list">
                                    <div class="order-item">
                                        <div class="order-image">
                                            <img src="../assets/images/perfume-intense.jpg" alt="Intense Collection">
                                        </div>
                                        <div class="order-details">
                                            <h4>Intense Collection</h4>
                                            <p>Order #12345</p>
                                            <span class="order-status delivered">Delivered</span>
                                        </div>
                                        <div class="order-price">$89.99</div>
                                    </div>
                                    <div class="order-item">
                                        <div class="order-image">
                                            <img src="../assets/images/perfume-jazz.jpg" alt="Jazz Collection">
                                        </div>
                                        <div class="order-details">
                                            <h4>Jazz Collection</h4>
                                            <p>Order #12346</p>
                                            <span class="order-status processing">Processing</span>
                                        </div>
                                        <div class="order-price">$79.99</div>
                                    </div>
                                </div>
                            </div>

                            <div class="overview-card">
                                <div class="card-header">
                                    <h3>Favorite Products</h3>
                                    <a href="#" class="view-all">View All</a>
                                </div>
                                <div class="favorites-grid">
                                    <div class="favorite-item">
                                        <img src="../assets/images/perfume-classic.jpg" alt="Classic Collection">
                                        <h4>Classic Collection</h4>
                                        <p>$69.99</p>
                                    </div>
                                    <div class="favorite-item">
                                        <img src="../assets/images/perfume-women-1.jpg" alt="Women's Collection">
                                        <h4>Women's Collection</h4>
                                        <p>$59.99</p>
                                    </div>
                                </div>
                            </div>

                            <div class="overview-card">
                                <div class="card-header">
                                    <h3>Account Summary</h3>
                                </div>
                                <div class="summary-stats">
                                    <div class="summary-item">
                                        <span class="summary-label">Total Spent</span>
                                        <span class="summary-value">$1,247.50</span>
                                    </div>
                                    <div class="summary-item">
                                        <span class="summary-label">Member Since</span>
                                        <span class="summary-value">Jan 2024</span>
                                    </div>
                                    <div class="summary-item">
                                        <span class="summary-label">Loyalty Points</span>
                                        <span class="summary-value">2,450</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Orders Tab -->
                    <div class="tab-panel" id="orders">
                        <div class="orders-header">
                            <h2>Order History</h2>
                            <div class="filter-options">
                                <select class="filter-select">
                                    <option value="all">All Orders</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="processing">Processing</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>
                        <div class="orders-list">
                            <div class="order-card">
                                <div class="order-header">
                                    <div class="order-info">
                                        <h3>Order #12345</h3>
                                        <p>Placed on March 15, 2024</p>
                                    </div>
                                    <div class="order-status-badge delivered">Delivered</div>
                                </div>
                                <div class="order-items">
                                    <div class="order-item-detail">
                                        <img src="../assets/images/perfume-intense.jpg" alt="Intense Collection">
                                        <div class="item-info">
                                            <h4>Intense Collection</h4>
                                            <p>Quantity: 1</p>
                                        </div>
                                        <div class="item-price">$89.99</div>
                                    </div>
                                </div>
                                <div class="order-footer">
                                    <div class="order-total">
                                        <span>Total: $89.99</span>
                                    </div>
                                    <div class="order-actions">
                                        <button class="btn-secondary">Reorder</button>
                                        <button class="btn-primary">Track</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <!-- Settings Tab -->
                    <div class="tab-panel" id="settings">
                        <div class="settings-sections">
                            <div class="settings-section">
                                <h3>Personal Information</h3>
                                <form class="settings-form">
                                    <div class="form-group">
                                        <label for="firstName">First Name</label>
                                        <input type="text" id="firstName" value="John" class="form-input">
                                    </div>
                                    <div class="form-group">
                                        <label for="lastName">Last Name</label>
                                        <input type="text" id="lastName" value="Doe" class="form-input">
                                    </div>
                                    <div class="form-group">
                                        <label for="email">Email</label>
                                        <input type="email" id="email" value="john.doe@example.com" class="form-input">
                                    </div>
                                    <div class="form-group">
                                        <label for="phone">Phone</label>
                                        <input type="tel" id="phone" value="+1 (555) 123-4567" class="form-input">
                                    </div>
                                    <button type="submit" class="btn-primary">Save Changes</button>
                                </form>
                            </div>

                            <div class="settings-section">
                                <h3>Security</h3>
                                <form class="settings-form">
                                    <div class="form-group">
                                        <label for="currentPassword">Current Password</label>
                                        <input type="password" id="currentPassword" class="form-input">
                                    </div>
                                    <div class="form-group">
                                        <label for="newPassword">New Password</label>
                                        <input type="password" id="newPassword" class="form-input">
                                    </div>
                                    <div class="form-group">
                                        <label for="confirmPassword">Confirm Password</label>
                                        <input type="password" id="confirmPassword" class="form-input">
                                    </div>
                                    <button type="submit" class="btn-primary">Update Password</button>
                                </form>
                            </div>

                            <div class="settings-section">
                                <h3>Preferences</h3>
                                <div class="preferences-grid">
                                    <div class="preference-item">
                                        <label class="preference-label">
                                            <input type="checkbox" checked>
                                            <span class="checkmark"></span>
                                            Email Notifications
                                        </label>
                                    </div>
                                    <div class="preference-item">
                                        <label class="preference-label">
                                            <input type="checkbox" checked>
                                            <span class="checkmark"></span>
                                            SMS Notifications
                                        </label>
                                    </div>
                                    <div class="preference-item">
                                        <label class="preference-label">
                                            <input type="checkbox">
                                            <span class="checkmark"></span>
                                            Marketing Emails
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <?php include 'footer.php'; ?>
</body>
</html>
