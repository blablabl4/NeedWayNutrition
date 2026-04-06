require('dotenv').config();
const db = require('./db');

(async () => {
    try {
        const p = {
            "id": 1,
            "name": "Recharge 1kg - Chocolate",
            "slug": "recharge-1kg-chocolate",
            "category": "",
            "brand": "DUX",
            "originalPrice": 123.75,
            "price": 99,
            "discount": 20,
            "rating": 4.9,
            "reviewCount": 1965,
            "stock": 17,
            "sold": 2133,
            "description": "Eletrólitos + Vitaminas",
            "nutritionTable": {},
            "images": ["img/produtos/default.jpg"],
            "isNew": false,
            "isOutlet": false,
            "tags": ["musculacao"],
            "flavors": [],
            "sizes": [],
            "badges": ["best-seller", "new"],
            "active": true
        };
        
        await db.query(
            `UPDATE products SET 
              name = $1, slug = $2, category_slug = $3, brand = $4,
              original_price = $5, price = $6, discount = $7, stock = $8,
              description = $9, nutrition_table = $10, images = $11,
              is_new = $12, is_outlet = $13, tags = $14,
              flavors = $15, sizes = $16, sold = $17, badges = $18
            WHERE id = $19`,
            [p.name, p.slug || '', p.category || null, p.brand || '', p.originalPrice || 0, p.price || 0, p.discount || 0, p.stock || 0, p.description || '', JSON.stringify(p.nutritionTable || {}), JSON.stringify(p.images || []), p.isNew || false, p.isOutlet || false, JSON.stringify(p.tags || []), JSON.stringify(p.flavors || []), JSON.stringify(p.sizes || []), p.sold || 0, JSON.stringify(p.badges || []), p.id]
        );
        console.log("Success! Updated without errors.");
    } catch(e) {
        console.error("Query Error:", e.message);
        console.error("Detail:", e.detail);
        console.error("Hint:", e.hint);
    }
    process.exit(0);
})();
