/**
 * Nani's Treats & Boards - Menu Data
 * Product catalog with categories, sizes, add-ons, boards, and treats
 */

// ============================================================
// CATEGORIES
// ============================================================

const MENU_CATEGORIES = [
    { id: 'all', name: 'All Items', icon: '✨' },
    // Boards
    { id: 'boards', name: 'Boards', icon: '🧀' },
    { id: 'date-night', name: 'Date Night', icon: '💕' },
    { id: 'girls-night', name: 'Girls Night', icon: '🥂' },
    { id: 'classic', name: 'Classic', icon: '🧀' },
    // Treats
    { id: 'treats', name: 'Treats', icon: '🍰' }
];

// ============================================================
// BOARD SIZES (used by charcuterie boards)
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
// ADD-ONS (for boards only)
// ============================================================

const ADD_ONS = [
    // Proteins
    { id: 'prosciutto', name: 'Extra Prosciutto', price: 8.00, category: 'protein' },
    { id: 'salami', name: 'Artisan Salami', price: 6.00, category: 'protein' },

    // Cheeses
    { id: 'aged-cheddar', name: 'Aged White Cheddar', price: 8.00, category: 'cheese' },

    // Accompaniments
    { id: 'honey', name: 'Honey', price: 5.00, category: 'accompaniment' },
    { id: 'dark-chocolate', name: 'Dark Chocolate Selection', price: 7.00, category: 'accompaniment' }
];

// ============================================================
// PRODUCTS (Boards + Treats)
// ============================================================

const MENU_PRODUCTS = [
    // ── BOARDS ────────────────────────────────

    {
        id: 'classic-board',
        name: 'The Classic Board',
        description: 'A timeless selection of cheddar, gouda, and pepperjack paired with prosciutto, salami, mixed olives, and seasonal fruit.',
        categories: ['boards', 'classic'],
        type: 'board',
        includes: [
            'Cheddar, gouda & pepperjack',
            'Prosciutto & salami',
            'Mixed olives',
            'Seasonal fruit'
        ],
        dietary: [],
        imageUrl: 'images/boards/board2.jpeg',
        popular: true
    },
    {
        id: 'date-night-board',
        name: 'Date Night Board',
        description: 'Cheddar, gouda, and pepperjack paired with prosciutto, salami, mixed olives, and seasonal fruit \u2014 beautifully served on a heart-shaped board.',
        categories: ['boards', 'date-night'],
        type: 'board',
        includes: [
            'Cheddar, gouda & pepperjack',
            'Prosciutto & salami',
            'Mixed olives',
            'Seasonal fruit',
            'Heart-shaped board'
        ],
        dietary: [],
        imageUrl: 'images/boards/board3.jpeg',
        featured: true
    },
    {
        id: 'girls-night-grazer',
        name: 'Girls Night Grazer',
        description: 'A beautiful spread perfect for catching up with friends. Features a variety of cheeses, charcuterie, fresh fruit, nuts, and sweet treats.',
        categories: ['boards', 'girls-night'],
        type: 'board',
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

    // ── TREATS ────────────────────────────────

    {
        id: 'macarons',
        name: 'Macarons',
        description: 'Delicate French macarons made fresh to order. Choose from a variety of flavors for your next event or gift.',
        categories: ['treats'],
        type: 'treat',
        includes: [
            'Flavors: Salted Caramel, Oreo, Sugar Cookie, Chocolate, Vanilla'
        ],
        dietary: ['vegetarian'],
        imageUrl: 'images/treats/cake-pops3.jpg',
        customSizes: [
            { id: 'dozen', name: 'Dozen (12)', serves: '6-8', basePrice: 30.00 }
        ],
        featured: true
    },
    {
        id: 'cake-pops',
        name: 'Cake Pops',
        description: 'Adorable cake pops dipped and decorated to perfection. Available in a variety of flavors.',
        categories: ['treats'],
        type: 'treat',
        includes: [
            'Flavors: Vanilla, Chocolate, Strawberry'
        ],
        dietary: ['vegetarian'],
        imageUrl: 'images/treats/cake-pops1.jpg',
        customSizes: [
            { id: 'half-dozen', name: '1/2 Dozen (6)', serves: '3-6', basePrice: 30.00 },
            { id: 'dozen', name: 'Dozen (12)', serves: '6-12', basePrice: 40.00 }
        ],
        popular: true
    },
    {
        id: 'pretzel-rods',
        name: 'Pretzel Rods',
        description: 'Chocolate-dipped pretzel rods decorated for any occasion. A sweet and salty crowd-pleaser.',
        categories: ['treats'],
        type: 'treat',
        includes: [
            'Chocolate-dipped',
            'Custom decorations available'
        ],
        dietary: ['vegetarian'],
        imageUrl: 'images/treats/cake-pops4.jpg',
        customSizes: [
            { id: 'half-dozen', name: '1/2 Dozen (6)', serves: '3-6', basePrice: 20.00 },
            { id: 'dozen', name: 'Dozen (12)', serves: '6-12', basePrice: 30.00 }
        ]
    },
    {
        id: 'bento-cake',
        name: 'Bento Cake',
        description: 'Adorable mini bento-style cakes, perfect for gifting or personal celebrations. Available in circle and heart shapes.',
        categories: ['treats'],
        type: 'treat',
        includes: [
            'Flavors: Vanilla, Chocolate, Strawberry',
            '5" serves 5-8 | 6" serves 10-12'
        ],
        dietary: ['vegetarian'],
        imageUrl: 'images/treats/cake-pops2.jpg',
        customSizes: [
            { id: '5-circle', name: '5" Circle (2 Layer)', serves: '5-8', basePrice: 40.00 },
            { id: '5-circle-cupcakes', name: '5" Circle + 2 Cupcakes', serves: '5-8', basePrice: 45.00 },
            { id: '5-heart', name: '5" Heart (2 Layer)', serves: '5-8', basePrice: 45.00 },
            { id: '5-heart-cupcakes', name: '5" Heart + 2 Cupcakes', serves: '5-8', basePrice: 50.00 },
            { id: '6-heart', name: '6" Heart (3 Layer)', serves: '10-12', basePrice: 80.00 }
        ],
        featured: true
    }
];

// ============================================================
// PAYMENT CONFIGURATION
// ============================================================

const PAYMENT_CONFIG = {
    zelle: 'brianna@example.com',  // UPDATE with real Zelle email/phone
    instructions: 'Please include your Order ID in the Zelle memo so we can match your payment to your order.',
    businessName: "Nani's Treats & Boards"
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
     * Get the sizes available for a product.
     * Treats use customSizes; boards use global BOARD_SIZES.
     */
    getProductSizes(product) {
        if (product.customSizes) return product.customSizes;
        return BOARD_SIZES;
    },

    /**
     * Whether a product supports add-ons (boards only)
     */
    productHasAddOns(product) {
        return product.type !== 'treat';
    },

    /**
     * Calculate total price for a product with size and add-ons
     * Supports both boards (global sizes) and treats (custom sizes)
     */
    calculatePrice(product, sizeId, addOnIds = []) {
        const sizes = this.getProductSizes(product);
        const size = sizes.find(s => s.id === sizeId);
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
