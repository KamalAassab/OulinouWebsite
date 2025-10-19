<?php
require_once 'pages/database-connection.php';

$stmt = $connexion->query('SELECT produit_id, nom, image FROM Produit');
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo "=== DATABASE PRODUCTS ===\n";
foreach($products as $p) {
    echo "ID: {$p['produit_id']} | Name: {$p['nom']} | Image: {$p['image']}\n";
}

echo "\n=== CHECKING IMAGE FILES ===\n";
foreach($products as $p) {
    $imagePath = $p['image'];
    
    // Check various possible paths
    $paths = [
        $imagePath,
        '../' . $imagePath,
        './' . $imagePath,
    ];
    
    $found = false;
    foreach ($paths as $path) {
        if (file_exists($path)) {
            echo "✓ FOUND: {$imagePath} at {$path}\n";
            $found = true;
            break;
        }
    }
    
    if (!$found) {
        echo "✗ NOT FOUND: {$imagePath}\n";
    }
}
?>

