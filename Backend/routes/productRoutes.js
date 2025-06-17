// const express = require("express");
// const db = require("../db");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const { error } = require("console");

// // Multer configuration for image uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Ensure the 'uploads' directory exists
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname); // Get the file extension
//     cb(null, Date.now() + ext); // Unique filename based on current timestamp
//   },
// });
// const upload = multer({ storage });

// // Route for adding a new product with image
// router.post("/add", upload.single("image"), async (req, res) => {
//   const { name, actual_price, measurement_unit, stock = null } = req.body;
//   const image = req.file ? req.file.filename : null;

//   if (!name || !actual_price || !measurement_unit || !image) {
//     return res.status(400).json({ error: "Missing required fields" });
    
//   }

//   const stockValue = stock ? stock : null;

//   try {
//     // Check for duplicate product name
//     const [existing] = await db.query("SELECT * FROM products WHERE name = ?", [name]);

//     if (existing.length > 0) {
//       // Delete the uploaded image if product exists
//       if (req.file) {
//         const imagePath = path.join(__dirname, "../uploads", req.file.filename);
//         fs.unlink(imagePath, (deleteErr) => {
//           if (deleteErr) console.error("Failed to delete image:", deleteErr);
//         });
//       }
//       return res.status(409).json({ error: "Product with this name already exists" });
//     }

//     // Generate a new product ID (starting from 1000)
//     const [row] = await db.query("SELECT MAX(product_id) AS maxId FROM products");
//     const product_id = row[0].maxId ? row[0].maxId + 1 : 1000;

//     // Calculate the offer price (if any offer percentage is given)
//     const offer_percentage = 0;
//     const offer_price = actual_price - (actual_price * offer_percentage) / 100;

//     // Insert product data into the database
//     await db.query(
//       `INSERT INTO products 
//       (product_id, name, image, actual_price, measurement_unit, stock, offer_percentage, offer_price, created_at, updated_at)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
//       [
//         product_id,
//         name,
//         image,
//         actual_price,
//         measurement_unit,
//         stockValue,
//         offer_percentage,
//         offer_price,
//       ]
//     );

//     res.json({ message: "Product added successfully", product_id });
//   } catch (err) {
//     // Delete the uploaded image if there's an error
//     if (req.file) {
//       const imagePath = path.join(__dirname, "../uploads", req.file.filename);
//       fs.unlink(imagePath, (deleteErr) => {
//         if (deleteErr) console.error("Failed to delete image:", deleteErr);
//       });
//     }
//     console.error("Server Error:", err);
//     res.status(500).json({ error: "Server error while adding product" });
//   }
// });

// // GET all products
// router.get("/all", async (req, res) => {
//   try {
//     const [results] = await db.query("SELECT * FROM products ORDER BY created_at DESC");
//     res.json(results);
//   } catch (err) {
//     console.error("Error fetching products:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // GET product details by product_id
// router.get("/:id", async (req, res) => {
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
// });

// // backend/routes/products.js

// router.put("/update-stock/:id", async (req, res) => {
//   const productId = req.params.id;
//   const { quantity } = req.body;

//   if (!quantity) {
//     return res.status(400).json({ error: "Quantity is required" });
//   }

//   try {
//     await db.query(
//       `UPDATE products SET stock = stock + ?, updated_at = NOW() WHERE product_id = ?`,
//       [quantity, productId]
//     );
//     res.json({ message: "Stock updated successfully" });
//   } catch (err) {
//     console.error("Error updating stock:", err);
//     res.status(500).json({ error: "Failed to update stock" });
//   }
// });


// // PUT route to update offer percentage and offer price
// router.put("/update-offer/:id", async (req, res) => {
//   const { id } = req.params;
//   const { offer_percentage } = req.body;

//   if (offer_percentage < 0 || offer_percentage > 100) {
//     return res
//       .status(400)
//       .json({ error: "Offer percentage must be between 0 and 100" });
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
// });

// // Upload/Update product image separately
// router.post("/upload-image/:id", upload.single("image"), async (req, res) => {
//   const productId = req.params.id;

//   if (!req.file) {
//     return res.status(400).json({ error: "No image file uploaded" });
//   }

//   const newImage = req.file.filename;

//   try {
//     const [rows] = await db.query("SELECT image FROM products WHERE product_id = ?", [productId]);

//     if (rows.length === 0) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     const oldImage = rows[0].image;

//     await db.query(
//       "UPDATE products SET image = ?, updated_at = NOW() WHERE product_id = ?",
//       [newImage, productId]
//     );

//     if (oldImage) {
//       const oldImagePath = path.join(__dirname, "../uploads", oldImage);
//       fs.unlink(oldImagePath, (err) => {
//         if (err) console.error("Failed to delete old image:", err);
//       });
//     }

//     res.json({ message: "Image updated successfully", filename: newImage });
//   } catch (err) {
//     console.error("Error updating image:", err);
//     res.status(500).json({ error: "Server error while updating image" });
//   }
// });

// module.exports = router;




























// const express = require("express");
// const router = express.Router();
// const upload = require("../middleware/uploadMiddleware");
// const productsController = require("../controller/productsController");

// router.post("/add", upload.single("image"), productsController.addProduct);

// router.get("/all", productsController.getAllProducts);

// router.get("/:id", productsController.getProductById);

// router.put("/update-stock/:id", productsController.updateStock);

// router.put("/update-offer/:id", productsController.updateOffer);

// router.post("/upload-image/:id", upload.single("image"), productsController.uploadImage);

// module.exports = router;















const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware"); // assumes multer is configured here
const productsController = require("../controller/productsController");

// ✅ Add product with multiple images
router.post("/add", upload.array("images", 5), productsController.addProduct);

// ✅ Get all products
router.get("/all", productsController.getAllProducts);

// ✅ Get product by ID
router.get("/:id", productsController.getProductById);

// ✅ Update stock
router.put("/update-stock/:id", productsController.updateStock);

// ✅ Update offer
router.put("/update-offer/:id", productsController.updateOffer);

// ✅ Replace product images (optional: can be PUT or POST)
router.put("/upload-images/:id", upload.array("images", 5), productsController.uploadImages);

module.exports = router;
