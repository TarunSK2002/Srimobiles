const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../db'); // your DB pool/connection
const router = express.Router();

// Setup multer storage for /uploads
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// GET all products
router.get('/', async (req, res) => {
  try {
    const sql = `
      SELECT 
        id, 
        product_name, 
        brand, 
        model, 
        category,
        color,
        actual_price, 
        stock_quantity,
        images
      FROM products
      ORDER BY created_at DESC
    `;
    
    const [products] = await db.query(sql);

    const productsWithImages = products.map(product => ({
      ...product,
      images: product.images ? product.images.split(',') : [],
      price: product.actual_price, // Map for UI
      stock: product.stock_quantity // Map for UI
    }));

    res.json(productsWithImages);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// CREATE a new product
router.post('/add', upload.array('images', 8), async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const {
      productName,
      category,
      subcategory,
      brand,
      model,
      color,
      storage,
      ram,
      actual_price,
      stock,
      ps5Version,
      joysticks,
      cover,
    } = req.body;

    const imageFilenames = req.files.map(file => file.filename).join(',');

    const productSql = `
      INSERT INTO products (
        product_name, category, subcategory, brand, model, color, 
        storage_capacity, ram, actual_price, stock_quantity, 
        ps5_version, joysticks, cover, images
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [productResult] = await connection.execute(productSql, [
      productName, category, subcategory, brand, model, color,
      storage || null, ram || null, actual_price, stock || 0,
      ps5Version || null, joysticks || null, cover || null,
      imageFilenames
    ]);
    
    const newProductId = productResult.insertId;

    await connection.commit();
    res.status(201).json({ message: 'Product created successfully', productId: newProductId });

  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Failed to create product', error: error.message });
  } finally {
    if (connection) connection.release();
  }
});



// READ single product by ID (GET)
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [productId]);

    if (rows.length === 0) return res.status(404).json({ message: 'Product not found' });

    const product = rows[0];
    product.images = product.images ? JSON.parse(product.images) : [];

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Failed to fetch product', error: error.message });
  }
});

// UPDATE product by ID (PUT)
router.put('/:id', upload.array('images', 8), async (req, res) => {
  const connection = await db.getConnection();
  const productId = req.params.id;

  try {
    await connection.beginTransaction();

    const productData = { ...req.body };

    // Handle image updates if new images are uploaded
    if (req.files && req.files.length > 0) {
      // 1. Fetch old image string to delete files
      const [oldProduct] = await connection.execute('SELECT images FROM products WHERE id = ?', [productId]);
      if (oldProduct.length > 0 && oldProduct[0].images) {
        const oldImageFilenames = oldProduct[0].images.split(',');
        oldImageFilenames.forEach(filename => {
          const filePath = path.join(uploadsDir, filename);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
      }
      // 2. Add new image filenames to the update data
      productData.images = req.files.map(file => file.filename).join(',');
    }

    // 3. Dynamically build the product update query for all fields
    const updateFields = Object.keys(productData);
    if (updateFields.length > 0) {
      const setClauses = updateFields.map(key => `${key} = ?`).join(', ');
      const values = updateFields.map(key => productData[key]);
      values.push(productId);

      const productSql = `UPDATE products SET ${setClauses} WHERE id = ?`;
      await connection.execute(productSql, values);
    }

    await connection.commit();
    res.json({ message: 'Product updated successfully' });

  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Failed to update product', error: error.message });
  } finally {
    if (connection) connection.release();
  }
});

// DELETE product by ID (DELETE)
router.delete('/:id', async (req, res) => {
  const connection = await db.getConnection();
  const productId = req.params.id;

  try {
    await connection.beginTransaction();

    // 1. Fetch the product to get the image filenames
    const [productRows] = await connection.execute('SELECT images FROM products WHERE id = ?', [productId]);

    if (productRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: 'Product not found' });
    }

    // 2. Delete image files from the filesystem if they exist
    const product = productRows[0];
    if (product.images) {
      const imageFilenames = product.images.split(',');
      imageFilenames.forEach(filename => {
        if (filename) { // Ensure filename is not an empty string
          const filePath = path.join(uploadsDir, filename);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      });
    }

    // 3. Delete the product from the database
    const [deleteResult] = await connection.execute('DELETE FROM products WHERE id = ?', [productId]);

    if (deleteResult.affectedRows === 0) {
      // This case should ideally not be hit if the previous check passed, but it's good for safety.
      await connection.rollback();
      return res.status(404).json({ message: 'Product not found during deletion attempt' });
    }

    // 4. If all is well, commit the transaction
    await connection.commit();
    res.json({ message: 'Product deleted successfully' });

  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  } finally {
    // 5. Always release the connection
    if (connection) connection.release();
  }
});

module.exports = router;
