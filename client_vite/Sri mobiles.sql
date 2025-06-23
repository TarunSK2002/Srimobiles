-- Create database if not exists
CREATE DATABASE IF NOT EXISTS Sri_mobiles;
USE Sri_mobiles;

-- 1. Login Table (Auth)
CREATE TABLE IF NOT EXISTS login_auth (
    user_id VARCHAR(20) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'customer') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Users Table (Personal Details)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(20) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  gender ENUM('male','female','other') NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  is_active TINYINT(1) DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES login_auth(user_id) ON DELETE CASCADE
);

-- 3. Addresses Table
CREATE TABLE IF NOT EXISTS addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL,
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    country VARCHAR(100) DEFAULT 'India',
    is_default BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES login_auth(user_id) ON DELETE CASCADE
);

-- 4. Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 5. Products Table (with category_id FK)
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT UNIQUE NOT NULL,
    name VARCHAR(100) UNIQUE NOT NULL,
    category_id INT NULL,
    actual_price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT NULL,
    measurement_unit VARCHAR(20) NOT NULL,
    offer_percentage DECIMAL(5, 2) DEFAULT 0,
    offer_price DECIMAL(10, 2) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
ALTER TABLE products AUTO_INCREMENT = 1000;

-- 6. Product Images Table (NEW - to store multiple images per product)
CREATE TABLE IF NOT EXISTS product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_path TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 7. Dealers Table
CREATE TABLE IF NOT EXISTS dealers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dealer_id VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);
ALTER TABLE dealers AUTO_INCREMENT = 2000;

-- 8. Purchases Table
CREATE TABLE IF NOT EXISTS purchases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    product_name VARCHAR(100),
    dealer_id VARCHAR(10),
    dealer_name VARCHAR(100),
    quantity INT,
    purchase_price DECIMAL(10, 2),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE purchases AUTO_INCREMENT = 3000;

-- 9. Offers Table
CREATE TABLE IF NOT EXISTS offers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    image TEXT NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);
ALTER TABLE offers AUTO_INCREMENT = 4000;

-- 10. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    order_status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES login_auth(user_id) ON DELETE CASCADE
);
ALTER TABLE orders AUTO_INCREMENT = 5000;

-- 11. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    product_name VARCHAR(100),
    unit VARCHAR(10),
    quantity INT,
    total_grams INT,
    total_price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

ALTER TABLE order_items AUTO_INCREMENT = 6000;


-- -- Sample categories
-- INSERT INTO categories (name, description) VALUES
-- ('Mobile Phones', 'Smartphones and feature phones'),
-- ('Accessories', 'Chargers, cases, headphones, etc.'),
-- ('Tablets', 'Tablet devices'),
-- ('Wearables', 'Smart watches and fitness bands');






















-- -- Create database
-- CREATE DATABASE IF NOT EXISTS Sri_mobiles;
-- USE Sri_mobiles;

-- -- =============================
-- -- 1. Login Table (Auth)
-- -- =============================
-- CREATE TABLE IF NOT EXISTS login_auth (
--     user_id VARCHAR(20) PRIMARY KEY,    -- custom user id e.g. sri_01
--     username VARCHAR(50) NOT NULL UNIQUE,
--     password VARCHAR(255) NOT NULL,
--     role ENUM('admin', 'customer') NOT NULL,
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
-- );

-- -- =============================
-- -- 2. Users Table (Personal Details)
-- -- =============================
-- CREATE TABLE IF NOT EXISTS users (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   user_id VARCHAR(20) NOT NULL,
--   full_name VARCHAR(100) NOT NULL,
--   gender ENUM('male','female','other') NOT NULL,
--   email VARCHAR(255) UNIQUE NOT NULL,
--   phone VARCHAR(20),
--   is_active TINYINT(1) DEFAULT 1,
--   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--   FOREIGN KEY (user_id) REFERENCES login_auth(user_id) ON DELETE CASCADE
-- );

-- -- =============================
-- -- 3. Addresses Table (Multiple per User)
-- -- =============================
-- CREATE TABLE IF NOT EXISTS addresses (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     user_id VARCHAR(20) NOT NULL,
--     address_line1 VARCHAR(255),
--     address_line2 VARCHAR(255),
--     city VARCHAR(100),
--     state VARCHAR(100),
--     pincode VARCHAR(10),
--     country VARCHAR(100) DEFAULT 'India',
--     is_default BOOLEAN DEFAULT FALSE,
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES login_auth(user_id) ON DELETE CASCADE
-- );

-- -- =============================
-- -- 4. Products Table
-- -- =============================
-- CREATE TABLE IF NOT EXISTS products (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     product_id INT UNIQUE NOT NULL, -- 4-digit ID starting at 1000
--     name VARCHAR(100) UNIQUE NOT NULL,
--     image TEXT,
--     actual_price DECIMAL(10, 2) NOT NULL,
--     stock INT DEFAULT NULL,
--     measurement_unit VARCHAR(20) NOT NULL,
--     offer_percentage DECIMAL(5, 2) DEFAULT 0,
--     offer_price DECIMAL(10, 2) DEFAULT 0,
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );
-- ALTER TABLE products AUTO_INCREMENT = 1000;

-- -- =============================
-- -- 5. Dealers Table
-- -- =============================
-- CREATE TABLE IF NOT EXISTS dealers (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     dealer_id VARCHAR(10) NOT NULL UNIQUE,
--     name VARCHAR(100),
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     is_active BOOLEAN DEFAULT TRUE
-- );
-- ALTER TABLE dealers AUTO_INCREMENT = 2000;

-- -- =============================
-- -- 6. Purchases Table
-- -- =============================
-- CREATE TABLE IF NOT EXISTS purchases (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     product_id INT,
--     product_name VARCHAR(100),
--     dealer_id VARCHAR(10),
--     dealer_name VARCHAR(100),
--     quantity INT,
--     purchase_price DECIMAL(10, 2),
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
-- );
-- ALTER TABLE purchases AUTO_INCREMENT = 3000;

-- -- =============================
-- -- 7. Offers Table (Banner Slider)
-- -- =============================
-- CREATE TABLE IF NOT EXISTS offers (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     title VARCHAR(100),
--     image TEXT NOT NULL,
--     description TEXT,
--     start_date DATE,
--     end_date DATE,
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     is_active BOOLEAN DEFAULT TRUE
-- );
-- ALTER TABLE offers AUTO_INCREMENT = 3000;

-- -- =============================
-- -- 8. Orders Table
-- -- =============================
-- CREATE TABLE IF NOT EXISTS orders (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     user_id VARCHAR(20) NOT NULL,
--     total_amount DECIMAL(10, 2) NOT NULL,
--     order_status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
--     order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES login_auth(user_id) ON DELETE CASCADE
-- );
-- ALTER TABLE orders AUTO_INCREMENT = 3000;

-- -- =============================
-- -- 9. Order Items Table
-- -- =============================
-- CREATE TABLE IF NOT EXISTS order_items (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     order_id INT,
--     product_id INT,
--     product_name VARCHAR(100),
--     unit VARCHAR(10),
--     quantity INT,
--     total_grams INT,
--     total_price DECIMAL(10, 2),
--     FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
--     FOREIGN KEY (product_id) REFERENCES products(id)
-- );
-- ALTER TABLE order_items AUTO_INCREMENT = 4000;

-- -- =============================
-- -- Sample admin insert (manual)
-- -- =============================
-- -- INSERT INTO login_auth (user_id, username, password, role)
-- -- VALUES ('sri_00', 'admin', 'hashed_password_here', 'admin');
