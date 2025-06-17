create database nuts_ecommerce;
use nuts_ecommerce;
-- Common table for Admin/Customer Login
CREATE TABLE comman (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'customer') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Product Table
DROP TABLE IF EXISTS products;

CREATE TABLE products (

    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT UNIQUE NOT NULL, -- 4-digit product ID (generated in Node.js)
    name VARCHAR(100) UNIQUE NOT NULL,
    image TEXT,
    actual_price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT NULL,
    measurement_unit VARCHAR(20) NOT NULL,
    offer_percentage DECIMAL(5, 2) DEFAULT 0,
    offer_price DECIMAL(10, 2) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Dealer Table
CREATE TABLE dealers (
    id INT AUTO_INCREMENT PRIMARY KEY,
	dealer_id VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

ALTER TABLE dealers AUTO_INCREMENT = 2000;

-- Purchase Table
CREATE TABLE purchases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    product_name VARCHAR(100),
    dealer_id VARCHAR(10),
    dealer_name VARCHAR(100),
    quantity INT,
    purchase_price DECIMAL(10, 2),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

SELECT DATE_FORMAT(created_at, '%M') AS month, SUM(quantity * purchase_price) AS total
FROM purchases
GROUP BY month;

SELECT DATE_FORMAT(created_at, '%M') AS month, SUM(purchase_price) AS total_purchase_amount
FROM purchases
GROUP BY month;



INSERT INTO comman (username, password, role)
VALUES ('admin', 'admin123', 'role');


CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,              -- Refers to the user placing the order
    total_amount DECIMAL(10, 2) NOT NULL,  -- Total order amount
    order_status VARCHAR(50) DEFAULT 'Pending',  -- Status of the order (e.g., Pending, Shipped, Delivered)
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,                    -- Refers to orders.id
    product_id INT,                  -- Refers to products.id
    product_name VARCHAR(100),
    unit VARCHAR(10),                -- '250g', '500g', etc.
    quantity INT,                    -- Number of packages
    total_grams INT,                 -- unit in grams * quantity
    total_price DECIMAL(10, 2),      -- Price per item * quantity
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comman_id INT,                       -- Foreign key to comman table
    full_name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    FOREIGN KEY (comman_id) REFERENCES comman(id)
);
	

ALTER TABLE products AUTO_INCREMENT = 1000;
ALTER TABLE orders AUTO_INCREMENT = 3000;
ALTER TABLE order_items AUTO_INCREMENT = 4000;


SHOW COLUMNS FROM purchases;
SHOW COLUMNS FROM orders;

SELECT DATE_FORMAT(createdAt, '%M') AS month, SUM(purchase_price) AS total
      FROM purchases
      GROUP BY month;
      
SELECT DATE_FORMAT(order_date, '%M') AS month, SUM(total_amount) AS total
      FROM orders
      GROUP BY month;













