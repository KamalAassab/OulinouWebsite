<?php
require_once 'pages/database-connection.php';

echo "=== Reverting Image Paths to Root-Relative ===\n\n";

try {
    $connexion->beginTransaction();
    
    // Remove ../ prefix to store paths from root
    $stmt = $connexion->prepare("UPDATE Produit SET image = REPLACE(image, '../', '') WHERE image LIKE '../%'");
    $stmt->execute();
    $updated = $stmt->rowCount();
    
    echo "Updated $updated products\n\n";
    
    // Show updated paths
    $stmt = $connexion->query("SELECT produit_id, nom, image FROM Produit");
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "=== Updated Image Paths (Root-Relative) ===\n";
    foreach ($products as $p) {
        echo "ID {$p['produit_id']}: {$p['nom']}\n";
        echo "  Path: {$p['image']}\n\n";
    }
    
    $connexion->commit();
    echo "✓ Database reverted to root-relative paths!\n";
    
} catch (Exception $e) {
    $connexion->rollBack();
    echo "Error: " . $e->getMessage() . "\n";
}
?>

