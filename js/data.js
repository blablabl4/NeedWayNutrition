// ===================================
// Needway Nutrition — Simulated Data
// Products, categories, reviews, coupons
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

  // ── Categories ──
  categories: [
    { id: 'whey-protein', name: 'Whey Protein', icon: '', slug: 'whey-protein', count: 12, image: '' },
    { id: 'creatina', name: 'Creatina', icon: '', slug: 'creatina', count: 6, image: '' },
    { id: 'pre-treino', name: 'Pré-Treino', icon: '', slug: 'pre-treino', count: 8, image: '' },
    { id: 'vitaminas', name: 'Vitaminas', icon: '', slug: 'vitaminas', count: 15, image: '' },
    { id: 'aminoacidos', name: 'Aminoácidos', icon: '', slug: 'aminoacidos', count: 10, image: '' },
    { id: 'barras', name: 'Barras Proteicas', icon: '', slug: 'barras', count: 8, image: '' },
    { id: 'hipercalorico', name: 'Hipercalórico', icon: '', slug: 'hipercalorico', count: 4, image: '' },
    { id: 'encapsulados', name: 'Encapsulados', icon: '', slug: 'encapsulados', count: 18, image: '' },
    { id: 'termogenicos', name: 'Termogênicos', icon: '', slug: 'termogenicos', count: 5, image: '' },
    { id: 'colageno', name: 'Colágeno', icon: '', slug: 'colageno', count: 6, image: '' },
    { id: 'omega3', name: 'Ômega 3', icon: '', slug: 'omega3', count: 4, image: '' },
    { id: 'kits', name: 'Kits & Combos', icon: '', slug: 'kits', count: 10, image: '' },
  ],

  // ── Objectives ──
  objectives: [
    { id: 'massa', name: 'Massa Muscular', icon: '', desc: 'Ganhe massa com qualidade', slug: 'massa-muscular' },
    { id: 'emagrecimento', name: 'Emagrecimento', icon: '', desc: 'Queime gordura de forma inteligente', slug: 'emagrecimento' },
    { id: 'energia', name: 'Energia', icon: '', desc: 'Potencialize seus treinos', slug: 'energia' },
    { id: 'saude', name: 'Saúde & Bem-estar', icon: '', desc: 'Cuide do seu corpo por completo', slug: 'saude' },
  ],

  // ── Products ──
  products: [
    {
      id: 1, name: 'Whey Protein Concentrado 900g', slug: 'whey-protein-concentrado-900g',
      category: 'whey-protein', brand: 'Needway Nutrition',
      originalPrice: 189.90, price: 149.90, discount: 21,
      pix: null, // auto calculated
      flavors: ['Chocolate', 'Baunilha', 'Morango', 'Cookies & Cream', 'Doce de Leite'],
      sizes: ['900g', '1.8kg'],
      rating: 4.8, reviewCount: 2847,
      stock: 58, sold: 12450,
      badges: ['best-seller'],
      description: 'Whey Protein Concentrado da Needway Nutrition com 24g de proteína por dose. Formulação premium com alta concentração proteica, ideal para ganho de massa muscular e recuperação pós-treino.',
      nutritionTable: { calories: '120 kcal', protein: '24g', carbs: '3g', fat: '2g', sodium: '65mg' },
      images: [], isNew: false, isOutlet: false,
      tags: ['massa', 'recuperacao'],
    },
    {
      id: 2, name: 'Creatina Monohidratada 300g', slug: 'creatina-monohidratada-300g',
      category: 'creatina', brand: 'Needway Nutrition',
      originalPrice: 99.90, price: 79.90, discount: 20,
      flavors: ['Neutro'],
      sizes: ['150g', '300g', '600g'],
      rating: 4.9, reviewCount: 5123,
      stock: 124, sold: 23800,
      badges: ['best-seller'],
      description: 'Creatina Monohidratada pura da Needway. 100% pura, sem aditivos. 5g por dose, ideal para aumento de força, potência e volume muscular.',
      nutritionTable: { calories: '0 kcal', protein: '0g', carbs: '0g', fat: '0g', creatine: '5g' },
      images: [], isNew: false, isOutlet: false,
      tags: ['massa', 'forca', 'energia'],
    },
    {
      id: 3, name: 'Pré-Treino Ignite 300g', slug: 'pre-treino-ignite-300g',
      category: 'pre-treino', brand: 'Needway Nutrition',
      originalPrice: 129.90, price: 109.90, discount: 15,
      flavors: ['Frutas Vermelhas', 'Limão', 'Uva', 'Maracujá'],
      sizes: ['300g'],
      rating: 4.7, reviewCount: 1890,
      stock: 43, sold: 8720,
      badges: ['hot'],
      description: 'Pré-treino de alta performance com cafeína, beta-alanina, arginina e taurina. Formulação exclusiva para energia explosiva e foco máximo nos treinos.',
      nutritionTable: { calories: '15 kcal', caffeine: '300mg', betaAlanine: '3.2g', arginine: '3g', taurine: '1g' },
      images: [], isNew: false, isOutlet: false,
      tags: ['energia', 'performance'],
    },
    {
      id: 4, name: 'BCAA 2:1:1 120 Cápsulas', slug: 'bcaa-211-120-capsulas',
      category: 'aminoacidos', brand: 'Needway Nutrition',
      originalPrice: 69.90, price: 54.90, discount: 21,
      flavors: [],
      sizes: ['120 cáps', '240 cáps'],
      rating: 4.6, reviewCount: 1245,
      stock: 89, sold: 5430,
      badges: [],
      description: 'BCAA na proporção 2:1:1 (Leucina, Isoleucina e Valina) para recuperação muscular e redução do catabolismo. Fórmula com aminoácidos essenciais de alta pureza.',
      nutritionTable: { calories: '0 kcal', leucine: '1000mg', isoleucine: '500mg', valine: '500mg' },
      images: [], isNew: false, isOutlet: false,
      tags: ['massa', 'recuperacao'],
    },
    {
      id: 5, name: 'Whey Protein Isolado 900g', slug: 'whey-protein-isolado-900g',
      category: 'whey-protein', brand: 'Needway Nutrition',
      originalPrice: 269.90, price: 229.90, discount: 15,
      flavors: ['Chocolate', 'Baunilha', 'Natural'],
      sizes: ['900g'],
      rating: 4.9, reviewCount: 3210,
      stock: 34, sold: 9870,
      badges: ['premium'],
      description: 'Whey Protein Isolado com 27g de proteína por dose e baixíssimo teor de gordura e carboidratos. Ideal para definição muscular e dietas low carb.',
      nutritionTable: { calories: '110 kcal', protein: '27g', carbs: '1g', fat: '0.5g', sodium: '50mg' },
      images: [], isNew: false, isOutlet: false,
      tags: ['massa', 'definicao'],
    },
    {
      id: 6, name: 'Glutamina 300g', slug: 'glutamina-300g',
      category: 'aminoacidos', brand: 'Needway Nutrition',
      originalPrice: 89.90, price: 69.90, discount: 22,
      flavors: ['Neutro'],
      sizes: ['150g', '300g'],
      rating: 4.7, reviewCount: 1567,
      stock: 67, sold: 7650,
      badges: [],
      description: 'L-Glutamina pura em pó. Aminoácido essencial para recuperação muscular, fortalecimento do sistema imunológico e saúde intestinal.',
      nutritionTable: { calories: '0 kcal', glutamine: '5g' },
      images: [], isNew: false, isOutlet: false,
      tags: ['recuperacao', 'saude'],
    },
    {
      id: 7, name: 'Multivitamínico Daily 90 cáps', slug: 'multivitaminico-daily-90-caps',
      category: 'vitaminas', brand: 'Needway Nutrition',
      originalPrice: 59.90, price: 49.90, discount: 17,
      flavors: [],
      sizes: ['60 cáps', '90 cáps'],
      rating: 4.8, reviewCount: 2100,
      stock: 145, sold: 11200,
      badges: ['best-seller'],
      description: 'Complexo multivitamínico com 25 vitaminas e minerais essenciais. Formulação completa para saúde, imunidade e disposição no dia a dia.',
      nutritionTable: { vitA: '600mcg', vitC: '45mg', vitD: '5mcg', vitE: '10mg', calcium: '130mg', iron: '7mg', zinc: '7mg' },
      images: [], isNew: false, isOutlet: false,
      tags: ['saude', 'imunidade'],
    },
    {
      id: 8, name: 'Barra Proteica Crunchy 12un', slug: 'barra-proteica-crunchy-12un',
      category: 'barras', brand: 'Needway Nutrition',
      originalPrice: 95.90, price: 79.90, discount: 17,
      flavors: ['Chocolate Crocante', 'Peanut Butter', 'Cookies'],
      sizes: ['Caixa 12un'],
      rating: 4.5, reviewCount: 890,
      stock: 52, sold: 3420,
      badges: ['new'],
      description: 'Barra proteica com 20g de proteína, cobertura de chocolate e textura crocante. Snack perfeito para qualquer hora do dia.',
      nutritionTable: { calories: '195 kcal', protein: '20g', carbs: '18g', fat: '6g', fiber: '3g' },
      images: [], isNew: true, isOutlet: false,
      tags: ['snack', 'praticidade'],
    },
    {
      id: 9, name: 'Colágeno Verisol + Vitamina C', slug: 'colageno-verisol-vitamina-c',
      category: 'colageno', brand: 'Needway Nutrition',
      originalPrice: 79.90, price: 64.90, discount: 19,
      flavors: ['Limão', 'Frutas Vermelhas'],
      sizes: ['300g'],
      rating: 4.8, reviewCount: 1780,
      stock: 71, sold: 6540,
      badges: [],
      description: 'Colágeno hidrolisado Verisol® com vitamina C para saúde da pele, cabelos e unhas. Absorção superior e resultados comprovados.',
      nutritionTable: { calories: '35 kcal', collagen: '2.5g', vitC: '45mg' },
      images: [], isNew: false, isOutlet: false,
      tags: ['beleza', 'saude'],
    },
    {
      id: 10, name: 'Ômega 3 EPA DHA 120 Softgels', slug: 'omega3-epa-dha-120-softgels',
      category: 'omega3', brand: 'Needway Nutrition',
      originalPrice: 69.90, price: 54.90, discount: 21,
      flavors: [],
      sizes: ['60 softgels', '120 softgels'],
      rating: 4.7, reviewCount: 1340,
      stock: 98, sold: 4560,
      badges: [],
      description: 'Ômega 3 concentrado com EPA e DHA de óleo de peixe ultra purificado. Anti-inflamatório natural, essencial para saúde cardiovascular e cerebral.',
      nutritionTable: { calories: '10 kcal', omega3: '1000mg', epa: '540mg', dha: '360mg' },
      images: [], isNew: false, isOutlet: false,
      tags: ['saude', 'antiinflamatorio'],
    },
    {
      id: 11, name: 'Termogênico Burn 60 cáps', slug: 'termogenico-burn-60-caps',
      category: 'termogenicos', brand: 'Needway Nutrition',
      originalPrice: 89.90, price: 69.90, discount: 22,
      flavors: [],
      sizes: ['60 cáps'],
      rating: 4.6, reviewCount: 980,
      stock: 3, sold: 4210,
      badges: ['hot'],
      description: 'Termogênico potente com cafeína, gengibre, pimenta e chá verde. Acelera o metabolismo e potencializa a queima de gordura.',
      nutritionTable: { calories: '5 kcal', caffeine: '200mg', greenTea: '300mg' },
      images: [], isNew: false, isOutlet: false,
      tags: ['emagrecimento', 'energia'],
    },
    {
      id: 12, name: 'Kit Massa Muscular Completo', slug: 'kit-massa-muscular-completo',
      category: 'kits', brand: 'Needway Nutrition',
      originalPrice: 349.90, price: 269.90, discount: 23,
      flavors: ['Chocolate'],
      sizes: [],
      rating: 4.9, reviewCount: 670,
      stock: 21, sold: 2890,
      badges: ['best-seller', 'combo'],
      description: 'Kit completo com Whey Protein 900g + Creatina 300g + BCAA 120 cáps + Coqueteleira. Tudo que você precisa para ganhar massa muscular.',
      nutritionTable: {},
      images: [], isNew: false, isOutlet: false,
      tags: ['massa', 'kit'],
    },
    {
      id: 13, name: 'Melatonina 3mg 60 cáps', slug: 'melatonina-3mg-60-caps',
      category: 'encapsulados', brand: 'Needway Nutrition',
      originalPrice: 39.90, price: 32.90, discount: 18,
      flavors: [],
      sizes: ['60 cáps', '120 cáps'],
      rating: 4.8, reviewCount: 3450,
      stock: 200, sold: 15600,
      badges: ['best-seller'],
      description: 'Melatonina 3mg para regulação do ciclo do sono. Dormir melhor é fundamental para a recuperação muscular e bem-estar geral.',
      nutritionTable: { melatonin: '3mg' },
      images: [], isNew: false, isOutlet: false,
      tags: ['sono', 'saude'],
    },
    {
      id: 14, name: 'Ashwagandha 600mg 60 cáps', slug: 'ashwagandha-600mg-60-caps',
      category: 'encapsulados', brand: 'Needway Nutrition',
      originalPrice: 69.90, price: 54.90, discount: 21,
      flavors: [],
      sizes: ['60 cáps'],
      rating: 4.7, reviewCount: 1120,
      stock: 56, sold: 4320,
      badges: ['new'],
      description: 'Ashwagandha KSM-66® para redução do estresse, melhora do sono e aumento da testosterona. Adaptógeno poderoso para equilíbrio hormonal.',
      nutritionTable: { ashwagandha: '600mg' },
      images: [], isNew: true, isOutlet: false,
      tags: ['saude', 'hormonal'],
    },
    {
      id: 15, name: 'Hipercalórico Mass 3kg', slug: 'hipercalorico-mass-3kg',
      category: 'hipercalorico', brand: 'Needway Nutrition',
      originalPrice: 139.90, price: 109.90, discount: 21,
      flavors: ['Chocolate', 'Baunilha', 'Morango'],
      sizes: ['1.5kg', '3kg'],
      rating: 4.5, reviewCount: 760,
      stock: 28, sold: 3100,
      badges: [],
      description: 'Hipercalórico com 40g de proteína e 800 calorias por dose. Ideal para quem tem dificuldade em ganhar peso e massa muscular.',
      nutritionTable: { calories: '800 kcal', protein: '40g', carbs: '130g', fat: '8g' },
      images: [], isNew: false, isOutlet: false,
      tags: ['massa', 'calorias'],
    },
    {
      id: 16, name: 'Whey Protein Concentrado 900g (Outlet)', slug: 'whey-concentrado-900g-outlet',
      category: 'whey-protein', brand: 'Needway Nutrition',
      originalPrice: 189.90, price: 99.90, discount: 47,
      flavors: ['Morango'],
      sizes: ['900g'],
      rating: 4.8, reviewCount: 2847,
      stock: 8, sold: 450,
      badges: ['outlet'],
      description: 'Whey Protein Concentrado 900g - sabor Morango. Produto próximo ao vencimento com qualidade garantida. Aproveite o preço especial!',
      nutritionTable: { calories: '120 kcal', protein: '24g', carbs: '3g', fat: '2g' },
      images: [], isNew: false, isOutlet: true,
      tags: ['massa', 'outlet'],
    },
  ],

  // ── Coupons ──
  coupons: [
    { code: 'NEEDWAY10', type: 'percent', value: 10, minOrder: 100, description: '10% de desconto em compras acima de R$100' },
    { code: 'PRIMEIRA15', type: 'percent', value: 15, minOrder: 150, description: '15% de desconto na primeira compra acima de R$150' },
    { code: 'FRETE2025', type: 'shipping', value: 0, minOrder: 0, description: 'Frete grátis em qualquer pedido' },
    { code: 'COMBO20', type: 'percent', value: 20, minOrder: 250, description: '20% de desconto em kits e combos' },
  ],

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
    { q: 'Vocês oferecem frete grátis?', a: 'Sim! Frete grátis para compras acima de R$250,00 para todo o Brasil.' },
    { q: 'Posso trocar ou devolver um produto?', a: 'Sim, você tem até 7 dias após o recebimento para solicitar troca ou devolução. O produto deve estar lacrado e em perfeitas condições.' },
    { q: 'Os suplementos são seguros?', a: 'Todos os nossos produtos são fabricados seguindo rigorosos padrões de qualidade e são aprovados pela ANVISA. Possuímos laudos de análise disponíveis para consulta.' },
    { q: 'Como usar o cupom de desconto?', a: 'Basta inserir o código do cupom no campo indicado no carrinho de compras ou durante o checkout. O desconto será aplicado automaticamente.' },
  ],

  // ── Simulated Shipping ──
  shippingOptions: [
    { id: 'sedex', name: 'SEDEX', days: '2 a 4 dias úteis', price: 24.90 },
    { id: 'pac', name: 'PAC', days: '5 a 10 dias úteis', price: 18.90 },
    { id: 'express', name: 'Express', days: '1 a 2 dias úteis', price: 39.90 },
  ],

  // ── Banners ──
  banners: [
    { id: 1, title: 'Força em Cada Dose', subtitle: 'NOVOS LANÇAMENTOS', desc: 'Conheça a nova linha de pré-treinos e sinta a diferença', cta: 'Ver Lançamentos', link: 'lancamentos.html' },
    { id: 2, title: 'Whey Protein a partir de R$149', subtitle: 'OFERTA ESPECIAL', desc: '24g de proteína por dose. Qualidade premium, preço justo.', cta: 'Comprar Agora', link: 'categoria.html?cat=whey-protein' },
    { id: 3, title: 'Outlet até 50% OFF', subtitle: 'OPORTUNIDADE ÚNICA', desc: 'Produtos selecionados com desconto imperdível. Estoque limitado!', cta: 'Ver Outlet', link: 'outlet.html' },
  ],
};

// ── Helper functions ──
function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function getPixPrice(price) {
  return price * (1 - NeedwayData.config.pixDiscount);
}

function getInstallments(price) {
  const max = NeedwayData.config.maxInstallments;
  const min = NeedwayData.config.minInstallmentValue;
  let installments = max;
  while (installments > 1 && (price / installments) < min) {
    installments--;
  }
  return { count: installments, value: price / installments };
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '<span class="star-empty">' + '★'.repeat(empty) + '</span>';
}

function getProductsByCategory(catId) {
  return NeedwayData.products.filter(p => p.category === catId);
}

function getBestSellers() {
  return NeedwayData.products
    .filter(p => p.badges.includes('best-seller'))
    .sort((a, b) => b.sold - a.sold);
}

function getNewProducts() {
  return NeedwayData.products.filter(p => p.isNew || p.badges.includes('new'));
}

function getOutletProducts() {
  return NeedwayData.products.filter(p => p.isOutlet || p.badges.includes('outlet'));
}

function searchProducts(query) {
  const q = query.toLowerCase();
  return NeedwayData.products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q))
  );
}

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
