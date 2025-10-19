<?php
// Connexion à la base de données avec PDO
include("database-connection.php"); // Assurez-vous que le chemin vers database-connection.php est correct

// Démarrage de la session pour accéder aux variables de session
session_start();

// Préparer la requête pour récupérer les produits depuis la base de données
$query = "SELECT * FROM Produit"; // Assurez-vous que 'Produit' est le nom de votre table

// Exécuter la requête avec PDO
$stmt = $connexion->prepare($query);
$stmt->execute();

// Récupérer tous les produits sous forme de tableau associatif
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Adjust image paths for this page location (we're in pages/ folder)
foreach ($products as &$product) {
    // If image path doesn't already start with ../, it's from root
    if (!str_starts_with($product['image'], '../') && !str_starts_with($product['image'], 'http')) {
        // Don't add another ../ if it already has it
        if (str_starts_with($product['image'], 'assets/')) {
            $product['image'] = '../' . $product['image'];
        }
    }
}
unset($product); // Break reference

// Convertir les produits en JSON
$productsJson = json_encode($products);
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Products - Oulinou Parfums</title>
    <link rel="icon" href="../assets/images/logo-alt.png">
    <link rel="stylesheet" href="../assets/styles/professional-icons.css">
    <script src="../assets/scripts/professional-icons.js" defer></script>
    <link rel="stylesheet" href="../assets/styles/global-background.css">
    <link rel="stylesheet" href="../assets/styles/main.css">
    <link rel="stylesheet" href="../assets/styles/products.css">
    <link rel="stylesheet" href="../assets/styles/icons.css">
    <script src="../assets/scripts/products.js" defer></script>
    <script src="../assets/scripts/icon-replacer.js" defer></script>
</head>

<body>
    <?php if (session_status() === PHP_SESSION_NONE) { session_start(); } include 'header.php'; ?>

    <!-- Professional Products Section -->
    <section class="products-section">
        <div class="section-header">
            <h1 class="section-title">Our Premium Collection</h1>
            <p class="section-subtitle">Discover our exquisite range of luxury fragrances, crafted with the finest ingredients</p>
            <div class="section-divider"></div>
        </div>

        <!-- Professional Products Grid -->
        <div class="main-content" id="products-container">
            <!-- Products will be dynamically loaded here -->
        </div>
        
        <!-- Loading State -->
        <div class="loading-container" id="loading-container" style="display: none;">
            <div class="loading-spinner"></div>
        </div>
        
        <!-- Empty State -->
        <div class="empty-state" id="empty-state" style="display: none;">
            <h2>No Products Available</h2>
            <p>We're currently updating our collection. Please check back soon!</p>
            <a href="../index.php" class="btn">Return Home</a>
        </div>
    </section>

    <!-- Professional Products Data -->
    <script>
        // Make products available globally for the professional script
        window.products = <?php echo $productsJson; ?>;
    </script>
</body>
<?php include 'footer.php'; ?>

</html>