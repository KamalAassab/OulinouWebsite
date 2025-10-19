function addItemToCart(product) {
  // Use the centralized cart system
  if (typeof window.addToCart === "function") {
    const cartItem = {
      id: product.produit_id ?? product.id ?? Date.now(),
      name: product.nom ?? product.name ?? "",
      price: product.prix ?? product.price ?? 0,
      description: product.description ?? "",
      image: product.image ?? "",
    };
    
    const success = window.addToCart(cartItem);
    
    if (success && cartItem.name) {
      alert(`${cartItem.name} added to cart`);
    }
  } else {
    // Fallback to original method if centralized system not available
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItem = {
      id: product.produit_id ?? product.id ?? Date.now(),
      name: product.nom ?? product.name ?? "",
      price: product.prix ?? product.price ?? 0,
      description: product.description ?? "",
      image: product.image ?? "",
      quantity: 1
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
}

// Attach to window for easy access from inline scripts
window.addItemToCart = addItemToCart;
