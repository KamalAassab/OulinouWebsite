CREATE DATABASE IF NOT EXISTS oulinou CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE oulinou;

-- Table User
CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    role VARCHAR(100) NOT NULL ,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table Produit
CREATE TABLE Produit (
    produit_id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
	image VARCHAR(100) NOT NULL,
    description TEXT,
    prix DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table Commande
CREATE TABLE Commande (
    commande_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    produit_id INT NOT NULL,
    quantite INT NOT NULL,
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
    FOREIGN KEY (produit_id) REFERENCES Produit(produit_id) ON DELETE CASCADE
);