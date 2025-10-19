<?php
// Connexion à la base de données avec PDO
include("db.php");
if (session_status() === PHP_SESSION_NONE) { session_start(); }

// Vérifier si le formulaire a été soumis
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Récupérer les données du formulaire
    $nom = $_POST['nom'];
    $description = $_POST['description'];
    $prix = $_POST['prix'];
    $stock = $_POST['stock'];

    // Gérer l'upload de l'image
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $imageTmp = $_FILES['image']['tmp_name'];
        $imageName = basename($_FILES['image']['name']);
        $imagePath = "../assets/images/" . $imageName; // Dossier de destination des images

        // Vérifier le type de fichier (exemple: accepter uniquement les images jpg, jpeg, png)
        $allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        $fileType = mime_content_type($imageTmp);

        if (in_array($fileType, $allowedTypes)) {
            // Vérifier la taille de l'image (exemple: max 2MB)
            if ($_FILES['image']['size'] <= 2 * 1024 * 1024) {
                // Déplacer l'image vers le dossier de destination
                if (move_uploaded_file($imageTmp, $imagePath)) {
                    // L'image est téléchargée avec succès
                } else {
                    echo "Erreur lors du téléchargement de l'image.";
                    exit();
                }
            } else {
                echo "L'image est trop grande. La taille maximale est de 2 Mo.";
                exit();
            }
        } else {
            echo "Format d'image non valide. Veuillez télécharger une image JPG, JPEG ou PNG.";
            exit();
        }
    } else {
        echo "Image non valide.";
        exit();
    }

    // Vérifier que tous les champs sont remplis
    if (!empty($nom) && !empty($description) && !empty($prix) && !empty($stock) && !empty($imagePath)) {
        // Préparer la requête pour insérer les données dans la base de données
        $query = "INSERT INTO Produit (nom, description, prix, stock, image) VALUES (:nom, :description, :prix, :stock, :image)";
        $stmt = $connexion->prepare($query);

        // Exécuter la requête avec les données du formulaire
        try {
            $stmt->execute([
                ':nom' => $nom,
                ':description' => $description,
                ':prix' => $prix,
                ':stock' => $stock,
                ':image' => $imagePath // Enregistrer le chemin de l'image
            ]);

            $_SESSION['message'] = "Produit ajouté avec succès!";
        } catch (PDOException $e) {
            $_SESSION['error'] = "Erreur: " . $e->getMessage();
        }

        header('Location: products.php'); // Rediriger pour éviter la soumission multiple
        exit();
    } else {
        $_SESSION['error'] = "Tous les champs doivent être remplis.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ajouter un produit</title>
    <link rel="icon" href="../assets/images/logo-alt.png">
    <link rel="stylesheet" href="../assets/styles/global-background.css">
    <link rel="stylesheet" href="../assets/styles/main.css">
    <link rel="stylesheet" href="../assets/styles/admin/add-product.css">
    <link rel="stylesheet" href="../assets/styles/icons.css">
    <link rel="stylesheet" href="../assets/styles/professional-icons.css">
    <script src="../assets/scripts/professional-icons.js" defer></script>
    <link rel="stylesheet" href="../assets/styles/products.css">
    <script src="../assets/scripts/icon-replacer.js" defer></script>
</head>

<body>
    <?php include 'header.php'; ?>

    <!-- Affichage des messages de succès ou d'erreur -->
    <div class="message">
        <?php
        session_start();
        if (isset($_SESSION['message'])) {
            echo "<p style='color: green;'>" . $_SESSION['message'] . "</p>";
            unset($_SESSION['message']);
        }
        if (isset($_SESSION['error'])) {
            echo "<p style='color: red;'>" . $_SESSION['error'] . "</p>";
            unset($_SESSION['error']);
        }
        ?>
    </div>

    <!-- Formulaire pour ajouter un produit -->
    <div class="add-product-form">
        <h2>Ajouter un produit</h2>
        <form action="insert_product.php" method="POST" enctype="multipart/form-data">
            <label for="nom">Nom du produit:</label>
            <input type="text" id="nom" name="nom" required><br>

            <label for="description">Description:</label>
            <textarea id="description" name="description" required></textarea><br>

            <label for="prix">Prix:</label>
            <input type="number" id="prix" name="prix" required><br>

            <label for="stock">Stock:</label>
            <input type="number" id="stock" name="stock" required><br>

            <label for="image">Image du produit (Max 2MB, formats acceptés: JPG, PNG):</label>
            <input type="file" id="image" name="image" required><br>

            <input type="submit" value="Ajouter le produit">
        </form>
    </div>

    <div class="main-content"></div>

    <script src="../js/addtocart.js"></script>
</body>

<?php include 'footer.php'; ?>

</html>