// ===================================
// Needway Nutrition — Data Store
// Fetches data from Node.js API
// ===================================

const NeedwayData = {
 // ── Store Config ──
 config: {
 storeName: 'Needway Nutrition',
 freeShippingMin: 250,
 pixDiscount: 0.10,
 currency: 'BRL',
 maxInstallments: 6,
 minInstallmentValue: 25,
 },

 // ── Objectives ──
 objectives: [
 { id: 'massa', name: 'Massa Muscular', icon: '', desc: 'Ganhe massa com qualidade', slug: 'massa-muscular' },
 { id: 'emagrecimento', name: 'Emagrecimento', icon: '', desc: 'Queime gordura de forma inteligente', slug: 'emagrecimento' },
 { id: 'energia', name: 'Energia', icon: '', desc: 'Potencialize seus treinos', slug: 'energia' },
 { id: 'saude', name: 'Saúde & Bem-estar', icon: '', desc: 'Cuide do seu corpo por completo', slug: 'saude' },
 ],

 // ── Empty placeholders (will be fetched) ──
 categories: [],
 products: [],
 coupons: [],

 // ── Reviews (sample) ──
 reviews: [
 { productId: 1, author: 'Leonardo M.', rating: 5, date: '2026-02-28', text: 'Whey excelente! Boa dissolução e sabor de chocolate muito bom. Já comprei 3 vezes, sempre entrega rápida.' },
 { productId: 1, author: 'Carla S.', rating: 5, date: '2026-02-25', text: 'Melhor custo-benefício que já encontrei. A proteína é de qualidade e o preço é justo.' },
 { productId: 1, author: 'Rafael A.', rating: 4, date: '2026-02-20', text: 'Produto muito bom, só achei a embalagem um pouco difícil de fechar. Mas a qualidade é top!' },
 { productId: 2, author: 'Amanda L.', rating: 5, date: '2026-03-01', text: 'Creatina pura de verdade! Notei diferença na performance em menos de 2 semanas. Super recomendo.' },
 { productId: 2, author: 'Pedro H.', rating: 5, date: '2026-02-22', text: 'Dissolve super bem e não tem gosto. Uso todos os dias e os resultados são visíveis.' },
 { productId: 3, author: 'Thiago R.', rating: 5, date: '2026-02-18', text: 'Pré-treino monster! Dá um foco absurdo e a energia dura o treino todo. Sabor de frutas vermelhas é o melhor.' },
 { productId: 5, author: 'Juliana F.', rating: 5, date: '2026-02-27', text: 'Isolado de qualidade premium. Uso na minha dieta low carb e é perfeito, quase zero carboidrato.' },
 { productId: 12, author: 'Marcos V.', rating: 5, date: '2026-02-15', text: 'Kit completo e com ótimo preço. Tudo chegou certinho e em ótimas condições. Virou minha loja favorita!' },
 ],

 // ── Blog Posts ──
 blogPosts: [
 { id: 1, title: 'Guia Completo: Como Escolher o Melhor Whey Protein', slug: 'como-escolher-whey-protein', category: 'Guias', date: '2026-02-28', readTime: '8 min', excerpt: 'Concentrado, isolado ou hidrolisado? Entenda as diferenças e descubra qual é o ideal para o seu objetivo.' },
 { id: 2, title: '5 Benefícios da Creatina que Você Precisa Conhecer', slug: '5-beneficios-creatina', category: 'Nutrição', date: '2026-02-20', readTime: '5 min', excerpt: 'A creatina é o suplemento mais estudado do mundo. Descubra por que ela deve fazer parte da sua suplementação.' },
 { id: 3, title: 'Treino e Suplementação: O Combo Perfeito para Resultados', slug: 'treino-suplementacao-combo', category: 'Treino', date: '2026-02-15', readTime: '6 min', excerpt: 'Aprenda a combinar seu treino com a suplementação certa para maximizar seus ganhos na academia.' },
 ],

 // ── FAQ ──
 faq: [
 { q: 'Qual o prazo de entrega?', a: 'O prazo varia de acordo com a sua região. Após a confirmação do pagamento, o pedido é enviado em até 2 dias úteis. O prazo de entrega dos Correios varia de 3 a 15 dias úteis.' },
 { q: 'Quais as formas de pagamento?', a: 'Aceitamos PIX (com 10% de desconto), cartão de crédito (até 6x sem juros), boleto bancário e transferência bancária.' },
 { q: 'Como rastrear meu pedido?', a: 'Assim que o pedido for despachado, você receberá o código de rastreio por e-mail e WhatsApp. Você também pode acompanhar pela área Minha Conta no site.' },
 { q: 'Os produtos são originais?', a: 'Sim, trabalhamos apenas com produtos 100% originais, direto da fábrica, com nota fiscal e garantia de procedência.' },
 { q: 'Posso devolver se não gostar?', a: 'Sim, você tem até 7 dias corridos após o recebimento para solicitar a devolução de produtos lacrados, de acordo com o Código de Defesa do Consumidor.' },
 ]
};

// ── Helpers ──
function getStockStatus(stock) {
 if (stock === 0) return { status: 'unavailable', text: 'Esgotado', class: 'stock-status--unavailable' };
 if (stock <= 5) return { status: 'low', text: `Últimas ${stock} unidades!`, class: 'stock-status--low' };
 return { status: 'available', text: 'Em estoque: envio imediato!', class: 'stock-status--available' };
}

function getBadgeInfo(badge) {
 const badges = {
 'best-seller': { text: 'Mais Vendido', class: 'badge--primary' },
 'new': { text: 'Novo', class: 'badge--gold' },
 'hot': { text: 'Em Alta', class: 'badge--primary' },
 'premium': { text: 'Premium', class: 'badge--dark' },
 'outlet': { text: 'Outlet', class: 'badge--danger' },
 'combo': { text: 'Combo', class: 'badge--gold' },
 };
 return badges[badge] || { text: badge, class: 'badge--dark' };
}

function getPixPrice(price) {
 return price * (1 - NeedwayData.config.pixDiscount);
}

function getInstallments(price) {
 const max = NeedwayData.config.maxInstallments || 6;
 const minVal = NeedwayData.config.minInstallmentValue || 25;
 let count = Math.min(max, Math.floor(price / minVal));
 if (count < 1) count = 1;
 return { count, value: price / count };
}

function formatPrice(value) {
 return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
}

function renderStars(rating) {
 rating = Math.round(rating || 0);
 let html = '';
 for (let i = 1; i <= 5; i++) {
  html += i <= rating ? '★' : '☆';
 }
 return html;
}

// ── Async Fetch Function ──
window.loadNeedwayData = async function() {
    try {
        const [prodRes, catRes, coupRes] = await Promise.all([
            fetch('/api/products'),
            fetch('/api/categories'),
            fetch('/api/coupons')
        ]);
        
        if (prodRes.ok) {
            NeedwayData.products = await prodRes.json();
            console.log("Loaded " + NeedwayData.products.length + " products from DB");
        }
        if (catRes.ok) NeedwayData.categories = await catRes.json();
        if (coupRes.ok) NeedwayData.coupons = await coupRes.json();
    } catch(e) {
        console.error('Falha carregando dados da API:', e);
    }
};

// ── Admin Override: merge localStorage edits on top of static data ──
(function applyAdminOverrides() {
 try {
  // Limpeza forçada do cache legado
  localStorage.removeItem('needway-products-override');
  localStorage.removeItem('needway_cart'); // APAGA O CARRINHO FANTASMA DA DEMO
  const prodOverride = null;
  if (prodOverride) NeedwayData.products = JSON.parse(prodOverride);

  // Categories
  const catOverride = localStorage.getItem('needway-categories-override');
  if (catOverride) NeedwayData.categories = JSON.parse(catOverride);

  // Coupons
  const couponOverride = localStorage.getItem('needway-coupons-override');
  if (couponOverride) NeedwayData.coupons = JSON.parse(couponOverride);

  // Settings
  const settings = localStorage.getItem('needway-settings');
  if (settings) {
   const s = JSON.parse(settings);
   if (s.freeShippingMin) NeedwayData.config.freeShippingMin = parseFloat(s.freeShippingMin);
   if (s.pixDiscount) NeedwayData.config.pixDiscount = parseFloat(s.pixDiscount) / 100;
   if (s.maxInstallments) NeedwayData.config.maxInstallments = parseInt(s.maxInstallments);
   if (s.storeName) NeedwayData.config.storeName = s.storeName;
  }
 } catch(e) {
  console.warn('Admin override merge failed:', e);
 }
})();
