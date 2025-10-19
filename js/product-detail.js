// Professional Product Detail Page - Interactive Script
document.addEventListener('DOMContentLoaded', function() {
    // Professional product detail initialization
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const quantityInput = document.getElementById('quantity');
    const addToCartBtn = document.querySelector('.add-to-cart');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    // Professional image gallery functionality
    function initializeImageGallery() {
        if (thumbnails.length > 0) {
            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', function() {
                    // Remove active class from all thumbnails
                    thumbnails.forEach(t => t.classList.remove('active'));
                    
                    // Add active class to clicked thumbnail
                    this.classList.add('active');
                    
                    // Update main image
                    const newImageSrc = this.dataset.image;
                    if (mainImage && newImageSrc) {
                        mainImage.style.opacity = '0';
                        setTimeout(() => {
                            mainImage.src = newImageSrc;
                            mainImage.style.opacity = '1';
                        }, 200);
                    }
                });
            });
        }
        
        // Professional image zoom functionality
        if (mainImage) {
            mainImage.addEventListener('click', function() {
                createImageModal(this.src, this.alt);
            });
        }
    }
    
    // Professional image modal
    function createImageModal(imageSrc, imageAlt) {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: modalFadeIn 0.3s ease-out;
        `;
        
        modal.innerHTML = `
            <div class="modal-content" style="position: relative; max-width: 90%; max-height: 90%;">
                <img src="${imageSrc}" alt="${imageAlt}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 10px;">
                <button class="modal-close" style="position: absolute; top: -40px; right: 0; background: var(--accent-gold); color: var(--primary-dark); border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-weight: bold;">
                    <i class="fa-solid fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.style.animation = 'modalFadeOut 0.3s ease-in forwards';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.animation = 'modalFadeOut 0.3s ease-in forwards';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
        });
    }
    
    // Professional quantity controls
    window.increaseQuantity = function() {
        const currentValue = parseInt(quantityInput.value);
        const maxValue = parseInt(quantityInput.max);
        
        if (currentValue < maxValue) {
            quantityInput.value = currentValue + 1;
            animateQuantityChange();
        }
    };
    
    window.decreaseQuantity = function() {
        const currentValue = parseInt(quantityInput.value);
        const minValue = parseInt(quantityInput.min);
        
        if (currentValue > minValue) {
            quantityInput.value = currentValue - 1;
            animateQuantityChange();
        }
    };
    
    function animateQuantityChange() {
        quantityInput.style.transform = 'scale(1.1)';
        quantityInput.style.color = 'var(--accent-gold)';
        
        setTimeout(() => {
            quantityInput.style.transform = 'scale(1)';
            quantityInput.style.color = 'var(--text-primary)';
        }, 200);
    }
    
    // Professional add to cart functionality
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const productData = JSON.parse(this.dataset.product);
            const quantity = parseInt(quantityInput.value);
            
            // Add loading state
            this.classList.add('btn-loading');
            this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Adding...';
            
            // Simulate loading delay for professional feel
            setTimeout(() => {
                // Add to cart
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                
                // Check if product already exists in cart
                const existingItemIndex = cart.findIndex(item => item.id === productData.produit_id);
                
                if (existingItemIndex !== -1) {
                    // Update quantity if item exists
                    cart[existingItemIndex].quantity += quantity;
                } else {
                    // Add new item to cart
                    const cartItem = {
                        id: productData.produit_id,
                        name: productData.nom,
                        price: productData.prix,
                        description: productData.description,
                        image: productData.image,
                        quantity: quantity
                    };
                    cart.push(cartItem);
                }
                
                localStorage.setItem('cart', JSON.stringify(cart));
                
                // Success animation
                this.classList.remove('btn-loading');
                this.classList.add('success-animation');
                this.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
                
                // Update cart count
                updateCartCount();
                
                // Show success notification
                showSuccessNotification(`${productData.nom} added to cart`);
                
                // Reset button after animation
                setTimeout(() => {
                    this.classList.remove('success-animation');
                    this.innerHTML = '<i class="fa-solid fa-shopping-bag"></i> Add to Cart';
                }, 2000);
                
            }, 800);
        });
    }
    
    
    // Professional tab functionality
    function initializeTabs() {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.dataset.tab;
                
                // Remove active class from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding panel
                const targetPanel = document.getElementById(targetTab);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
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
            <i class="fa-solid fa-check-circle"></i>
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
    
    // Professional scroll animations
    const productObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Observe related products
    const relatedCards = document.querySelectorAll('.related-product-card');
    relatedCards.forEach(card => {
        productObserver.observe(card);
    });
    
    // Professional rating animation
    function animateRatingBars() {
        const ratingBars = document.querySelectorAll('.rating-fill');
        ratingBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        }
    }
    
    // Initialize all functionality
    initializeImageGallery();
    initializeTabs();
    
    // Animate rating bars when reviews tab is shown
    const reviewsTab = document.querySelector('[data-tab="reviews"]');
    if (reviewsTab) {
        reviewsTab.addEventListener('click', () => {
            setTimeout(animateRatingBars, 300);
        });
    }
    
    // Professional error handling
    window.addEventListener('error', function(e) {
        console.error('Product detail page error:', e.error);
    });
});

// Professional CSS animations
const productDetailStyles = `
    @keyframes modalFadeIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes modalFadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.8);
        }
    }
    
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
    
    .success-notification {
        animation: slideInRight 0.5s ease-out;
    }
    
    .btn-loading {
        pointer-events: none;
    }
    
    .success-animation {
        animation: successPulse 0.6s ease-out;
    }
    
    @keyframes successPulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
    
    .related-product-card {
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .btn {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .tab-panel {
        transition: all 0.3s ease;
    }
`;

// Inject professional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = productDetailStyles;
document.head.appendChild(styleSheet);
