/**
 * Nani's Treats & Boards - Menu Page Controller
 * Handles product display, filtering, cart panel, and ordering
 */

// ============================================================
// MENU UI CONTROLLER
// ============================================================

const MenuUI = {
    currentCategory: 'all',
    expandedCard: null,
    cartPanelOpen: false,

    init() {
        this.renderCategories();
        this.renderProducts();
        this.setupCartPanel();
        this.setupCartFab();
        this.updateCartDisplay();

        // Listen for cart updates
        window.addEventListener('cartUpdated', () => this.updateCartDisplay());

        // Check for board parameter in URL
        const params = new URLSearchParams(window.location.search);
        const boardId = params.get('board');
        if (boardId) {
            setTimeout(() => this.expandProduct(boardId), 100);
        }
    },

    // Helper to clear a container safely
    clearContainer(container) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    },

    // ----------------------
    // CATEGORIES
    // ----------------------
    renderCategories() {
        const container = document.getElementById('category-filters');
        if (!container) return;

        const categories = MenuData.getCategories();
        this.clearContainer(container);

        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'category-btn' + (cat.id === this.currentCategory ? ' active' : '');
            btn.setAttribute('data-category', cat.id);

            const icon = document.createElement('span');
            icon.className = 'category-icon';
            icon.textContent = cat.icon;

            const name = document.createElement('span');
            name.textContent = cat.name;

            btn.appendChild(icon);
            btn.appendChild(name);

            btn.addEventListener('click', () => this.filterByCategory(cat.id));
            container.appendChild(btn);
        });
    },

    filterByCategory(categoryId) {
        this.currentCategory = categoryId;

        // Update active button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === categoryId);
        });

        this.renderProducts();
    },

    // ----------------------
    // PRODUCTS
    // ----------------------
    renderProducts() {
        const container = document.getElementById('products-grid');
        if (!container) return;

        const products = MenuData.getProductsByCategory(this.currentCategory);
        this.clearContainer(container);

        products.forEach(product => {
            const card = this.createProductCard(product);
            container.appendChild(card);
        });
    },

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.id = 'product-' + product.id;

        const sizes = MenuData.getProductSizes(product);
        const defaultSize = sizes[0];

        const categoryIcons = {
            'classic': '🧀🍇',
            'date-night': '💕🍫',
            'girls-night': '🥂✨',
            'boards': '🧀🍇',
            'treats': '🍰✨'
        };

        // Main section (clickable)
        const main = document.createElement('div');
        main.className = 'product-main';
        main.addEventListener('click', () => this.toggleProduct(product.id));

        // Product image
        const imageContainer = document.createElement('div');
        imageContainer.className = 'product-image-container';

        if (product.imageUrl) {
            const img = document.createElement('img');
            img.src = product.imageUrl;
            img.alt = product.name;
            img.className = 'product-image';
            img.loading = 'lazy';
            imageContainer.appendChild(img);
        } else {
            imageContainer.textContent = categoryIcons[product.categories[0]] || '🧀';
        }
        main.appendChild(imageContainer);

        // Header with badges
        const header = document.createElement('div');
        header.className = 'product-header';

        const nameSection = document.createElement('div');
        const name = document.createElement('h3');
        name.className = 'product-name';
        name.textContent = product.name;
        nameSection.appendChild(name);

        const badges = document.createElement('div');
        badges.className = 'product-badges';
        if (product.popular) {
            const badge = document.createElement('span');
            badge.className = 'product-badge popular';
            badge.textContent = 'Popular';
            badges.appendChild(badge);
        }
        if (product.featured) {
            const badge = document.createElement('span');
            badge.className = 'product-badge featured';
            badge.textContent = 'Featured';
            badges.appendChild(badge);
        }
        if (product.dietary && product.dietary.includes('vegetarian')) {
            const badge = document.createElement('span');
            badge.className = 'product-badge vegetarian';
            badge.textContent = 'Vegetarian';
            badges.appendChild(badge);
        }

        header.appendChild(nameSection);
        header.appendChild(badges);
        main.appendChild(header);

        // Description
        const desc = document.createElement('p');
        desc.className = 'product-description';
        desc.textContent = product.description;
        main.appendChild(desc);

        // Includes
        if (product.includes && product.includes.length > 0) {
            const includes = document.createElement('div');
            includes.className = 'product-includes';

            const label = document.createElement('div');
            label.className = 'product-includes-label';
            label.textContent = 'Includes:';
            includes.appendChild(label);

            const list = document.createElement('div');
            list.className = 'product-includes-list';
            product.includes.slice(0, 4).forEach(item => {
                const tag = document.createElement('span');
                tag.className = 'include-tag';
                tag.textContent = item;
                list.appendChild(tag);
            });
            if (product.includes.length > 4) {
                const tag = document.createElement('span');
                tag.className = 'include-tag';
                tag.textContent = '+' + (product.includes.length - 4) + ' more';
                list.appendChild(tag);
            }
            includes.appendChild(list);
            main.appendChild(includes);
        }

        // Footer
        const footer = document.createElement('div');
        footer.className = 'product-footer';

        const priceSection = document.createElement('div');
        const price = document.createElement('span');
        price.className = 'product-price';
        price.textContent = MenuData.formatPrice(defaultSize.basePrice);
        const priceLabel = document.createElement('span');
        priceLabel.className = 'product-price-label';
        priceLabel.textContent = sizes.length > 1 ? ' from' : '';
        priceSection.appendChild(price);
        priceSection.appendChild(priceLabel);

        const hint = document.createElement('div');
        hint.className = 'expand-hint';
        hint.textContent = 'Click to customize \u2192';

        footer.appendChild(priceSection);
        footer.appendChild(hint);
        main.appendChild(footer);

        card.appendChild(main);

        // Options section (hidden by default)
        const options = this.createProductOptions(product);
        card.appendChild(options);

        return card;
    },

    createProductOptions(product) {
        const options = document.createElement('div');
        options.className = 'product-options';
        options.id = 'options-' + product.id;

        const sizes = MenuData.getProductSizes(product);
        const hasAddOns = MenuData.productHasAddOns(product);

        // Size selector
        const sizeSection = document.createElement('div');
        sizeSection.className = 'option-section';

        const sizeLabel = document.createElement('span');
        sizeLabel.className = 'option-label';
        sizeLabel.textContent = product.type === 'treat' ? 'Select Option:' : 'Select Size:';
        sizeSection.appendChild(sizeLabel);

        const sizeOptions = document.createElement('div');
        sizeOptions.className = 'size-options';
        sizeOptions.id = 'sizes-' + product.id;

        sizes.forEach((size, index) => {
            const sizeBtn = document.createElement('button');
            sizeBtn.className = 'size-option' + (index === 0 ? ' selected' : '');
            sizeBtn.setAttribute('data-size', size.id);
            sizeBtn.setAttribute('data-product', product.id);

            const sizeName = document.createElement('span');
            sizeName.className = 'size-name';
            sizeName.textContent = size.name;

            const sizeServes = document.createElement('span');
            sizeServes.className = 'size-serves';
            sizeServes.textContent = 'Serves ' + size.serves;

            const sizePrice = document.createElement('span');
            sizePrice.className = 'size-price';
            sizePrice.textContent = MenuData.formatPrice(size.basePrice);

            sizeBtn.appendChild(sizeName);
            sizeBtn.appendChild(sizeServes);
            sizeBtn.appendChild(sizePrice);

            sizeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectSize(product.id, size.id);
            });

            sizeOptions.appendChild(sizeBtn);
        });

        sizeSection.appendChild(sizeOptions);
        options.appendChild(sizeSection);

        // Add-ons section (boards only)
        if (hasAddOns) {
            const addonsSection = document.createElement('div');
            addonsSection.className = 'option-section';

            const addonsLabel = document.createElement('span');
            addonsLabel.className = 'option-label';
            addonsLabel.textContent = 'Add Extras (optional):';
            addonsSection.appendChild(addonsLabel);

            const addonsGrid = document.createElement('div');
            addonsGrid.className = 'addons-grid';
            addonsGrid.id = 'addons-' + product.id;

            MenuData.getAddOns().forEach(addon => {
                const addonBtn = document.createElement('label');
                addonBtn.className = 'addon-option';
                addonBtn.setAttribute('data-addon', addon.id);
                addonBtn.setAttribute('data-product', product.id);

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = addon.id;
                checkbox.addEventListener('change', (e) => {
                    e.stopPropagation();
                    addonBtn.classList.toggle('selected', checkbox.checked);
                    this.updateItemTotal(product.id);
                });

                const checkboxVisual = document.createElement('span');
                checkboxVisual.className = 'addon-checkbox';

                const details = document.createElement('div');
                details.className = 'addon-details';

                const addonName = document.createElement('span');
                addonName.className = 'addon-name';
                addonName.textContent = addon.name;

                const addonPrice = document.createElement('span');
                addonPrice.className = 'addon-price';
                addonPrice.textContent = '+' + MenuData.formatPrice(addon.price);

                details.appendChild(addonName);
                details.appendChild(addonPrice);

                addonBtn.appendChild(checkbox);
                addonBtn.appendChild(checkboxVisual);
                addonBtn.appendChild(details);

                addonsGrid.appendChild(addonBtn);
            });

            addonsSection.appendChild(addonsGrid);
            options.appendChild(addonsSection);
        }

        // Quantity selector
        const qtySection = document.createElement('div');
        qtySection.className = 'option-section';

        const qtyLabel = document.createElement('span');
        qtyLabel.className = 'option-label';
        qtyLabel.textContent = 'Quantity:';
        qtySection.appendChild(qtyLabel);

        const qtySelector = document.createElement('div');
        qtySelector.className = 'quantity-selector';

        const minusBtn = document.createElement('button');
        minusBtn.className = 'qty-btn';
        minusBtn.textContent = '\u2212';
        minusBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.adjustQuantity(product.id, -1);
        });

        const qtyValue = document.createElement('span');
        qtyValue.className = 'qty-value';
        qtyValue.id = 'qty-' + product.id;
        qtyValue.textContent = '1';

        const plusBtn = document.createElement('button');
        plusBtn.className = 'qty-btn';
        plusBtn.textContent = '+';
        plusBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.adjustQuantity(product.id, 1);
        });

        qtySelector.appendChild(minusBtn);
        qtySelector.appendChild(qtyValue);
        qtySelector.appendChild(plusBtn);
        qtySection.appendChild(qtySelector);
        options.appendChild(qtySection);

        // Add to cart section
        const addSection = document.createElement('div');
        addSection.className = 'add-to-cart-section';

        const totalSection = document.createElement('div');
        totalSection.className = 'item-total';

        const totalLabel = document.createElement('span');
        totalLabel.className = 'item-total-label';
        totalLabel.textContent = 'Total: ';

        const totalPrice = document.createElement('span');
        totalPrice.className = 'item-total-price';
        totalPrice.id = 'total-' + product.id;
        totalPrice.textContent = MenuData.formatPrice(sizes[0].basePrice);

        totalSection.appendChild(totalLabel);
        totalSection.appendChild(totalPrice);

        const addBtn = document.createElement('button');
        addBtn.className = 'add-to-cart-btn';
        addBtn.textContent = '\uD83D\uDED2 Add to Cart';
        addBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.addToCart(product.id);
        });

        addSection.appendChild(totalSection);
        addSection.appendChild(addBtn);
        options.appendChild(addSection);

        return options;
    },

    toggleProduct(productId) {
        const card = document.getElementById('product-' + productId);
        if (!card) return;

        if (card.classList.contains('expanded')) {
            card.classList.remove('expanded');
            this.expandedCard = null;
        } else {
            // Collapse any other expanded card
            if (this.expandedCard) {
                const prevCard = document.getElementById('product-' + this.expandedCard);
                if (prevCard) prevCard.classList.remove('expanded');
            }
            card.classList.add('expanded');
            this.expandedCard = productId;

            // Scroll card into view
            setTimeout(() => {
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    },

    expandProduct(productId) {
        const card = document.getElementById('product-' + productId);
        if (card && !card.classList.contains('expanded')) {
            this.toggleProduct(productId);
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    },

    selectSize(productId, sizeId) {
        const container = document.getElementById('sizes-' + productId);
        if (!container) return;

        container.querySelectorAll('.size-option').forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.size === sizeId);
        });

        this.updateItemTotal(productId);
    },

    adjustQuantity(productId, delta) {
        const qtyEl = document.getElementById('qty-' + productId);
        if (!qtyEl) return;

        let qty = parseInt(qtyEl.textContent) + delta;
        qty = Math.max(1, Math.min(10, qty));
        qtyEl.textContent = qty;

        this.updateItemTotal(productId);
    },

    getSelectedOptions(productId) {
        const sizeContainer = document.getElementById('sizes-' + productId);
        const addonsContainer = document.getElementById('addons-' + productId);
        const qtyEl = document.getElementById('qty-' + productId);

        const selectedSizeBtn = sizeContainer ? sizeContainer.querySelector('.size-option.selected') : null;
        const sizeId = selectedSizeBtn ? selectedSizeBtn.dataset.size : null;

        const selectedAddons = [];
        if (addonsContainer) {
            addonsContainer.querySelectorAll('input:checked').forEach(input => {
                selectedAddons.push(input.value);
            });
        }

        const quantity = parseInt(qtyEl ? qtyEl.textContent : '1');

        return { sizeId, selectedAddons, quantity };
    },

    updateItemTotal(productId) {
        const totalEl = document.getElementById('total-' + productId);
        if (!totalEl) return;

        const product = MenuData.getProductById(productId);
        const { sizeId, selectedAddons, quantity } = this.getSelectedOptions(productId);

        const unitPrice = MenuData.calculatePrice(product, sizeId, selectedAddons);
        const total = unitPrice * quantity;

        totalEl.textContent = MenuData.formatPrice(total);
    },

    addToCart(productId) {
        const product = MenuData.getProductById(productId);
        if (!product) return;

        const { sizeId, selectedAddons, quantity } = this.getSelectedOptions(productId);

        CartManager.addItem(product, sizeId, selectedAddons, quantity);

        // Show feedback
        const card = document.getElementById('product-' + productId);
        const addBtn = card ? card.querySelector('.add-to-cart-btn') : null;
        if (addBtn) {
            const originalText = addBtn.textContent;
            addBtn.textContent = '\u2713 Added!';
            addBtn.disabled = true;
            setTimeout(() => {
                addBtn.textContent = originalText;
                addBtn.disabled = false;
            }, 1500);
        }

        // Reset options
        const sizes = MenuData.getProductSizes(product);
        this.selectSize(productId, sizes[0].id);
        const addonsContainer = document.getElementById('addons-' + productId);
        if (addonsContainer) {
            addonsContainer.querySelectorAll('input').forEach(input => {
                input.checked = false;
                const option = input.closest('.addon-option');
                if (option) option.classList.remove('selected');
            });
        }
        const qtyEl = document.getElementById('qty-' + productId);
        if (qtyEl) qtyEl.textContent = '1';
        this.updateItemTotal(productId);
    },

    // ----------------------
    // CART PANEL
    // ----------------------
    setupCartPanel() {
        const closeBtn = document.getElementById('close-cart');
        const overlay = document.getElementById('cart-overlay');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeCart());
        }
        if (overlay) {
            overlay.addEventListener('click', () => this.closeCart());
        }

        // Escape key closes cart
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.cartPanelOpen) {
                this.closeCart();
            }
        });
    },

    setupCartFab() {
        const fab = document.getElementById('cart-fab');
        if (fab) {
            fab.addEventListener('click', () => this.openCart());
        }
    },

    openCart() {
        const panel = document.getElementById('cart-panel');
        const overlay = document.getElementById('cart-overlay');

        if (panel) {
            panel.classList.add('open');
            this.cartPanelOpen = true;
        }
        if (overlay) {
            overlay.classList.add('visible');
        }

        this.renderCartItems();
    },

    closeCart() {
        const panel = document.getElementById('cart-panel');
        const overlay = document.getElementById('cart-overlay');

        if (panel) {
            panel.classList.remove('open');
            this.cartPanelOpen = false;
        }
        if (overlay) {
            overlay.classList.remove('visible');
        }
    },

    updateCartDisplay() {
        const count = CartManager.getItemCount();

        // Update FAB
        const fabCount = document.querySelector('.cart-fab .cart-count');
        if (fabCount) {
            fabCount.textContent = count;
            fabCount.style.display = count > 0 ? 'flex' : 'none';
        }

        // Update header cart count
        document.querySelectorAll('.cart-count').forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        });

        // Update total
        const totalEl = document.getElementById('cart-total');
        if (totalEl) {
            totalEl.textContent = formatPrice(CartManager.getTotal());
        }

        // Show/hide footer
        const footer = document.getElementById('cart-footer');
        if (footer) {
            footer.style.display = count > 0 ? 'block' : 'none';
        }

        // Re-render items if cart is open
        if (this.cartPanelOpen) {
            this.renderCartItems();
        }
    },

    renderCartItems() {
        const container = document.getElementById('cart-items');
        if (!container) return;

        const cart = CartManager.getCart();
        this.clearContainer(container);

        if (cart.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'cart-empty';

            const icon = document.createElement('div');
            icon.className = 'cart-empty-icon';
            icon.textContent = '\u2728';

            const text = document.createElement('p');
            text.textContent = 'Your cart is empty';

            const subtext = document.createElement('p');
            subtext.style.fontSize = '0.9rem';
            subtext.textContent = 'Browse our menu to add items';

            empty.appendChild(icon);
            empty.appendChild(text);
            empty.appendChild(subtext);
            container.appendChild(empty);
            return;
        }

        const categoryIcons = {
            'classic': '🧀', 'date-night': '💕', 'girls-night': '🥂',
            'boards': '🧀', 'treats': '🍰'
        };

        cart.forEach((item, index) => {
            const product = MenuData.getProductById(item.productId);
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';

            // Icon
            const iconEl = document.createElement('div');
            iconEl.className = 'cart-item-icon';
            iconEl.textContent = product ? categoryIcons[product.categories[0]] || '🧀' : '🧀';

            // Details
            const details = document.createElement('div');
            details.className = 'cart-item-details';

            const name = document.createElement('div');
            name.className = 'cart-item-name';
            name.textContent = item.name;

            const size = document.createElement('div');
            size.className = 'cart-item-size';
            size.textContent = item.sizeName + (item.sizeServes ? ' (Serves ' + item.sizeServes + ')' : '');

            details.appendChild(name);
            details.appendChild(size);

            if (item.addOnNames && item.addOnNames.length > 0) {
                const addons = document.createElement('div');
                addons.className = 'cart-item-addons';
                addons.textContent = '+ ' + item.addOnNames.join(', ');
                details.appendChild(addons);
            }

            // Quantity controls
            const qtyControls = document.createElement('div');
            qtyControls.className = 'cart-item-quantity';

            const minusBtn = document.createElement('button');
            minusBtn.className = 'qty-btn';
            minusBtn.textContent = '\u2212';
            minusBtn.addEventListener('click', () => {
                CartManager.updateItemQuantity(index, item.quantity - 1);
            });

            const qtyValue = document.createElement('span');
            qtyValue.className = 'qty-value';
            qtyValue.textContent = item.quantity;

            const plusBtn = document.createElement('button');
            plusBtn.className = 'qty-btn';
            plusBtn.textContent = '+';
            plusBtn.addEventListener('click', () => {
                CartManager.updateItemQuantity(index, item.quantity + 1);
            });

            qtyControls.appendChild(minusBtn);
            qtyControls.appendChild(qtyValue);
            qtyControls.appendChild(plusBtn);
            details.appendChild(qtyControls);

            // Price
            const price = document.createElement('div');
            price.className = 'cart-item-price';
            price.textContent = formatPrice(CartManager.getItemTotal(item));

            // Remove button
            const removeBtn = document.createElement('button');
            removeBtn.className = 'cart-item-remove';
            removeBtn.textContent = '\u00D7';
            removeBtn.setAttribute('aria-label', 'Remove ' + item.name);
            removeBtn.addEventListener('click', () => {
                CartManager.removeItem(index);
            });

            itemEl.appendChild(iconEl);
            itemEl.appendChild(details);
            itemEl.appendChild(price);
            itemEl.appendChild(removeBtn);
            container.appendChild(itemEl);
        });

        // Update total
        const totalEl = document.getElementById('cart-total');
        if (totalEl) {
            totalEl.textContent = formatPrice(CartManager.getTotal());
        }
    }
};

// ============================================================
// INITIALIZATION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    MenuUI.init();
});
