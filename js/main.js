/**
 * EMBER & OAK CAFÉ — INTERACTIVE SCRIPTS
 * Sticky navigation, mobile drawer, interactive menu filters,
 * customizer micro-interactions, masonry gallery lightbox,
 * reservation & directions modals, and toast alerts.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initMenuTabs();
  initDrinkCustomizer();
  initGalleryLightbox();
  initModals();
  initScrollReveal();
  initSmoothScroll();
});

/* ==========================================================================
   1. STICKY NAVBAR & SCROLL DETECTOR
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check on load
}

/* ==========================================================================
   2. MOBILE MENU DRAWER
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.mobile-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-drawer .btn');

  if (!toggleBtn || !drawer || !backdrop) return;

  const openDrawer = () => {
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  backdrop.addEventListener('click', closeDrawer);

  const drawerCloseButtons = document.querySelectorAll('.mobile-drawer-close');
  drawerCloseButtons.forEach(btn => btn.addEventListener('click', closeDrawer));

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   3. MENU PREVIEW TABS (Home Page)
   ========================================================================== */
const MENU_DATA = [
  // COFFEE
  { category: 'coffee', name: 'Espresso', price: '₹140', desc: 'Double shot of single-origin beans, rich golden crema, tasting of dark cacao & sweet orange.', tags: ['Signature Blend'] },
  { category: 'coffee', name: 'Americano', price: '₹160', desc: 'Carefully pulled espresso poured over filtered hot water, preserving floral terroir notes.', tags: ['Single Origin'] },
  { category: 'coffee', name: 'Cappuccino', price: '₹190', desc: 'Harmonious balance of double espresso, steamed milk, and a dense cloud of micro-foam.', tags: ['Classic'] },
  { category: 'coffee', name: 'Flat White', price: '₹210', desc: 'Double ristretto folded with velvety textured whole milk for an intensely smooth cup.', tags: ['Barista Pick'] },
  { category: 'coffee', name: 'Latte', price: '₹200', desc: 'Gentle espresso enveloped in silky steamed milk with subtle natural sweetness.', tags: ['Comforting'] },
  
  // SIGNATURES
  { category: 'signatures', name: 'Ember Latte', price: '₹240', desc: 'Espresso, toasted brown sugar caramel, silky oat milk and a delicate pinch of sea salt.', tags: ['House Signature', 'Must Try'] },
  { category: 'signatures', name: 'Oak Cold Brew', price: '₹260', desc: '18-hour cold steeped roast served over a hand-carved ice sphere with an orange peel twist.', tags: ['Cold Crafted'] },
  { category: 'signatures', name: 'Honey Cinnamon Latte', price: '₹230', desc: 'Wild forest honey, ground Ceylon cinnamon, double shot espresso and steamed milk.', tags: ['Seasonal'] },
  
  // BREAKFAST
  { category: 'breakfast', name: 'Avocado Toast', price: '₹320', desc: 'Rustic sourdough, hand-smashed Hass avocado, poached farm egg, sheep feta, microgreens.', tags: ['All Day', 'Chef Choice'] },
  { category: 'breakfast', name: 'Croissant & Eggs', price: '₹290', desc: 'Slow-fermented French butter croissant served with creamy folded eggs and fresh chives.', tags: ['Fresh Baked'] },
  { category: 'breakfast', name: 'Pancake Stack', price: '₹280', desc: 'Buttermilk pancakes, caramelized bananas, pure Canadian maple syrup, house churned butter.', tags: ['Sweet Morning'] },
  
  // DESSERTS
  { category: 'desserts', name: 'Basque Cheesecake', price: '₹260', desc: 'Caramelized burnt exterior with an ultra-creamy custard core, macerated berries.', tags: ['Small Batch'] },
  { category: 'desserts', name: 'Chocolate Tart', price: '₹240', desc: '70% dark single-origin chocolate ganache, crisp cocoa crust, flaky sea salt finish.', tags: ['Decadent'] },
  { category: 'desserts', name: 'Tiramisu', price: '₹250', desc: 'Savoiardi sponge soaked in Ember espresso, light mascarpone cream, Dutch cocoa dust.', tags: ['House Classic'] }
];

function initMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab-btn');
  const container = document.getElementById('menu-preview-container');
  if (!tabs.length || !container) return;

  const renderItems = (filter) => {
    const filtered = filter === 'all' 
      ? MENU_DATA.slice(0, 8) 
      : MENU_DATA.filter(item => item.category === filter);

    container.innerHTML = filtered.map(item => `
      <div class="menu-item-row fade-up in-view">
        <div class="menu-item-header">
          <span class="menu-item-name">${item.name}</span>
          <span class="menu-item-dots"></span>
          <span class="menu-item-price">${item.price}</span>
        </div>
        <p class="menu-item-desc">${item.desc}</p>
      </div>
    `).join('');
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.getAttribute('data-category');
      renderItems(category);
    });
  });

  // Initial render
  renderItems('all');
}

/* ==========================================================================
   4. SIGNATURE DRINK CUSTOMIZER (Ember Latte)
   ========================================================================== */
function initDrinkCustomizer() {
  const tempButtons = document.querySelectorAll('[data-custom="temp"]');
  const milkButtons = document.querySelectorAll('[data-custom="milk"]');
  const feedbackEl = document.getElementById('customizer-feedback-text');

  if (!feedbackEl) return;

  let currentTemp = 'Hot (65°C)';
  let currentMilk = 'Oat Milk';

  const updateFeedback = () => {
    feedbackEl.textContent = `Selected: ${currentTemp} with Silky ${currentMilk} · Freshly pulled at counter`;
  };

  tempButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tempButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTemp = btn.textContent.trim();
      updateFeedback();
    });
  });

  milkButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      milkButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMilk = btn.textContent.trim();
      updateFeedback();
    });
  });
}

/* ==========================================================================
   5. GALLERY & LIGHTBOX
   ========================================================================== */
const GALLERY_ITEMS = [
  {
    src: 'assets/images/hero-cafe.jpg',
    category: 'craft',
    title: 'Manual V60 Pour Over',
    caption: 'Single-origin beans extracted at 93°C with a brass gooseneck kettle.'
  },
  {
    src: 'assets/images/ember-latte.jpg',
    category: 'drinks',
    title: 'The Ember Latte',
    caption: 'Handcrafted ceramic mug, toasted caramel drizzle, and flaky sea salt.'
  },
  {
    src: 'assets/images/cafe-interior.jpg',
    category: 'space',
    title: 'Sunlit Reading Nook',
    caption: 'Teak wood banquette seating by arched windows overlooking our garden.'
  },
  {
    src: 'assets/images/espresso-extraction.jpg',
    category: 'craft',
    title: 'Bottomless Portafilter Pull',
    caption: 'Hazelnut crema extraction under 9 bars of balanced water pressure.'
  },
  {
    src: 'assets/images/avocado-toast.jpg',
    category: 'plates',
    title: 'Artisan Avocado Sourdough',
    caption: 'Pasture-raised poached farm egg, fermented bread, sheep feta & micro herbs.'
  },
  {
    src: 'assets/images/basque-cheesecake.jpg',
    category: 'plates',
    title: 'Basque Burnt Cheesecake',
    caption: 'Traditional San Sebastián style caramelised crust with molten vanilla core.'
  },
  {
    src: 'assets/images/cupping-ritual.jpg',
    category: 'craft',
    title: 'Morning Roast Cupping Ritual',
    caption: 'Evaluating bean development, acidity, and floral notes before service.'
  },
  {
    src: 'assets/images/cafe-exterior.jpg',
    category: 'space',
    title: 'Heritage Facade on Market St.',
    caption: 'Colonial archways, aged lime-washed walls, and welcoming warm lanterns.'
  },
  {
    src: 'assets/images/latte-art.jpg',
    category: 'drinks',
    title: 'Rosetta Micro-Foam Art',
    caption: 'Steamed silky texture poured into artisan stoneware demitasse.'
  },
  {
    src: 'assets/images/fresh-pastries.jpg',
    category: 'plates',
    title: 'Morning Flaky Pastries',
    caption: 'Small-batch butter croissants and pain au chocolat straight from the oven.'
  },
  {
    src: 'assets/images/oak-cold-brew.jpg',
    category: 'drinks',
    title: 'Oak Cold Brew Over Ice',
    caption: '18-hour cold extracted coffee over a crystal sphere with orange zest.'
  }
];

function initGalleryLightbox() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  if (!lightbox) return;

  let currentIndex = 0;
  let activeList = [...GALLERY_ITEMS];

  // Gallery Filter
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-filter');
      
      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (cat === 'all' || itemCat === cat) {
          item.style.display = 'block';
          item.classList.add('fade-up', 'in-view');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Open Lightbox
  const openLightbox = (index) => {
    currentIndex = index;
    const item = GALLERY_ITEMS[currentIndex];
    if (!item) return;

    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = `${item.caption} (${currentIndex + 1} of ${GALLERY_ITEMS.length})`;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % GALLERY_ITEMS.length;
    openLightbox(currentIndex);
  };

  const showPrev = () => {
    currentIndex = (currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    openLightbox(currentIndex);
  };

  // Attach click to gallery items
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.getAttribute('data-index'), 10);
      if (!isNaN(index)) {
        openLightbox(index);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNext);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);

  // Close when clicking outside content
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

/* ==========================================================================
   6. INTERACTIVE MODALS & TOAST
   ========================================================================== */
function initModals() {
  // Reservation Modal
  const reserveTriggers = document.querySelectorAll('[data-modal="reserve"]');
  const reserveModal = document.getElementById('reservation-modal');
  const reserveClose = document.getElementById('reservation-close');
  const reserveForm = document.getElementById('reservation-form');

  // Directions Modal
  const directionTriggers = document.querySelectorAll('[data-modal="directions"]');
  const directionsModal = document.getElementById('directions-modal');
  const directionsClose = document.getElementById('directions-close');
  const copyAddressBtn = document.getElementById('copy-address-btn');

  // Modal helpers
  const openModal = (modal) => {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  reserveTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(reserveModal);
    });
  });

  if (reserveClose) {
    reserveClose.addEventListener('click', () => closeModal(reserveModal));
  }
  if (reserveModal) {
    reserveModal.addEventListener('click', (e) => {
      if (e.target === reserveModal) closeModal(reserveModal);
    });
  }

  // Handle Reservation Form Submit
  if (reserveForm) {
    reserveForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('res-name')?.value || 'Guest';
      const guests = document.getElementById('res-guests')?.value || '2';
      closeModal(reserveModal);
      reserveForm.reset();
      showToast(`Thank you, ${name}! Table inquiry for ${guests} guests received. We will confirm via SMS.`);
    });
  }

  // Directions Modal handlers
  directionTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(directionsModal);
    });
  });

  if (directionsClose) {
    directionsClose.addEventListener('click', () => closeModal(directionsModal));
  }
  if (directionsModal) {
    directionsModal.addEventListener('click', (e) => {
      if (e.target === directionsModal) closeModal(directionsModal);
    });
  }

  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      const addressText = 'Ember & Oak Café, 12 Market Street, Fort Kochi, Kerala 682001';
      navigator.clipboard.writeText(addressText).then(() => {
        showToast('Address copied to clipboard!');
      }).catch(() => {
        showToast('Address: 12 Market Street, Fort Kochi');
      });
    });
  }

  // Newsletter Form Submit
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input && input.value) {
        showToast('Subscribed to our Slow Coffee Journal.');
        input.value = '';
      }
    });
  }
}

/* Toast Notification Utility */
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--amber-ember); flex-shrink:0;">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4200);
}

/* ==========================================================================
   7. SCROLL REVEAL (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.fade-up');
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   8. SMOOTH SCROLL FOR INTERNAL ANCHORS
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || !href) return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
}
