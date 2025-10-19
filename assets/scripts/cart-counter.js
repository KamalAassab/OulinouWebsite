// Professional Cart Counter System
// Handles cart count display across all pages

document.addEventListener('DOMContentLoaded', function() {
    console.log('Cart counter system initialized');
    
    // Initialize cart counter
    updateCartCount();
    
    // Listen for cart updates from localStorage
    window.addEventListener('storage', function(e) {
        if (e.key === 'cart') {
            updateCartCount();
            animateCartCount();
        }
    });
    
    // Listen for custom cart update events
    window.addEventListener('cartUpdated', function() {
        updateCartCount();
        animateCartCount();
    });
    
    // Update cart count on page focus (for cross-tab synchronization)
    window.addEventListener('focus', function() {
        updateCartCount();
    });
    
    // Update cart count on page visibility change
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            updateCartCount();
        }
    });
});

// Global function to update cart count
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    
    if (!cartCountElement) {
        console.log('Cart count element not found');
        return;
    }
    
    try {
        // Get cart from localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Calculate total items (considering quantities)
        let totalItems = 0;
        cart.forEach(item => {
            totalItems += (item.quantity || 1);
        });
        
        // Update display
        if (totalItems === 0) {
            cartCountElement.textContent = '0';
            cartCountElement.style.display = 'inline-block'; // Always show the badge
        } else {
            cartCountElement.textContent = totalItems.toString();
            cartCountElement.style.display = 'inline-block';
        }
        
        console.log(`Cart count updated: ${totalItems} items`);
        
    } catch (error) {
        console.error('Error updating cart count:', error);
        // Fallback to 0 if there's an error
        cartCountElement.textContent = '0';
        cartCountElement.style.display = 'inline-block';
    }
}

// Global function to animate cart count
function animateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    
    if (cartCountElement) {
        // Add animation class
        cartCountElement.style.transform = 'scale(1.3)';
        cartCountElement.style.transition = 'transform 0.2s ease';
        
        // Reset animation
        setTimeout(() => {
            cartCountElement.style.transform = 'scale(1)';
        }, 200);
    }
}

// Global function to trigger cart update (for use by other scripts)
function triggerCartUpdate() {
    updateCartCount();
    animateCartCount();
    
    // Dispatch custom event for other scripts
    window.dispatchEvent(new CustomEvent('cartUpdated'));
}

// Enhanced cart management functions
function addToCart(product) {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product already exists
        const existingItemIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex !== -1) {
            // Update quantity if item exists
            cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
        } else {
            // Add new item to cart
            const cartItem = {
                id: product.id || product.produit_id || Date.now(),
                name: product.name || product.nom || '',
                price: product.price || product.prix || 0,
                description: product.description || '',
                image: product.image || '',
                quantity: 1
            };
            cart.push(cartItem);
        }
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        triggerCartUpdate();
        
        console.log('Item added to cart:', product);
        return true;
        
    } catch (error) {
        console.error('Error adding to cart:', error);
        return false;
    }
}

function removeFromCart(itemId) {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => item.id == itemId);
        
        if (itemIndex !== -1) {
            cart.splice(itemIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            triggerCartUpdate();
            console.log('Item removed from cart:', itemId);
            return true;
        }
        
        return false;
        
    } catch (error) {
        console.error('Error removing from cart:', error);
        return false;
    }
}

function updateCartItemQuantity(itemId, quantity) {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => item.id == itemId);
        
        if (itemIndex !== -1) {
            if (quantity <= 0) {
                return removeFromCart(itemId);
            } else {
                cart[itemIndex].quantity = quantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                triggerCartUpdate();
                console.log('Cart item quantity updated:', itemId, quantity);
                return true;
            }
        }
        
        return false;
        
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        return false;
    }
}

function clearCart() {
    try {
        localStorage.setItem('cart', JSON.stringify([]));
        triggerCartUpdate();
        console.log('Cart cleared');
        return true;
    } catch (error) {
        console.error('Error clearing cart:', error);
        return false;
    }
}

function getCartItems() {
    try {
        return JSON.parse(localStorage.getItem('cart')) || [];
    } catch (error) {
        console.error('Error getting cart items:', error);
        return [];
    }
}

function getCartTotal() {
    try {
        const cart = getCartItems();
        return cart.reduce((total, item) => {
            return total + (item.price * (item.quantity || 1));
        }, 0);
    } catch (error) {
        console.error('Error calculating cart total:', error);
        return 0;
    }
}

function getCartItemCount() {
    try {
        const cart = getCartItems();
        return cart.reduce((total, item) => {
            return total + (item.quantity || 1);
        }, 0);
    } catch (error) {
        console.error('Error calculating cart item count:', error);
        return 0;
    }
}

// Make functions globally available
window.updateCartCount = updateCartCount;
window.animateCartCount = animateCartCount;
window.triggerCartUpdate = triggerCartUpdate;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartItemQuantity = updateCartItemQuantity;
window.clearCart = clearCart;
window.getCartItems = getCartItems;
window.getCartTotal = getCartTotal;
window.getCartItemCount = getCartItemCount;
