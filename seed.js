const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Hack to load NeedwayData from the vanilla JS file
const dataJsPath = path.join(__dirname, 'public', 'js', 'data.js');
let dataContent = fs.readFileSync(dataJsPath, 'utf8');

// Stop before the applyAdminOverrides code which contains syntax that errors in this regex
const truncatePos = dataContent.indexOf('// ── Admin Override');
if(truncatePos !== -1) dataContent = dataContent.substring(0, truncatePos);

const match = dataContent.match(/const NeedwayData = (\{[\s\S]*?\n\};)/);

if (!match) {
    console.error("Could not parse NeedwayData from data.js");
    process.exit(1);
}

let NeedwayData;
eval(`NeedwayData = ${match[1]}`);

async function seed() {
    try {
        const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
        await pool.query(schema);
        console.log("Schema created successfully.");
        
        // Insert Categories
        for (const cat of NeedwayData.categories) {
            await pool.query(
                `INSERT INTO categories (name, slug, icon, image, "count") VALUES ($1, $2, $3, $4, $5)
                 ON CONFLICT (slug) DO NOTHING`,
                [cat.name, cat.slug, cat.icon, cat.image, cat.count || 0]
            );
        }
        console.log("Categories seeded.");

        // Insert Products
        for (const p of NeedwayData.products) {
            // Garante que a categoria exista, caso tenha sido auto-gerada pelo gerador e n\u00E3o exista no Array nativo
            await pool.query(
                `INSERT INTO categories (name, slug, icon, image, "count") VALUES ($1, $2, $3, $4, $5)
                 ON CONFLICT (slug) DO NOTHING`,
                [p.category, p.category, '', '', 0]
            );

            await pool.query(
                `INSERT INTO products (name, slug, category_slug, brand, original_price, price, discount, rating, review_count, stock, sold, description, nutrition_table, images, is_new, is_outlet, tags, flavors, sizes)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
                 ON CONFLICT (slug) DO NOTHING`,
                [
                    p.name, p.slug, p.category, p.brand, p.originalPrice, p.price, p.discount, p.rating, p.reviewCount, p.stock, p.sold, p.description, JSON.stringify(p.nutritionTable || {}), JSON.stringify(p.images || []), p.isNew, p.isOutlet, JSON.stringify(p.tags || []), JSON.stringify(p.flavors || []), JSON.stringify(p.sizes || [])
                ]
            );
        }
        console.log("Products seeded.");

        // Insert Coupons
        for (const c of NeedwayData.coupons) {
            await pool.query(
                `INSERT INTO coupons (code, type, value, min_order, description) VALUES ($1, $2, $3, $4, $5)
                 ON CONFLICT (code) DO NOTHING`,
                [c.code, c.type, c.value, c.minOrder || 0, c.description]
            );
        }
        console.log("Coupons seeded.");
        
        console.log("Database Seed Complete! You are ready to go.");
    } catch (err) {
        console.error("Seed error:", err);
    } finally {
        pool.end();
    }
}

if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is missing from .env!");
    process.exit(1);
}

seed();
