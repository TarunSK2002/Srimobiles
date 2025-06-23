const db = require("../db");
const path = require("path");
const fs = require("fs");

// Helper to delete uploaded image files
const deleteImageFiles = (filenames) => {
  if (!filenames) return;
  const files = Array.isArray(filenames) ? filenames : [filenames];
  files.forEach((filename) => {
    const filePath = path.join(__dirname, "../uploads", filename);
    fs.unlink(filePath, (err) => {
      if (err) console.error("Failed to delete image:", err.message);
    });
  });
};

// ✅ 1. Add new product
exports.addProduct = async (req, res) => {
  try {
    const {
      brand,
      model,
      color,
      storage,
      ram,
      productName,
      category,
      subcategory,
      actual_price,
      stock,
    } = req.body;

    const images = req.files?.map((f) => f.filename) || [];

    if (!productName || !actual_price || !category || !subcategory || images.length === 0) {
      deleteImageFiles(images);
      return res.status(400).json({ error: "Missing required fields." });
    }

    const actualPrice = parseFloat(actual_price);
    const stockQty = stock ? parseInt(stock) : 0;

    if (isNaN(actualPrice) || actualPrice <= 0) {
      deleteImageFiles(images);
      return res.status(400).json({ error: "Invalid actual price." });
    }

    if (stock && (isNaN(stockQty) || stockQty < 0)) {
      deleteImageFiles(images);
      return res.status(400).json({ error: "Invalid stock quantity." });
    }

    const [existing] = await db.query("SELECT * FROM products WHERE product_name = ?", [productName]);
    if (existing.length > 0) {
      deleteImageFiles(images);
      return res.status(409).json({ error: "Product already exists." });
    }

    const [row] = await db.query("SELECT MAX(product_id) as maxId FROM products");
    const product_id = row[0].maxId ? row[0].maxId + 1 : 1000;

    const offer_percentage = 0;
    const offer_price = actualPrice;

    await db.query(
      `INSERT INTO products
      (id,category_id,actual_price, created_at, updated_at,brand, model, color, storage_capacity,ram,product_name,stock_quantity,uploaded_image)
      VALUES (?, ?, ?,NOW(), NOW(), ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        actualPrice,
        JSON.stringify(images),
        brand || null,
        model || null,
        color || null,
        storage || null,
        ram || null,
        product_name,
        stock_quantity
      ]
    );

    res.status(201).json({ message: "Product added successfully", product_id });
  } catch (err) {
    deleteImageFiles(req.files?.map((f) => f.filename));
    console.error("Add Product Error:", err.message);
    res.status(500).json({ error: `Server error while adding productasdfasf. ${err} `}); 
    
  }
};

// ✅ 2. Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const [products] = await db.query("SELECT * FROM products ORDER BY updated_at DESC");
    res.status(200).json(products);
  } catch (err) {
    console.error("Get All Products Error:", err.message);
    res.status(500).json({ error: "Server error while fetching products." });
  }
};

// ✅ 3. Get product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM products WHERE product_id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Get Product By ID Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ 4. Update stock quantity
exports.updateStock = async (req, res) => {
  const { product_id } = req.params;
  const { stock } = req.body;

  if (!stock || isNaN(stock) || stock < 0)
    return res.status(400).json({ error: "Invalid stock quantity" });

  try {
    await db.query("UPDATE products SET stock = ?, updated_at = NOW() WHERE product_id = ?", [
      stock,
      product_id,
    ]);
    res.status(200).json({ message: "Stock updated successfully" });
  } catch (err) {
    console.error("Update Stock Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ 5. Update offer percentage and price
exports.updateOffer = async (req, res) => {
  const { product_id } = req.params;
  const { offer_percentage } = req.body;

  if (isNaN(offer_percentage) || offer_percentage < 0 || offer_percentage > 100)
    return res.status(400).json({ error: "Invalid offer percentage" });

  try {
    const [rows] = await db.query("SELECT actual_price FROM products WHERE product_id = ?", [
      product_id,
    ]);
    if (rows.length === 0) return res.status(404).json({ error: "Product not found" });

    const actual_price = rows[0].actual_price;
    const offer_price = actual_price - (actual_price * offer_percentage) / 100;

    await db.query(
      "UPDATE products SET offer_percentage = ?, offer_price = ?, updated_at = NOW() WHERE product_id = ?",
      [offer_percentage, offer_price, product_id]
    );

    res.status(200).json({ message: "Offer updated successfully" });
  } catch (err) {
    console.error("Update Offer Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ 6. Upload images only
exports.uploadImages = (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    const filenames = req.files.map((file) => file.filename);
    res.status(200).json({ message: "Images uploaded", images: filenames });
  } catch (err) {
    console.error("Upload Images Error:", err.message);
    res.status(500).json({ error: "Server error during image upload" });
  }
};
