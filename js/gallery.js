/**
 * Nani's Treats & Boards - Gallery Page Controller
 * Handles lightbox functionality for gallery images
 */

const GalleryUI = {
    currentIndex: 0,
    items: [],

    init() {
        this.items = Array.from(document.querySelectorAll('.gallery-item'));
        this.setupLightbox();
        this.setupGalleryItems();
    },

    setupGalleryItems() {
        this.items.forEach((item, index) => {
            item.addEventListener('click', () => this.openLightbox(index));
        });
    },

    setupLightbox() {
        const lightbox = document.getElementById('lightbox');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');

        closeBtn.addEventListener('click', () => this.closeLightbox());
        prevBtn.addEventListener('click', () => this.navigate(-1));
        nextBtn.addEventListener('click', () => this.navigate(1));

        // Close on overlay click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('open')) return;

            if (e.key === 'Escape') {
                this.closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                this.navigate(-1);
            } else if (e.key === 'ArrowRight') {
                this.navigate(1);
            }
        });
    },

    openLightbox(index) {
        this.currentIndex = index;
        this.updateLightboxContent();

        const lightbox = document.getElementById('lightbox');
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    },

    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    },

    navigate(direction) {
        this.currentIndex += direction;

        if (this.currentIndex < 0) {
            this.currentIndex = this.items.length - 1;
        } else if (this.currentIndex >= this.items.length) {
            this.currentIndex = 0;
        }

        this.updateLightboxContent();
    },

    updateLightboxContent() {
        const item = this.items[this.currentIndex];
        const img = item.querySelector('.gallery-image');
        const placeholder = item.querySelector('.gallery-placeholder');
        const overlay = item.querySelector('.gallery-overlay');

        const lightboxImageContainer = document.getElementById('lightbox-image');
        const lightboxCaption = document.getElementById('lightbox-caption');

        // Clear previous content
        while (lightboxImageContainer.firstChild) {
            lightboxImageContainer.removeChild(lightboxImageContainer.firstChild);
        }

        // If there's a real image, show it larger
        if (img) {
            const newImg = document.createElement('img');
            newImg.src = img.src.replace('w=400', 'w=800');
            newImg.alt = img.alt;
            newImg.className = 'lightbox-image';
            lightboxImageContainer.appendChild(newImg);
            lightboxImageContainer.className = 'lightbox-image-wrapper';
        } else if (placeholder) {
            lightboxImageContainer.textContent = placeholder.textContent;
            lightboxImageContainer.className = 'lightbox-placeholder';
        }

        // Update caption from overlay
        if (overlay) {
            const title = overlay.querySelector('.gallery-title');
            if (title) {
                lightboxCaption.textContent = title.textContent;
            }
        }
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    GalleryUI.init();
});
