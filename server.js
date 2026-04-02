const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/api/coupons', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM coupons ORDER BY id ASC');
    const coupons = result.rows.map(row => ({
      id: row.id,
      code: row.code,
      type: row.type,
      value: Number(row.value),
      minOrder: Number(row.min_order),
      description: row.description
    }));
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Admin API Routes
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
