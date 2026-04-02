const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ── Auto-create tables ──
(async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS banners (
        id SERIAL PRIMARY KEY,
        position VARCHAR(50) DEFAULT 'hero',
        title TEXT, subtitle TEXT,
        cta_text VARCHAR(255), cta_link VARCHAR(255),
        bg TEXT, image TEXT, coupon_style VARCHAR(50),
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    await db.query(`
      CREATE TABLE IF NOT EXISTS settings (
        key VARCHAR(100) PRIMARY KEY,
        value TEXT
      )
    `);
    await db.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255),
        phone VARCHAR(50),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    // Migrations: add columns if missing
    try { await db.query(`ALTER TABLE coupons ADD COLUMN IF NOT EXISTS color VARCHAR(20) DEFAULT '#f97316'`); } catch(e) {}
    try { await db.query(`ALTER TABLE coupons ADD COLUMN IF NOT EXISTS show_banner BOOLEAN DEFAULT true`); } catch(e) {}
    try { await db.query(`ALTER TABLE coupons ADD COLUMN IF NOT EXISTS expires VARCHAR(50)`); } catch(e) {}
    try { await db.query(`ALTER TABLE categories ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true`); } catch(e) {}
    try { await db.query(`ALTER TABLE categories ADD COLUMN IF NOT EXISTS image TEXT`); } catch(e) {}
    console.log('All tables ready');
  } catch(e) { console.error('Table creation error:', e.message); }
})();

// Basic API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Needway API is running' });
});

app.get('/api/products', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM products ORDER BY id ASC');
    // Mapear os campos no formato camelCase para evitar reescrever o frontend inteiro
    const products = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      category: row.category_slug,
      brand: row.brand,
      originalPrice: Number(row.original_price),
      price: Number(row.price),
      discount: row.discount,
      rating: Number(row.rating) || 5,
      reviewCount: Number(row.review_count) || 0,
      stock: Number(row.stock) || 0,
      sold: Number(row.sold) || 0,
      description: row.description,
      nutritionTable: row.nutrition_table,
      images: row.images || [],
      isNew: Boolean(row.is_new),
      isOutlet: Boolean(row.is_outlet),
      tags: row.tags || [],
      flavors: row.flavors || [],
      sizes: row.sizes || [],
      badges: (function() {
        let b = [];
        if (row.is_new) b.push('new');
        if (row.is_outlet) b.push('outlet');
        if (row.sold > 1500 && !row.is_outlet) b.push('hot');
        else if (row.sold > 500 && !row.is_outlet) b.push('best-seller');
        return b;
      })()
    }));
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// ── Categories CRUD ──
app.get('/api/categories', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM categories ORDER BY count DESC');
    res.json(result.rows.map(r => ({
      id: r.id, name: r.name, slug: r.slug || r.id,
      count: Number(r.count) || 0, image: r.image || '', active: r.active !== false
    })));
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const c = req.body;
    const slug = c.slug || c.id || c.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-');
    await db.query(
      `INSERT INTO categories (id, name, slug, count, image, active) VALUES ($1, $2, $3, $4, $5, $6)`,
      [slug, c.name, slug, c.count || 0, c.image || '', c.active !== false]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Falha ao criar categoria' });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    const c = req.body;
    await db.query(`UPDATE categories SET name=$1, image=$2, active=$3 WHERE id=$4`,
      [c.name, c.image || '', c.active !== false, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Falha ao atualizar categoria' });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM categories WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Falha ao deletar categoria' });
  }
});

// ── Coupons CRUD ──
app.get('/api/coupons', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM coupons ORDER BY id ASC');
    const coupons = result.rows.map(row => ({
      id: row.id,
      code: row.code,
      type: row.type,
      value: Number(row.value),
      minOrder: Number(row.min_order),
      description: row.description,
      color: row.color || '#f97316',
      show_banner: row.show_banner !== false
    }));
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.post('/api/coupons', async (req, res) => {
  try {
    const c = req.body;
    await db.query(
      `INSERT INTO coupons (code, type, value, min_order, description, color, show_banner)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [c.code, c.type, c.value || 0, c.minOrder || 0, c.description || '', c.color || '#f97316', c.show_banner !== false]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Falha ao criar cupom' });
  }
});

app.put('/api/coupons/:id', async (req, res) => {
  try {
    const c = req.body;
    await db.query(
      `UPDATE coupons SET code=$1, type=$2, value=$3, min_order=$4, description=$5, color=$6, show_banner=$7 WHERE id=$8`,
      [c.code, c.type, c.value || 0, c.minOrder || 0, c.description || '', c.color || '#f97316', c.show_banner !== false, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Falha ao atualizar cupom' });
  }
});

app.delete('/api/coupons/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM coupons WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Falha ao deletar cupom' });
  }
});

// ── Banners CRUD ──
app.get('/api/banners', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM banners ORDER BY id ASC');
    const banners = result.rows.map(row => ({
      id: row.id,
      position: row.position || 'hero',
      title: row.title || '',
      subtitle: row.subtitle || '',
      ctaText: row.cta_text || '',
      ctaLink: row.cta_link || '',
      bg: row.bg || '',
      image: row.image || '',
      couponStyle: row.coupon_style || '',
      active: row.active !== false
    }));
    res.json(banners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.post('/api/banners', async (req, res) => {
  try {
    const b = req.body;
    const result = await db.query(
      `INSERT INTO banners (position, title, subtitle, cta_text, cta_link, bg, image, coupon_style, active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
      [b.position || 'hero', b.title || '', b.subtitle || '', b.ctaText || '', b.ctaLink || '', b.bg || '', b.image || '', b.couponStyle || '', b.active !== false]
    );
    res.json({ success: true, id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Falha ao criar banner' });
  }
});

app.put('/api/banners/:id', async (req, res) => {
  try {
    const b = req.body;
    await db.query(
      `UPDATE banners SET position=$1, title=$2, subtitle=$3, cta_text=$4, cta_link=$5, bg=$6, image=$7, coupon_style=$8, active=$9 WHERE id=$10`,
      [b.position || 'hero', b.title || '', b.subtitle || '', b.ctaText || '', b.ctaLink || '', b.bg || '', b.image || '', b.couponStyle || '', b.active !== false, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Falha ao atualizar banner' });
  }
});

app.delete('/api/banners/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM banners WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Falha ao deletar banner' });
  }
});

// ── Products CRUD ──
app.put('/api/products/:id', async (req, res) => {
  try {
    const p = req.body;
    await db.query(
      `UPDATE products SET 
        name = $1, slug = $2, category_slug = $3, brand = $4,
        original_price = $5, price = $6, discount = $7, stock = $8,
        description = $9, nutrition_table = $10, images = $11,
        is_new = $12, is_outlet = $13, tags = $14,
        flavors = $15, sizes = $16, sold = $17
      WHERE id = $18`,
      [p.name, p.slug || '', p.category || '', p.brand || '', p.originalPrice || 0, p.price || 0, p.discount || 0, p.stock || 0, p.description || '', JSON.stringify(p.nutritionTable || {}), JSON.stringify(p.images || []), p.isNew || false, p.isOutlet || false, JSON.stringify(p.tags || []), JSON.stringify(p.flavors || []), JSON.stringify(p.sizes || []), p.sold || 0, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Falha ao atualizar produto' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const p = req.body;
    await db.query(
      `INSERT INTO products (name, slug, category_slug, brand, original_price, price, discount, stock, description, nutrition_table, images, is_new, is_outlet, tags, flavors, sizes, rating, review_count, sold)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`,
      [p.name, p.slug || '', p.category || '', p.brand || '', p.originalPrice || 0, p.price || 0, p.discount || 0, p.stock || 0, p.description || '', JSON.stringify(p.nutritionTable || {}), JSON.stringify(p.images || []), p.isNew || false, p.isOutlet || false, JSON.stringify(p.tags || []), JSON.stringify(p.flavors || []), JSON.stringify(p.sizes || []), p.rating || 5.0, p.reviewCount || 0, p.sold || 0]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Falha ao criar produto' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await db.query(`DELETE FROM products WHERE id = $1`, [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Falha ao deletar produto' });
  }
});

// ── Settings (key-value store) ──
app.get('/api/settings', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM settings');
    const obj = {};
    result.rows.forEach(r => { try { obj[r.key] = JSON.parse(r.value); } catch(e) { obj[r.key] = r.value; } });
    res.json(obj);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.put('/api/settings', async (req, res) => {
  try {
    const settings = req.body;
    for (const [key, value] of Object.entries(settings)) {
      const val = typeof value === 'string' ? value : JSON.stringify(value);
      await db.query(
        `INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2`,
        [key, val]
      );
    }
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Falha ao salvar configurações' });
  }
});

// ── Leads ──
app.get('/api/leads', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM leads ORDER BY created_at DESC');
    res.json(result.rows.map(r => ({ id: r.id, email: r.email, phone: r.phone, date: r.created_at })));
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.post('/api/leads', async (req, res) => {
  try {
    const { email, phone } = req.body;
    await db.query('INSERT INTO leads (email, phone) VALUES ($1, $2)', [email || '', phone || '']);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Falha ao salvar lead' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
