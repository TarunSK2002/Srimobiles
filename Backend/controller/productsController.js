// const express = require("express");
// const mysql = require("mysql2/promise");
// const multer = require("multer");
// const path = require("path");
// const cors = require("cors");
// const fs = require("fs");

// const app = express();
// const PORT = 5000;

// app.use(cors());

// // MySQL connection pool
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "your_mysql_user",
//   password: "your_mysql_password",
//   database: "your_database_name",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// // Multer setup to store files in /uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dir = "./uploads";
//     if (!fs.existsSync(dir)) fs.mkdirSync(dir);
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     // Save with unique filename to avoid collisions
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage });

// // Middleware to parse form-data with images
// const cpUpload = upload.array("images", 8);

// // Route to add product
// app.post("/api/products/add", cpUpload, async (req, res) => {
//   const conn = await pool.getConnection();
//   try {
//     await conn.beginTransaction();

//     const {
//       category,
//       subcategory,
//       brand,
//       model,
//       color,
//       storage,
//       ram,
//       productName,
//       actual_price,
//       stock = 0,
//       ps5Version,
//       joysticks,
//       cover,
//     } = req.body;

//     // Insert product data
//     const [result] = await conn.execute(
//       `INSERT INTO products 
//       (category, subcategory, brand, model, color, storage, ram, productName, actual_price, stock, ps5Version, joysticks, cover)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [
//         category,
//         subcategory,
//         brand,
//         model,
//         color || null,
//         storage || null,
//         ram || null,
//         productName,
//         actual_price,
//         stock,
//         ps5Version || null,
//         joysticks || null,
//         cover || null,
//       ]
//     );

//     const productId = result.insertId;

//     // Insert image paths
//     if (req.files && req.files.length > 0) {
//       const imageInserts = req.files.map(
//         (file) => [productId, file.filename]
//       );

//       await conn.query(
//         "INSERT INTO product_images (product_id, image_path) VALUES ?",
//         [imageInserts]
//       );
//     }

//     await conn.commit();

//     res.status(201).json({ message: "Product added successfully" });
//   } catch (error) {
//     await conn.rollback();
//     console.error("Error adding product:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   } finally {
//     conn.release();
//   }
// });

// // Serve uploaded images statically
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
