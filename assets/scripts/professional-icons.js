// Professional Icon Replacer - Replace Font Awesome with SVG Icons
document.addEventListener('DOMContentLoaded', function() {
    console.log('Professional icon replacer script loaded');
    
    // Icon mapping from Font Awesome classes to SVG files
    const iconMap = {
        'fa-house': 'home',
        'fa-shop': 'perfume', 
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

    // Function to load SVG icon
    async function loadSVGIcon(iconName) {
        try {
            // Determine the correct path based on current location
            const isInHtmlDir = window.location.pathname.includes('/html/');
            const isInPagesDir = window.location.pathname.includes('/pages/');
            let iconPath;
            
            if (isInHtmlDir) {
                iconPath = `../icons/${iconName}.svg`;
            } else if (isInPagesDir) {
                iconPath = `../icons/${iconName}.svg`;
            } else {
                iconPath = `icons/${iconName}.svg`;
            }
            
            console.log(`Loading icon: ${iconPath}`);
            const response = await fetch(iconPath);
            if (response.ok) {
                return await response.text();
            } else {
                console.warn(`Failed to load icon: ${iconPath} (${response.status})`);
            }
        } catch (error) {
            console.warn(`Failed to load icon: ${iconName}.svg`, error);
        }
        return null;
    }

    // Function to replace Font Awesome icons with SVG
    function replaceIcons() {
        const iconElements = document.querySelectorAll('i[class*="fa-"]');
        console.log(`Found ${iconElements.length} Font Awesome icons to replace`);
        
        iconElements.forEach(async (element) => {
            const classes = element.className;
            let iconName = null;
            
            // Find matching icon
            for (const [faClass, svgName] of Object.entries(iconMap)) {
                if (classes.includes(faClass)) {
                    iconName = svgName;
                    break;
                }
            }
            
            if (iconName) {
                console.log(`Replacing icon: ${classes} -> ${iconName}`);
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
                } else {
                    console.warn(`Could not load SVG for ${iconName}`);
                }
            }
        });
    }

    // Function to replace icons in dynamically loaded content
    function observeContent() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // Element node
                            const iconElements = node.querySelectorAll ? node.querySelectorAll('i[class*="fa-"]') : [];
                            iconElements.forEach(async (element) => {
                                const classes = element.className;
                                let iconName = null;
                                
                                for (const [faClass, svgName] of Object.entries(iconMap)) {
                                    if (classes.includes(faClass)) {
                                        iconName = svgName;
                                        break;
                                    }
                                }
                                
                                if (iconName) {
                                    const svgContent = await loadSVGIcon(iconName);
                                    if (svgContent) {
                                        const wrapper = document.createElement('span');
                                        wrapper.className = 'icon-wrapper';
                                        wrapper.innerHTML = svgContent;
                                        
                                        const svg = wrapper.querySelector('svg');
                                        if (svg) {
                                            svg.className = 'icon';
                                            if (classes.includes('fa-spin')) {
                                                svg.classList.add('icon-spin');
                                            }
                                        }
                                        
                                        element.parentNode.replaceChild(wrapper, element);
                                    }
                                }
                            });
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Initialize icon replacement with a small delay to ensure DOM is ready
    setTimeout(() => {
        replaceIcons();
    }, 100);
    
    observeContent();
    
    // Re-run replacement after a short delay to catch any dynamically loaded content
    setTimeout(replaceIcons, 1000);
    
    // Also run on page visibility change (for SPA-like behavior)
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            setTimeout(replaceIcons, 100);
        }
    });
    
    // Run on window focus (for when user switches tabs)
    window.addEventListener('focus', function() {
        setTimeout(replaceIcons, 100);
    });
});