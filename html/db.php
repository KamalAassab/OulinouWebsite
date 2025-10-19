<?php
// Robust MySQL connection and schema bootstrap. Avoids HTML/JS output.

$dbHost = '127.0.0.1';
$dbPort = '3306';
$dbName = 'oulinou';
$dbUser = 'root';
$dbPass = 'test';

try {
    $serverPdo = new PDO("mysql:host={$dbHost};port={$dbPort};charset=utf8mb4", $dbUser, $dbPass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    $serverPdo->exec("CREATE DATABASE IF NOT EXISTS `{$dbName}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");

    $connexion = new PDO("mysql:host={$dbHost};port={$dbPort};dbname={$dbName};charset=utf8mb4", $dbUser, $dbPass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    // Tables (idempotent)
    $connexion->exec("CREATE TABLE IF NOT EXISTS User (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        role VARCHAR(100) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $connexion->exec("CREATE TABLE IF NOT EXISTS Produit (
        produit_id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(100) NOT NULL,
        image VARCHAR(255) NOT NULL,
        description TEXT,
        prix DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $connexion->exec("CREATE TABLE IF NOT EXISTS Commande (
        commande_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        produit_id INT NOT NULL,
        quantite INT NOT NULL,
        date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_commande_user FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
        CONSTRAINT fk_commande_produit FOREIGN KEY (produit_id) REFERENCES Produit(produit_id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
} catch (PDOException $e) {
    die('Database connection failed: ' . htmlspecialchars($e->getMessage()));
}
?>


