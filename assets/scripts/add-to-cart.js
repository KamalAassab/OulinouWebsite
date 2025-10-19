function addItemToCart(product) {
  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItem = {
    id: product.produit_id ?? product.id ?? Date.now(),
    name: product.nom ?? product.name ?? "",
    price: product.prix ?? product.price ?? 0,
    description: product.description ?? "",
    image: product.image ?? "",
  };
  existingCart.push(cartItem);
  localStorage.setItem("cart", JSON.stringify(existingCart));
  if (typeof updateCartCount === "function") {
    updateCartCount();
  }
  if (cartItem.name) {
    alert(`${cartItem.name} added to cart`);
  }
}

// Attach to window for easy access from inline scripts
window.addItemToCart = addItemToCart;
