// Professional Cart Page - Interactive Script
document.addEventListener('DOMContentLoaded', function() {
    // Professional cart initialization
    const cartItems = document.getElementById('cart-items');
    const cartLoading = document.getElementById('cart-loading');
    const emptyCart = document.getElementById('empty-cart');
    const cartSummary = document.getElementById('cart-summary');
    const checkoutSection = document.getElementById('checkout-section');
    const cartTotal = document.getElementById('cart-total');
    
    // Show loading state initially
    if (cartLoading) {
        cartLoading.style.display = 'flex';
    }
    
    // Professional cart rendering
function renderCart() {
        // Hide loading state
        if (cartLoading) {
            cartLoading.style.display = 'none';
        }
        
        // Get cart from localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
            // Show empty cart state
            if (emptyCart) {
                emptyCart.style.display = 'block';
            }
            if (cartSummary) {
                cartSummary.style.display = 'none';
            }
            if (checkoutSection) {
                checkoutSection.style.display = 'none';
            }
            return;
        }
        
        // Hide empty cart state
        if (emptyCart) {
            emptyCart.style.display = 'none';
        }
        
        // Show cart summary and checkout
        if (cartSummary) {
            cartSummary.style.display = 'block';
        }
        if (checkoutSection) {
            checkoutSection.style.display = 'block';
        }
        
        // Clear existing items
        if (cartItems) {
            cartItems.innerHTML = '';
        }
        
        // Render cart items with professional animations
        cart.forEach((item, index) => {
            setTimeout(() => {
                createCartItem(item, index);
            }, index * 150);
        });
        
        // Update cart total
        updateCartTotal();
    }
    
    function createCartItem(item, index) {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item fade-in';
        cartItem.style.animationDelay = `${index * 0.1}s`;
        cartItem.setAttribute('data-item-id', item.id);
        
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>${item.description || 'Premium fragrance'}</p>
                <div class="cart-item-price">${item.price} DHS</div>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">
                        <svg class="professional-icon icon-minus" viewBox="0 0 24 24"><path d="M19 13H5V11H19V13Z"/></svg>
                    </button>
                    <span class="quantity-display">1</span>
                    <button class="quantity-btn" onclick="increaseQuantity(${item.id})">
                        <svg class="professional-icon icon-plus" viewBox="0 0 24 24"><path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"/></svg>
                    </button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    <svg class="professional-icon icon-trash" viewBox="0 0 24 24"><path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z"/></svg>
                    Remove
                </button>
            </div>
        `;
        
        // Add professional hover effects
        cartItem.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = 'var(--shadow-strong)';
        });
        
        cartItem.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-medium)';
        });
        
        if (cartItems) {
            cartItems.appendChild(cartItem);
        }
    }
    
    // Professional quantity controls
    window.increaseQuantity = function(itemId) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => item.id == itemId);
        
        if (itemIndex !== -1) {
            cart[itemIndex].quantity = (cart[itemIndex].quantity || 1) + 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            updateCartCount();
            showSuccessNotification('Quantity updated');
        }
    };
    
    window.decreaseQuantity = function(itemId) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => item.id == itemId);
        
        if (itemIndex !== -1) {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity = cart[itemIndex].quantity - 1;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
                updateCartCount();
                showSuccessNotification('Quantity updated');
            } else {
                removeFromCart(itemId);
            }
        }
    };
    
    // Professional remove from cart
    window.removeFromCart = function(itemId) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => item.id == itemId);
        
        if (itemIndex !== -1) {
            // Add removal animation
            const cartItem = document.querySelector(`[data-item-id="${itemId}"]`);
            if (cartItem) {
                cartItem.style.animation = 'slideOutLeft 0.5s ease-out forwards';
                setTimeout(() => {
                    cart.splice(itemIndex, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                    updateCartCount();
                    showSuccessNotification('Item removed from cart');
                }, 500);
            }
        }
    };
    
    // Professional cart total calculation
    function updateCartTotal() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let total = 0;
        
        cart.forEach(item => {
            const price = parseFloat(item.price) || 0;
            const quantity = item.quantity || 1;
            total += price * quantity;
        });
        
        if (cartTotal) {
            cartTotal.textContent = `${total.toFixed(2)} DHS`;
        }
    }
    
    // Professional success notification
    function showSuccessNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-light));
            color: var(--primary-dark);
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: var(--shadow-medium);
            z-index: 1000;
            animation: slideInRight 0.5s ease-out;
            font-weight: 600;
        `;
        notification.innerHTML = `
            <svg class="professional-icon icon-check" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"/></svg>
            ${message}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-in forwards';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }
    
    // Update cart count (now uses centralized system)
    function updateCartCount() {
        if (typeof window.updateCartCount === "function") {
            window.updateCartCount();
        } else {
            // Fallback to original method
            const cartCount = document.getElementById('cart-count');
            if (cartCount) {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                cartCount.textContent = cart.length;
                
                // Animate cart count
                cartCount.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    cartCount.style.transform = 'scale(1)';
                }, 200);
            }
        }
    }
    
    // Professional checkout button enhancement
    const checkoutBtn = document.querySelector('.but');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                e.preventDefault();
                showSuccessNotification('Your cart is empty');
                return;
            }
            
            // Add loading state
            this.classList.add('btn-loading');
            this.innerHTML = '<svg class="professional-icon icon-spinner" viewBox="0 0 24 24"><path d="M12 4V1L8 5L12 9V6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18C8.69 18 6 15.31 6 12H4C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4Z"/></svg> Processing...';
            
            // Simulate processing delay
            setTimeout(() => {
                // Proceed to checkout
                window.location.href = 'payment.php';
            }, 1000);
        });
    }
    
    // Professional scroll animations
    const cartObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Initialize cart
    setTimeout(() => {
        renderCart();
    }, 500);
    
    // Professional error handling
    window.addEventListener('error', function(e) {
        console.error('Cart page error:', e.error);
        if (cartLoading) {
            cartLoading.style.display = 'none';
        }
        if (emptyCart) {
            emptyCart.style.display = 'block';
        }
    });
});

// Professional CSS animations
const cartStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes slideOutLeft {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(-100%);
            opacity: 0;
        }
    }
    
    .success-notification {
        animation: slideInRight 0.5s ease-out;
    }
    
    .cart-item {
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .quantity-btn {
        transition: all 0.3s ease;
    }
    
    .remove-btn {
        transition: all 0.3s ease;
    }
    
    .but {
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .btn-loading {
        pointer-events: none;
    }
`;

// Inject professional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = cartStyles;
document.head.appendChild(styleSheet);