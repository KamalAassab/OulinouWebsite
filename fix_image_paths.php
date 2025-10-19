<?php
require_once 'pages/database-connection.php';

echo "=== Fixing Image Paths for Subdirectories ===\n\n";

try {
    $connexion->beginTransaction();
    
    // Update all paths to work from subdirectories (pages/ and html/ folders)
    $stmt = $connexion->prepare("UPDATE Produit SET image = CONCAT('../', image) WHERE image NOT LIKE '../%'");
    $stmt->execute();
    $updated = $stmt->rowCount();
    
    echo "Updated $updated products\n\n";
    
    // Show updated paths
    $stmt = $connexion->query("SELECT produit_id, nom, image FROM Produit");
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "=== Updated Image Paths ===\n";
    foreach ($products as $p) {
        echo "ID {$p['produit_id']}: {$p['nom']}\n";
        echo "  Path: {$p['image']}\n\n";
    }
    
    $connexion->commit();
    echo "✓ Database updated successfully!\n";
    
} catch (Exception $e) {
    $connexion->rollBack();
    echo "Error: " . $e->getMessage() . "\n";
}
?>

