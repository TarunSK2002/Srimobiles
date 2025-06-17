// const express = require('express');
// const db = require('../db');  // Ensure db uses the promise-based pool
// const router = express.Router();

// // Add a purchase
// router.post('/add', async (req, res) => {
//   const { product_id, product_name, dealer_id, dealer_name, quantity, purchase_price } = req.body;

//   try {
//     // Insert purchase
//     await db.query(`INSERT INTO purchases (product_id, product_name, dealer_id, dealer_name, quantity, purchase_price)
//                     VALUES (?, ?, ?, ?, ?, ?)`,
//                     [product_id, product_name, dealer_id, dealer_name, quantity, purchase_price]);

//     // Update product stock
//     await db.query(`UPDATE products SET stock = IFNULL(stock, 0) + ? WHERE product_id = ?`,
//                     [quantity, product_id]);

//     res.json({ message: 'Purchase recorded and stock updated' });
//   } catch (err) {
//     console.error('Error occurred:', err);
//     res.status(500).json({ error: 'Server error while processing purchase' });
//   }
// });

// // Get all purchases
// router.get('/all', async (req, res) => {
//   try {
//     const [results] = await db.query('SELECT * FROM purchases');
//     res.json(results);
//   } catch (err) {
//     console.error('Error fetching purchases:', err);
//     res.status(500).json({ error: 'Server error while fetching purchases' });
//   }
// });

// module.exports = router;







const express = require("express");
const router = express.Router();
const purchasesController = require("../controller/purchasesController");

router.post("/add", purchasesController.addPurchase);

router.get("/all", purchasesController.getAllPurchases);

module.exports = router;
