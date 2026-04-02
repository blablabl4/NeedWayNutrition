// ===================================
// Needway Nutrition — App Core
// Global initialization, scroll, nav
// ===================================

document.addEventListener('DOMContentLoaded', async () => {
 if (typeof loadNeedwayData === 'function') {
  await loadNeedwayData();
 }
 initHeader();
 initMobileNav();
 initMegaMenu();
 initScrollReveal();
 initCouponPopup();
 initOverlay();
 initTopbarScroll();
 initModalitiesCarousel();
 // Inicializa o carrossel principal (slides injetados dinamicamente pelo bloco inline em index.html)
 if (document.getElementById('heroCarousel')) initCarousel('#heroCarousel');
});

// ── Modalities Carousel Showcase ──
function initModalitiesCarousel() {
 const showcases = document.querySelectorAll('.modalities-showcase');
 if (showcases.length === 0) return;

 showcases.forEach(showcase => {
  const tabs = showcase.querySelectorAll('.modalities-showcase__tab');
  const images = showcase.querySelectorAll('.modalities-showcase__img');
  const panels = showcase.querySelectorAll('.modalities-showcase__panel');
  let currentIndex = 0;
  let fallbackTimeout;
  let isPaused = false;
  let interval;

  function activateIndex(index) {
   tabs.forEach(t => t.classList.remove('active'));
   images.forEach(img => img.classList.remove('active'));
   panels.forEach(p => p.classList.remove('active'));

   if(tabs[index]) tabs[index].classList.add('active');
   if(images[index]) images[index].classList.add('active');
   if(panels[index]) panels[index].classList.add('active');
   currentIndex = index;
  }

  function rotate() {
   if(isPaused) return;
   let nxt = (currentIndex + 1) % tabs.length;
   activateIndex(nxt);
  }

  if(tabs.length > 1) {
    interval = setInterval(rotate, 4500);
  }

  function pauseAndActivate(index) {
   clearInterval(interval);
   activateIndex(index);
   clearTimeout(fallbackTimeout);
   isPaused = true;
   fallbackTimeout = setTimeout(() => {
    isPaused = false;
    interval = setInterval(rotate, 4500);
   }, 10000); 
  }

  tabs.forEach((tab, index) => {
   tab.addEventListener('mouseenter', () => pauseAndActivate(index));
   tab.addEventListener('click', () => pauseAndActivate(index));
  });

  panels.forEach(panel => {
   panel.addEventListener('mouseenter', () => {
    clearInterval(interval);
    clearTimeout(fallbackTimeout);
    isPaused = true;
   });
   panel.addEventListener('mouseleave', () => {
    fallbackTimeout = setTimeout(() => {
     isPaused = false;
     interval = setInterval(rotate, 4500);
    }, 3000);
   });
  });
 });
}

// ── Header Scroll Effect ──
function initHeader() {
 const header = document.querySelector('.header');
 if (!header) return;

 let lastScroll = 0;
 window.addEventListener('scroll', () => {
  const current = window.scrollY;
  header.classList.toggle('scrolled', current > 50);
  lastScroll = current;
 }, { passive: true });
}

// ── Mobile Navigation ──
function initMobileNav() {
 const toggle = document.querySelector('.menu-toggle');
 const nav = document.querySelector('.nav');
 const overlay = document.getElementById('overlay');

 if (!toggle || !nav) return;

 toggle.addEventListener('click', () => {
  const isActive = nav.classList.contains('active');
  nav.classList.toggle('active');
  toggle.classList.toggle('active');
  overlay?.classList.toggle('active');
  document.body.classList.toggle('no-scroll', !isActive);
 });
}

// ── Mega Menu ──
function initMegaMenu() {
 const triggers = document.querySelectorAll('[data-mega-menu]');
 triggers.forEach(trigger => {
  const menuId = trigger.getAttribute('data-mega-menu');
  const menu = document.getElementById(menuId);
  if (!menu) return;

  let timeout;

  trigger.addEventListener('mouseenter', () => {
   clearTimeout(timeout);
   // Close other menus
   document.querySelectorAll('.mega-menu.active').forEach(m => m.classList.remove('active'));
   menu.classList.add('active');
  });

  trigger.addEventListener('mouseleave', () => {
   timeout = setTimeout(() => {
    if (!menu.matches(':hover')) menu.classList.remove('active');
   }, 200);
  });

  menu.addEventListener('mouseenter', () => clearTimeout(timeout));
  menu.addEventListener('mouseleave', () => {
   timeout = setTimeout(() => menu.classList.remove('active'), 200);
  });
 });
}

// ── Scroll Reveal ──
function initScrollReveal() {
 const reveals = document.querySelectorAll('.reveal');
 if (reveals.length === 0) return;

 const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
   if (entry.isIntersecting) {
    entry.target.classList.add('revealed');
    observer.unobserve(entry.target);
   }
  });
 }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

 reveals.forEach(el => observer.observe(el));
}

// ── Coupon Popup ──
function initCouponPopup() {
 const popup = document.getElementById('couponPopup');
 if (!popup) return;

 // Show after 3 seconds if not dismissed
 const dismissed = sessionStorage.getItem('coupon_dismissed');
 if (!dismissed) {
  setTimeout(() => popup.classList.add('active'), 3000);
 }

 const closeBtn = popup.querySelector('.coupon-popup__close');
 closeBtn?.addEventListener('click', () => {
  popup.classList.remove('active');
  sessionStorage.setItem('coupon_dismissed', '1');
 });

 // Copy coupon code
 const copyBtn = popup.querySelector('[data-copy-coupon]');
 copyBtn?.addEventListener('click', () => {
  const code = copyBtn.getAttribute('data-copy-coupon');
  navigator.clipboard.writeText(code).then(() => {
   copyBtn.textContent = 'Copiado!';
   setTimeout(() => { copyBtn.textContent = 'Copiar'; }, 2000);
  });
 });
}

// ── Overlay ──
function initOverlay() {
 const overlay = document.getElementById('overlay');
 overlay?.addEventListener('click', () => {
  overlay.classList.remove('active');
  document.querySelectorAll('.nav.active, .minicart.active, .sidebar-filter.active, .modal.active').forEach(el => {
   el.classList.remove('active');
  });
  document.querySelector('.menu-toggle')?.classList.remove('active');
  document.body.classList.remove('no-scroll');
 });
}

// ── Topbar Scroll (duplicate content for seamless loop) ──
function initTopbarScroll() {
 const track = document.querySelector('.topbar__track');
 if (!track) return;
 // Clone children for seamless infinite scroll
 const items = track.innerHTML;
 track.innerHTML = items + items;
}

// ── Carousel Component (dots + progress bar, no arrows) ──
function initCarousel(selector) {
 const carousel = document.querySelector(selector);
 if (!carousel) return;

 const track = carousel.querySelector('.carousel__track');
 const slides = carousel.querySelectorAll('.carousel__slide');
 const dotsContainer = carousel.querySelector('.carousel__dots');

 let current = 0;
 const total = slides.length;
 const INTERVAL = 5000;

 function goTo(index, resetTimer) {
  current = ((index % total) + total) % total;
  track.style.transform = `translateX(-${current * 100}%)`;
  updateDots();
  if (resetTimer !== false) restartAutoPlay();
 }

 function updateDots() {
  if (!dotsContainer) return;
  dotsContainer.querySelectorAll('.carousel__dot').forEach((dot, i) => {
   const isActive = i === current;
   dot.classList.toggle('active', isActive);
   // Reset animation by removing and re-adding element
   const bar = dot.querySelector('.carousel__dot-progress');
   if (bar) {
    bar.style.animation = 'none';
    if (isActive) {
     // Force reflow
     void bar.offsetWidth;
     bar.style.animation = `dotProgress ${INTERVAL}ms linear forwards`;
    }
   }
  });
 }

 // Create dots with progress bar
 if (dotsContainer) {
  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
   const dot = document.createElement('button');
   dot.className = `carousel__dot ${i === 0 ? 'active' : ''}`;
   dot.setAttribute('aria-label', `Slide ${i + 1}`);
   const progressBar = document.createElement('span');
   progressBar.className = 'carousel__dot-progress';
   if (i === 0) progressBar.style.animation = `dotProgress ${INTERVAL}ms linear forwards`;
   dot.appendChild(progressBar);
   dot.addEventListener('click', () => goTo(i));
   dotsContainer.appendChild(dot);
  });
 }

 // Auto-play
 let autoPlay = setInterval(() => goTo(current + 1, false), INTERVAL);
 function restartAutoPlay() {
  clearInterval(autoPlay);
  autoPlay = setInterval(() => goTo(current + 1, false), INTERVAL);
  updateDots();
 }
 carousel.addEventListener('mouseenter', () => {
  clearInterval(autoPlay);
  // Pause progress bar
  dotsContainer?.querySelectorAll('.carousel__dot-progress').forEach(b => {
   b.style.animationPlayState = 'paused';
  });
 });
 carousel.addEventListener('mouseleave', () => {
  restartAutoPlay();
  dotsContainer?.querySelectorAll('.carousel__dot-progress').forEach(b => {
   b.style.animationPlayState = 'running';
  });
 });

 // Touch/swipe support
 let startX = 0;
 track.addEventListener('touchstart', e => startX = e.touches[0].clientX, { passive: true });
 track.addEventListener('touchend', e => {
  const diff = startX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
   diff > 0 ? goTo(current + 1) : goTo(current - 1);
  }
 }, { passive: true });
}

// ── Tabs Component ──
function initTabs(selector) {
 const container = document.querySelector(selector);
 if (!container) return;

 const tabs = container.querySelectorAll('.tabs__tab');
 const contents = container.querySelectorAll('.tabs__content');

 tabs.forEach(tab => {
  tab.addEventListener('click', () => {
   const target = tab.getAttribute('data-tab');
   tabs.forEach(t => t.classList.remove('active'));
   contents.forEach(c => c.classList.remove('active'));
   tab.classList.add('active');
   document.getElementById(target)?.classList.add('active');
  });
 });
}

// ── Accordion Component ──
function initAccordion(selector) {
 const container = document.querySelector(selector);
 if (!container) return;

 const items = container.querySelectorAll('.accordion__item');
 items.forEach(item => {
  const header = item.querySelector('.accordion__header');
  header?.addEventListener('click', () => {
   const isActive = item.classList.contains('active');
   // Close all others
   items.forEach(i => i.classList.remove('active'));
   if (!isActive) item.classList.add('active');
  });
 });
}

// ── Countdown Timer ──
function initCountdown(selector, targetDate) {
 const container = document.querySelector(selector);
 if (!container) return;

 function update() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
   container.innerHTML = '<div class="text-danger">Oferta encerrada</div>';
   return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  container.innerHTML = `
  <div class="countdown__block"><span class="countdown__number">${String(days).padStart(2, '0')}</span><span class="countdown__label">Dias</span></div>
  <div class="countdown__block"><span class="countdown__number">${String(hours).padStart(2, '0')}</span><span class="countdown__label">Horas</span></div>
  <div class="countdown__block"><span class="countdown__number">${String(minutes).padStart(2, '0')}</span><span class="countdown__label">Min</span></div>
  <div class="countdown__block"><span class="countdown__number">${String(seconds).padStart(2, '0')}</span><span class="countdown__label">Seg</span></div>
 `;
 }

 update();
 setInterval(update, 1000);
}

// ── Product Card Renderer ──
function renderProductCard(product) {
 const badgesHTML = (product.badges || []).map(b => {
  const info = getBadgeInfo(b);
  return `<span class="badge ${info.class}">${info.text}</span>`;
 }).join('');

 const discountBadge = product.discount ? `<span class="badge badge--discount">-${product.discount}%</span>` : '';
 const stock = getStockStatus(product.stock);
 const pix = getPixPrice(product.price);
 const inst = getInstallments(product.price);
 const CART_SVG = '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>';

 const PRODUCT_PLACEHOLDER_SVG = `<img src="logo sem fundo.png" style="width:60%; opacity:0.1; object-fit:contain; filter:grayscale(100%); pointer-events:none;" alt="Needway">`;

 const heroImageHTML = product.images && product.images.length > 0
  ? `<img src="${product.images[0]}" alt="${product.name}" style="width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply;">`
  : PRODUCT_PLACEHOLDER_SVG;

 return `
 <div class="product-card" data-product-id="${product.id}">
  <a href="produto.html?id=${product.id}" class="product-card__image-wrap">
  <div style="width:100%;height:100%;background:var(--bg-card);display:flex;align-items:center;justify-content:center;">
   ${heroImageHTML}
  </div>
  <div class="product-card__badges">
   ${discountBadge}
   ${badgesHTML}
  </div>
  <button class="product-card__favorite" onclick="event.preventDefault(); event.stopPropagation(); toggleFavorite(${product.id}, this);" aria-label="Favoritar"></button>
  <div class="product-card__quick-add">
   <button class="btn btn--primary btn--sm btn--full quick-add__full" onclick="event.preventDefault(); event.stopPropagation(); Cart.addItem(${product.id}, 1, '${(product.flavors || [])[0] || ''}', '${(product.sizes || [])[0] || ''}');">
   ${CART_SVG} Adicionar
   </button>
   <button class="btn btn--primary btn--sm quick-add__icon" onclick="event.preventDefault(); event.stopPropagation(); Cart.addItem(${product.id}, 1, '${(product.flavors || [])[0] || ''}', '${(product.sizes || [])[0] || ''}');" aria-label="Adicionar">
   ${CART_SVG}
   </button>
  </div>
  </a>
  <div class="product-card__body">
  <span class="product-card__category">${NeedwayData.categories.find(c => c.id === product.category)?.name || ''}</span>
  <a href="produto.html?id=${product.id}" class="product-card__name">${product.name}</a>
  <div class="product-card__rating">
   <span class="stars">${renderStars(product.rating)}</span>
   <span class="product-card__rating-count">(${product.reviewCount.toLocaleString()})</span>
  </div>
  <div class="product-card__price-wrap">
   ${product.originalPrice > product.price ? `<span class="product-card__price-original">${formatPrice(product.originalPrice)}</span>` : ''}
   <span class="product-card__price">${formatPrice(product.price)}</span>
   <span class="product-card__price-pix">${formatPrice(pix)} no PIX</span>
   <span class="product-card__price-installment">ou ${inst.count}x de ${formatPrice(inst.value)} s/ juros</span>
  </div>
  </div>
 </div>
 `;
}

// ── Favorites ──
function getFavorites() {
 try { return JSON.parse(localStorage.getItem('needway_favs')) || []; }
 catch { return []; }
}

function toggleFavorite(productId, el) {
 let favs = getFavorites();
 if (favs.includes(productId)) {
  favs = favs.filter(id => id !== productId);
  el?.classList.remove('active');
  el && (el.innerHTML = '');
 } else {
  favs.push(productId);
  el?.classList.add('active');
  el && (el.innerHTML = '♥');
 }
 localStorage.setItem('needway_favs', JSON.stringify(favs));
}

// ── Search ──
function initSearch() {
 const input = document.getElementById('searchInput');
 const dropdown = document.getElementById('searchDropdown');
 if (!input || !dropdown) return;

 let debounceTimer;
 input.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
   const query = input.value.trim();
   if (query.length < 2) {
    dropdown.classList.remove('active');
    return;
   }
   const results = searchProducts(query).slice(0, 5);
   if (results.length === 0) {
    dropdown.innerHTML = '<div style="padding: var(--space-md); color: var(--text-muted); text-align: center;">Nenhum resultado encontrado</div>';
   } else {
    dropdown.innerHTML = results.map(p => `
   <a href="produto.html?id=${p.id}" class="search-dropdown__item">
   <div style="width:48px;height:48px;background:var(--bg-surface-alt);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5"><path d="M7 8V6a2 2 0 012-2h6a2 2 0 012 2v2M5 8h14v12a2 2 0 01-2 2H7a2 2 0 01-2-2V8z"/><rect x="9" y="12" width="6" height="4" rx="1"/></svg>
   </div>
   <div class="search-dropdown__item-info">
    <div class="search-dropdown__item-name">${p.name}</div>
    <div class="search-dropdown__item-price">${formatPrice(p.price)}</div>
   </div>
   </a>
  `).join('');
   }
   dropdown.classList.add('active');
  }, 300);
 });

 // Close on outside click
 document.addEventListener('click', (e) => {
  if (!input.contains(e.target) && !dropdown.contains(e.target)) {
   dropdown.classList.remove('active');
  }
 });

 // Enter to search page
 input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
   const query = input.value.trim();
   if (query) window.location.href = `busca.html?q=${encodeURIComponent(query)}`;
  }
 });
}
