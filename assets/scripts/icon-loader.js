// Comprehensive Icon Loader - Ensures icons are always visible
document.addEventListener('DOMContentLoaded', function() {
    console.log('Icon loader script initialized');
    
    // Track loaded icons to prevent duplicate loading
    const loadedIcons = new Set();
    
    // Icon mapping from Font Awesome classes to SVG files
    const iconMap = {
        'fa-house': 'home',
        'fa-shop': 'store', 
        'fa-user': 'user',
        'fa-bag-shopping': 'cart',
        'fa-circle-info': 'info',
        'fa-chevron-down': 'chevron-down',
        'fa-chevron-right': 'chevron-right',
        'fa-arrow-right-to-bracket': 'login',
        'fa-right-from-bracket': 'logout',
        'fa-user-plus': 'user-plus',
        'fa-user-circle': 'user',
        'fa-box': 'box',
        'fa-star': 'star',
        'fa-leaf': 'leaf',
        'fa-clock': 'clock',
        'fa-gem': 'gem',
        'fa-plus': 'plus',
        'fa-minus': 'minus',
        'fa-heart': 'heart',
        'fa-trash': 'trash',
        'fa-check': 'check',
        'fa-check-circle': 'check',
        'fa-spinner': 'spinner',
        'fa-spinner.fa-spin': 'spinner',
        'fa-eye': 'eye',
        'fa-play': 'play',
        'fa-arrow-right': 'arrow-right',
        'fa-credit-card': 'credit-card',
        'fa-times': 'times',
        'fa-bars': 'bars',
        'fa-shopping-bag': 'basket',
        'fa-info-circle': 'info'
    };

    // Cache for loaded SVG content
    const svgCache = new Map();

    // Function to determine correct icon path
    function getIconPath(iconName) {
        const isInHtmlDir = window.location.pathname.includes('/html/');
        const isInPagesDir = window.location.pathname.includes('/pages/');
        
        if (isInHtmlDir) {
            return `../icons/${iconName}.svg`;
        } else if (isInPagesDir) {
            return `../icons/${iconName}.svg`;
        } else {
            return `icons/${iconName}.svg`;
        }
    }

    // Function to load SVG icon with caching
    async function loadSVGIcon(iconName) {
        // Check cache first
        if (svgCache.has(iconName)) {
            return svgCache.get(iconName);
        }

        try {
            const iconPath = getIconPath(iconName);
            console.log(`Loading icon: ${iconPath}`);
            
            const response = await fetch(iconPath);
            if (response.ok) {
                const svgContent = await response.text();
                svgCache.set(iconName, svgContent);
                return svgContent;
            } else {
                console.warn(`Failed to load icon: ${iconPath} (${response.status})`);
            }
        } catch (error) {
            console.warn(`Failed to load icon: ${iconName}.svg`, error);
        }
        return null;
    }

    // Function to replace a single icon
    async function replaceIcon(element) {
        const classes = element.className;
        let iconName = null;
        
        // Find matching icon
        for (const [faClass, svgName] of Object.entries(iconMap)) {
            if (classes.includes(faClass)) {
                iconName = svgName;
                break;
            }
        }
        
        if (iconName && !loadedIcons.has(element)) {
            loadedIcons.add(element);
            
            // Add loading class
            element.classList.add('icon-loading');
            
            const svgContent = await loadSVGIcon(iconName);
            if (svgContent) {
                // Create wrapper div
                const wrapper = document.createElement('span');
                wrapper.className = 'icon-wrapper';
                wrapper.innerHTML = svgContent;
                
                // Add icon class
                const svg = wrapper.querySelector('svg');
                if (svg) {
                    svg.className = 'icon';
                    if (classes.includes('fa-spin')) {
                        svg.classList.add('icon-spin');
                    }
                }
                
                // Replace the Font Awesome icon
                element.parentNode.replaceChild(wrapper, element);
                console.log(`Successfully replaced icon: ${classes} -> ${iconName}`);
            } else {
                // Remove loading class and keep Font Awesome icon
                element.classList.remove('icon-loading');
                console.warn(`Could not load SVG for ${iconName}, keeping Font Awesome icon`);
            }
        }
    }

    // Function to replace all icons
    function replaceIcons() {
        const iconElements = document.querySelectorAll('i[class*="fa-"]:not(.icon-loading)');
        console.log(`Found ${iconElements.length} Font Awesome icons to replace`);
        
        iconElements.forEach(replaceIcon);
    }

    // Function to observe content changes
    function observeContent() {
        const observer = new MutationObserver(function(mutations) {
            let shouldReplace = false;
            
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // Element node
                            const iconElements = node.querySelectorAll ? node.querySelectorAll('i[class*="fa-"]') : [];
                            if (iconElements.length > 0) {
                                shouldReplace = true;
                            }
                        }
                    });
                }
            });
            
            if (shouldReplace) {
                setTimeout(replaceIcons, 100);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Initialize icon replacement
    function initializeIcons() {
        // Initial replacement
        setTimeout(replaceIcons, 100);
        
        // Set up content observation
        observeContent();
        
        // Additional replacement attempts
        setTimeout(replaceIcons, 500);
        setTimeout(replaceIcons, 1000);
        setTimeout(replaceIcons, 2000);
    }

    // Initialize
    initializeIcons();
    
    // Re-run on page visibility change
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            setTimeout(replaceIcons, 100);
        }
    });
    
    // Re-run on window focus
    window.addEventListener('focus', function() {
        setTimeout(replaceIcons, 100);
    });
    
    // Re-run on navigation (for SPA-like behavior)
    window.addEventListener('popstate', function() {
        setTimeout(replaceIcons, 100);
    });
    
    // Force replacement every 5 seconds as a fallback
    setInterval(function() {
        const remainingIcons = document.querySelectorAll('i[class*="fa-"]:not(.icon-loading)');
        if (remainingIcons.length > 0) {
            console.log(`Found ${remainingIcons.length} remaining icons to replace`);
            replaceIcons();
        }
    }, 5000);
});
