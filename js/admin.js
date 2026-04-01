// ===================================
// Needway Nutrition — Admin Panel JS
// Full CMS logic
// ===================================

const ADMIN_KEY = 'needway-admin';
const DEFAULT_PASS = 'needway2026';

// ── Data helpers ──
function getProducts() {
  const override = localStorage.getItem('needway-products-override');
  return override ? JSON.parse(override) : (window.NeedwayData?.products || []);
}
function saveProducts(arr) { localStorage.setItem('needway-products-override', JSON.stringify(arr)); }

function getBanners() {
  const saved = localStorage.getItem('needway-banners');
  return saved ? JSON.parse(saved) : [
    { id: 1, title: 'Performance Sem Limites', subtitle: 'Whey Protein de Alta Performance', ctaText: 'Comprar Agora', ctaLink: 'produto.html?id=1', image: '', bg: '#1a1a2e', active: true },
    { id: 2, title: 'Creatina Pura', subtitle: '100% Monohidratada, Zero Impurezas', ctaText: 'Ver Produto', ctaLink: 'produto.html?id=2', image: '', bg: '#0f1923', active: true },
  ];
}
function saveBanners(arr) { localStorage.setItem('needway-banners', JSON.stringify(arr)); }

function getOrders() { return JSON.parse(localStorage.getItem('needway-orders') || '[]'); }
function saveOrders(arr) { localStorage.setItem('needway-orders', JSON.stringify(arr)); }

function getLeads() { return JSON.parse(localStorage.getItem('needway-leads') || '[]'); }

function getCoupons() {
  const override = localStorage.getItem('needway-coupons-override');
  return override ? JSON.parse(override) : (window.NeedwayData?.coupons || []);
}
function saveCoupons(arr) { localStorage.setItem('needway-coupons-override', JSON.stringify(arr)); }

function getCategories() {
  const override = localStorage.getItem('needway-categories-override');
  return override ? JSON.parse(override) : (window.NeedwayData?.categories || []);
}
function saveCategories(arr) { localStorage.setItem('needway-categories-override', JSON.stringify(arr)); }

function getSettings() { return JSON.parse(localStorage.getItem('needway-settings') || '{}'); }
function saveSettings(obj) { localStorage.setItem('needway-settings', JSON.stringify(obj)); }

function getIntegrations() { return JSON.parse(localStorage.getItem('needway-integrations') || '{}'); }
function saveIntegrations(obj) { localStorage.setItem('needway-integrations', JSON.stringify(obj)); }

// ── Auth ──
function adminLogin() {
  const pass = document.getElementById('adminPassword').value;
  const stored = localStorage.getItem('needway-admin-pass') || DEFAULT_PASS;
  if (pass === stored) {
    localStorage.setItem(ADMIN_KEY, 'true');
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'flex';
    initDashboard();
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
}

function adminLogout() {
  localStorage.removeItem(ADMIN_KEY);
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('adminPassword').value = '';
}

// ── Navigation ──
function showTab(tab, el) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.admin-sidebar__link').forEach(l => l.classList.remove('active'));
  const target = document.getElementById('tab-' + tab);
  if (target) target.classList.add('active');
  if (el) el.classList.add('active');

  // Load tab content
  const loaders = { overview: loadOverview, products: loadProducts, banners: loadBanners, orders: loadOrders, leads: loadLeads, coupons: loadCoupons, categories: loadCategories, integrations: loadIntegrations, settings: loadSettings };
  if (loaders[tab]) loaders[tab]();
}

// ── Format helpers ──
function fmtPrice(v) { return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0); }
function fmtDate(d) { return d ? new Date(d).toLocaleDateString('pt-BR') : '-'; }

// ── Modal helpers ──
function openModal(id) { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

// ── Toast ──
function toast(msg, type = 'success') {
  const t = document.createElement('div');
  t.style.cssText = `position:fixed;bottom:24px;right:24px;z-index:9999;padding:12px 20px;border-radius:8px;font-size:14px;font-weight:600;color:#fff;background:${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};box-shadow:0 8px 24px rgba(0,0,0,0.2);transform:translateY(20px);opacity:0;transition:all 0.3s;`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => { t.style.transform = 'translateY(0)'; t.style.opacity = '1'; }, 10);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3000);
}

// ── Overview ──
function loadOverview() {
  const products = getProducts();
  const orders = getOrders();
  const coupons = getCoupons();
  const leads = getLeads();
  const categories = getCategories();

  document.getElementById('statProducts').textContent = products.length;
  document.getElementById('statOrders').textContent = orders.length;
  document.getElementById('statRevenue').textContent = fmtPrice(orders.reduce((s, o) => s + (o.total || 0), 0));
  document.getElementById('statLeads').textContent = leads.length;

  document.getElementById('adminDate').textContent = new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Low stock alert
  const lowStock = products.filter(p => p.stock < 10);
  const alertEl = document.getElementById('lowStockAlert');
  if (lowStock.length > 0) {
    alertEl.innerHTML = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> ${lowStock.length} produto(s) com estoque baixo: ${lowStock.map(p => `<strong>${p.name}</strong> (${p.stock})`).join(', ')}`;
    alertEl.style.display = 'flex';
  } else {
    alertEl.style.display = 'none';
  }

  // Recent orders
  const recent = orders.slice(-5).reverse();
  document.getElementById('recentOrders').innerHTML = recent.length === 0
    ? '<p class="text-muted">Nenhum pedido ainda.</p>'
    : `<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>#</th><th>Data</th><th>Cliente</th><th>Total</th><th>Status</th></tr></thead><tbody>${recent.map((o, i) => `<tr><td><strong>${o.id || (1000 + i)}</strong></td><td>${fmtDate(o.date)}</td><td>${o.billing?.name || 'Cliente'}</td><td>${fmtPrice(o.total)}</td><td><span class="badge badge--success">${o.status || 'Confirmado'}</span></td></tr>`).join('')}</tbody></table></div>`;
}

// ── Products ──
let editingProductId = null;

function loadProducts() {
  const products = getProducts();
  const q = document.getElementById('productSearch')?.value?.toLowerCase() || '';
  const filtered = products.filter(p => !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));

  document.getElementById('productsTable').innerHTML = filtered.length === 0
    ? `<tr><td colspan="8" style="text-align:center;padding:var(--space-2xl);color:var(--text-muted);">Nenhum produto encontrado</td></tr>`
    : filtered.map(p => `
    <tr>
      <td>${p.id}</td>
      <td>
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:40px;height:40px;background:var(--bg-darker);border-radius:6px;flex-shrink:0;display:flex;align-items:center;justify-content:center;overflow:hidden;">
            ${p.images?.[0] ? `<img src="${p.images[0]}" style="width:100%;height:100%;object-fit:cover;">` : '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4M4 7l8 4M4 7v10l8 4m0-10v10"/></svg>'}
          </div>
          <div><strong>${p.name}</strong><br><span style="font-size:var(--fs-xs);color:var(--text-muted);">${p.slug}</span></div>
        </div>
      </td>
      <td>${p.category}</td>
      <td>${fmtPrice(p.price)}</td>
      <td><span class="${p.stock < 10 ? 'badge badge--danger' : 'badge badge--success'}">${p.stock}</span></td>
      <td>${(p.badges || []).map(b => `<span class="badge badge--dark" style="margin-right:3px;">${b}</span>`).join('')}</td>
      <td><label class="admin-toggle"><input type="checkbox" ${p.active !== false ? 'checked' : ''} onchange="toggleProductActive(${p.id}, this.checked)"><div class="admin-toggle__track"></div></label></td>
      <td>
        <div class="admin-actions">
          <button class="btn-icon" onclick="editProduct(${p.id})" title="Editar"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
          <button class="btn-icon danger" onclick="deleteProduct(${p.id})" title="Excluir"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg></button>
        </div>
      </td>
    </tr>`).join('');
}

function toggleProductActive(id, active) {
  const products = getProducts();
  const p = products.find(x => x.id === id);
  if (p) { p.active = active; saveProducts(products); toast(active ? 'Produto ativado' : 'Produto desativado'); }
}

function editProduct(id) {
  const products = getProducts();
  const p = products.find(x => x.id === id);
  if (!p) return;
  editingProductId = id;
  fillProductForm(p);
  openModal('productModal');
}

function newProduct() {
  editingProductId = null;
  fillProductForm({});
  document.getElementById('productModalTitle').textContent = 'Novo Produto';
  openModal('productModal');
}

function fillProductForm(p) {
  document.getElementById('productModalTitle').textContent = p.id ? 'Editar Produto' : 'Novo Produto';
  document.getElementById('pName').value = p.name || '';
  document.getElementById('pSlug').value = p.slug || '';
  document.getElementById('pBrand').value = p.brand || 'Needway Nutrition';
  document.getElementById('pCategory').value = p.category || '';
  document.getElementById('pPrice').value = p.price || '';
  document.getElementById('pOriginalPrice').value = p.originalPrice || '';
  document.getElementById('pStock').value = p.stock || '';
  document.getElementById('pSold').value = p.sold || '';
  document.getElementById('pRating').value = p.rating || '';
  document.getElementById('pReviews').value = p.reviewCount || '';
  document.getElementById('pDescription').value = p.description || '';
  document.getElementById('pImageMain').value = p.images?.[0] || '';
  document.getElementById('pIsNew').checked = p.isNew || false;
  document.getElementById('pIsOutlet').checked = p.isOutlet || false;

  // Nutrition
  const n = p.nutritionTable || {};
  ['calories','protein','carbs','fat','sodium'].forEach(k => {
    const el = document.getElementById('pNut_' + k);
    if (el) el.value = n[k] || '';
  });

  // Tags (flavors)
  renderTags('flavorsTags', 'flavorsInput', p.flavors || []);
  renderTags('sizesTags', 'sizesInput', p.sizes || []);
  renderTags('badgesTags', 'badgesInput', p.badges || []);
  renderTags('tagsTags', 'tagsInput', p.tags || []);

  // Image preview
  const preview = document.getElementById('pImagePreview');
  preview.innerHTML = p.images ? p.images.map(img => `<img src="${img}" class="img-preview" onerror="this.style.display='none'">`).join('') : '';
  document.getElementById('pImages').value = (p.images || []).join('\n');
}

function saveProduct() {
  const products = getProducts();
  const p = editingProductId ? products.find(x => x.id === editingProductId) : {};

  p.name = document.getElementById('pName').value;
  p.slug = document.getElementById('pSlug').value || p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  p.brand = document.getElementById('pBrand').value;
  p.category = document.getElementById('pCategory').value;
  p.price = parseFloat(document.getElementById('pPrice').value) || 0;
  p.originalPrice = parseFloat(document.getElementById('pOriginalPrice').value) || p.price;
  p.discount = p.originalPrice > p.price ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
  p.stock = parseInt(document.getElementById('pStock').value) || 0;
  p.sold = parseInt(document.getElementById('pSold').value) || 0;
  p.rating = parseFloat(document.getElementById('pRating').value) || 5.0;
  p.reviewCount = parseInt(document.getElementById('pReviews').value) || 0;
  p.description = document.getElementById('pDescription').value;
  p.isNew = document.getElementById('pIsNew').checked;
  p.isOutlet = document.getElementById('pIsOutlet').checked;
  p.active = true;

  // Images
  const imgs = document.getElementById('pImages').value.split('\n').map(s => s.trim()).filter(Boolean);
  p.images = imgs;

  // Nutrition
  p.nutritionTable = {};
  ['calories','protein','carbs','fat','sodium'].forEach(k => {
    const el = document.getElementById('pNut_' + k);
    if (el && el.value) p.nutritionTable[k] = el.value;
  });

  // Tags from rendered tags
  p.flavors = getTagValues('flavorsContainer');
  p.sizes = getTagValues('sizesContainer');
  p.badges = getTagValues('badgesContainer');
  p.tags = getTagValues('tagsContainer');

  if (!p.name) { toast('Nome do produto é obrigatório', 'error'); return; }

  if (editingProductId) {
    const idx = products.findIndex(x => x.id === editingProductId);
    products[idx] = p;
  } else {
    p.id = Date.now();
    products.push(p);
  }

  saveProducts(products);
  closeModal('productModal');
  loadProducts();
  toast(editingProductId ? 'Produto atualizado!' : 'Produto criado!');
}

function deleteProduct(id) {
  if (!confirm('Excluir este produto?')) return;
  const products = getProducts().filter(p => p.id !== id);
  saveProducts(products);
  loadProducts();
  toast('Produto excluído');
}

// ── Tag management ──
function renderTags(containerId, inputId, values) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = values.map(v => `<span class="tag-item">${v}<button onclick="removeTag(this, '${containerId}', '${inputId}')" type="button">×</button></span>`).join('');
}

function addTag(containerId, inputId) {
  const input = document.getElementById(inputId);
  const val = input.value.trim();
  if (!val) return;
  const container = document.getElementById(containerId);
  const span = document.createElement('span');
  span.className = 'tag-item';
  span.innerHTML = `${val}<button onclick="removeTag(this, '${containerId}', '${inputId}')" type="button">×</button>`;
  container.appendChild(span);
  input.value = '';
}

function removeTag(btn, containerId, inputId) { btn.parentElement.remove(); }

function getTagValues(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return [];
  return Array.from(container.querySelectorAll('.tag-item')).map(el => el.childNodes[0].textContent.trim());
}

// ── Banners ──
function loadBanners() {
  const banners = getBanners();
  const container = document.getElementById('bannersContainer');
  container.innerHTML = banners.length === 0
    ? '<div class="admin-empty"><p>Nenhum banner cadastrado.</p></div>'
    : banners.map(b => `
    <div class="banner-card">
      <div class="banner-card__preview" style="background:${b.bg || '#111'};">
        ${b.image ? `<img src="${b.image}" style="width:100%;height:100%;object-fit:cover;">` : `<span>Sem imagem</span>`}
      </div>
      <div class="banner-card__info">
        <div class="banner-card__title">${b.title || 'Sem título'}</div>
        <div class="banner-card__sub">${b.subtitle || ''} &mdash; CTA: <em>${b.ctaText || ''}</em></div>
        <div style="margin-top:6px;font-size:var(--fs-xs);color:var(--text-muted);">Link: ${b.ctaLink || '-'}</div>
      </div>
      <div class="banner-card__actions">
        <label class="admin-toggle" title="${b.active ? 'Ativo' : 'Inativo'}">
          <input type="checkbox" ${b.active ? 'checked' : ''} onchange="toggleBanner(${b.id}, this.checked)">
          <div class="admin-toggle__track"></div>
        </label>
        <button class="btn-icon" onclick="editBanner(${b.id})"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
        <button class="btn-icon danger" onclick="deleteBanner(${b.id})"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg></button>
      </div>
    </div>`).join('');
}

let editingBannerId = null;

function newBanner() { editingBannerId = null; clearBannerForm(); openModal('bannerModal'); }

function editBanner(id) {
  const b = getBanners().find(x => x.id === id);
  if (!b) return;
  editingBannerId = id;
  document.getElementById('bTitle').value = b.title || '';
  document.getElementById('bSubtitle').value = b.subtitle || '';
  document.getElementById('bCtaText').value = b.ctaText || '';
  document.getElementById('bCtaLink').value = b.ctaLink || '';
  document.getElementById('bImage').value = b.image || '';
  document.getElementById('bBg').value = b.bg || '#1a1a2e';
  openModal('bannerModal');
}

function clearBannerForm() {
  ['bTitle','bSubtitle','bCtaText','bCtaLink','bImage'].forEach(id => { const el = document.getElementById(id); if(el) el.value = ''; });
  const bg = document.getElementById('bBg'); if (bg) bg.value = '#1a1a2e';
}

function saveBanner() {
  const banners = getBanners();
  const b = editingBannerId ? banners.find(x => x.id === editingBannerId) : {};
  b.title = document.getElementById('bTitle').value;
  b.subtitle = document.getElementById('bSubtitle').value;
  b.ctaText = document.getElementById('bCtaText').value;
  b.ctaLink = document.getElementById('bCtaLink').value;
  b.image = document.getElementById('bImage').value;
  b.bg = document.getElementById('bBg').value;
  if (editingBannerId) { const idx = banners.findIndex(x => x.id === editingBannerId); banners[idx] = b; }
  else { b.id = Date.now(); b.active = true; banners.push(b); }
  saveBanners(banners);
  closeModal('bannerModal');
  loadBanners();
  toast(editingBannerId ? 'Banner atualizado!' : 'Banner criado!');
}

function toggleBanner(id, active) {
  const banners = getBanners();
  const b = banners.find(x => x.id === id);
  if (b) { b.active = active; saveBanners(banners); toast(active ? 'Banner ativado' : 'Banner desativado'); }
}

function deleteBanner(id) {
  if (!confirm('Excluir este banner?')) return;
  saveBanners(getBanners().filter(b => b.id !== id));
  loadBanners();
  toast('Banner excluído');
}

// ── Orders ──
function loadOrders() {
  const orders = getOrders().slice().reverse();
  const q = document.getElementById('orderSearch')?.value?.toLowerCase() || '';
  const filtered = orders.filter(o => !q || String(o.id).includes(q) || (o.billing?.name || '').toLowerCase().includes(q));

  document.getElementById('ordersTable').innerHTML = filtered.length === 0
    ? `<tr><td colspan="7" style="text-align:center;padding:var(--space-2xl);color:var(--text-muted);">Nenhum pedido encontrado</td></tr>`
    : filtered.map((o, i) => {
      const statusColors = { 'Confirmado':'success', 'Em Separação':'primary', 'Enviado':'primary', 'Entregue':'success', 'Cancelado':'danger' };
      const s = o.status || 'Confirmado';
      return `<tr>
        <td><strong>#${o.id || (1000+i)}</strong></td>
        <td>${fmtDate(o.date)}</td>
        <td>${o.billing?.name || 'Cliente'}<br><span style="font-size:var(--fs-xs);color:var(--text-muted);">${o.billing?.email || ''}</span></td>
        <td>${(o.items || []).length} item(s)</td>
        <td><strong>${fmtPrice(o.total)}</strong></td>
        <td><span class="badge badge--${statusColors[s] || 'dark'}">${s}</span></td>
        <td>
          <div class="admin-actions">
            <button class="btn-icon" onclick="viewOrder('${o.id}')" title="Ver detalhes"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
            <select style="padding:4px 8px;border:1px solid var(--glass-border);border-radius:var(--radius-sm);background:var(--glass-bg);color:var(--text-light);font-size:var(--fs-xs);cursor:pointer;" onchange="updateOrderStatus('${o.id}', this.value)">
              ${['Confirmado','Em Separação','Enviado','Entregue','Cancelado'].map(st => `<option ${s===st?'selected':''}>${st}</option>`).join('')}
            </select>
          </div>
        </td>
      </tr>`;
    }).join('');
}

function updateOrderStatus(orderId, newStatus) {
  const orders = getOrders();
  const o = orders.find(x => String(x.id) === String(orderId));
  if (o) { o.status = newStatus; saveOrders(orders); toast(`Status atualizado: ${newStatus}`); loadOrders(); }
}

function viewOrder(orderId) {
  const o = getOrders().find(x => String(x.id) === String(orderId));
  if (!o) return;
  const s = o.status || 'Confirmado';
  document.getElementById('orderDetailContent').innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-lg);margin-bottom:var(--space-lg);">
      <div class="settings-section" style="margin:0;"><h3 style="font-size:var(--fs-md);border:none;margin:0 0 var(--space-md);">Cliente</h3>
        <p><strong>${o.billing?.name || '-'}</strong></p>
        <p>${o.billing?.email || ''}</p><p>${o.billing?.phone || ''}</p>
        <p style="margin-top:var(--space-sm);">${o.billing?.address || ''}, ${o.billing?.city || ''} - ${o.billing?.state || ''}<br>${o.billing?.cep || ''}</p>
      </div>
      <div class="settings-section" style="margin:0;"><h3 style="font-size:var(--fs-md);border:none;margin:0 0 var(--space-md);">Pedido</h3>
        <p>ID: <strong>#${o.id}</strong></p>
        <p>Data: ${fmtDate(o.date)}</p>
        <p>Pagamento: ${o.paymentMethod || '-'}</p>
        <p>Status: <span class="badge badge--success">${s}</span></p>
      </div>
    </div>
    <div class="settings-section" style="margin:0;"><h3 style="font-size:var(--fs-md);border:none;margin:0 0 var(--space-md);">Itens</h3>
      <table class="admin-table"><thead><tr><th>Produto</th><th>Variação</th><th>Qtd</th><th>Preço</th><th>Total</th></tr></thead>
      <tbody>${(o.items || []).map(it => `<tr><td>${it.name}</td><td>${it.flavor || '-'} ${it.size || ''}</td><td>${it.qty}</td><td>${fmtPrice(it.price)}</td><td>${fmtPrice(it.price * it.qty)}</td></tr>`).join('')}</tbody>
      </table>
      <div style="display:flex;justify-content:flex-end;margin-top:var(--space-md);gap:var(--space-xl);">
        <span>Subtotal: ${fmtPrice(o.subtotal || o.total)}</span>
        <span>Desconto: ${fmtPrice(o.discount || 0)}</span>
        <span>Frete: ${o.shipping === 0 ? 'Grátis' : fmtPrice(o.shipping || 0)}</span>
        <strong>Total: ${fmtPrice(o.total)}</strong>
      </div>
    </div>
    <div class="settings-section" style="margin:var(--space-md) 0 0;"><h3 style="font-size:var(--fs-md);border:none;margin:0 0 var(--space-md);">Rastreamento</h3>
      <div style="display:flex;gap:var(--space-md);align-items:flex-end;">
        <div class="input-group" style="flex:1;margin:0;"><label>Código de Rastreio</label>
          <input type="text" class="input" id="trackingCode" value="${o.tracking || ''}" placeholder="BR123456789BR">
        </div>
        <button class="btn btn--primary" onclick="saveTracking('${o.id}')">Salvar</button>
      </div>
    </div>`;
  openModal('orderDetailModal');
}

function saveTracking(orderId) {
  const orders = getOrders();
  const o = orders.find(x => String(x.id) === String(orderId));
  if (o) { o.tracking = document.getElementById('trackingCode').value; saveOrders(orders); toast('Código de rastreio salvo!'); }
}

function exportOrdersCSV() {
  const orders = getOrders();
  const rows = [['ID', 'Data', 'Cliente', 'Email', 'Total', 'Status']];
  orders.forEach(o => rows.push([o.id, fmtDate(o.date), o.billing?.name || '', o.billing?.email || '', o.total, o.status || 'Confirmado']));
  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'pedidos-needway.csv'; a.click();
  toast('CSV exportado!');
}

// ── Leads ──
function loadLeads() {
  const leads = getLeads();
  document.getElementById('leadsTable').innerHTML = leads.length === 0
    ? `<tr><td colspan="4" style="text-align:center;padding:var(--space-2xl);color:var(--text-muted);">Nenhum lead capturado ainda.</td></tr>`
    : leads.reverse().map((l, i) => `<tr><td>${leads.length - i}</td><td>${l.email || '-'}</td><td>${l.phone || l.whatsapp || '-'}</td><td>${fmtDate(l.date || l.timestamp)}</td></tr>`).join('');

  document.getElementById('leadsCount').textContent = leads.length + ' leads';
}

function exportLeadsCSV() {
  const leads = getLeads();
  const rows = [['Email', 'Telefone', 'Data']];
  leads.forEach(l => rows.push([l.email || '', l.phone || l.whatsapp || '', fmtDate(l.date || l.timestamp)]));
  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'leads-needway.csv'; a.click();
  toast('Leads exportados!');
}

// ── Coupons ──
let editingCouponId = null;

function loadCoupons() {
  const coupons = getCoupons();
  document.getElementById('couponsTable').innerHTML = coupons.length === 0
    ? `<tr><td colspan="6" style="text-align:center;padding:var(--space-2xl);color:var(--text-muted);">Nenhum cupom</td></tr>`
    : coupons.map(c => `<tr>
      <td><strong>${c.code}</strong></td>
      <td><span class="badge badge--dark">${c.type}</span></td>
      <td>${c.type === 'percent' ? c.value + '%' : c.type === 'shipping' ? 'Frete Grátis' : fmtPrice(c.value)}</td>
      <td>${fmtPrice(c.minOrder || 0)}</td>
      <td>${c.expires || 'Sem validade'}</td>
      <td>
        <div class="admin-actions">
          <button class="btn-icon" onclick="editCoupon('${c.code}')"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
          <button class="btn-icon danger" onclick="deleteCoupon('${c.code}')"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg></button>
        </div>
      </td>
    </tr>`).join('');
}

function newCoupon() { editingCouponId = null; ['cCode','cType','cValue','cMinOrder','cExpires'].forEach(id => { const el = document.getElementById(id); if(el) el.value = ''; }); openModal('couponModal'); }

function editCoupon(code) {
  const c = getCoupons().find(x => x.code === code);
  if (!c) return;
  editingCouponId = code;
  document.getElementById('cCode').value = c.code;
  document.getElementById('cType').value = c.type;
  document.getElementById('cValue').value = c.value;
  document.getElementById('cMinOrder').value = c.minOrder || '';
  document.getElementById('cExpires').value = c.expires || '';
  openModal('couponModal');
}

function saveCoupon() {
  const coupons = getCoupons();
  const code = document.getElementById('cCode').value.toUpperCase().trim();
  if (!code) { toast('Código é obrigatório', 'error'); return; }
  const obj = { code, type: document.getElementById('cType').value, value: parseFloat(document.getElementById('cValue').value) || 0, minOrder: parseFloat(document.getElementById('cMinOrder').value) || 0, expires: document.getElementById('cExpires').value };
  if (editingCouponId) { const idx = coupons.findIndex(x => x.code === editingCouponId); coupons[idx] = obj; }
  else { if (coupons.find(x => x.code === code)) { toast('Código já existe', 'error'); return; } coupons.push(obj); }
  saveCoupons(coupons);
  closeModal('couponModal');
  loadCoupons();
  toast(editingCouponId ? 'Cupom atualizado!' : 'Cupom criado!');
}

function deleteCoupon(code) {
  if (!confirm('Excluir cupom ' + code + '?')) return;
  saveCoupons(getCoupons().filter(c => c.code !== code));
  loadCoupons();
  toast('Cupom excluído');
}

// ── Categories ──
let editingCategoryId = null;

function loadCategories() {
  const cats = getCategories();
  document.getElementById('categoriesTable').innerHTML = cats.length === 0
    ? `<tr><td colspan="5" style="text-align:center;padding:var(--space-2xl);color:var(--text-muted);">Nenhuma categoria</td></tr>`
    : cats.map(c => `<tr>
      <td><strong>${c.name}</strong></td>
      <td><code style="font-size:var(--fs-xs);background:var(--bg-darker);padding:2px 6px;border-radius:4px;">${c.slug}</code></td>
      <td>${c.count || 0} produtos</td>
      <td><label class="admin-toggle"><input type="checkbox" ${c.active !== false ? 'checked' : ''} onchange="toggleCategory('${c.id}',this.checked)"><div class="admin-toggle__track"></div></label></td>
      <td>
        <div class="admin-actions">
          <button class="btn-icon" onclick="editCategory('${c.id}')"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
          <button class="btn-icon danger" onclick="deleteCategory('${c.id}')"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg></button>
        </div>
      </td>
    </tr>`).join('');
}

function newCategory() { editingCategoryId = null; ['catId','catName','catSlug','catImage'].forEach(id => { const el = document.getElementById(id); if(el) el.value = ''; }); openModal('categoryModal'); }

function editCategory(id) {
  const c = getCategories().find(x => x.id === id);
  if (!c) return;
  editingCategoryId = id;
  document.getElementById('catId').value = c.id;
  document.getElementById('catName').value = c.name;
  document.getElementById('catSlug').value = c.slug;
  document.getElementById('catImage').value = c.image || '';
  openModal('categoryModal');
}

function saveCategory() {
  const cats = getCategories();
  const name = document.getElementById('catName').value.trim();
  if (!name) { toast('Nome é obrigatório', 'error'); return; }
  const id = editingCategoryId || document.getElementById('catId').value || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const obj = { id, name, slug: document.getElementById('catSlug').value || id, image: document.getElementById('catImage').value, active: true, count: 0 };
  if (editingCategoryId) { const idx = cats.findIndex(x => x.id === editingCategoryId); cats[idx] = { ...cats[idx], ...obj }; }
  else cats.push(obj);
  saveCategories(cats);
  closeModal('categoryModal');
  loadCategories();
  toast(editingCategoryId ? 'Categoria atualizada!' : 'Categoria criada!');
}

function toggleCategory(id, active) {
  const cats = getCategories();
  const c = cats.find(x => x.id === id);
  if (c) { c.active = active; saveCategories(cats); toast(active ? 'Categoria ativada' : 'Categoria desativada'); }
}

function deleteCategory(id) {
  if (!confirm('Excluir esta categoria?')) return;
  saveCategories(getCategories().filter(c => c.id !== id));
  loadCategories();
  toast('Categoria excluída');
}

// ── Integrations ──
function loadIntegrations() {
  const integ = getIntegrations();

  // Mercado Pago
  document.getElementById('mpAccessToken').value = integ.mpAccessToken || '';
  document.getElementById('mpPublicKey').value = integ.mpPublicKey || '';
  document.getElementById('mpWebhookUrl').value = window.location.origin + '/webhook/mercadopago';

  // Bling
  document.getElementById('blingToken').value = integ.blingToken || '';
  document.getElementById('blingSyncStock').checked = integ.blingSyncStock || false;
  document.getElementById('blingImportOrders').checked = integ.blingImportOrders || false;

  // Status indicators
  updateIntegrationStatus('mp', integ.mpAccessToken ? 'connected' : 'disconnected');
  updateIntegrationStatus('bling', integ.blingToken ? 'connected' : 'disconnected');
}

function updateIntegrationStatus(key, status) {
  const dot = document.getElementById(key + 'StatusDot');
  const text = document.getElementById(key + 'StatusText');
  if (!dot || !text) return;
  dot.className = 'status-dot ' + (status === 'connected' ? 'connected' : '');
  text.textContent = status === 'connected' ? 'Conectado' : 'Não configurado';
}

function saveMPIntegration() {
  const integ = getIntegrations();
  integ.mpAccessToken = document.getElementById('mpAccessToken').value;
  integ.mpPublicKey = document.getElementById('mpPublicKey').value;
  saveIntegrations(integ);
  updateIntegrationStatus('mp', integ.mpAccessToken ? 'connected' : 'disconnected');
  toast('Configurações Mercado Pago salvas!');
}

function saveBlingIntegration() {
  const integ = getIntegrations();
  integ.blingToken = document.getElementById('blingToken').value;
  integ.blingSyncStock = document.getElementById('blingSyncStock').checked;
  integ.blingImportOrders = document.getElementById('blingImportOrders').checked;
  saveIntegrations(integ);
  updateIntegrationStatus('bling', integ.blingToken ? 'connected' : 'disconnected');
  toast('Configurações Bling salvas!');
}

// ── Settings ──
function loadSettings() {
  const s = getSettings();
  document.getElementById('cfgStoreName').value = s.storeName || 'Needway Nutrition';
  document.getElementById('cfgEmail').value = s.email || '';
  document.getElementById('cfgWhatsApp').value = s.whatsapp || '+55 11 97079-9084';
  document.getElementById('cfgPix').value = s.pixDiscount ?? 10;
  document.getElementById('cfgFreeShipping').value = s.freeShippingMin ?? 250;
  document.getElementById('cfgInstallments').value = s.maxInstallments ?? 6;
  document.getElementById('cfgMetaPixel').value = s.metaPixel || '';
  document.getElementById('cfgGoogleAnalytics').value = s.googleAnalytics || '';
  document.getElementById('cfgLeadPopup').checked = s.leadPopup !== false;
  document.getElementById('cfgLeadDelay').value = s.leadDelay ?? 3;
  document.getElementById('cfgMaintenance').checked = s.maintenance || false;
}

function saveGeneralSettings() {
  const s = getSettings();
  s.storeName = document.getElementById('cfgStoreName').value;
  s.email = document.getElementById('cfgEmail').value;
  s.whatsapp = document.getElementById('cfgWhatsApp').value;
  s.pixDiscount = parseFloat(document.getElementById('cfgPix').value) || 10;
  s.freeShippingMin = parseFloat(document.getElementById('cfgFreeShipping').value) || 250;
  s.maxInstallments = parseInt(document.getElementById('cfgInstallments').value) || 6;
  s.metaPixel = document.getElementById('cfgMetaPixel').value;
  s.googleAnalytics = document.getElementById('cfgGoogleAnalytics').value;
  s.leadPopup = document.getElementById('cfgLeadPopup').checked;
  s.leadDelay = parseInt(document.getElementById('cfgLeadDelay').value) || 3;
  s.maintenance = document.getElementById('cfgMaintenance').checked;
  saveSettings(s);
  toast('Configurações salvas!');
}

function saveAdminPassword() {
  const newPass = document.getElementById('cfgNewPassword').value;
  const confirm = document.getElementById('cfgConfirmPassword').value;
  if (!newPass) { toast('Digite a nova senha', 'error'); return; }
  if (newPass !== confirm) { toast('As senhas não coincidem', 'error'); return; }
  localStorage.setItem('needway-admin-pass', newPass);
  document.getElementById('cfgNewPassword').value = '';
  document.getElementById('cfgConfirmPassword').value = '';
  toast('Senha alterada com sucesso!');
}

// ── Init ──
function initDashboard() { showTab('overview', document.querySelector('.admin-sidebar__link')); }

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem(ADMIN_KEY) === 'true') {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'flex';
    initDashboard();
  }
  // Enter key on login
  document.getElementById('adminPassword')?.addEventListener('keydown', e => { if (e.key === 'Enter') adminLogin(); });
});

// Close modal on overlay click
document.addEventListener('click', e => {
  if (e.target.classList.contains('admin-modal-overlay')) {
    e.target.classList.remove('open');
  }
});
