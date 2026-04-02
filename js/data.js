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
    "id": 1,
    "name": "Recharge 1kg - Chocolate",
    "slug": "recharge-1kg-chocolate",
    "category": "whey-protein",
    "brand": "DUX",
    "originalPrice": 123.75,
    "price": 99.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.9,
    "reviewCount": 1965,
    "stock": 17,
    "sold": 2133,
    "badges": [],
    "description": "Eletrólitos + Vitaminas",
    "nutritionTable": {
      "porcao": "50g",
      "valorEnergetico": "120 kcal",
      "carboidratos": "40g",
      "proteinas": "10g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "whey-protein"
    ]
  },
  {
    "id": 2,
    "name": "RICHARGE 1KG - ABACAXI",
    "slug": "richarge-1kg-abacaxi",
    "category": "encapsulados",
    "brand": "DUX",
    "originalPrice": 178.75,
    "price": 143.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 5.0,
    "reviewCount": 1839,
    "stock": 68,
    "sold": 105,
    "badges": [],
    "description": "RICHARGE 1KG - ABACAXI",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "encapsulados"
    ]
  },
  {
    "id": 3,
    "name": "Fresh Whey 900g - Chocolate",
    "slug": "fresh-whey-900g-chocolate",
    "category": "whey-protein",
    "brand": "DUX",
    "originalPrice": 305.0,
    "price": 244.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.8,
    "reviewCount": 503,
    "stock": 46,
    "sold": 1718,
    "badges": [],
    "description": "Frutas Reais Liofilizadas",
    "nutritionTable": {
      "porcao": "30g",
      "valorEnergetico": "117 kcal",
      "carboidratos": "5.9g",
      "proteinas": "20g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "whey-protein"
    ]
  },
  {
    "id": 4,
    "name": "Whey Pro Concentrado 900g - Chocolate Branco",
    "slug": "whey-pro-concentrado-900g-chocolate-branco",
    "category": "whey-protein",
    "brand": "DUX",
    "originalPrice": 255.0,
    "price": 204.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.6,
    "reviewCount": 751,
    "stock": 33,
    "sold": 4881,
    "badges": [],
    "description": "Whey Pro Concentrado 900g - Chocolate Branco",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "whey-protein"
    ]
  },
  {
    "id": 5,
    "name": "Fresh Whey 900g - Maracujá",
    "slug": "fresh-whey-900g-maracuj",
    "category": "whey-protein",
    "brand": "DUX",
    "originalPrice": 305.0,
    "price": 244.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.6,
    "reviewCount": 622,
    "stock": 65,
    "sold": 3124,
    "badges": [],
    "description": "Frutas Reais Liofilizadas",
    "nutritionTable": {
      "porcao": "30g",
      "valorEnergetico": "117 kcal",
      "carboidratos": "5.9g",
      "proteinas": "20g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "whey-protein"
    ]
  },
  {
    "id": 6,
    "name": "Melatonina Liquida 20ml - Maracujá",
    "slug": "melatonina-liquida-20ml-maracuj",
    "category": "encapsulados",
    "brand": "DUX",
    "originalPrice": 43.75,
    "price": 35.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.7,
    "reviewCount": 1130,
    "stock": 93,
    "sold": 908,
    "badges": [],
    "description": "Melatonina Liquida 20ml - Maracujá",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "encapsulados"
    ]
  },
  {
    "id": 7,
    "name": "B-Complex - 30 cápsulas",
    "slug": "b-complex-30-c-psulas",
    "category": "vitaminas",
    "brand": "DUX",
    "originalPrice": 70.0,
    "price": 56.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.5,
    "reviewCount": 208,
    "stock": 79,
    "sold": 1697,
    "badges": [],
    "description": "Vitaminas B1, B2, B3, B5, B6, B12",
    "nutritionTable": {
      "porcao": "1 cap",
      "valorEnergetico": "0 kcal",
      "carboidratos": "0g",
      "proteinas": "0g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 8,
    "name": "Vitamina D3 Mini - 120 cápsulas",
    "slug": "vitamina-d3-mini-120-c-psulas",
    "category": "vitaminas",
    "brand": "DUX",
    "originalPrice": 71.25,
    "price": 57.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.9,
    "reviewCount": 551,
    "stock": 102,
    "sold": 2801,
    "badges": [],
    "description": "2.000 UI Vitamina D3",
    "nutritionTable": {
      "porcao": "1 cap",
      "valorEnergetico": "0 kcal",
      "carboidratos": "0g",
      "proteinas": "0g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 9,
    "name": "Amendopro 900g - Natural",
    "slug": "amendopro-900g-natural",
    "category": "saudaveis",
    "brand": "AMENDOPRO",
    "originalPrice": 265.0,
    "price": 212.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.8,
    "reviewCount": 1006,
    "stock": 100,
    "sold": 2601,
    "badges": [],
    "description": "Amendopro 900g - Natural",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "saudaveis"
    ]
  },
  {
    "id": 10,
    "name": "Amendopro 900g - Capuccino",
    "slug": "amendopro-900g-capuccino",
    "category": "saudaveis",
    "brand": "AMENDOPRO",
    "originalPrice": 265.0,
    "price": 212.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.7,
    "reviewCount": 1393,
    "stock": 25,
    "sold": 332,
    "badges": [],
    "description": "Amendopro 900g - Capuccino",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "saudaveis"
    ]
  },
  {
    "id": 11,
    "name": "Amendopro 900g - Paçoca",
    "slug": "amendopro-900g-pa-oca",
    "category": "saudaveis",
    "brand": "AMENDOPRO",
    "originalPrice": 265.0,
    "price": 212.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.7,
    "reviewCount": 2383,
    "stock": 80,
    "sold": 2711,
    "badges": [],
    "description": "Amendopro 900g - Paçoca",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "saudaveis"
    ]
  },
  {
    "id": 12,
    "name": "Amendopro 900g - Chocolate Branco",
    "slug": "amendopro-900g-chocolate-branco",
    "category": "saudaveis",
    "brand": "AMENDOPRO",
    "originalPrice": 265.0,
    "price": 212.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.5,
    "reviewCount": 1860,
    "stock": 99,
    "sold": 2418,
    "badges": [],
    "description": "Amendopro 900g - Chocolate Branco",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "saudaveis"
    ]
  },
  {
    "id": 13,
    "name": "Amendopro 900g - Chocolate",
    "slug": "amendopro-900g-chocolate",
    "category": "saudaveis",
    "brand": "AMENDOPRO",
    "originalPrice": 265.0,
    "price": 212.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.9,
    "reviewCount": 1686,
    "stock": 112,
    "sold": 3708,
    "badges": [],
    "description": "Amendopro 900g - Chocolate",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "saudaveis"
    ]
  },
  {
    "id": 14,
    "name": "Creatina Goma - Pote 60 gomas",
    "slug": "creatina-goma-pote-60-gomas",
    "category": "creatina",
    "brand": "SYN",
    "originalPrice": 178.75,
    "price": 143.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.6,
    "reviewCount": 1731,
    "stock": 76,
    "sold": 4523,
    "badges": [],
    "description": "Creatina Goma - Pote 60 gomas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "creatina"
    ]
  },
  {
    "id": 15,
    "name": "Creatina Goma - Sweet Caramelos",
    "slug": "creatina-goma-sweet-caramelos",
    "category": "creatina",
    "brand": "SYN",
    "originalPrice": 213.75,
    "price": 171.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.7,
    "reviewCount": 1128,
    "stock": 18,
    "sold": 1173,
    "badges": [],
    "description": "Creatina Goma - Sweet Caramelos",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "creatina"
    ]
  },
  {
    "id": 16,
    "name": "Creamass 3kg - Chocolate",
    "slug": "creamass-3kg-chocolate",
    "category": "hipercalorico",
    "brand": "INTEGRALMEDICA",
    "originalPrice": 100.0,
    "price": 80.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.7,
    "reviewCount": 266,
    "stock": 43,
    "sold": 1021,
    "badges": [],
    "description": "3g Creatina / Hipercalórico",
    "nutritionTable": {
      "porcao": "160g",
      "valorEnergetico": "609 kcal",
      "carboidratos": "134g",
      "proteinas": "15g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "hipercalorico"
    ]
  },
  {
    "id": 17,
    "name": "Tastywhey 900g - Chocolate Suíço",
    "slug": "tastywhey-900g-chocolate-su-o",
    "category": "whey-protein",
    "brand": "ADAPTOGEN",
    "originalPrice": 124.88,
    "price": 99.9,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.9,
    "reviewCount": 327,
    "stock": 49,
    "sold": 4138,
    "badges": [],
    "description": "Whey 3W (WPC, WPI, WPH)",
    "nutritionTable": {
      "porcao": "35g",
      "valorEnergetico": "141 kcal",
      "carboidratos": "5g",
      "proteinas": "24g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "whey-protein"
    ]
  },
  {
    "id": 18,
    "name": "Panic Pré-treino 300g - Ponche de frutas",
    "slug": "panic-pr-treino-300g-ponche-de-frutas",
    "category": "pre-treino",
    "brand": "ADAPTOGEN",
    "originalPrice": 120.0,
    "price": 96.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.7,
    "reviewCount": 562,
    "stock": 112,
    "sold": 2698,
    "badges": [],
    "description": "400mg Cafeína / 2g Beta-Alanina",
    "nutritionTable": {
      "porcao": "10g",
      "valorEnergetico": "24 kcal",
      "carboidratos": "2g",
      "proteinas": "4g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "pre-treino"
    ]
  },
  {
    "id": 19,
    "name": "DeliciusMass 3kg - Chocolate",
    "slug": "deliciusmass-3kg-chocolate",
    "category": "hipercalorico",
    "brand": "FTW",
    "originalPrice": 110.0,
    "price": 88.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.7,
    "reviewCount": 2253,
    "stock": 69,
    "sold": 587,
    "badges": [],
    "description": "Hipercalórico (Maltodextrina)",
    "nutritionTable": {
      "porcao": "160g",
      "valorEnergetico": "598 kcal",
      "carboidratos": "131g",
      "proteinas": "15g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "hipercalorico"
    ]
  },
  {
    "id": 20,
    "name": "Purewhey 100% - 900g - Morango",
    "slug": "purewhey-100-900g-morango",
    "category": "whey-protein",
    "brand": "PROBIOTICA",
    "originalPrice": 223.75,
    "price": 179.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.6,
    "reviewCount": 987,
    "stock": 38,
    "sold": 2763,
    "badges": [],
    "description": "Whey Concentrado",
    "nutritionTable": {
      "porcao": "33g",
      "valorEnergetico": "130 kcal",
      "carboidratos": "4.1g",
      "proteinas": "24g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "whey-protein"
    ]
  },
  {
    "id": 21,
    "name": "Mix Pro Creatine - 300g",
    "slug": "mix-pro-creatine-300g",
    "category": "creatina",
    "brand": "PROBIOTICA",
    "originalPrice": 124.88,
    "price": 99.9,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.9,
    "reviewCount": 1357,
    "stock": 52,
    "sold": 3828,
    "badges": [],
    "description": "Mix Pro Creatine - 300g",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "creatina"
    ]
  },
  {
    "id": 22,
    "name": "Creatina - 300g",
    "slug": "creatina-300g",
    "category": "creatina",
    "brand": "PROBIOTICA",
    "originalPrice": 81.25,
    "price": 65.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 5.0,
    "reviewCount": 939,
    "stock": 40,
    "sold": 1721,
    "badges": [],
    "description": "3g Creatina Monohidratada",
    "nutritionTable": {
      "porcao": "3g",
      "valorEnergetico": "0 kcal",
      "carboidratos": "0g",
      "proteinas": "0g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "creatina"
    ]
  },
  {
    "id": 23,
    "name": "Creatina 300g",
    "slug": "creatina-300g",
    "category": "creatina",
    "brand": "SANAVITA",
    "originalPrice": 73.75,
    "price": 59.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.9,
    "reviewCount": 696,
    "stock": 47,
    "sold": 387,
    "badges": [],
    "description": "100% Creatina Pura",
    "nutritionTable": {
      "porcao": "3g",
      "valorEnergetico": "0 kcal",
      "carboidratos": "0g",
      "proteinas": "0g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "creatina"
    ]
  },
  {
    "id": 24,
    "name": "Magnésio Dimalato - 60 cápsulas",
    "slug": "magn-sio-dimalato-60-c-psulas",
    "category": "vitaminas",
    "brand": "EQUALIV",
    "originalPrice": 124.88,
    "price": 99.9,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.6,
    "reviewCount": 134,
    "stock": 107,
    "sold": 2591,
    "badges": [],
    "description": "210mg Magnésio Elementar",
    "nutritionTable": {
      "porcao": "2 caps",
      "valorEnergetico": "0 kcal",
      "carboidratos": "0g",
      "proteinas": "0g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 25,
    "name": "Ômega 3 Ultra - 120 cápsulas gel - 1000 mg",
    "slug": "mega-3-ultra-120-c-psulas-gel-1000-mg",
    "category": "vitaminas",
    "brand": "EQUALIV",
    "originalPrice": 124.88,
    "price": 99.9,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.6,
    "reviewCount": 1224,
    "stock": 56,
    "sold": 63,
    "badges": [],
    "description": "720mg EPA / 480mg DHA",
    "nutritionTable": {
      "porcao": "2 caps",
      "valorEnergetico": "18 kcal",
      "carboidratos": "0g",
      "proteinas": "0.5g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 26,
    "name": "Creatine Monohydrate 100% - 300 g",
    "slug": "creatine-monohydrate-100-300-g",
    "category": "creatina",
    "brand": "EQUALIV",
    "originalPrice": 260.0,
    "price": 208.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.5,
    "reviewCount": 502,
    "stock": 80,
    "sold": 1088,
    "badges": [],
    "description": "Creatine Monohydrate 100% - 300 g",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "creatina"
    ]
  },
  {
    "id": 27,
    "name": "Pasta de Amendoim 600g - Choco-Belga",
    "slug": "pasta-de-amendoim-600g-choco-belga",
    "category": "saudaveis",
    "brand": "ROCK FOODS",
    "originalPrice": 68.75,
    "price": 55.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.7,
    "reviewCount": 696,
    "stock": 90,
    "sold": 2333,
    "badges": [],
    "description": "Pasta de Amendoim 600g - Choco-Belga",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "saudaveis"
    ]
  },
  {
    "id": 28,
    "name": "Pasta de Amendoim 600g - Choco-Branco",
    "slug": "pasta-de-amendoim-600g-choco-branco",
    "category": "saudaveis",
    "brand": "ROCK FOODS",
    "originalPrice": 68.75,
    "price": 55.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.8,
    "reviewCount": 1499,
    "stock": 17,
    "sold": 4086,
    "badges": [],
    "description": "Pasta de Amendoim 600g - Choco-Branco",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "saudaveis"
    ]
  },
  {
    "id": 29,
    "name": "Pasta de Amendoim 600g - Cookies ALLB",
    "slug": "pasta-de-amendoim-600g-cookies-allb",
    "category": "saudaveis",
    "brand": "ROCK FOODS",
    "originalPrice": 68.75,
    "price": 55.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.9,
    "reviewCount": 836,
    "stock": 16,
    "sold": 4933,
    "badges": [],
    "description": "Pasta de Amendoim 600g - Cookies ALLB",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "saudaveis"
    ]
  },
  {
    "id": 30,
    "name": "Pasta de Amendoim 600g - Cookies AND",
    "slug": "pasta-de-amendoim-600g-cookies-and",
    "category": "saudaveis",
    "brand": "ROCK FOODS",
    "originalPrice": 68.75,
    "price": 55.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.9,
    "reviewCount": 1019,
    "stock": 43,
    "sold": 4139,
    "badges": [],
    "description": "Pasta de Amendoim 600g - Cookies AND",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "saudaveis"
    ]
  },
  {
    "id": 31,
    "name": "Alfajor Proteico - Leite em Pó",
    "slug": "alfajor-proteico-leite-em-p",
    "category": "saudaveis",
    "brand": "ROCK FOODS",
    "originalPrice": 124.88,
    "price": 99.9,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.6,
    "reviewCount": 2170,
    "stock": 67,
    "sold": 2101,
    "badges": [],
    "description": "Alfajor Proteico - Leite em Pó",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "saudaveis"
    ]
  },
  {
    "id": 32,
    "name": "Coenzima Q10 100 mg - 30 cápsulas",
    "slug": "coenzima-q10-100-mg-30-c-psulas",
    "category": "vitaminas",
    "brand": "KATIGUÁ",
    "originalPrice": 58.75,
    "price": 47.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.7,
    "reviewCount": 2316,
    "stock": 39,
    "sold": 4196,
    "badges": [],
    "description": "Coenzima Q10 100 mg - 30 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 33,
    "name": "Coenzima Q10 200 mg - 30 cápsulas",
    "slug": "coenzima-q10-200-mg-30-c-psulas",
    "category": "vitaminas",
    "brand": "KATIGUÁ",
    "originalPrice": 63.75,
    "price": 51.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.9,
    "reviewCount": 1346,
    "stock": 80,
    "sold": 1012,
    "badges": [],
    "description": "Coenzima Q10 200 mg - 30 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 34,
    "name": "Colágeno Verisol + Vit. Frutas Vermelhas - 240 g",
    "slug": "col-geno-verisol-vit-frutas-vermelhas-240-g",
    "category": "colageno",
    "brand": "KATIGUÁ",
    "originalPrice": 92.5,
    "price": 74.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.7,
    "reviewCount": 1124,
    "stock": 116,
    "sold": 1489,
    "badges": [],
    "description": "Colágeno Verisol + Vit. Frutas Vermelhas - 240 g",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "colageno"
    ]
  },
  {
    "id": 35,
    "name": "Colágeno Verisol + Ácido Hialurônico - Frutas Vermelhas",
    "slug": "col-geno-verisol-cido-hialur-nico-frutas-vermelhas",
    "category": "colageno",
    "brand": "KATIGUÁ",
    "originalPrice": 101.25,
    "price": 81.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.6,
    "reviewCount": 384,
    "stock": 82,
    "sold": 1805,
    "badges": [],
    "description": "Colágeno Verisol + Ácido Hialurônico - Frutas Vermelhas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "colageno"
    ]
  },
  {
    "id": 36,
    "name": "Colágeno Verisol + Vit. Tangerina - 240 mg",
    "slug": "col-geno-verisol-vit-tangerina-240-mg",
    "category": "colageno",
    "brand": "KATIGUÁ",
    "originalPrice": 92.5,
    "price": 74.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.5,
    "reviewCount": 680,
    "stock": 76,
    "sold": 1145,
    "badges": [],
    "description": "Colágeno Verisol + Vit. Tangerina - 240 mg",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "colageno"
    ]
  },
  {
    "id": 37,
    "name": "Colágeno Verisol + Vit. Tangerina - 30 sachês",
    "slug": "col-geno-verisol-vit-tangerina-30-sach-s",
    "category": "colageno",
    "brand": "KATIGUÁ",
    "originalPrice": 100.0,
    "price": 80.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.8,
    "reviewCount": 205,
    "stock": 92,
    "sold": 4612,
    "badges": [],
    "description": "Colágeno Verisol + Vit. Tangerina - 30 sachês",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "colageno"
    ]
  },
  {
    "id": 38,
    "name": "Creatina Creapure - 30 sachês (sem sabor)",
    "slug": "creatina-creapure-30-sach-s-sem-sabor",
    "category": "creatina",
    "brand": "KATIGUÁ",
    "originalPrice": 143.75,
    "price": 115.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.8,
    "reviewCount": 211,
    "stock": 20,
    "sold": 3484,
    "badges": [],
    "description": "Creatina Creapure - 30 sachês (sem sabor)",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "creatina"
    ]
  },
  {
    "id": 39,
    "name": "Cúrcuma + MSM - Dose Máxima",
    "slug": "c-rcuma-msm-dose-m-xima",
    "category": "encapsulados",
    "brand": "KATIGUÁ",
    "originalPrice": 50.0,
    "price": 40.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.6,
    "reviewCount": 1778,
    "stock": 115,
    "sold": 462,
    "badges": [],
    "description": "Cúrcuma + MSM - Dose Máxima",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "encapsulados"
    ]
  },
  {
    "id": 40,
    "name": "Fast Pure Melatonina - Maracujá 200 ml",
    "slug": "fast-pure-melatonina-maracuj-200-ml",
    "category": "encapsulados",
    "brand": "KATIGUÁ",
    "originalPrice": 27.5,
    "price": 22.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.6,
    "reviewCount": 1588,
    "stock": 28,
    "sold": 1220,
    "badges": [],
    "description": "Fast Pure Melatonina - Maracujá 200 ml",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "encapsulados"
    ]
  },
  {
    "id": 41,
    "name": "Magnésio Dimalato - 210 mg - 60 cápsulas",
    "slug": "magn-sio-dimalato-210-mg-60-c-psulas",
    "category": "vitaminas",
    "brand": "KATIGUÁ",
    "originalPrice": 35.0,
    "price": 28.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 5.0,
    "reviewCount": 1011,
    "stock": 19,
    "sold": 1813,
    "badges": [],
    "description": "Magnésio Dimalato - 210 mg - 60 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 42,
    "name": "Magnésio Quelato - 210 mg - 60 cápsulas",
    "slug": "magn-sio-quelato-210-mg-60-c-psulas",
    "category": "vitaminas",
    "brand": "KATIGUÁ",
    "originalPrice": 45.0,
    "price": 36.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.9,
    "reviewCount": 1692,
    "stock": 49,
    "sold": 3008,
    "badges": [],
    "description": "Magnésio Quelato - 210 mg - 60 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 43,
    "name": "Magnésio Taurato - 84 mg - 60 cápsulas",
    "slug": "magn-sio-taurato-84-mg-60-c-psulas",
    "category": "vitaminas",
    "brand": "KATIGUÁ",
    "originalPrice": 47.5,
    "price": 38.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.6,
    "reviewCount": 758,
    "stock": 81,
    "sold": 1008,
    "badges": [],
    "description": "Magnésio Taurato - 84 mg - 60 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 44,
    "name": "Magnésio Tripla Fonte - 500 mg - 60 cápsulas",
    "slug": "magn-sio-tripla-fonte-500-mg-60-c-psulas",
    "category": "vitaminas",
    "brand": "KATIGUÁ",
    "originalPrice": 36.25,
    "price": 29.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.6,
    "reviewCount": 1636,
    "stock": 52,
    "sold": 1670,
    "badges": [],
    "description": "Magnésio Tripla Fonte - 500 mg - 60 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 45,
    "name": "Magnésio 5 Fontes - Dose Máxima Biofoods - 60 cáps.",
    "slug": "magn-sio-5-fontes-dose-m-xima-biofoods-60-c-ps",
    "category": "vitaminas",
    "brand": "KATIGUÁ",
    "originalPrice": 51.25,
    "price": 41.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.9,
    "reviewCount": 2156,
    "stock": 20,
    "sold": 2522,
    "badges": [],
    "description": "260mg de 5 tipos de Magnésio",
    "nutritionTable": {
      "porcao": "2 caps",
      "valorEnergetico": "0 kcal",
      "carboidratos": "0g",
      "proteinas": "0g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 46,
    "name": "Melatonina + B6 - 210 mcg - 120 cápsulas",
    "slug": "melatonina-b6-210-mcg-120-c-psulas",
    "category": "encapsulados",
    "brand": "KATIGUÁ",
    "originalPrice": 31.25,
    "price": 25.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.7,
    "reviewCount": 1632,
    "stock": 114,
    "sold": 264,
    "badges": [],
    "description": "0.21mg Melatonina + Vit B6",
    "nutritionTable": {
      "porcao": "1 cap",
      "valorEnergetico": "0 kcal",
      "carboidratos": "0g",
      "proteinas": "0g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "encapsulados"
    ]
  },
  {
    "id": 47,
    "name": "Men 40 Viking - 600 mg - 30 cápsulas",
    "slug": "men-40-viking-600-mg-30-c-psulas",
    "category": "encapsulados",
    "brand": "KATIGUÁ",
    "originalPrice": 38.75,
    "price": 31.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.9,
    "reviewCount": 2037,
    "stock": 114,
    "sold": 2450,
    "badges": [],
    "description": "Men 40 Viking - 600 mg - 30 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "encapsulados"
    ]
  },
  {
    "id": 48,
    "name": "Óleo de Semente de Abóbora",
    "slug": "leo-de-semente-de-ab-bora",
    "category": "encapsulados",
    "brand": "KATIGUÁ",
    "originalPrice": 28.75,
    "price": 23.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.7,
    "reviewCount": 1905,
    "stock": 67,
    "sold": 2100,
    "badges": [],
    "description": "1000mg Óleo de Semente de Abóbora",
    "nutritionTable": {
      "porcao": "2 caps",
      "valorEnergetico": "18 kcal",
      "carboidratos": "0g",
      "proteinas": "0g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "encapsulados"
    ]
  },
  {
    "id": 49,
    "name": "Óleo de Semente de Abóbora - 1000 g - 60 cápsulas",
    "slug": "leo-de-semente-de-ab-bora-1000-g-60-c-psulas",
    "category": "encapsulados",
    "brand": "KATIGUÁ",
    "originalPrice": 43.75,
    "price": 35.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.7,
    "reviewCount": 669,
    "stock": 97,
    "sold": 4645,
    "badges": [],
    "description": "1000mg Óleo de Semente de Abóbora",
    "nutritionTable": {
      "porcao": "2 caps",
      "valorEnergetico": "18 kcal",
      "carboidratos": "0g",
      "proteinas": "0g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "encapsulados"
    ]
  },
  {
    "id": 50,
    "name": "Ômega 3 Tripla Fonte 1000 mg - 120 cápsulas",
    "slug": "mega-3-tripla-fonte-1000-mg-120-c-psulas",
    "category": "vitaminas",
    "brand": "KATIGUÁ",
    "originalPrice": 33.75,
    "price": 27.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.7,
    "reviewCount": 2474,
    "stock": 40,
    "sold": 553,
    "badges": [],
    "description": "Ômega 3 Tripla Fonte 1000 mg - 120 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 51,
    "name": "Ômega 3 Tripla Fonte 1000 mg - 180 cápsulas",
    "slug": "mega-3-tripla-fonte-1000-mg-180-c-psulas",
    "category": "vitaminas",
    "brand": "KATIGUÁ",
    "originalPrice": 45.0,
    "price": 36.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.9,
    "reviewCount": 1177,
    "stock": 90,
    "sold": 1230,
    "badges": [],
    "description": "Ômega 3 Tripla Fonte 1000 mg - 180 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 52,
    "name": "Ômega 3 Tripla Fonte 1000 mg - 240 cápsulas",
    "slug": "mega-3-tripla-fonte-1000-mg-240-c-psulas",
    "category": "vitaminas",
    "brand": "KATIGUÁ",
    "originalPrice": 58.75,
    "price": 47.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 5.0,
    "reviewCount": 1189,
    "stock": 57,
    "sold": 2927,
    "badges": [],
    "description": "Ômega 3 Tripla Fonte 1000 mg - 240 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 53,
    "name": "Ômega 3 Tripla Fonte 1000 mg - 60 cápsulas",
    "slug": "mega-3-tripla-fonte-1000-mg-60-c-psulas",
    "category": "vitaminas",
    "brand": "KATIGUÁ",
    "originalPrice": 23.75,
    "price": 19.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.7,
    "reviewCount": 1057,
    "stock": 87,
    "sold": 3286,
    "badges": [],
    "description": "Ômega 3 Tripla Fonte 1000 mg - 60 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 54,
    "name": "Ômega com Meg-3 540/360 + Vitamina E - 60 cápsulas",
    "slug": "mega-com-meg-3-540-360-vitamina-e-60-c-psulas",
    "category": "vitaminas",
    "brand": "KATIGUÁ",
    "originalPrice": 51.25,
    "price": 41.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.9,
    "reviewCount": 503,
    "stock": 101,
    "sold": 1136,
    "badges": [],
    "description": "Ômega com Meg-3 540/360 + Vitamina E - 60 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 55,
    "name": "Ômega 3 IG 50 EPA 360 DHA + Vitamina E - 60 cápsulas",
    "slug": "mega-3-ig-50-epa-360-dha-vitamina-e-60-c-psulas",
    "category": "vitaminas",
    "brand": "KATIGUÁ",
    "originalPrice": 55.0,
    "price": 44.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.8,
    "reviewCount": 902,
    "stock": 110,
    "sold": 4746,
    "badges": [],
    "description": "Ômega 3 IG 50 EPA 360 DHA + Vitamina E - 60 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 56,
    "name": "Ômega 3 IG 540 EPA 360 DHA + Biofoods - 120 cápsulas",
    "slug": "mega-3-ig-540-epa-360-dha-biofoods-120-c-psulas",
    "category": "vitaminas",
    "brand": "KATIGUÁ",
    "originalPrice": 55.0,
    "price": 44.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.9,
    "reviewCount": 662,
    "stock": 20,
    "sold": 3044,
    "badges": [],
    "description": "Ômega 3 IG 540 EPA 360 DHA + Biofoods - 120 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 57,
    "name": "Ômega 3 540 EPA 360 DHA 1000 mg - 60 cápsulas",
    "slug": "mega-3-540-epa-360-dha-1000-mg-60-c-psulas",
    "category": "vitaminas",
    "brand": "KATIGUÁ",
    "originalPrice": 33.75,
    "price": 27.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.8,
    "reviewCount": 1853,
    "stock": 101,
    "sold": 418,
    "badges": [],
    "description": "Ômega 3 540 EPA 360 DHA 1000 mg - 60 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 58,
    "name": "Ômega 3 540 EPA 360 DHA 1000 mg - 120 cápsulas",
    "slug": "mega-3-540-epa-360-dha-1000-mg-120-c-psulas",
    "category": "vitaminas",
    "brand": "KATIGUÁ",
    "originalPrice": 57.5,
    "price": 46.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.7,
    "reviewCount": 1063,
    "stock": 110,
    "sold": 3678,
    "badges": [],
    "description": "Ômega 3 540 EPA 360 DHA 1000 mg - 120 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 59,
    "name": "Ômega 3 540 EPA 360 DHA 1000 mg - 180 cápsulas",
    "slug": "mega-3-540-epa-360-dha-1000-mg-180-c-psulas",
    "category": "vitaminas",
    "brand": "KATIGUÁ",
    "originalPrice": 86.25,
    "price": 69.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.8,
    "reviewCount": 2078,
    "stock": 73,
    "sold": 3297,
    "badges": [],
    "description": "Ômega 3 540 EPA 360 DHA 1000 mg - 180 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 60,
    "name": "Ômega 3 540 EPA 360 DHA 1000 mg - 240 cápsulas",
    "slug": "mega-3-540-epa-360-dha-1000-mg-240-c-psulas",
    "category": "vitaminas",
    "brand": "KATIGUÁ",
    "originalPrice": 111.25,
    "price": 89.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.7,
    "reviewCount": 2471,
    "stock": 57,
    "sold": 1487,
    "badges": [],
    "description": "Ômega 3 540 EPA 360 DHA 1000 mg - 240 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 61,
    "name": "Própolis Verde - 30 cápsulas",
    "slug": "pr-polis-verde-30-c-psulas",
    "category": "encapsulados",
    "brand": "KATIGUÁ",
    "originalPrice": 31.25,
    "price": 25.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.6,
    "reviewCount": 103,
    "stock": 44,
    "sold": 1694,
    "badges": [],
    "description": "Própolis Verde - 30 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "encapsulados"
    ]
  },
  {
    "id": 62,
    "name": "Multivitamínico A-Z - 30 cápsulas",
    "slug": "multivitam-nico-a-z-30-c-psulas",
    "category": "vitaminas",
    "brand": "KATIGUÁ",
    "originalPrice": 12.5,
    "price": 10.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.8,
    "reviewCount": 107,
    "stock": 55,
    "sold": 1546,
    "badges": [],
    "description": "100% IDR de Vitaminas e Minerais",
    "nutritionTable": {
      "porcao": "1 cap",
      "valorEnergetico": "0 kcal",
      "carboidratos": "0g",
      "proteinas": "0g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 63,
    "name": "Picolinato de Cromo - 30 cápsulas",
    "slug": "picolinato-de-cromo-30-c-psulas",
    "category": "encapsulados",
    "brand": "KATIGUÁ",
    "originalPrice": 15.0,
    "price": 12.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.5,
    "reviewCount": 1362,
    "stock": 86,
    "sold": 2276,
    "badges": [],
    "description": "Picolinato de Cromo - 30 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "encapsulados"
    ]
  },
  {
    "id": 64,
    "name": "Vitamina C - 1000 mg - 30 cápsulas",
    "slug": "vitamina-c-1000-mg-30-c-psulas",
    "category": "vitaminas",
    "brand": "KATIGUÁ",
    "originalPrice": 22.5,
    "price": 18.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.7,
    "reviewCount": 2299,
    "stock": 58,
    "sold": 2086,
    "badges": [],
    "description": "Vitamina C - 1000 mg - 30 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 65,
    "name": "Vitamina D - 2000 UI - 30 cápsulas",
    "slug": "vitamina-d-2000-ui-30-c-psulas",
    "category": "vitaminas",
    "brand": "KATIGUÁ",
    "originalPrice": 16.25,
    "price": 13.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.8,
    "reviewCount": 2399,
    "stock": 24,
    "sold": 1326,
    "badges": [],
    "description": "Vitamina D - 2000 UI - 30 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 66,
    "name": "Vitamina E - 400 mg - Softgel - 30 cápsulas",
    "slug": "vitamina-e-400-mg-softgel-30-c-psulas",
    "category": "vitaminas",
    "brand": "KATIGUÁ",
    "originalPrice": 20.0,
    "price": 16.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.8,
    "reviewCount": 2408,
    "stock": 80,
    "sold": 2456,
    "badges": [],
    "description": "Vitamina E - 400 mg - Softgel - 30 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 67,
    "name": "Acetilcisteína 600 mg + Vit. C + D3 + Zinco - 16 cáp.",
    "slug": "acetilciste-na-600-mg-vit-c-d3-zinco-16-c-p",
    "category": "aminoacidos",
    "brand": "KATIGUÁ",
    "originalPrice": 21.25,
    "price": 17.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.8,
    "reviewCount": 2476,
    "stock": 49,
    "sold": 4906,
    "badges": [],
    "description": "Acetilcisteína 600 mg + Vit. C + D3 + Zinco - 16 cáp.",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "aminoacidos"
    ]
  },
  {
    "id": 68,
    "name": "Acetilcisteína 600 mg x 5 g - 16 sachês",
    "slug": "acetilciste-na-600-mg-x-5-g-16-sach-s",
    "category": "aminoacidos",
    "brand": "KATIGUÁ",
    "originalPrice": 21.25,
    "price": 17.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.9,
    "reviewCount": 52,
    "stock": 50,
    "sold": 2882,
    "badges": [],
    "description": "Acetilcisteína 600 mg x 5 g - 16 sachês",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "aminoacidos"
    ]
  },
  {
    "id": 69,
    "name": "Beta Alanina 300 mg - 120 cápsulas",
    "slug": "beta-alanina-300-mg-120-c-psulas",
    "category": "aminoacidos",
    "brand": "KATIGUÁ",
    "originalPrice": 31.25,
    "price": 25.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.7,
    "reviewCount": 2021,
    "stock": 62,
    "sold": 2710,
    "badges": [],
    "description": "Beta Alanina 300 mg - 120 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "aminoacidos"
    ]
  },
  {
    "id": 70,
    "name": "Biotina Dose Máxima 500 mg - 60 cápsulas",
    "slug": "biotina-dose-m-xima-500-mg-60-c-psulas",
    "category": "vitaminas",
    "brand": "KATIGUÁ",
    "originalPrice": 18.75,
    "price": 15.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.7,
    "reviewCount": 1974,
    "stock": 39,
    "sold": 3534,
    "badges": [],
    "description": "Biotina Dose Máxima 500 mg - 60 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 71,
    "name": "Metilcobalamina Dose Máxima - 60 cápsulas",
    "slug": "metilcobalamina-dose-m-xima-60-c-psulas",
    "category": "vitaminas",
    "brand": "KATIGUÁ",
    "originalPrice": 21.25,
    "price": 17.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.9,
    "reviewCount": 41,
    "stock": 29,
    "sold": 172,
    "badges": [],
    "description": "Metilcobalamina Dose Máxima - 60 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 72,
    "name": "Cafeína Sports 100 mg - 120 cápsulas",
    "slug": "cafe-na-sports-100-mg-120-c-psulas",
    "category": "termogenicos",
    "brand": "KATIGUÁ",
    "originalPrice": 43.75,
    "price": 35.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.7,
    "reviewCount": 1795,
    "stock": 61,
    "sold": 1074,
    "badges": [],
    "description": "Cafeína Sports 100 mg - 120 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "termogenicos"
    ]
  },
  {
    "id": 73,
    "name": "Cafeína Sports - 60 cápsulas",
    "slug": "cafe-na-sports-60-c-psulas",
    "category": "termogenicos",
    "brand": "KATIGUÁ",
    "originalPrice": 33.75,
    "price": 27.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.6,
    "reviewCount": 612,
    "stock": 115,
    "sold": 4352,
    "badges": [],
    "description": "Cafeína Sports - 60 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "termogenicos"
    ]
  },
  {
    "id": 74,
    "name": "Creatina Monohidratada - 300 g",
    "slug": "creatina-monohidratada-300-g",
    "category": "creatina",
    "brand": "KATIGUÁ",
    "originalPrice": 48.75,
    "price": 39.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.6,
    "reviewCount": 693,
    "stock": 78,
    "sold": 2059,
    "badges": [],
    "description": "Creatina Monohidratada - 300 g",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "creatina"
    ]
  },
  {
    "id": 75,
    "name": "Cálcio 500 mg - 60 cápsulas",
    "slug": "c-lcio-500-mg-60-c-psulas",
    "category": "vitaminas",
    "brand": "KATIGUÁ",
    "originalPrice": 20.0,
    "price": 16.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.7,
    "reviewCount": 870,
    "stock": 63,
    "sold": 4229,
    "badges": [],
    "description": "Cálcio 500 mg - 60 cápsulas",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 76,
    "name": "100% Pure Whey Puretech - Baunilha - 900g",
    "slug": "100-pure-whey-puretech-baunilha-900g",
    "category": "whey-protein",
    "brand": "CRN NUTRITION",
    "originalPrice": 100.0,
    "price": 80.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.7,
    "reviewCount": 37,
    "stock": 86,
    "sold": 551,
    "badges": [],
    "description": "Whey Concentrado 2W",
    "nutritionTable": {
      "porcao": "33g",
      "valorEnergetico": "130 kcal",
      "carboidratos": "4.1g",
      "proteinas": "24g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "whey-protein"
    ]
  },
  {
    "id": 77,
    "name": "100% Pure Whey Puretech - Chocolate - 900g",
    "slug": "100-pure-whey-puretech-chocolate-900g",
    "category": "whey-protein",
    "brand": "CRN NUTRITION",
    "originalPrice": 100.0,
    "price": 80.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.9,
    "reviewCount": 2426,
    "stock": 15,
    "sold": 1288,
    "badges": [],
    "description": "Whey Concentrado 2W",
    "nutritionTable": {
      "porcao": "33g",
      "valorEnergetico": "130 kcal",
      "carboidratos": "4.1g",
      "proteinas": "24g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "whey-protein"
    ]
  },
  {
    "id": 78,
    "name": "100% Pure Whey Puretech - Morango - 900g",
    "slug": "100-pure-whey-puretech-morango-900g",
    "category": "whey-protein",
    "brand": "CRN NUTRITION",
    "originalPrice": 100.0,
    "price": 80.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.6,
    "reviewCount": 2346,
    "stock": 44,
    "sold": 2390,
    "badges": [],
    "description": "Whey Concentrado 2W",
    "nutritionTable": {
      "porcao": "33g",
      "valorEnergetico": "130 kcal",
      "carboidratos": "4.1g",
      "proteinas": "24g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "whey-protein"
    ]
  },
  {
    "id": 79,
    "name": "Creatina 100% Pure - 300g - Puretech",
    "slug": "creatina-100-pure-300g-puretech",
    "category": "creatina",
    "brand": "CRN NUTRITION",
    "originalPrice": 60.0,
    "price": 48.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.6,
    "reviewCount": 327,
    "stock": 92,
    "sold": 3863,
    "badges": [],
    "description": "3g Creatina Monohidratada",
    "nutritionTable": {
      "porcao": "3g",
      "valorEnergetico": "0 kcal",
      "carboidratos": "0g",
      "proteinas": "0g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "creatina"
    ]
  },
  {
    "id": 80,
    "name": "Beta Alanina - 200 g",
    "slug": "beta-alanina-200-g",
    "category": "aminoacidos",
    "brand": "CANIBAL INC",
    "originalPrice": 100.0,
    "price": 80.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.9,
    "reviewCount": 108,
    "stock": 17,
    "sold": 1398,
    "badges": [],
    "description": "2000mg Beta-Alanina",
    "nutritionTable": {
      "porcao": "2g",
      "valorEnergetico": "0 kcal",
      "carboidratos": "0g",
      "proteinas": "0g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "aminoacidos"
    ]
  },
  {
    "id": 81,
    "name": "Creatine Monohydrate - 300 g",
    "slug": "creatine-monohydrate-300-g",
    "category": "creatina",
    "brand": "CANIBAL INC",
    "originalPrice": 103.75,
    "price": 83.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.9,
    "reviewCount": 2083,
    "stock": 62,
    "sold": 859,
    "badges": [],
    "description": "Creatina Monohidratada",
    "nutritionTable": {
      "porcao": "3g",
      "valorEnergetico": "0 kcal",
      "carboidratos": "0g",
      "proteinas": "0g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "creatina"
    ]
  },
  {
    "id": 82,
    "name": "Chef Whey 800g - Doce de Leite",
    "slug": "chef-whey-800g-doce-de-leite",
    "category": "whey-protein",
    "brand": "CHEF",
    "originalPrice": 306.25,
    "price": 245.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.8,
    "reviewCount": 902,
    "stock": 65,
    "sold": 3616,
    "badges": [],
    "description": "Chef Whey 800g - Doce de Leite",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "whey-protein"
    ]
  },
  {
    "id": 83,
    "name": "Whey 800g - Coco c/ Leite Condensado",
    "slug": "whey-800g-coco-c-leite-condensado",
    "category": "whey-protein",
    "brand": "CHEF",
    "originalPrice": 306.25,
    "price": 245.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.8,
    "reviewCount": 934,
    "stock": 98,
    "sold": 360,
    "badges": [],
    "description": "Whey 800g - Coco c/ Leite Condensado",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "whey-protein"
    ]
  },
  {
    "id": 84,
    "name": "Thermo Active - 60 cápsulas - 47 g",
    "slug": "thermo-active-60-c-psulas-47-g",
    "category": "termogenicos",
    "brand": "BODY NUTRY",
    "originalPrice": 50.0,
    "price": 40.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.8,
    "reviewCount": 2159,
    "stock": 103,
    "sold": 1632,
    "badges": [],
    "description": "420mg Cafeína",
    "nutritionTable": {
      "porcao": "2 caps",
      "valorEnergetico": "0 kcal",
      "carboidratos": "0g",
      "proteinas": "0g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "termogenicos"
    ]
  },
  {
    "id": 85,
    "name": "Vitamina D3 - 60 cápsulas - 37 g",
    "slug": "vitamina-d3-60-c-psulas-37-g",
    "category": "vitaminas",
    "brand": "NATURAL FOODS",
    "originalPrice": 30.0,
    "price": 24.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.6,
    "reviewCount": 1410,
    "stock": 69,
    "sold": 4578,
    "badges": [],
    "description": "Vitamina D3 - 60 cápsulas - 37 g",
    "nutritionTable": {
      "porcao": "",
      "valorEnergetico": "",
      "carboidratos": "",
      "proteinas": ""
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "vitaminas"
    ]
  },
  {
    "id": 86,
    "name": "Evora - 300 g - Laranja",
    "slug": "evora-300-g-laranja",
    "category": "pre-treino",
    "brand": "DARKNESS",
    "originalPrice": 43.75,
    "price": 35.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.9,
    "reviewCount": 481,
    "stock": 25,
    "sold": 1821,
    "badges": [],
    "description": "400mg Cafeína / 2g Beta-Alanina",
    "nutritionTable": {
      "porcao": "5g",
      "valorEnergetico": "0 kcal",
      "carboidratos": "0g",
      "proteinas": "0g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "pre-treino"
    ]
  },
  {
    "id": 87,
    "name": "Tomahawk Pré-Treino Workout - 380 g - Tangerina",
    "slug": "tomahawk-pr-treino-workout-380-g-tangerina",
    "category": "pre-treino",
    "brand": "FULLLIFE",
    "originalPrice": 111.25,
    "price": 89.0,
    "discount": 20,
    "pix": null,
    "flavors": [],
    "sizes": [],
    "rating": 4.9,
    "reviewCount": 931,
    "stock": 82,
    "sold": 4803,
    "badges": [],
    "description": "400mg Cafeína / Arginina",
    "nutritionTable": {
      "porcao": "10g",
      "valorEnergetico": "15 kcal",
      "carboidratos": "2g",
      "proteinas": "0g"
    },
    "images": [
      "img/produtos/default.jpg"
    ],
    "isNew": false,
    "isOutlet": false,
    "tags": [
      "pre-treino"
    ]
  }
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

// ── Admin Override: merge localStorage edits on top of static data ──
(function applyAdminOverrides() {
 try {
  // Products
  localStorage.removeItem('needway-products-override');
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
