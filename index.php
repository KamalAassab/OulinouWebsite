<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Oulinou Parfums</title>
  <link rel="icon" href="assets/images/logo.png">
    <link rel="stylesheet" href="assets/styles/professional-icons.css">
    <script src="assets/scripts/professional-icons.js" defer></script>
  <link rel="stylesheet" href="assets/styles/main.css">
  <link rel="stylesheet" href="assets/styles/global-background.css">
  <link rel="stylesheet" href="assets/styles/home.css">
  <link rel="stylesheet" href="assets/styles/header.css">
  <link rel="stylesheet" href="assets/styles/footer.css">
  <link rel="stylesheet" href="assets/styles/icons.css">
  <script src="assets/scripts/home.js" defer></script>
  <script src="assets/scripts/navigation.js" defer></script>
  <script src="assets/scripts/icon-replacer.js" defer></script>
</head>

<body>
  <?php
    if (session_status() === PHP_SESSION_NONE) { session_start(); }
    include 'header.php';
  ?>

  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-content">
      <div class="hero-text">
        <h1 class="hero-title">
          <span class="title-line-1">Discover Your</span>
          <span class="title-line-2">Signature Scent</span>
        </h1>
        <p class="hero-subtitle">
          Immerse yourself in the world of luxury fragrances. 
          Each bottle tells a story, each scent creates a memory.
        </p>
        <div class="hero-buttons">
          <a href="pages/products.php" class="btn btn-primary">
            <i class="fa-solid fa-shopping-bag"></i>
            Explore Collection
          </a>
          <a href="pages/about-us.php" class="btn btn-secondary">
            <i class="fa-solid fa-play"></i>
            Our Story
          </a>
        </div>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-number">500+</span>
            <span class="stat-label">Premium Fragrances</span>
          </div>
          <div class="stat">
            <span class="stat-number">50K+</span>
            <span class="stat-label">Happy Customers</span>
          </div>
          <div class="stat">
            <span class="stat-number">25+</span>
            <span class="stat-label">Years Experience</span>
          </div>
        </div>
      </div>
      
      <div class="hero-visual">
        <div class="perfume-showcase">
          <div class="showcase-bottle main-bottle">
            <img src="assets/images/perfume-intense.jpg" alt="Premium Perfume" class="bottle-image">
            <div class="bottle-glow"></div>
          </div>
          <div class="showcase-bottle secondary-bottle">
            <img src="assets/images/perfume-jazz.jpg" alt="Jazz Perfume" class="bottle-image">
          </div>
          <div class="showcase-bottle tertiary-bottle">
            <img src="assets/images/perfume-classic.jpg" alt="Classic Perfume" class="bottle-image">
          </div>
        </div>
        <div class="scent-waves">
          <div class="wave wave-1"></div>
          <div class="wave wave-2"></div>
          <div class="wave wave-3"></div>
        </div>
      </div>
    </div>
    
  </section>

  <!-- Featured Products Section - Professional Theme -->
  <section class="featured-products">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Featured Products</h2>
        <p class="section-subtitle">Discover our most exquisite fragrances, carefully curated for the discerning connoisseur</p>
        <div class="section-divider"></div>
      </div>
      
      <div class="products-grid">
        <div class="product-card featured-card">
          <div class="product-image">
            <img src="assets/images/perfume-intense.jpg" alt="Intense Collection">
            <div class="product-badge">Premium</div>
          </div>
          <div class="product-content">
            <h3 class="product-title">Intense Collection</h3>
            <a href="pages/product-detail.php?id=1" class="product-btn">
              <i class="fa-solid fa-shopping-bag"></i>
              Add to Cart
            </a>
          </div>
        </div>
        
        <div class="product-card featured-card">
          <div class="product-image">
            <img src="assets/images/perfume-jazz.jpg" alt="Jazz Collection">
            <div class="product-badge">New</div>
          </div>
          <div class="product-content">
            <h3 class="product-title">Jazz Collection</h3>
            <a href="pages/product-detail.php?id=2" class="product-btn">
              <i class="fa-solid fa-shopping-bag"></i>
              Add to Cart
            </a>
          </div>
        </div>
        
        <div class="product-card featured-card">
          <div class="product-image">
            <img src="assets/images/perfume-classic.jpg" alt="Classic Collection">
            <div class="product-badge">Classic</div>
          </div>
          <div class="product-content">
            <h3 class="product-title">Classic Collection</h3>
            <a href="pages/product-detail.php?id=3" class="product-btn">
              <i class="fa-solid fa-shopping-bag"></i>
              Add to Cart
            </a>
          </div>
        </div>
      </div>
      
      <div class="section-footer">
        <a href="pages/products.php" class="view-all-btn">
          <span>View All Products</span>
          <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>
  </section>

  <?php include 'footer.php'; ?>

</html>