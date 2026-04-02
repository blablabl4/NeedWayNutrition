// ===================================
// Needway Nutrition — Cart Module
// localStorage-based cart management
// ===================================

const Cart = {
 KEY: 'needway_cart',

 getItems() {
  try {
   return JSON.parse(localStorage.getItem(this.KEY)) || [];
  } catch { return []; }
 },

 saveItems(items) {
  localStorage.setItem(this.KEY, JSON.stringify(items));
  this.updateUI();
  this.dispatchEvent();
 },

 addItem(productId, quantity = 1, flavor = '', size = '') {
  const items = this.getItems();
  const key = `${productId}_${flavor}_${size}`;
  const existing = items.find(i => i.key === key);

  if (existing) {
   existing.quantity += quantity;
  } else {
   const product = NeedwayData.products.find(p => p.id === productId);
   if (!product) return false;
   items.push({
    key,
    productId,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    flavor,
    size,
    quantity,
    image: product.images[0] || '',
    slug: product.slug,
    stock: product.stock,
   });
  }

  this.saveItems(items);
  this.showToast(`${NeedwayData.products.find(p => p.id === productId)?.name} adicionado ao carrinho!`);
  return true;
 },

 removeItem(key) {
  const items = this.getItems().filter(i => i.key !== key);
  this.saveItems(items);
 },

 updateQuantity(key, quantity) {
  const items = this.getItems();
  const item = items.find(i => i.key === key);
  if (item) {
   item.quantity = Math.max(1, Math.min(quantity, item.stock || 99));
   this.saveItems(items);
  }
 },

 clear() {
  localStorage.removeItem(this.KEY);
  this.updateUI();
  this.dispatchEvent();
 },

 getTotal() {
  return this.getItems().reduce((sum, item) => sum + (item.price * item.quantity), 0);
 },

 getCount() {
  return this.getItems().reduce((count, item) => count + item.quantity, 0);
 },

 getPixTotal() {
  return this.getTotal() * (1 - NeedwayData.config.pixDiscount);
 },

 getFreeShippingRemaining() {
  const remaining = NeedwayData.config.freeShippingMin - this.getTotal();
  return remaining > 0 ? remaining : 0;
 },

 getFreeShippingProgress() {
  const total = this.getTotal();
  const min = NeedwayData.config.freeShippingMin;
  return Math.min(100, (total / min) * 100);
 },

 applyCoupon(code) {
  const coupon = NeedwayData.coupons.find(c => c.code.toUpperCase() === code.toUpperCase());
  if (!coupon) return { success: false, message: 'Cupom inválido' };
  if (coupon.minOrder > 0 && this.getTotal() < coupon.minOrder) {
   return { success: false, message: `Pedido mínimo de ${formatPrice(coupon.minOrder)}` };
  }
  return { success: true, coupon, message: coupon.description };
 },

 getCouponDiscount(coupon) {
  if (!coupon) return 0;
  if (coupon.type === 'percent') return this.getTotal() * (coupon.value / 100);
  if (coupon.type === 'fixed') return coupon.value;
  if (coupon.type === 'shipping') return 0; // handled separately
  return 0;
 },

 // UI Updates
 updateUI() {
  const count = this.getCount();
  document.querySelectorAll('.cart-count').forEach(el => {
   el.textContent = count;
   el.style.display = count > 0 ? 'flex' : 'none';
  });

  // Update mini-cart if open
  this.renderMiniCart();
 },

 renderMiniCart() {
  const container = document.getElementById('minicartItems');
  if (!container) return;

  const items = this.getItems();
  const totalEl = document.getElementById('minicartTotal');
  const progressFill = document.getElementById('minicartProgressFill');
  const progressText = document.getElementById('minicartProgressText');

  if (items.length === 0) {
   container.innerHTML = `
  <div class="empty-state" style="padding: var(--space-2xl)">
   <div class="empty-state__icon"></div>
   <div class="empty-state__title">Carrinho vazio</div>
   <div class="empty-state__text">Adicione produtos para começar!</div>
  </div>`;
   if (totalEl) totalEl.textContent = formatPrice(0);
   return;
  }

  container.innerHTML = items.map(item => `
  <div class="minicart__item" data-key="${item.key}">
  <div class="minicart__item-img" style="background: var(--bg-card-dark); display: flex; align-items: center; justify-content: center; font-size: 2rem;"></div>
  <div class="minicart__item-info">
   <div class="minicart__item-name">${item.name}</div>
   <div class="minicart__item-variant">${[item.flavor, item.size].filter(Boolean).join(' · ')}</div>
   <div class="minicart__item-price">${formatPrice(item.price)}</div>
   <div class="flex items-center gap-sm" style="margin-top: 4px;">
   <div class="qty-selector" style="transform: scale(0.85); transform-origin: left;">
    <button class="qty-selector__btn" onclick="Cart.updateQuantity('${item.key}', ${item.quantity - 1})">−</button>
    <input class="qty-selector__input" type="number" value="${item.quantity}" min="1" readonly>
    <button class="qty-selector__btn" onclick="Cart.updateQuantity('${item.key}', ${item.quantity + 1})">+</button>
   </div>
   <button onclick="Cart.removeItem('${item.key}')" style="color: var(--danger); font-size: var(--fs-sm); margin-left: auto;">✕</button>
   </div>
  </div>
  </div>
 `).join('');

  if (totalEl) totalEl.textContent = formatPrice(this.getTotal());
  if (progressFill) progressFill.style.width = this.getFreeShippingProgress() + '%';
  if (progressText) {
   const remaining = this.getFreeShippingRemaining();
   progressText.textContent = remaining > 0
    ? `Falta ${formatPrice(remaining)} para frete grátis! `
    : '🎉 Parabéns! Você ganhou frete grátis!';
  }

  // ── Render Upsell Items ──
  const upsellContainer = document.getElementById('minicartUpsellItems');
  const upsellWrapper = document.getElementById('minicartUpsell');
  if (upsellContainer && upsellWrapper) {
    if (items.length === 0) {
      upsellWrapper.style.display = 'none';
      return;
    }
    
    // Find products not currently in the cart to suggest
    const cartProductIds = items.map(i => i.productId);
    // Prefer smaller/cheaper products like vitamins, shakers if possible (just based on low price for high conversion)
    const suggestions = (NeedwayData.products || [])
      .filter(p => !cartProductIds.includes(p.id) && p.stock > 0)
      .sort((a, b) => a.price - b.price) // Cheapest first
      .slice(0, 4);

    if (suggestions.length > 0) {
      upsellWrapper.style.display = 'block';
      upsellContainer.innerHTML = suggestions.map(s => {
        const flavor = (s.flavors && s.flavors.length > 0) ? s.flavors[0] : '';
        const size = (s.sizes && s.sizes.length > 0) ? s.sizes[0] : '';
        const imgUrl = (s.images && s.images[0]) ? s.images[0] : 'img/produtos/default.jpg';
        return `
        <div style="min-width: 130px; max-width: 130px; background: #25252b; border-radius: 8px; padding: 8px; display: flex; flex-direction: column; scroll-snap-align: start;">
          <div style="width: 100%; aspect-ratio: 1; background: #fff; border-radius: 4px; display: flex; align-items: center; justify-content: center; overflow: hidden; margin-bottom: 6px;">
            <img src="${imgUrl}" alt="${s.name}" style="max-width: 90%; max-height: 90%; object-fit: contain; mix-blend-mode: multiply;">
          </div>
          <div style="font-size: 0.75rem; font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-bottom: 2px;" title="${s.name}">${s.name}</div>
          <div style="color: var(--accent-gold); font-weight: 800; font-size: 0.85rem; margin-bottom: 8px;">${formatPrice(s.price)}</div>
          <button class="btn btn--primary btn--sm" style="padding: 4px; font-size: 0.75rem; width: 100%; border-radius: 4px; border:0; background: var(--primary);" onclick="Cart.addItem(${s.id}, 1, '${flavor}', '${size}')">+ Adicionar</button>
        </div>
        `;
      }).join('');
    } else {
      upsellWrapper.style.display = 'none';
    }
  }
 },

 showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '' : type === 'error' ? '❌' : 'ℹ'}</span> ${message}`;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3500);
 },

 toggleMiniCart() {
  const minicart = document.getElementById('minicart');
  const overlay = document.getElementById('overlay');
  if (!minicart) return;

  const isActive = minicart.classList.contains('active');
  minicart.classList.toggle('active');
  overlay?.classList.toggle('active');
  document.body.classList.toggle('no-scroll', !isActive);

  if (!isActive) this.renderMiniCart();
 },

 dispatchEvent() {
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count: this.getCount(), total: this.getTotal() } }));
 },
};

// Initialize cart UI on load
document.addEventListener('DOMContentLoaded', () => Cart.updateUI());
