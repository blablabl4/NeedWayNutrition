CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    icon VARCHAR(255),
    image VARCHAR(255),
    "count" INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category_slug VARCHAR(255) REFERENCES categories(slug) ON DELETE SET NULL,
    brand VARCHAR(255) NOT NULL,
    original_price DECIMAL(10, 2),
    price DECIMAL(10, 2) NOT NULL,
    discount INTEGER DEFAULT 0,
    rating DECIMAL(2, 1) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    stock INTEGER DEFAULT 0,
    sold INTEGER DEFAULT 0,
    description TEXT,
    nutrition_table JSONB,
    images JSONB,
    is_new BOOLEAN DEFAULT false,
    is_outlet BOOLEAN DEFAULT false,
    tags JSONB,
    flavors JSONB,
    sizes JSONB
);

CREATE TABLE IF NOT EXISTS coupons (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    type VARCHAR(50) NOT NULL,
    value DECIMAL(10, 2) NOT NULL,
    min_order DECIMAL(10, 2) DEFAULT 0,
    description TEXT
);
