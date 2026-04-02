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

// ── Auto-create banners table if not exists ──
(async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS banners (
        id SERIAL PRIMARY KEY,
        position VARCHAR(50) DEFAULT 'hero',
        title TEXT,
        subtitle TEXT,
        cta_text VARCHAR(255),
        cta_link VARCHAR(255),
        bg TEXT,
        image TEXT,
        coupon_style VARCHAR(50),
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('Banners table ready');
  } catch(e) { console.error('Banner table creation error:', e.message); }
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

app.get('/api/categories', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM categories ORDER BY count DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
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
        name = $1, 
        price = $2, 
        original_price = $3, 
        discount = $4, 
        stock = $5,
        description = $6
      WHERE id = $7`,
      [p.name, p.price, p.originalPrice, p.discount, p.stock, p.description, req.params.id]
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
      [p.name, p.slug || 'novo-prod', p.category || 'kits', p.brand || '', p.originalPrice || 0, p.price || 0, p.discount || 0, p.stock || 0, p.description || '', JSON.stringify({}), JSON.stringify(['img/produtos/default.jpg']), false, false, JSON.stringify([]), JSON.stringify([]), JSON.stringify([]), 5.0, 0, 0]
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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
