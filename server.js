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
      rating: Number(row.rating),
      reviewCount: row.review_count,
      stock: row.stock,
      sold: row.sold,
      description: row.description,
      nutritionTable: row.nutrition_table,
      images: row.images,
      isNew: row.is_new,
      isOutlet: row.is_outlet,
      tags: row.tags,
      flavors: row.flavors,
      sizes: row.sizes
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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
