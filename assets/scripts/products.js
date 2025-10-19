// Professional Products Page - Interactive Script
document.addEventListener('DOMContentLoaded', function() {
    // Professional loading animation
    const loadingContainer = document.getElementById('loading-container');
    const emptyState = document.getElementById('empty-state');
    const productsContainer = document.getElementById('products-container');
    
    // Show loading state initially
    if (loadingContainer) {
        loadingContainer.style.display = 'flex';
    }
    
    // Professional product rendering
    function renderProducts() {
        const products = window.products || [];
        
        // Hide loading state
        if (loadingContainer) {
            loadingContainer.style.display = 'none';
        }
        
        if (products.length === 0) {
            // Show empty state
            if (emptyState) {
                emptyState.style.display = 'block';
            }
            return;
        }
        
        // Clear container
        if (productsContainer) {
            productsContainer.innerHTML = '';
        }
        
        // Render products with professional animations
        products.forEach((product, index) => {
            setTimeout(() => {
                createProductCard(product, index);
            }, index * 100);
        });
    }
    
    function createProductCard(product, index) {
        const productCard = document.createElement('div');
        productCard.className = 'product fade-in';
        productCard.style.animationDelay = `${index * 0.1}s`;
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.nom}" loading="lazy">
                <div class="product-glow"></div>
            </div>
            <div class="product-details">
                <h1 class="product-name">${product.nom}</h1>
                <p class="price">${product.prix} DHS</p>
                <p class="description">${product.description || 'Premium fragrance crafted with the finest ingredients'}</p>
                <div class="product-actions">
                    <button class="buy-now" data-product='${JSON.stringify(product)}'>
                        <i class="fa-solid fa-shopping-bag"></i>
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        `;
        
        // Add professional hover effects
        productCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.zIndex = '10';
            
            const glow = this.querySelector('.product-glow');
            if (glow) {
                glow.style.opacity = '1';
                glow.style.transform = 'scale(1.1)';
            }
        });
        
        productCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '';
            
            const glow = this.querySelector('.product-glow');
            if (glow) {
                glow.style.opacity = '0';
                glow.style.transform = 'scale(1)';
            }
        });
        
        // Add click interaction for product card (navigate to detail page)
        productCard.addEventListener('click', function(e) {
            // Don't navigate if clicking on buttons
            if (e.target.closest('.buy-now') || e.target.closest('.view-details') || e.target.closest('.view-details-btn')) {
                return;
            }
            createRippleEffect(this);
            // Navigate to product detail page
            window.location.href = `product-detail.php?id=${product.produit_id}`;
        });
        
        // Add to cart functionality
        const addToCartBtn = productCard.querySelector('.buy-now');
        addToCartBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            addToCart(product, this);
        });
        
        
        if (productsContainer) {
            productsContainer.appendChild(productCard);
        }
    }
    
    // Professional add to cart function
    function addToCart(product, button) {
        // Add loading state to button
        button.classList.add('btn-loading');
        button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Adding...';
        
        // Simulate loading delay for professional feel
        setTimeout(() => {
            // Get current cart
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Add product to cart
            const cartItem = {
                id: product.produit_id || Date.now(),
                name: product.nom,
                price: product.prix,
                description: product.description,
                image: product.image,
                quantity: 1
            };
            
            cart.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Success animation
            button.classList.remove('btn-loading');
            button.classList.add('success-animation');
            button.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
            
            // Update cart count
            updateCartCount();
            
            // Show success notification
            showSuccessNotification(product.nom);
            
            // Reset button after animation
            setTimeout(() => {
                button.classList.remove('success-animation');
                button.innerHTML = '<i class="fa-solid fa-shopping-bag"></i> Add to Cart';
            }, 2000);
            
        }, 800);
    }
    
    // Professional success notification
    function showSuccessNotification(productName) {
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
            <i class="fa-solid fa-check-circle"></i>
            ${productName} added to cart!
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-in forwards';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }
    
    // Professional ripple effect
    function createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(201, 169, 110, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1000;
        `;
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
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
    
    // Professional scroll animations
    const productObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, { threshold: 0.1 });
    
    // Initialize products
    setTimeout(() => {
        renderProducts();
    }, 500);
    
    // Professional search functionality (if needed)
    function initializeSearch() {
        const searchInput = document.getElementById('product-search');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const products = document.querySelectorAll('.product');
                
                products.forEach(product => {
                    const productName = product.querySelector('.product-name').textContent.toLowerCase();
                    const productDesc = product.querySelector('.description').textContent.toLowerCase();
                    
                    if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                        product.style.display = 'block';
                        product.style.animation = 'fadeIn 0.5s ease-out';
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        }
    }
    
    // Initialize search if search input exists
    initializeSearch();
    
    // Professional error handling
    window.addEventListener('error', function(e) {
        console.error('Products page error:', e.error);
        if (loadingContainer) {
            loadingContainer.style.display = 'none';
        }
        if (emptyState) {
            emptyState.style.display = 'block';
        }
    });
});

// Professional CSS animations
const productStyles = `
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
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .success-notification {
        animation: slideInRight 0.5s ease-out;
    }
    
    .product {
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .buy-now {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;

// Inject professional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = productStyles;
document.head.appendChild(styleSheet);
