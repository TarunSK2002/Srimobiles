// const db = require("../db");
// const path = require("path");
// const fs = require("fs");

// // Helper to delete image file
// const deleteImageFile = (filename) => {
//   if (!filename) return;
//   const imagePath = path.join(__dirname, "../uploads", filename);
//   fs.unlink(imagePath, (err) => {
//     if (err) console.error("Failed to delete image:", err);
//   });
// };

// // Add new product
// exports.addProduct = async (req, res) => {
//   const { name, actual_price, measurement_unit, stock } = req.body;
//   const image = req.file ? req.file.filename : null;

//   if (!name || !actual_price || !measurement_unit || !image) {
//     if (req.file) deleteImageFile(image);
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   const actualPriceNum = Number(actual_price);
//   if (isNaN(actualPriceNum)) {
//     if (req.file) deleteImageFile(image);
//     return res.status(400).json({ error: "Actual price must be a number" });
//   }

//   const stockValue = stock !== undefined ? Number(stock) : null;
//   if (stock !== undefined && isNaN(stockValue)) {
//     if (req.file) deleteImageFile(image);
//     return res.status(400).json({ error: "Stock must be a number" });
//   }

//   try {
//     // Check duplicate product name
//     const [existing] = await db.query("SELECT * FROM products WHERE name = ?", [name]);
//     if (existing.length > 0) {
//       if (req.file) deleteImageFile(image);
//       return res.status(409).json({ error: "Product with this name already exists" });
//     }

//     // Generate product_id starting from 1000
//     const [row] = await db.query("SELECT MAX(product_id) AS maxId FROM products");
//     const product_id = row[0].maxId ? row[0].maxId + 1 : 1000;

//     // Default offer percentage
//     const offer_percentage = 0;
//     const offer_price = actualPriceNum - (actualPriceNum * offer_percentage) / 100;

//     await db.query(
//       `INSERT INTO products 
//       (product_id, name, image, actual_price, measurement_unit, stock, offer_percentage, offer_price, created_at, updated_at)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
//       [
//         product_id,
//         name,
//         image,
//         actualPriceNum,
//         measurement_unit,
//         stockValue,
//         offer_percentage,
//         offer_price,
//       ]
//     );

//     res.json({ message: "Product added successfully", product_id });
//   } catch (err) {
//     if (req.file) deleteImageFile(image);
//     console.error("Server Error:", err);
//     res.status(500).json({ error: "Server error while adding product" });
//   }
// };

// // Get all products
// exports.getAllProducts = async (req, res) => {
//   try {
//     const [results] = await db.query("SELECT * FROM products ORDER BY created_at DESC");
//     res.json(results);
//   } catch (err) {
//     console.error("Error fetching products:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get product by ID
// exports.getProductById = async (req, res) => {
//   const productId = req.params.id;
//   try {
//     const [rows] = await db.query("SELECT * FROM products WHERE product_id = ?", [productId]);
//     if (rows.length === 0) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     res.json(rows[0]);
//   } catch (err) {
//     console.error("Error fetching product by ID:", err);
//     res.status(500).json({ error: "Server error while fetching product" });
//   }
// };

// // Update stock
// exports.updateStock = async (req, res) => {
//   const productId = req.params.id;
//   const { quantity } = req.body;

//   if (quantity === undefined) {
//     return res.status(400).json({ error: "Quantity is required" });
//   }

//   const qtyNum = Number(quantity);
//   if (isNaN(qtyNum)) {
//     return res.status(400).json({ error: "Quantity must be a number" });
//   }

//   try {
//     await db.query(
//       `UPDATE products SET stock = stock + ?, updated_at = NOW() WHERE product_id = ?`,
//       [qtyNum, productId]
//     );
//     res.json({ message: "Stock updated successfully" });
//   } catch (err) {
//     console.error("Error updating stock:", err);
//     res.status(500).json({ error: "Failed to update stock" });
//   }
// };

// // Update offer percentage and price
// exports.updateOffer = async (req, res) => {
//   const { id } = req.params;
//   const { offer_percentage } = req.body;

//   if (offer_percentage < 0 || offer_percentage > 100) {
//     return res.status(400).json({ error: "Offer percentage must be between 0 and 100" });
//   }

//   try {
//     const [product] = await db.query("SELECT * FROM products WHERE product_id = ?", [id]);

//     if (!product.length) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     const actualPrice = product[0].actual_price;
//     const offerPrice = actualPrice - (actualPrice * offer_percentage) / 100;

//     await db.query(
//       "UPDATE products SET offer_percentage = ?, offer_price = ?, updated_at = NOW() WHERE product_id = ?",
//       [offer_percentage, offerPrice, id]
//     );

//     res.json({
//       message: "Offer updated successfully",
//       product_id: id,
//       offer_percentage,
//       offer_price: offerPrice.toFixed(2),
//     });
//   } catch (err) {
//     console.error("Server Error:", err);
//     res.status(500).json({ error: "Server error while updating offer" });
//   }
// };

// // Upload/update product image
// exports.uploadImage = async (req, res) => {
//   const productId = req.params.id;

//   if (!req.file) {
//     return res.status(400).json({ error: "No image file uploaded" });
//   }

//   const newImage = req.file.filename;

//   try {
//     const [rows] = await db.query("SELECT image FROM products WHERE product_id = ?", [productId]);

//     if (rows.length === 0) {
//       // Delete uploaded image since product doesn't exist
//       deleteImageFile(newImage);
//       return res.status(404).json({ error: "Product not found" });
//     }

//     const oldImage = rows[0].image;

//     await db.query(
//       "UPDATE products SET image = ?, updated_at = NOW() WHERE product_id = ?",
//       [newImage, productId]
//     );

//     if (oldImage) {
//       deleteImageFile(oldImage);
//     }

//     res.json({ message: "Image updated successfully", filename: newImage });
//   } catch (err) {
//     deleteImageFile(newImage);
//     console.error("Error updating image:", err);
//     res.status(500).json({ error: "Server error while updating image" });
//   }
// };



























// const db = require("../db");
// const path = require("path");
// const fs = require("fs");

// // Helper to delete image file
// const deleteImageFile = (filename) => {
//   if (!filename) return;
//   const imagePath = path.join(__dirname, "../uploads", filename);
//   fs.unlink(imagePath, (err) => {
//     if (err) console.error("Failed to delete image:", err);
//   });
// };

// // Add new product
// exports.addProduct = async (req, res) => {
//   const { name, actual_price, measurement_unit, stock } = req.body;
//   const image = req.file ? req.file.filename : null;

//   if (!name || !actual_price || !measurement_unit || !image) {
//     if (req.file) deleteImageFile(image);
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   const actualPriceNum = Number(actual_price);
//   if (isNaN(actualPriceNum)) {
//     if (req.file) deleteImageFile(image);
//     return res.status(400).json({ error: "Actual price must be a number" });
//   }

//   const stockValue = stock !== undefined ? Number(stock) : null;
//   if (stock !== undefined && isNaN(stockValue)) {
//     if (req.file) deleteImageFile(image);
//     return res.status(400).json({ error: "Stock must be a number" });
//   }

//   try {
//     // Check duplicate product name
//     const [existing] = await db.query("SELECT * FROM products WHERE name = ?", [name]);
//     if (existing.length > 0) {
//       if (req.file) deleteImageFile(image);
//       return res.status(409).json({ error: "Product with this name already exists" });
//     }

//     // Generate product_id starting from 1000
//     const [row] = await db.query("SELECT MAX(product_id) AS maxId FROM products");
//     const product_id = row[0].maxId ? row[0].maxId + 1 : 1000;

//     // Default offer percentage
//     const offer_percentage = 0;
//     const offer_price = actualPriceNum - (actualPriceNum * offer_percentage) / 100;

//     await db.query(
//       `INSERT INTO products 
//       (product_id, name, image, actual_price, measurement_unit, stock, offer_percentage, offer_price, created_at, updated_at)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
//       [
//         product_id,
//         name,
//         image,
//         actualPriceNum,
//         measurement_unit,
//         stockValue,
//         offer_percentage,
//         offer_price,
//       ]
//     );

//     res.json({ message: "Product added successfully", product_id });
//   } catch (err) {
//     if (req.file) deleteImageFile(image);
//     console.error("Server Error:", err);
//     res.status(500).json({ error: "Server error while adding product" });
//   }
// };

// // Get all products
// exports.getAllProducts = async (req, res) => {
//   try {
//     const [results] = await db.query("SELECT * FROM products ORDER BY created_at DESC");
//     res.json(results);
//   } catch (err) {
//     console.error("Error fetching products:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get product by ID
// exports.getProductById = async (req, res) => {
//   const productId = req.params.id;
//   try {
//     const [rows] = await db.query("SELECT * FROM products WHERE product_id = ?", [productId]);
//     if (rows.length === 0) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     res.json(rows[0]);
//   } catch (err) {
//     console.error("Error fetching product by ID:", err);
//     res.status(500).json({ error: "Server error while fetching product" });
//   }
// };

// // Update stock
// exports.updateStock = async (req, res) => {
//   const productId = req.params.id;
//   const { quantity } = req.body;

//   if (quantity === undefined) {
//     return res.status(400).json({ error: "Quantity is required" });
//   }

//   const qtyNum = Number(quantity);
//   if (isNaN(qtyNum)) {
//     return res.status(400).json({ error: "Quantity must be a number" });
//   }

//   try {
//     await db.query(
//       `UPDATE products SET stock = stock + ?, updated_at = NOW() WHERE product_id = ?`,
//       [qtyNum, productId]
//     );
//     res.json({ message: "Stock updated successfully" });
//   } catch (err) {
//     console.error("Error updating stock:", err);
//     res.status(500).json({ error: "Failed to update stock" });
//   }
// };

// // Update offer percentage and price
// exports.updateOffer = async (req, res) => {
//   const { id } = req.params;
//   const { offer_percentage } = req.body;

//   if (offer_percentage < 0 || offer_percentage > 100) {
//     return res.status(400).json({ error: "Offer percentage must be between 0 and 100" });
//   }

//   try {
//     const [product] = await db.query("SELECT * FROM products WHERE product_id = ?", [id]);

//     if (!product.length) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     const actualPrice = product[0].actual_price;
//     const offerPrice = actualPrice - (actualPrice * offer_percentage) / 100;

//     await db.query(
//       "UPDATE products SET offer_percentage = ?, offer_price = ?, updated_at = NOW() WHERE product_id = ?",
//       [offer_percentage, offerPrice, id]
//     );

//     res.json({
//       message: "Offer updated successfully",
//       product_id: id,
//       offer_percentage,
//       offer_price: offerPrice.toFixed(2),
//     });
//   } catch (err) {
//     console.error("Server Error:", err);
//     res.status(500).json({ error: "Server error while updating offer" });
//   }
// };

// // Upload/update product image
// exports.uploadImage = async (req, res) => {
//   const productId = req.params.id;

//   if (!req.file) {
//     return res.status(400).json({ error: "No image file uploaded" });
//   }

//   const newImage = req.file.filename;

//   try {
//     const [rows] = await db.query("SELECT image FROM products WHERE product_id = ?", [productId]);

//     if (rows.length === 0) {
//       // Delete uploaded image since product doesn't exist
//       deleteImageFile(newImage);
//       return res.status(404).json({ error: "Product not found" });
//     }

//     const oldImage = rows[0].image;

//     await db.query(
//       "UPDATE products SET image = ?, updated_at = NOW() WHERE product_id = ?",
//       [newImage, productId]
//     );

//     if (oldImage) {
//       deleteImageFile(oldImage);
//     }

//     res.json({ message: "Image updated successfully", filename: newImage });
//   } catch (err) {
//     deleteImageFile(newImage);
//     console.error("Error updating image:", err);
//     res.status(500).json({ error: "Server error while updating image" });
//   }
// };















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

    const [existing] = await db.query("SELECT * FROM products WHERE name = ?", [productName]);
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
      (product_id, name, brand, model, color, storage, ram, category, subcategory, image, actual_price, stock, offer_percentage, offer_price, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        product_id,
        productName,
        brand || null,
        model || null,
        color || null,
        storage || null,
        ram || null,
        category,
        subcategory,
        JSON.stringify(images),
        actualPrice,
        stockQty,
        offer_percentage,
        offer_price,
      ]
    );

    res.status(201).json({ message: "Product added successfully", product_id });
  } catch (err) {
    deleteImageFiles(req.files?.map((f) => f.filename));
    console.error("Add Product Error:", err.message);
    res.status(500).json({ error: "Server error while adding product." });
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
