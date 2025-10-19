<?php
// Professional Product Detail Page
include("db.php");
session_start();

// Get product ID from URL
$product_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($product_id > 0) {
    // Fetch specific product
    $query = "SELECT * FROM Produit WHERE produit_id = :id";
    $stmt = $connexion->prepare($query);
    $stmt->bindParam(':id', $product_id);
    $stmt->execute();
    $product = $stmt->fetch(PDO::FETCH_ASSOC);
} else {
    // Redirect to products page if no ID
    header('Location: products.php');
    exit();
}

if (!$product) {
    // Product not found
    header('Location: products.php');
    exit();
}

// Adjust image path for this page location (we're in html/ folder)
if (!str_starts_with($product['image'], '../') && !str_starts_with($product['image'], 'http')) {
    if (str_starts_with($product['image'], 'assets/')) {
        $product['image'] = '../' . $product['image'];
    }
}

// Get related products
$relatedQuery = "SELECT * FROM Produit WHERE produit_id != :id ORDER BY RAND() LIMIT 4";
$relatedStmt = $connexion->prepare($relatedQuery);
$relatedStmt->bindParam(':id', $product_id);
$relatedStmt->execute();
$relatedProducts = $relatedStmt->fetchAll(PDO::FETCH_ASSOC);

// Adjust image paths for related products
foreach ($relatedProducts as &$relatedProduct) {
    if (!str_starts_with($relatedProduct['image'], '../') && !str_starts_with($relatedProduct['image'], 'http')) {
        if (str_starts_with($relatedProduct['image'], 'assets/')) {
            $relatedProduct['image'] = '../' . $relatedProduct['image'];
        }
    }
}
unset($relatedProduct);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($product['nom']); ?> - Oulinou Parfums</title>
    <link rel="icon" href="../assets/images/logo-alt.png">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/global-background.css">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/product-detail.css">
    <link rel="stylesheet" href="../css/icons.css">
    <script src="../js/product-detail.js" defer></script>
    <script src="../js/icon-replacer.js" defer></script>
</head>
<body>
    <?php include 'header.php'; ?>

    <!-- Professional Product Detail Section -->
    <section class="product-detail-section">
        <div class="product-background">
            <div class="product-overlay"></div>
            <div class="product-particles">
                <div class="product-particle"></div>
                <div class="product-particle"></div>
                <div class="product-particle"></div>
                <div class="product-particle"></div>
                <div class="product-particle"></div>
            </div>
        </div>
        
        <div class="product-container">
            <!-- Breadcrumb Navigation -->
            <nav class="breadcrumb">
                <a href="../index.php" class="breadcrumb-link">Home</a>
                <i class="fa-solid fa-chevron-right"></i>
                <a href="products.php" class="breadcrumb-link">Products</a>
                <i class="fa-solid fa-chevron-right"></i>
                <span class="breadcrumb-current"><?php echo htmlspecialchars($product['nom']); ?></span>
            </nav>

            <!-- Product Detail Content -->
            <div class="product-detail-content">
                <!-- Product Images -->
                <div class="product-images">
                    <div class="main-image-container">
                        <img src="<?php echo htmlspecialchars($product['image']); ?>" 
                             alt="<?php echo htmlspecialchars($product['nom']); ?>" 
                             class="main-image" 
                             id="main-image">
                        <div class="image-zoom-overlay"></div>
                    </div>
                    <div class="thumbnail-container">
                        <div class="thumbnail active" data-image="<?php echo htmlspecialchars($product['image']); ?>">
                            <img src="<?php echo htmlspecialchars($product['image']); ?>" alt="Main view">
                        </div>
                        <!-- Additional thumbnails can be added here -->
                    </div>
                </div>

                <!-- Product Information -->
                <div class="product-info">
                    <div class="product-badge">Premium</div>
                    <h1 class="product-title"><?php echo htmlspecialchars($product['nom']); ?></h1>
                    <div class="product-rating">
                        <div class="stars">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <span class="rating-text">(4.8/5) - 127 reviews</span>
                    </div>
                    
                    <div class="product-price">
                        <span class="current-price"><?php echo number_format($product['prix'], 2); ?> DHS</span>
                        <span class="price-label">Premium Price</span>
                    </div>
                    
                    <div class="product-description">
                        <p><?php echo htmlspecialchars($product['description']); ?></p>
                    </div>
                    
                    <!-- Product Features -->
                    <div class="product-features">
                        <div class="feature">
                            <i class="fa-solid fa-leaf"></i>
                            <span>Natural Ingredients</span>
                        </div>
                        <div class="feature">
                            <i class="fa-solid fa-clock"></i>
                            <span>Long Lasting</span>
                        </div>
                        <div class="feature">
                            <i class="fa-solid fa-gem"></i>
                            <span>Luxury Quality</span>
                        </div>
                    </div>
                    
                    <!-- Quantity Selector -->
                    <div class="quantity-selector">
                        <label for="quantity">Quantity:</label>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="decreaseQuantity()">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                            <input type="number" id="quantity" value="1" min="1" max="10">
                            <button class="quantity-btn" onclick="increaseQuantity()">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="product-actions">
                        <button class="btn btn-primary add-to-cart" data-product='<?php echo json_encode($product); ?>'>
                            <i class="fa-solid fa-shopping-bag"></i>
                            <span>Add to Cart</span>
                        </button>
                        <button class="btn btn-secondary wishlist-btn">
                            <i class="fa-solid fa-heart"></i>
                            <span>Add to Wishlist</span>
                        </button>
                    </div>
                    
                    <!-- Product Details -->
                    <div class="product-details-tabs">
                        <div class="tab-buttons">
                            <button class="tab-btn active" data-tab="description">Description</button>
                            <button class="tab-btn" data-tab="ingredients">Ingredients</button>
                            <button class="tab-btn" data-tab="reviews">Reviews</button>
                        </div>
                        
                        <div class="tab-content">
                            <div class="tab-panel active" id="description">
                                <h3>Product Description</h3>
                                <p><?php echo htmlspecialchars($product['description']); ?></p>
                                <p>This exquisite fragrance is crafted with the finest ingredients, creating a unique and memorable scent that defines luxury and sophistication.</p>
                            </div>
                            
                            <div class="tab-panel" id="ingredients">
                                <h3>Key Ingredients</h3>
                                <ul>
                                    <li>Rose Absolute</li>
                                    <li>Jasmine Grandiflorum</li>
                                    <li>Bergamot</li>
                                    <li>Ambergris</li>
                                    <li>White Musk</li>
                                </ul>
                            </div>
                            
                            <div class="tab-panel" id="reviews">
                                <h3>Customer Reviews</h3>
                                <div class="reviews-summary">
                                    <div class="rating-breakdown">
                                        <div class="rating-item">
                                            <span>5 stars</span>
                                            <div class="rating-bar">
                                                <div class="rating-fill" style="width: 85%"></div>
                                            </div>
                                            <span>85%</span>
                                        </div>
                                        <div class="rating-item">
                                            <span>4 stars</span>
                                            <div class="rating-bar">
                                                <div class="rating-fill" style="width: 12%"></div>
                                            </div>
                                            <span>12%</span>
                                        </div>
                                        <div class="rating-item">
                                            <span>3 stars</span>
                                            <div class="rating-bar">
                                                <div class="rating-fill" style="width: 2%"></div>
                                            </div>
                                            <span>2%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Related Products Section -->
    <section class="related-products-section">
        <div class="related-background">
            <div class="related-overlay"></div>
        </div>
        
        <div class="related-container">
            <div class="section-header">
                <h2 class="section-title">You Might Also Like</h2>
                <p class="section-subtitle">Discover more exquisite fragrances from our collection</p>
                <div class="section-divider"></div>
            </div>
            
            <div class="related-products-grid">
                <?php foreach ($relatedProducts as $relatedProduct): ?>
                <div class="related-product-card">
                    <div class="related-product-image">
                        <img src="<?php echo htmlspecialchars($relatedProduct['image']); ?>" 
                             alt="<?php echo htmlspecialchars($relatedProduct['nom']); ?>">
                        <div class="related-product-overlay">
                            <a href="product-detail.php?id=<?php echo $relatedProduct['produit_id']; ?>" 
                               class="related-product-btn">Add to Cart</a>
                        </div>
                    </div>
                    <div class="related-product-info">
                        <h3><?php echo htmlspecialchars($relatedProduct['nom']); ?></h3>
                        <p class="related-product-price"><?php echo number_format($relatedProduct['prix'], 2); ?> DHS</p>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <?php include 'footer.php'; ?>
</body>
</html>
