/**
 * Brianna Cooks - Menu Data
 * Product catalog with categories, sizes, add-ons, and boards
 */

// ============================================================
// CATEGORIES - Occasion & Theme Based
// ============================================================

const MENU_CATEGORIES = [
    { id: 'all', name: 'All Boards', icon: '🧀' },
    // Occasion-based
    { id: 'date-night', name: 'Date Night', icon: '💕' },
    { id: 'girls-night', name: 'Girls Night', icon: '🥂' },
    { id: 'party', name: 'Party Platters', icon: '🎉' },
    { id: 'corporate', name: 'Corporate', icon: '💼' },
    // Theme-based
    { id: 'classic', name: 'Classic', icon: '🧀' },
    { id: 'italian', name: 'Italian', icon: '🇮🇹' },
    { id: 'mediterranean', name: 'Mediterranean', icon: '🫒' },
    { id: 'brunch', name: 'Brunch', icon: '🥐' },
    { id: 'dessert', name: 'Dessert', icon: '🍫' }
];

// ============================================================
// BOARD SIZES (replaces colors from LayerBEE)
// ============================================================

const BOARD_SIZES = [
    {
        id: 'small',
        name: 'Small',
        description: 'Perfect for intimate gatherings',
        serves: '2-4',
        basePrice: 45.00
    },
    {
        id: 'medium',
        name: 'Medium',
        description: 'Ideal for small parties',
        serves: '6-8',
        basePrice: 75.00
    },
    {
        id: 'large',
        name: 'Large',
        description: 'Great for larger celebrations',
        serves: '10-12',
        basePrice: 125.00
    }
];

// ============================================================
// ADD-ONS
// ============================================================

const ADD_ONS = [
    // Extra Proteins
    { id: 'prosciutto', name: 'Extra Prosciutto', price: 8.00, category: 'protein' },
    { id: 'salami', name: 'Artisan Salami', price: 6.00, category: 'protein' },
    { id: 'smoked-salmon', name: 'Smoked Salmon', price: 12.00, category: 'protein' },
    { id: 'capicola', name: 'Capicola', price: 7.00, category: 'protein' },

    // Extra Cheeses
    { id: 'brie', name: 'Brie Wheel', price: 10.00, category: 'cheese' },
    { id: 'aged-cheddar', name: 'Aged White Cheddar', price: 8.00, category: 'cheese' },
    { id: 'goat-cheese', name: 'Honey Goat Cheese', price: 7.00, category: 'cheese' },
    { id: 'blue-cheese', name: 'Gorgonzola', price: 9.00, category: 'cheese' },

    // Accompaniments
    { id: 'honeycomb', name: 'Fresh Honeycomb', price: 9.00, category: 'accompaniment' },
    { id: 'fig-jam', name: 'Fig Jam', price: 5.00, category: 'accompaniment' },
    { id: 'marcona-almonds', name: 'Marcona Almonds', price: 6.00, category: 'accompaniment' },
    { id: 'fresh-fruit', name: 'Seasonal Fruit Upgrade', price: 8.00, category: 'accompaniment' },
    { id: 'dark-chocolate', name: 'Dark Chocolate Selection', price: 7.00, category: 'accompaniment' }
];

// ============================================================
// PRODUCTS (Charcuterie Boards)
// ============================================================

const MENU_PRODUCTS = [
    {
        id: 'classic-board',
        name: 'The Classic Board',
        description: 'A timeless selection of aged cheddar, creamy brie, gouda, and manchego paired with prosciutto, salami, mixed olives, and seasonal fruit.',
        categories: ['classic'],
        includes: [
            '4 premium cheeses',
            '2 cured meats',
            'Artisan crackers & bread',
            'Mixed olives',
            'Seasonal fruit',
            'Honey & preserves'
        ],
        dietary: [],
        imageUrl: 'images/boards/board2.jpeg',
        popular: true
    },
    {
        id: 'date-night-duo',
        name: 'Date Night Duo',
        description: 'An intimate spread designed for two, featuring creamy brie, aged gouda, prosciutto, dark chocolate, fresh strawberries, and champagne crackers.',
        categories: ['date-night'],
        includes: [
            '2 premium cheeses',
            'Prosciutto',
            'Dark chocolate',
            'Fresh strawberries',
            'Champagne crackers',
            'Honey drizzle'
        ],
        dietary: [],
        imageUrl: 'images/boards/board3.jpeg',
        featured: true
    },
    {
        id: 'girls-night-grazer',
        name: 'Girls Night Grazer',
        description: 'A beautiful spread perfect for catching up with friends. Features a variety of cheeses, charcuterie, fresh fruit, nuts, and sweet treats.',
        categories: ['girls-night'],
        includes: [
            '5 premium cheeses',
            '3 cured meats',
            'Fresh berries & grapes',
            'Assorted nuts',
            'Sweet treats',
            'Crackers & crostini'
        ],
        dietary: [],
        imageUrl: 'images/boards/board2.jpeg',
        popular: true
    },
    {
        id: 'party-platter',
        name: 'Party Platter',
        description: 'Feed the crowd! A generous spread with something for everyone - multiple cheeses, meats, vegetables, fruits, and dips.',
        categories: ['party'],
        includes: [
            '6+ premium cheeses',
            '4 cured meats',
            'Vegetable crudités',
            'Hummus & dips',
            'Fresh & dried fruits',
            'Assorted breads & crackers'
        ],
        dietary: [],
        imageUrl: 'images/boards/board1.png',
        popular: true
    },
    {
        id: 'corporate-classic',
        name: 'Corporate Classic',
        description: 'Elegant and professional presentation perfect for meetings, client events, or office celebrations.',
        categories: ['corporate'],
        includes: [
            '5 premium cheeses',
            '3 cured meats',
            'Fresh fruit display',
            'Assorted nuts',
            'Artisan crackers',
            'Professional presentation'
        ],
        dietary: [],
        imageUrl: 'images/boards/board2.jpeg'
    },
    {
        id: 'italian-antipasto',
        name: 'Italian Antipasto',
        description: 'Transport your taste buds to Italy with burrata, parmigiano-reggiano, prosciutto di parma, capicola, marinated artichokes, and sun-dried tomatoes.',
        categories: ['italian'],
        includes: [
            'Burrata',
            'Parmigiano-Reggiano',
            'Prosciutto di Parma',
            'Capicola',
            'Marinated artichokes',
            'Sun-dried tomatoes',
            'Fresh basil & olive oil'
        ],
        dietary: [],
        imageUrl: 'images/boards/board1.png'
    },
    {
        id: 'mediterranean-mezze',
        name: 'Mediterranean Mezze',
        description: 'A fresh and vibrant spread featuring feta, halloumi, hummus, tzatziki, olives, roasted vegetables, and warm pita.',
        categories: ['mediterranean'],
        includes: [
            'Feta & halloumi',
            'House-made hummus',
            'Tzatziki',
            'Kalamata olives',
            'Roasted vegetables',
            'Warm pita bread',
            'Fresh herbs'
        ],
        dietary: ['vegetarian'],
        imageUrl: 'images/boards/board2.jpeg'
    },
    {
        id: 'brunch-board',
        name: 'Brunch Board',
        description: 'Perfect for morning gatherings! Features cream cheese, smoked salmon, fresh bagels, capers, seasonal berries, and mimosa-ready accompaniments.',
        categories: ['brunch'],
        includes: [
            'Whipped cream cheese',
            'Smoked salmon',
            'Fresh bagels',
            'Capers & red onion',
            'Seasonal berries',
            'Fresh orange juice'
        ],
        dietary: [],
        imageUrl: 'images/boards/board1.png'
    },
    {
        id: 'dessert-dreams',
        name: 'Dessert Dreams',
        description: 'End on a sweet note! Dark and milk chocolates, fresh berries, macarons, biscotti, mascarpone, and honey.',
        categories: ['dessert'],
        includes: [
            'Artisan chocolates',
            'Fresh berries',
            'French macarons',
            'Italian biscotti',
            'Whipped mascarpone',
            'Honey & caramel drizzle'
        ],
        dietary: ['vegetarian'],
        imageUrl: 'images/boards/board3.jpeg',
        featured: true
    }
];

// ============================================================
// PAYMENT CONFIGURATION
// ============================================================

const PAYMENT_CONFIG = {
    zelle: 'brianna@example.com',  // UPDATE with real Zelle email/phone
    instructions: 'Please include your Order ID in the Zelle memo so we can match your payment to your order.',
    businessName: 'Brianna Cooks'
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

const MenuData = {
    getCategories() {
        return MENU_CATEGORIES;
    },

    getSizes() {
        return BOARD_SIZES;
    },

    getAddOns() {
        return ADD_ONS;
    },

    getAddOnsByCategory(category) {
        return ADD_ONS.filter(a => a.category === category);
    },

    getProducts() {
        return MENU_PRODUCTS;
    },

    getProductsByCategory(categoryId) {
        if (categoryId === 'all') return MENU_PRODUCTS;
        return MENU_PRODUCTS.filter(p => p.categories.includes(categoryId));
    },

    getProductById(productId) {
        return MENU_PRODUCTS.find(p => p.id === productId);
    },

    getSizeById(sizeId) {
        return BOARD_SIZES.find(s => s.id === sizeId);
    },

    getAddOnById(addOnId) {
        return ADD_ONS.find(a => a.id === addOnId);
    },

    getPopularProducts() {
        return MENU_PRODUCTS.filter(p => p.popular);
    },

    getFeaturedProducts() {
        return MENU_PRODUCTS.filter(p => p.featured);
    },

    /**
     * Calculate total price for a board with size and add-ons
     * @param {Object} product - Product object
     * @param {string} sizeId - Size ID
     * @param {Array} addOnIds - Array of add-on IDs
     * @returns {number} Total price
     */
    calculatePrice(product, sizeId, addOnIds = []) {
        const size = this.getSizeById(sizeId);
        if (!size) return 0;

        const basePrice = size.basePrice;
        const addOnsTotal = addOnIds.reduce((sum, addOnId) => {
            const addOn = this.getAddOnById(addOnId);
            return sum + (addOn ? addOn.price : 0);
        }, 0);

        return basePrice + addOnsTotal;
    },

    formatPrice(price) {
        return '$' + price.toFixed(2);
    },

    /**
     * Get product image path (placeholder for now)
     * @param {Object} product - Product object
     * @returns {string|null} Image path or null
     */
    getProductImagePath(product) {
        // Will be updated when real images are added
        return `images/boards/${product.imageFolder}/main.webp`;
    },

    getPaymentConfig() {
        return PAYMENT_CONFIG;
    }
};

// ============================================================
// EXPORTS
// ============================================================

window.MenuData = MenuData;
window.MENU_CATEGORIES = MENU_CATEGORIES;
window.BOARD_SIZES = BOARD_SIZES;
window.ADD_ONS = ADD_ONS;
window.MENU_PRODUCTS = MENU_PRODUCTS;
window.PAYMENT_CONFIG = PAYMENT_CONFIG;
