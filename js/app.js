/**
 * Brianna Cooks - Main Application JavaScript
 * Handles: theme toggle, navigation, cart management, order processing
 */

// ============================================================
// THEME MANAGEMENT
// ============================================================

const ThemeManager = {
    init() {
        const savedTheme = localStorage.getItem('brianna_cooks_theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');

        document.documentElement.setAttribute('data-theme', theme);

        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggle());
        }
    },

    toggle() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('brianna_cooks_theme', next);
    }
};

// ============================================================
// MOBILE NAVIGATION
// ============================================================

const Navigation = {
    init() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                const isOpen = navLinks.classList.toggle('open');
                hamburger.setAttribute('aria-expanded', isOpen);
            });

            // Close menu when clicking a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('open');
                    hamburger.setAttribute('aria-expanded', 'false');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                    navLinks.classList.remove('open');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }
};

// ============================================================
// ORDER ID GENERATION
// ============================================================

/**
 * Generate a 6-character alphanumeric order ID
 * Excludes confusing characters: 0/O, 1/I/L
 */
function generateOrderId() {
    const chars = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// ============================================================
// CART MANAGEMENT
// ============================================================

const CartManager = {
    STORAGE_KEY: 'brianna_cooks_cart',
    ORDERS_KEY: 'brianna_cooks_orders',

    getCart() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    },

    saveCart(cart) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
        this.updateDisplay();
    },

    /**
     * Add item to cart with size and optional add-ons
     * @param {Object} product - Product object from MenuData
     * @param {string} sizeId - Size ID ('small', 'medium', 'large')
     * @param {Array} addOnIds - Array of add-on IDs
     * @param {number} quantity - Quantity to add
     */
    addItem(product, sizeId, addOnIds = [], quantity = 1) {
        const cart = this.getCart();
        const size = window.MenuData ? window.MenuData.getSizeById(sizeId) : null;

        if (!size) {
            console.error('Invalid size:', sizeId);
            return cart;
        }

        // Sort add-ons for consistent comparison
        const sortedAddOns = [...addOnIds].sort();
        const addOnKey = sortedAddOns.join(',');

        // Check if exact same item exists (same product, size, AND add-ons)
        const existingIndex = cart.findIndex(
            item => item.productId === product.id &&
                    item.sizeId === sizeId &&
                    item.addOnIds.sort().join(',') === addOnKey
        );

        if (existingIndex >= 0) {
            cart[existingIndex].quantity += quantity;
        } else {
            // Calculate add-ons total
            const addOnsTotal = this.calculateAddOnsTotal(sortedAddOns);

            // Get add-on names for display
            const addOnNames = sortedAddOns.map(id => {
                const addOn = window.MenuData ? window.MenuData.getAddOnById(id) : null;
                return addOn ? addOn.name : id;
            });

            cart.push({
                productId: product.id,
                name: product.name,
                sizeId: sizeId,
                sizeName: size.name,
                sizeServes: size.serves,
                basePrice: size.basePrice,
                addOnIds: sortedAddOns,
                addOnNames: addOnNames,
                addOnsTotal: addOnsTotal,
                quantity: quantity,
                addedAt: Date.now()
            });
        }

        this.saveCart(cart);
        return cart;
    },

    calculateAddOnsTotal(addOnIds) {
        if (!window.MenuData) return 0;
        return addOnIds.reduce((sum, addOnId) => {
            const addOn = window.MenuData.getAddOnById(addOnId);
            return sum + (addOn ? addOn.price : 0);
        }, 0);
    },

    removeItem(index) {
        const cart = this.getCart();
        cart.splice(index, 1);
        this.saveCart(cart);
        return cart;
    },

    updateItemQuantity(index, quantity) {
        const cart = this.getCart();
        if (quantity <= 0) {
            return this.removeItem(index);
        }
        cart[index].quantity = quantity;
        this.saveCart(cart);
        return cart;
    },

    clearCart() {
        this.saveCart([]);
    },

    getItemTotal(item) {
        return (item.basePrice + item.addOnsTotal) * item.quantity;
    },

    getTotal() {
        const cart = this.getCart();
        return cart.reduce((sum, item) => sum + this.getItemTotal(item), 0);
    },

    getItemCount() {
        const cart = this.getCart();
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    },

    updateDisplay() {
        // Update cart count badges throughout the site
        const countBadges = document.querySelectorAll('.cart-count');
        const count = this.getItemCount();

        countBadges.forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        });

        // Dispatch event for other components to react
        window.dispatchEvent(new CustomEvent('cartUpdated', {
            detail: {
                cart: this.getCart(),
                count: count,
                total: this.getTotal()
            }
        }));
    },

    /**
     * Submit order with extended customer information
     * @param {Object} customerInfo - Customer details
     * @param {string} customerInfo.name - Customer name (required)
     * @param {string} customerInfo.phone - Phone number (required)
     * @param {string} customerInfo.email - Email address (optional)
     * @param {string} customerInfo.dateNeeded - Date needed (required)
     * @param {string} customerInfo.deliveryMethod - 'pickup' or 'delivery'
     * @param {string} customerInfo.deliveryAddress - Address if delivery
     * @param {string} customerInfo.specialRequests - Special requests/notes
     */
    submitOrder(customerInfo) {
        const cart = this.getCart();
        if (cart.length === 0) return null;

        const order = {
            id: generateOrderId(),
            items: cart,
            total: this.getTotal(),
            // Customer information
            customerName: customerInfo.name,
            customerPhone: customerInfo.phone,
            customerEmail: customerInfo.email || '',
            dateNeeded: customerInfo.dateNeeded,
            deliveryMethod: customerInfo.deliveryMethod,
            deliveryAddress: customerInfo.deliveryAddress || '',
            specialRequests: customerInfo.specialRequests || '',
            // Order status
            status: 'pending_payment',
            createdAt: Date.now()
        };

        // Save order to local storage
        const orders = this.getOrders();
        orders.push(order);
        localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));

        // Clear the cart
        this.clearCart();

        return order;
    },

    getOrders() {
        const saved = localStorage.getItem(this.ORDERS_KEY);
        return saved ? JSON.parse(saved) : [];
    },

    getOrderById(orderId) {
        const orders = this.getOrders();
        return orders.find(o => o.id === orderId);
    },

    getPendingOrders() {
        return this.getOrders().filter(o =>
            o.status === 'pending_payment' || o.status === 'pending_review'
        );
    }
};

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

/**
 * Format price as currency
 * @param {number} price - Price in dollars
 * @returns {string} Formatted price (e.g., "$45.00")
 */
function formatPrice(price) {
    return '$' + price.toFixed(2);
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Get tomorrow's date in YYYY-MM-DD format (for date picker min)
 * @returns {string} Tomorrow's date
 */
function getTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
}

/**
 * Format date for display
 * @param {string} dateStr - Date string (YYYY-MM-DD)
 * @returns {string} Formatted date
 */
function formatDate(dateStr) {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// ============================================================
// INITIALIZATION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    Navigation.init();
    CartManager.updateDisplay();

    console.log('[Brianna Cooks] App initialized!');
});

// ============================================================
// EXPORTS
// ============================================================

window.CartManager = CartManager;
window.formatPrice = formatPrice;
window.escapeHTML = escapeHTML;
window.getTomorrowDate = getTomorrowDate;
window.formatDate = formatDate;
window.generateOrderId = generateOrderId;
