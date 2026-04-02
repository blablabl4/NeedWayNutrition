// ===================================
// Needway Nutrition — Admin Panel JS
// ===================================

const ADMIN_KEY = 'needway-admin';
const DEFAULT_PASS = 'needway2026';

// ── Estado de edição ──
let productImages = [null, null, null];
let categoryImageData = null;
let bannerImageData = null;

// ── Dados ──
function getNeedwayData() {
  try { return typeof NeedwayData !== 'undefined' ? NeedwayData : null; } catch(e) { return null; }
}
function getProducts() {
  const o = localStorage.getItem('needway-products-override');
  if (o) return JSON.parse(o);
  return getNeedwayData()?.products || [];
}
function saveProducts(arr) { localStorage.setItem('needway-products-override', JSON.stringify(arr)); }

function getBanners() {
  const s = localStorage.getItem('needway-banners');
  return s ? JSON.parse(s) : [
    { id: 1, title: 'Performance Sem Limites', subtitle: 'Whey Protein de Alta Performance', ctaText: 'Comprar Agora', ctaLink: 'produto.html?id=1', image: '', bg: '#1a1a2e', active: true },
    { id: 2, title: 'Creatina Pura', subtitle: '100% Monohidratada, Zero Impurezas', ctaText: 'Ver Produto', ctaLink: 'produto.html?id=2', image: '', bg: '#0f1923', active: true },
  ];
}
function saveBanners(arr) { localStorage.setItem('needway-banners', JSON.stringify(arr)); }
function getOrders() { return JSON.parse(localStorage.getItem('needway-orders') || '[]'); }
function saveOrders(arr) { localStorage.setItem('needway-orders', JSON.stringify(arr)); }
function getLeads() { return JSON.parse(localStorage.getItem('needway-leads') || '[]'); }
function getCoupons() {
  const o = localStorage.getItem('needway-coupons-override');
  if (o) return JSON.parse(o);
  return getNeedwayData()?.coupons || [];
}
function saveCoupons(arr) { localStorage.setItem('needway-coupons-override', JSON.stringify(arr)); }
function getCategories() {
  const o = localStorage.getItem('needway-categories-override');
  if (o) return JSON.parse(o);
  return getNeedwayData()?.categories || [];
}
function saveCategories(arr) { localStorage.setItem('needway-categories-override', JSON.stringify(arr)); }
function getSettings() { return JSON.parse(localStorage.getItem('needway-settings') || '{}'); }
function saveSettings(obj) { localStorage.setItem('needway-settings', JSON.stringify(obj)); }
function getIntegrations() { return JSON.parse(localStorage.getItem('needway-integrations') || '{}'); }
function saveIntegrations(obj) { localStorage.setItem('needway-integrations', JSON.stringify(obj)); }

// ── Compressão de imagem (upload real via FileReader + Canvas) ──
function compressImage(file, maxDim, quality) {
  maxDim = maxDim || 1200; quality = quality || 0.82;
  return new Promise(function(resolve, reject) {
    if (!file || !file.type.startsWith('image/')) { reject('Arquivo inválido'); return; }
    var r = new FileReader();
    r.onerror = function() { reject('Erro ao ler arquivo'); };
    r.onload = function(e) {
      var img = new Image();
      img.onerror = function() { reject('Erro ao processar imagem'); };
      img.onload = function() {
        var scale = Math.min(1, maxDim / Math.max(img.width, img.height, 1));
        var w = Math.round(img.width * scale), h = Math.round(img.height * scale);
        var c = document.createElement('canvas');
        c.width = w; c.height = h;
        c.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(c.toDataURL('image/jpeg', quality));
      };
      img.src = e.target.result;
    };
    r.readAsDataURL(file);
  });
}

async function handleProductImage(slot, file) {
  if (!file) return;
  try {
    const url = await compressImage(file);
    productImages[slot] = url;
    const img = document.getElementById('pImg' + slot + 'Preview');
    const ph = document.getElementById('pImg' + slot + 'Placeholder');
    const zone = document.getElementById('pImg' + slot + 'Zone');
    if (img) { img.src = url; }
    if (zone) zone.classList.add('has-image');
    if (ph) ph.style.display = 'none';
  } catch(e) { toast('Erro ao carregar a foto', 'error'); }
}

function loadProductImageSlot(slot, url) {
  productImages[slot] = url || null;
  const img = document.getElementById('pImg' + slot + 'Preview');
  const ph = document.getElementById('pImg' + slot + 'Placeholder');
  const zone = document.getElementById('pImg' + slot + 'Zone');
  if (url && img) { img.src = url; }
  if (zone) zone.classList.toggle('has-image', !!url);
  if (ph) ph.style.display = url ? 'none' : 'flex';
}

function removeProductImage(event, slot) {
  event.stopPropagation();
  productImages[slot] = null;
  const zone = document.getElementById('pImg' + slot + 'Zone');
  if (zone) {
    const input = zone.querySelector('input[type="file"]');
    if (input) input.value = '';
  }
  loadProductImageSlot(slot, null);
  toast('Imagem removida do painel', 'info');
}

async function handleCategoryImage(file) {
  if (!file) return;
  try {
    categoryImageData = await compressImage(file, 800);
    const prev = document.getElementById('catImagePreview');
    const ph = document.getElementById('catUploadPlaceholder');
    const zone = document.getElementById('catUploadZone');
    if (prev) prev.src = categoryImageData;
    if (zone) zone.classList.add('has-image');
    if (ph) ph.style.display = 'none';
  } catch(e) { toast('Erro ao carregar a foto', 'error'); }
}

async function handleBannerImage(file) {
  if (!file) return;
  try {
    bannerImageData = await compressImage(file, 1600, 0.85);
    const prev = document.getElementById('bImagePreview');
    const ph = document.getElementById('bUploadPlaceholder');
    const zone = document.getElementById('bUploadZone');
    if (prev) prev.src = bannerImageData;
    if (zone) zone.classList.add('has-image');
    if (ph) ph.style.display = 'none';
  } catch(e) { toast('Erro ao carregar a foto', 'error'); }
}

// ── Tags simples (digitar + Enter) ──
function addSimpleTag(event, containerId) {
  if (event.key !== 'Enter' && event.key !== ',') return;
  event.preventDefault();
  const input = event.target;
  const val = input.value.trim().replace(/,$/, '');
  if (!val) return;
  const tag = document.createElement('span');
  tag.className = 'stag';
  tag.dataset.value = val;
  tag.innerHTML = val + ' <button class="stag-remove" type="button" title="Remover" onclick="this.parentElement.remove()">×</button>';
  input.parentElement.insertBefore(tag, input);
  input.value = '';
}

function getSimpleTags(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return [];
  return Array.from(el.querySelectorAll('.stag')).map(t => t.dataset.value || t.childNodes[0].textContent.trim());
}

function setSimpleTags(containerId, values) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const input = el.querySelector('input');
  el.querySelectorAll('.stag').forEach(t => t.remove());
  (values || []).forEach(val => {
    const tag = document.createElement('span');
    tag.className = 'stag';
    tag.dataset.value = val;
    tag.innerHTML = val + ' <button class="stag-remove" type="button" title="Remover" onclick="this.parentElement.remove()">×</button>';
    el.insertBefore(tag, input);
  });
}

// ── Pills (checkboxes visuais) ──
function getPillValues(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return [];
  return Array.from(el.querySelectorAll('input:checked')).map(i => i.value);
}

function setPillValues(containerId, values) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.querySelectorAll('input').forEach(inp => {
    inp.checked = values && values.includes(inp.value);
    inp.closest('.pill-option')?.classList.toggle('selected', inp.checked);
  });
}

function initPillSelects() {
  document.querySelectorAll('.pill-option input[type="checkbox"]').forEach(inp => {
    inp.addEventListener('change', () => {
      inp.closest('.pill-option')?.classList.toggle('selected', inp.checked);
    });
  });
}

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

// ── Navegação ──
function showTab(tab, el) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.admin-sidebar__link').forEach(l => l.classList.remove('active'));
  const target = document.getElementById('tab-' + tab);
  if (target) target.classList.add('active');
  if (el) el.classList.add('active');
  const loaders = { overview: loadOverview, products: loadProducts, banners: loadBanners, orders: loadOrders, leads: loadLeads, coupons: loadCoupons, categories: loadCategories, integrations: loadIntegrations, settings: loadSettings };
  if (loaders[tab]) loaders[tab]();
}

function fmtPrice(v) { return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0); }
function fmtDate(d) { return d ? new Date(d).toLocaleDateString('pt-BR') : '-'; }
function openModal(id) { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

function toast(msg, type) {
  type = type || 'success';
  const colors = { success: '#22c55e', error: '#ef4444', info: '#3b82f6' };
  const t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;padding:12px 20px;border-radius:8px;font-size:14px;font-weight:600;color:#fff;background:' + (colors[type]||colors.info) + ';box-shadow:0 8px 24px rgba(0,0,0,0.2);transform:translateY(20px);opacity:0;transition:all 0.3s;max-width:360px;';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(function() { t.style.transform = 'translateY(0)'; t.style.opacity = '1'; }, 10);
  setTimeout(function() { t.style.opacity = '0'; setTimeout(function() { t.remove(); }, 300); }, 3000);
}

// ── Overview ──
function loadOverview() {
  const products = getProducts();
  const orders = getOrders();
  const leads = getLeads();
  document.getElementById('statProducts').textContent = products.length;
  document.getElementById('statOrders').textContent = orders.length;
  document.getElementById('statRevenue').textContent = fmtPrice(orders.reduce(function(s,o){ return s + (o.total||0); }, 0));
  document.getElementById('statLeads').textContent = leads.length;
  document.getElementById('adminDate').textContent = new Date().toLocaleDateString('pt-BR', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  const lowStock = products.filter(function(p){ return p.stock < 10; });
  const alertEl = document.getElementById('lowStockAlert');
  if (lowStock.length > 0) {
    alertEl.style.display = 'flex';
    alertEl.innerHTML = '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> ' + lowStock.length + ' produto(s) com pouco estoque: ' + lowStock.map(function(p){ return '<strong>' + p.name + '</strong> (' + p.stock + ' un.)'; }).join(', ');
  } else {
    alertEl.style.display = 'none';
  }
  const recent = orders.slice(-5).reverse();
  document.getElementById('recentOrders').innerHTML = recent.length === 0
    ? '<p class="text-muted">Nenhum pedido ainda.</p>'
    : '<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>#</th><th>Data</th><th>Cliente</th><th>Total</th><th>Status</th></tr></thead><tbody>' + recent.map(function(o,i){ return '<tr><td><strong>' + (o.id||(1000+i)) + '</strong></td><td>' + fmtDate(o.date) + '</td><td>' + (o.billing&&o.billing.name||'Cliente') + '</td><td>' + fmtPrice(o.total) + '</td><td><span class="badge badge--success">' + (o.status||'Confirmado') + '</span></td></tr>'; }).join('') + '</tbody></table></div>';
}

// ── Produtos ──
let editingProductId = null;

function loadProducts() {
  const products = getProducts();
  const q = (document.getElementById('productSearch')?.value||'').toLowerCase();
  const filtered = products.filter(function(p){ return !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q); });
  document.getElementById('productsTable').innerHTML = filtered.length === 0
    ? '<tr><td colspan="8" style="text-align:center;padding:var(--space-2xl);color:var(--text-muted);">Nenhum produto encontrado</td></tr>'
    : filtered.map(function(p){ return '<tr><td>' + p.id + '</td><td><div style="display:flex;align-items:center;gap:10px;"><div style="width:44px;height:44px;background:var(--bg-darker);border-radius:6px;flex-shrink:0;overflow:hidden;display:flex;align-items:center;justify-content:center;">' + (p.images&&p.images[0] ? '<img src="'+p.images[0]+'" style="width:100%;height:100%;object-fit:cover;">' : '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4M4 7l8 4M4 7v10l8 4m0-10v10"/></svg>') + '</div><div><strong>' + p.name + '</strong><br><span style="font-size:var(--fs-xs);color:var(--text-muted);">' + p.category + '</span></div></div></td><td>' + p.category + '</td><td>' + fmtPrice(p.price) + '</td><td><span class="' + (p.stock < 10 ? 'badge badge--danger' : 'badge badge--success') + '">' + p.stock + '</span></td><td>' + (p.badges||[]).map(function(b){ return '<span class="badge badge--dark" style="margin-right:3px;">' + b + '</span>'; }).join('') + '</td><td><label class="admin-toggle"><input type="checkbox" ' + (p.active!==false?'checked':'') + ' onchange="toggleProductActive(' + p.id + ',this.checked)"><div class="admin-toggle__track"></div></label></td><td><div class="admin-actions"><button class="btn-icon" onclick="editProduct(' + p.id + ')" title="Editar"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button><button class="btn-icon danger" onclick="deleteProduct(' + p.id + ')" title="Excluir"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg></button></div></td></tr>'; }).join('');
}

function toggleProductActive(id, active) {
  const products = getProducts();
  const p = products.find(function(x){ return x.id === id; });
  if (p) { p.active = active; saveProducts(products); toast(active ? 'Produto ativado' : 'Produto desativado'); }
}

function newProduct() {
  editingProductId = null;
  productImages = [null, null, null];
  fillProductForm({});
  openModal('productModal');
}

function editProduct(id) {
  const p = getProducts().find(function(x){ return x.id === id; });
  if (!p) return;
  editingProductId = id;
  productImages = [(p.images&&p.images[0])||null, (p.images&&p.images[1])||null, (p.images&&p.images[2])||null];
  fillProductForm(p);
  openModal('productModal');
}

function fillProductForm(p) {
  document.getElementById('productModalTitle').textContent = p.id ? 'Editar Produto' : 'Novo Produto';
  document.getElementById('pName').value = p.name || '';
  document.getElementById('pBrand').value = p.brand || 'Needway Nutrition';
  document.getElementById('pCategory').value = p.category || '';
  document.getElementById('pDescription').value = p.description || '';
  document.getElementById('pPrice').value = p.price || '';
  document.getElementById('pOriginalPrice').value = p.originalPrice || '';
  document.getElementById('pStock').value = p.stock || '';
  document.getElementById('pSold').value = p.sold || '';
  document.getElementById('pIsNew').checked = p.isNew || false;
  document.getElementById('pIsOutlet').checked = p.isOutlet || false;
  var n = p.nutritionTable || {};
  ['calories','protein','carbs','fat','sodium'].forEach(function(k){ var el = document.getElementById('pNut_'+k); if(el) el.value = n[k]||''; });
  // Image slots
  [0,1,2].forEach(function(i){ loadProductImageSlot(i, productImages[i]); });
  // Simple tags
  setSimpleTags('flavorsTags', p.flavors || []);
  setSimpleTags('sizesTags', p.sizes || []);
  // Pills
  setPillValues('badgesPills', p.badges || []);
  setPillValues('tagsPills', p.tags || []);
}

async function saveProduct() {
  const products = getProducts();
  var p = editingProductId ? products.find(function(x){ return x.id === editingProductId; }) : {};
  if (!p) p = {};
  p.name = document.getElementById('pName').value.trim();
  if (!p.name) { toast('Nome do produto é obrigatório', 'error'); return; }
  p.slug = p.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  p.brand = document.getElementById('pBrand').value;
  p.category = document.getElementById('pCategory').value;
  p.description = document.getElementById('pDescription').value;
  p.price = parseFloat(document.getElementById('pPrice').value) || 0;
  p.originalPrice = parseFloat(document.getElementById('pOriginalPrice').value) || p.price;
  p.discount = p.originalPrice > p.price ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
  p.stock = parseInt(document.getElementById('pStock').value) || 0;
  p.sold = parseInt(document.getElementById('pSold').value) || 0;
  p.isNew = document.getElementById('pIsNew').checked;
  p.isOutlet = document.getElementById('pIsOutlet').checked;
  p.active = true;
  p.images = productImages.filter(Boolean);
  p.nutritionTable = {};
  ['calories','protein','carbs','fat','sodium'].forEach(function(k){ var el = document.getElementById('pNut_'+k); if(el&&el.value) p.nutritionTable[k] = el.value; });
  p.flavors = getSimpleTags('flavorsTags');
  p.sizes = getSimpleTags('sizesTags');
  p.badges = getPillValues('badgesPills');
  p.tags = getPillValues('tagsPills');
  
  if (editingProductId) {
    var idx = products.findIndex(function(x){ return x.id === editingProductId; });
    products[idx] = p;
    await fetch('/api/products/' + p.id, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(p) });
  } else {
    p.id = Date.now();
    p.rating = 5.0; p.reviewCount = 0;
    await fetch('/api/products', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(p) });
  }
  
  if (typeof loadNeedwayData === 'function') await loadNeedwayData();
  closeModal('productModal');
  loadProducts();
  toast(editingProductId ? 'Produto atualizado!' : 'Produto criado com sucesso!');
}

async function deleteProduct(id) {
  if (!confirm('Excluir este produto?')) return;
  await fetch('/api/products/' + id, { method: 'DELETE' });
  if (typeof loadNeedwayData === 'function') await loadNeedwayData();
  loadProducts();
  toast('Produto excluído');
}

// ── Banners ──
var editingBannerId = null;

function toggleBannerExtras() {
  const pos = document.getElementById('bPosition').value;
  const couponWrap = document.getElementById('bCouponWrapper');
  const outletWrap = document.getElementById('bOutletWrapper');
  if(couponWrap) couponWrap.style.display = (pos === 'coupon') ? 'flex' : 'none';
  if(outletWrap) outletWrap.style.display = (pos === 'outlet') ? 'flex' : 'none';
  
  const sizeTip = document.getElementById('bImageSizeTip');
  if(sizeTip) {
    if(pos === 'hero') sizeTip.innerHTML = 'JPG, PNG, WEBP — recomendado 1920x600px';
    else if(pos === 'coupon') sizeTip.innerHTML = 'JPG, PNG, WEBP — recomendado 1920x300px';
    else if(pos.startsWith('mod_')) sizeTip.innerHTML = 'JPG, PNG, WEBP — recomendado 800x1200px (Formato Vertical)';
    else sizeTip.innerHTML = 'JPG, PNG, WEBP — recomendado 1920x400px';
  }
}

function loadBanners() {
  const banners = getBanners();
  const c = document.getElementById('bannersContainer');
  const posLabels = { 
    hero: 'Hero Carousel', 
    mais_vendidos: 'Mais Vendidos', 
    lancamentos: 'Lançamentos', 
    outlet: 'Outlet', 
    coupon: 'Cupons',
    mod_top_1: 'Objetivos: Imagem 1',
    mod_top_2: 'Objetivos: Imagem 2',
    mod_top_3: 'Objetivos: Imagem 3',
    mod_top_4: 'Objetivos: Imagem 4',
    mod_bot_1: 'Vestuário: Imagem 1',
    mod_bot_2: 'Vestuário: Imagem 2',
    mod_bot_3: 'Vestuário: Imagem 3',
    mod_bot_4: 'Vestuário: Imagem 4'
  };
  c.innerHTML = banners.length === 0 ? '<div class="admin-empty"><p>Nenhum banner cadastrado.</p></div>'
    : banners.map(function(b){ 
      var pLabel = posLabels[b.position||'hero'] || 'Hero';
      var badgeHtml = '<span style="display:inline-block; font-size:10px; background:var(--accent-gold); color:#000; padding:2px 6px; border-radius:4px; margin-bottom:4px; font-weight:bold;">' + pLabel.toUpperCase() + '</span><br>';
      return '<div class="banner-card"><div class="banner-card__preview" style="background:' + (b.bg||'#111') + ';">' + (b.image ? '<img src="'+b.image+'" style="width:100%;height:100%;object-fit:cover;">' : '<span>Sem foto</span>') + '</div><div class="banner-card__info"><div class="banner-card__title">' + badgeHtml + (b.title||'Sem título') + '</div><div class="banner-card__sub">' + (b.subtitle||'') + ' &mdash; Botão: <em>' + (b.ctaText||'') + '</em></div><div style="font-size:var(--fs-xs);color:var(--text-muted);margin-top:4px;">Link: ' + (b.ctaLink||'-') + '</div></div><div class="banner-card__actions"><label class="admin-toggle"><input type="checkbox" ' + (b.active?'checked':'') + ' onchange="toggleBanner(' + b.id + ',this.checked)"><div class="admin-toggle__track"></div></label><button class="btn-icon" onclick="editBanner(' + b.id + ')"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button><button class="btn-icon danger" onclick="deleteBanner(' + b.id + ')"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg></button></div></div>'; 
    }).join('');
}

function newBanner() {
  editingBannerId = null;
  bannerImageData = null;
  ['bTitle','bSubtitle','bCtaText','bCtaLink','bOutletDate'].forEach(function(id){ var el = document.getElementById(id); if(el) el.value = ''; });
  document.getElementById('bBg').value = '#1a1a2e';
  var pSel = document.getElementById('bPosition'); if(pSel) pSel.value = 'hero';
  var cSel = document.getElementById('bCouponStyle'); if(cSel) cSel.value = 'section';
  toggleBannerExtras();
  var zone = document.getElementById('bUploadZone');
  if(zone) zone.classList.remove('has-image');
  var prev = document.getElementById('bImagePreview');
  if(prev) prev.src = '';
  var ph = document.getElementById('bUploadPlaceholder');
  if(ph) ph.style.display = 'flex';
  openModal('bannerModal');
}

function editBanner(id) {
  const b = getBanners().find(function(x){ return x.id === id; });
  if (!b) return;
  editingBannerId = id;
  bannerImageData = b.image || null;
  document.getElementById('bTitle').value = b.title || '';
  document.getElementById('bSubtitle').value = b.subtitle || '';
  document.getElementById('bCtaText').value = b.ctaText || '';
  document.getElementById('bCtaLink').value = b.ctaLink || '';
  document.getElementById('bBg').value = b.bg || '#1a1a2e';
  var pSel = document.getElementById('bPosition'); if(pSel) pSel.value = b.position || 'hero';
  var cSel = document.getElementById('bCouponStyle'); if(cSel) cSel.value = b.couponStyle || 'section';
  var outD = document.getElementById('bOutletDate'); if(outD) outD.value = b.outletDate || '';
  toggleBannerExtras();
  
  var zone = document.getElementById('bUploadZone');
  var prev = document.getElementById('bImagePreview');
  var ph = document.getElementById('bUploadPlaceholder');
  if (b.image) {
    if(zone) zone.classList.add('has-image');
    if(prev) prev.src = b.image;
    if(ph) ph.style.display = 'none';
  } else {
    if(zone) zone.classList.remove('has-image');
    if(prev) prev.src = '';
    if(ph) ph.style.display = 'flex';
  }
  openModal('bannerModal');
}

function saveBanner() {
  const banners = getBanners();
  var b = editingBannerId ? banners.find(function(x){ return x.id === editingBannerId; }) : {};
  if (!b) b = {};
  b.title = document.getElementById('bTitle').value;
  b.subtitle = document.getElementById('bSubtitle').value;
  b.ctaText = document.getElementById('bCtaText').value;
  b.ctaLink = document.getElementById('bCtaLink').value;
  b.bg = document.getElementById('bBg').value;
  b.position = document.getElementById('bPosition').value;
  b.couponStyle = document.getElementById('bCouponStyle').value;
  b.outletDate = document.getElementById('bOutletDate').value;
  b.image = bannerImageData || b.image || '';
  
  if (editingBannerId) {
    var idx = banners.findIndex(function(x){ return x.id === editingBannerId; });
    banners[idx] = b;
  } else { b.id = Date.now(); b.active = true; banners.push(b); }
  saveBanners(banners);
  closeModal('bannerModal');
  loadBanners();
  toast(editingBannerId ? 'Banner atualizado!' : 'Banner criado!');
}

function toggleBanner(id, active) {
  const banners = getBanners();
  const b = banners.find(function(x){ return x.id === id; });
  if (b) { b.active = active; saveBanners(banners); toast(active ? 'Banner ativado' : 'Banner desativado'); }
}

function deleteBanner(id) {
  if (!confirm('Excluir este banner?')) return;
  saveBanners(getBanners().filter(function(b){ return b.id !== id; }));
  loadBanners();
  toast('Banner excluído');
}

// ── Pedidos ──
function loadOrders() {
  const orders = getOrders().slice().reverse();
  const q = (document.getElementById('orderSearch')?.value||'').toLowerCase();
  const filtered = orders.filter(function(o){ return !q || String(o.id).includes(q) || (o.billing&&o.billing.name||'').toLowerCase().includes(q); });
  const statusColors = { 'Confirmado':'success','Em Separação':'primary','Enviado':'primary','Entregue':'success','Cancelado':'danger' };
  document.getElementById('ordersTable').innerHTML = filtered.length === 0
    ? '<tr><td colspan="7" style="text-align:center;padding:var(--space-2xl);color:var(--text-muted);">Nenhum pedido encontrado</td></tr>'
    : filtered.map(function(o,i){
      var s = o.status || 'Confirmado';
      return '<tr><td><strong>#' + (o.id||(1000+i)) + '</strong></td><td>' + fmtDate(o.date) + '</td><td>' + (o.billing&&o.billing.name||'Cliente') + '<br><span style="font-size:var(--fs-xs);color:var(--text-muted);">' + (o.billing&&o.billing.email||'') + '</span></td><td>' + (o.items||[]).length + ' item(s)</td><td><strong>' + fmtPrice(o.total) + '</strong></td><td><span class="badge badge--' + (statusColors[s]||'dark') + '">' + s + '</span></td><td><div class="admin-actions"><button class="btn-icon" onclick="viewOrder(\'' + o.id + '\')" title="Ver"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button><select style="padding:4px 8px;border:1px solid var(--glass-border);border-radius:var(--radius-sm);background:var(--glass-bg);color:var(--text-light);font-size:var(--fs-xs);cursor:pointer;" onchange="updateOrderStatus(\'' + o.id + '\',this.value)">' + ['Confirmado','Em Separação','Enviado','Entregue','Cancelado'].map(function(st){ return '<option' + (s===st?' selected':'') + '>' + st + '</option>'; }).join('') + '</select></div></td></tr>';
    }).join('');
}

function updateOrderStatus(orderId, newStatus) {
  const orders = getOrders();
  const o = orders.find(function(x){ return String(x.id) === String(orderId); });
  if (o) { o.status = newStatus; saveOrders(orders); toast('Status: ' + newStatus); loadOrders(); }
}

function viewOrder(orderId) {
  const o = getOrders().find(function(x){ return String(x.id) === String(orderId); });
  if (!o) return;
  const s = o.status || 'Confirmado';
  document.getElementById('orderDetailContent').innerHTML = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-lg);margin-bottom:var(--space-lg);"><div class="settings-section" style="margin:0;"><h3 style="font-size:var(--fs-md);border:none;margin:0 0 var(--space-md);">Cliente</h3><p><strong>' + (o.billing&&o.billing.name||'-') + '</strong></p><p>' + (o.billing&&o.billing.email||'') + '</p><p>' + (o.billing&&o.billing.phone||'') + '</p><p style="margin-top:var(--space-sm);">' + (o.billing&&o.billing.address||'') + ', ' + (o.billing&&o.billing.city||'') + ' - ' + (o.billing&&o.billing.state||'') + '<br>' + (o.billing&&o.billing.cep||'') + '</p></div><div class="settings-section" style="margin:0;"><h3 style="font-size:var(--fs-md);border:none;margin:0 0 var(--space-md);">Pedido</h3><p>ID: <strong>#' + o.id + '</strong></p><p>Data: ' + fmtDate(o.date) + '</p><p>Pagamento: ' + (o.paymentMethod||'-') + '</p><p>Status: <span class="badge badge--success">' + s + '</span></p></div></div><div class="settings-section" style="margin:0;"><h3 style="font-size:var(--fs-md);border:none;margin:0 0 var(--space-md);">Itens</h3><table class="admin-table"><thead><tr><th>Produto</th><th>Variação</th><th>Qtd</th><th>Preço</th><th>Total</th></tr></thead><tbody>' + (o.items||[]).map(function(it){ return '<tr><td>' + it.name + '</td><td>' + (it.flavor||'-') + ' ' + (it.size||'') + '</td><td>' + it.qty + '</td><td>' + fmtPrice(it.price) + '</td><td>' + fmtPrice(it.price*it.qty) + '</td></tr>'; }).join('') + '</tbody></table><div style="display:flex;justify-content:flex-end;margin-top:var(--space-md);gap:var(--space-xl);"><span>Subtotal: ' + fmtPrice(o.subtotal||o.total) + '</span><span>Desconto: ' + fmtPrice(o.discount||0) + '</span><span>Frete: ' + (o.shipping===0?'Grátis':fmtPrice(o.shipping||0)) + '</span><strong>Total: ' + fmtPrice(o.total) + '</strong></div></div><div class="settings-section" style="margin:var(--space-md) 0 0;"><h3 style="font-size:var(--fs-md);border:none;margin:0 0 var(--space-md);">Código de Rastreamento</h3><div style="display:flex;gap:var(--space-md);align-items:flex-end;"><div class="input-group" style="flex:1;margin:0;"><label>Código dos Correios</label><input type="text" class="input" id="trackingCode" value="' + (o.tracking||'') + '" placeholder="BR123456789BR"></div><button class="btn btn--primary" onclick="saveTracking(\'' + o.id + '\')">Salvar</button></div></div>';
  openModal('orderDetailModal');
}

function saveTracking(orderId) {
  const orders = getOrders();
  const o = orders.find(function(x){ return String(x.id) === String(orderId); });
  if (o) { o.tracking = document.getElementById('trackingCode').value; saveOrders(orders); toast('Código salvo!'); }
}

function exportOrdersCSV() {
  const orders = getOrders();
  const rows = [['ID','Data','Cliente','Email','Total','Status']];
  orders.forEach(function(o){ rows.push([o.id, fmtDate(o.date), (o.billing&&o.billing.name)||'', (o.billing&&o.billing.email)||'', o.total, o.status||'Confirmado']); });
  const csv = rows.map(function(r){ return r.join(','); }).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
  a.download = 'pedidos-needway.csv'; a.click();
  toast('CSV exportado!');
}

// ── Leads ──
function loadLeads() {
  const leads = getLeads();
  document.getElementById('leadsCount').textContent = leads.length + ' contatos';
  document.getElementById('leadsTable').innerHTML = leads.length === 0
    ? '<tr><td colspan="4" style="text-align:center;padding:var(--space-2xl);color:var(--text-muted);">Nenhum contato capturado ainda.</td></tr>'
    : leads.slice().reverse().map(function(l,i){ return '<tr><td>' + (leads.length-i) + '</td><td>' + (l.email||'-') + '</td><td>' + (l.phone||l.whatsapp||'-') + '</td><td>' + fmtDate(l.date||l.timestamp) + '</td></tr>'; }).join('');
}

function exportLeadsCSV() {
  const leads = getLeads();
  const rows = [['Email','Telefone','Data']];
  leads.forEach(function(l){ rows.push([l.email||'', l.phone||l.whatsapp||'', fmtDate(l.date||l.timestamp)]); });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([rows.map(function(r){ return r.join(','); }).join('\n')], { type: 'text/csv;charset=utf-8;' }));
  a.download = 'contatos-needway.csv'; a.click();
  toast('Contatos exportados!');
}

// ── Cupons ──
var editingCouponId = null;

function loadCoupons() {
  const coupons = getCoupons();
  const typeLabel = { percent: 'Desconto %', fixed: 'Valor Fixo', shipping: 'Frete Grátis' };
  document.getElementById('couponsTable').innerHTML = coupons.length === 0
    ? '<tr><td colspan="6" style="text-align:center;padding:var(--space-2xl);color:var(--text-muted);">Nenhum cupom cadastrado</td></tr>'
    : coupons.map(function(c){ return '<tr><td><strong>' + c.code + '</strong></td><td><span class="badge badge--dark">' + (typeLabel[c.type]||c.type) + '</span></td><td>' + (c.type==='percent'?c.value+'% de desconto':c.type==='shipping'?'Frete Grátis':fmtPrice(c.value)+' de desconto') + '</td><td>' + fmtPrice(c.minOrder||0) + '</td><td>' + (c.expires||'Sem prazo') + '</td><td><div class="admin-actions"><button class="btn-icon" onclick="editCoupon(\'' + c.code + '\')"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button><button class="btn-icon danger" onclick="deleteCoupon(\'' + c.code + '\')"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg></button></div></td></tr>'; }).join('');
}

function newCoupon() { 
  editingCouponId = null; 
  ['cCode','cValue','cMinOrder','cExpires'].forEach(function(id){ var el=document.getElementById(id); if(el)el.value=''; }); 
  document.getElementById('cCode').disabled = false;
  document.getElementById('cType').value='percent'; 
  document.getElementById('cColor').value='#f97316'; 
  document.getElementById('cShowBanner').checked = true;
  openModal('couponModal'); 
}

function editCoupon(code) {
  const c = getCoupons().find(function(x){ return x.code === code; });
  if (!c) return;
  editingCouponId = code;
  document.getElementById('cCode').value = c.code;
  document.getElementById('cCode').disabled = true;
  document.getElementById('cType').value = c.type;
  document.getElementById('cValue').value = c.value;
  document.getElementById('cMinOrder').value = c.minOrder || '';
  document.getElementById('cExpires').value = c.expires || '';
  document.getElementById('cColor').value = c.color || '#f97316';
  document.getElementById('cShowBanner').checked = c.show_banner !== false;
  openModal('couponModal');
}

function saveCoupon() {
  const coupons = getCoupons();
  const code = (document.getElementById('cCode').value||'').toUpperCase().trim();
  if (!code) { toast('Digite o código do cupom', 'error'); return; }
  const obj = { 
     code, 
     type: document.getElementById('cType').value, 
     value: parseFloat(document.getElementById('cValue').value)||0, 
     minOrder: parseFloat(document.getElementById('cMinOrder').value)||0, 
     expires: document.getElementById('cExpires').value,
     color: document.getElementById('cColor').value || '#f97316',
     show_banner: document.getElementById('cShowBanner').checked
  };
  if (editingCouponId) { var idx = coupons.findIndex(function(x){ return x.code===editingCouponId; }); coupons[idx] = obj; }
  else { if (coupons.find(function(x){ return x.code===code; })) { toast('Este código já existe', 'error'); return; } coupons.push(obj); }
  saveCoupons(coupons); closeModal('couponModal'); loadCoupons();
  toast(editingCouponId ? 'Cupom atualizado!' : 'Cupom criado!');
}

function deleteCoupon(code) {
  if (!confirm('Excluir cupom ' + code + '?')) return;
  saveCoupons(getCoupons().filter(function(c){ return c.code!==code; }));
  loadCoupons(); toast('Cupom excluído');
}

// ── Categorias ──
var editingCategoryId = null;

function loadCategories() {
  const cats = getCategories();
  document.getElementById('categoriesTable').innerHTML = cats.length === 0
    ? '<tr><td colspan="5" style="text-align:center;padding:var(--space-2xl);color:var(--text-muted);">Nenhuma categoria</td></tr>'
    : cats.map(function(c){ return '<tr><td><div style="display:flex;align-items:center;gap:10px;">' + (c.image?'<img src="'+c.image+'" style="width:40px;height:40px;object-fit:cover;border-radius:6px;flex-shrink:0;">':'<div style="width:40px;height:40px;background:var(--bg-darker);border-radius:6px;flex-shrink:0;"></div>') + '<strong>' + c.name + '</strong></div></td><td>' + (c.count||0) + ' produtos</td><td><label class="admin-toggle"><input type="checkbox" ' + (c.active!==false?'checked':'') + ' onchange="toggleCategory(\'' + c.id + '\',this.checked)"><div class="admin-toggle__track"></div></label></td><td><div class="admin-actions"><button class="btn-icon" onclick="editCategory(\'' + c.id + '\')"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button><button class="btn-icon danger" onclick="deleteCategory(\'' + c.id + '\')"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg></button></div></td></tr>'; }).join('');
}

function newCategory() {
  editingCategoryId = null; categoryImageData = null;
  document.getElementById('catName').value = '';
  var zone = document.getElementById('catUploadZone'); if(zone) zone.classList.remove('has-image');
  var prev = document.getElementById('catImagePreview'); if(prev) prev.src = '';
  var ph = document.getElementById('catUploadPlaceholder'); if(ph) ph.style.display = 'flex';
  openModal('categoryModal');
}

function editCategory(id) {
  const c = getCategories().find(function(x){ return x.id == id; });
  if (!c) return;
  editingCategoryId = id;
  categoryImageData = c.image || null;
  document.getElementById('catName').value = c.name || '';
  var zone = document.getElementById('catUploadZone');
  var prev = document.getElementById('catImagePreview');
  var ph = document.getElementById('catUploadPlaceholder');
  if (c.image) { if(zone) zone.classList.add('has-image'); if(prev) prev.src = c.image; if(ph) ph.style.display='none'; }
  else { if(zone) zone.classList.remove('has-image'); if(prev) prev.src=''; if(ph) ph.style.display='flex'; }
  openModal('categoryModal');
}

function saveCategory() {
  const cats = getCategories();
  const name = (document.getElementById('catName').value||'').trim();
  if (!name) { toast('Digite o nome da categoria', 'error'); return; }
  const id = editingCategoryId || name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  const obj = { id, name, slug: id, image: categoryImageData || '', active: true, count: 0 };
  if (editingCategoryId) { var idx = cats.findIndex(function(x){ return x.id == editingCategoryId; }); cats[idx] = Object.assign({}, cats[idx], obj); }
  else cats.push(obj);
  saveCategories(cats); closeModal('categoryModal'); loadCategories();
  toast(editingCategoryId ? 'Categoria atualizada!' : 'Categoria criada!');
}

function toggleCategory(id, active) {
  const cats = getCategories();
  const c = cats.find(function(x){ return x.id == id; });
  if (c) { c.active = active; saveCategories(cats); toast(active?'Categoria ativada':'Categoria desativada'); }
}

function deleteCategory(id) {
  if (!confirm('Excluir esta categoria?')) return;
  saveCategories(getCategories().filter(function(c){ return c.id != id; }));
  loadCategories(); toast('Categoria excluída');
}

// ── Integrações ──
function loadIntegrations() {
  const integ = getIntegrations();
  document.getElementById('mpAccessToken').value = integ.mpAccessToken || '';
  document.getElementById('mpPublicKey').value = integ.mpPublicKey || '';
  document.getElementById('mpWebhookUrl').value = window.location.origin + '/webhook/mercadopago';
  document.getElementById('blingToken').value = integ.blingToken || '';
  document.getElementById('blingSyncStock').checked = integ.blingSyncStock || false;
  document.getElementById('blingImportOrders').checked = integ.blingImportOrders || false;
  updateIntegrationStatus('mp', integ.mpAccessToken ? 'connected' : 'off');
  updateIntegrationStatus('bling', integ.blingToken ? 'connected' : 'off');
}

function updateIntegrationStatus(key, status) {
  var dot = document.getElementById(key + 'StatusDot');
  var text = document.getElementById(key + 'StatusText');
  if (!dot || !text) return;
  dot.className = 'status-dot ' + (status === 'connected' ? 'connected' : '');
  text.textContent = status === 'connected' ? 'Configurado' : 'Não configurado';
}

function saveMPIntegration() {
  const integ = getIntegrations();
  integ.mpAccessToken = document.getElementById('mpAccessToken').value;
  integ.mpPublicKey = document.getElementById('mpPublicKey').value;
  saveIntegrations(integ);
  updateIntegrationStatus('mp', integ.mpAccessToken ? 'connected' : 'off');
  toast('Mercado Pago salvo!');
}

function saveBlingIntegration() {
  const integ = getIntegrations();
  integ.blingToken = document.getElementById('blingToken').value;
  integ.blingSyncStock = document.getElementById('blingSyncStock').checked;
  integ.blingImportOrders = document.getElementById('blingImportOrders').checked;
  saveIntegrations(integ);
  updateIntegrationStatus('bling', integ.blingToken ? 'connected' : 'off');
  toast('Bling salvo!');
}

// ── Configurações ──
function loadSettings() {
  const s = getSettings();
  document.getElementById('cfgStoreName').value = s.storeName || 'Needway Nutrition';
  document.getElementById('cfgEmail').value = s.email || '';
  document.getElementById('cfgWhatsApp').value = s.whatsapp || '+55 11 97079-9084';
  document.getElementById('cfgPix').value = s.pixDiscount != null ? s.pixDiscount : 10;
  document.getElementById('cfgFreeShipping').value = s.freeShippingMin != null ? s.freeShippingMin : 250;
  document.getElementById('cfgInstallments').value = s.maxInstallments != null ? s.maxInstallments : 6;
  document.getElementById('cfgMetaPixel').value = s.metaPixel || '';
  document.getElementById('cfgGoogleAnalytics').value = s.googleAnalytics || '';
  document.getElementById('cfgLeadPopup').checked = s.leadPopup !== false;
  document.getElementById('cfgLeadDelay').value = s.leadDelay != null ? s.leadDelay : 3;
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
  const nw = document.getElementById('cfgNewPassword').value;
  const cf = document.getElementById('cfgConfirmPassword').value;
  if (!nw) { toast('Digite a nova senha', 'error'); return; }
  if (nw !== cf) { toast('As senhas não são iguais', 'error'); return; }
  localStorage.setItem('needway-admin-pass', nw);
  document.getElementById('cfgNewPassword').value = '';
  document.getElementById('cfgConfirmPassword').value = '';
  toast('Senha alterada com sucesso!');
}

// ── Init ──
function initDashboard() {
  setTimeout(function() { showTab('overview', document.querySelector('.admin-sidebar__link')); }, 0);
}

document.addEventListener('DOMContentLoaded', async function() {
  if (typeof loadNeedwayData === 'function') {
    await loadNeedwayData();
  }
  initPillSelects();

  // Populate category select
  var sel = document.getElementById('pCategory');
  if (sel && sel.options.length === 0) {
    var d = getNeedwayData();
    if (d && d.categories) {
      d.categories.forEach(function(c) {
        var opt = document.createElement('option');
        opt.value = c.id; opt.textContent = c.name;
        sel.appendChild(opt);
      });
    }
  }

  if (localStorage.getItem(ADMIN_KEY) === 'true') {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'flex';
    initDashboard();
  }

  document.getElementById('adminPassword')?.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') adminLogin();
  });
});

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('admin-modal-overlay')) e.target.classList.remove('open');
});
