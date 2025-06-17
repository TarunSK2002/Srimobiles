const db = require("../db");

// Add a purchase and update stock
exports.addPurchase = async (req, res) => {
  const { product_id, product_name, dealer_id, dealer_name, quantity, purchase_price } = req.body;

  if (!product_id || !product_name || !dealer_id || !dealer_name || !quantity || !purchase_price) {
    return res.status(400).json({ error: "Missing required purchase fields" });
  }

  try {
    await db.query(
      `INSERT INTO purchases (product_id, product_name, dealer_id, dealer_name, quantity, purchase_price)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [product_id, product_name, dealer_id, dealer_name, quantity, purchase_price]
    );

    // Update stock: if stock is NULL, treat as 0
    await db.query(
      `UPDATE products SET stock = IFNULL(stock, 0) + ? WHERE product_id = ?`,
      [quantity, product_id]
    );

    res.json({ message: "Purchase recorded and stock updated" });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ error: "Server error while processing purchase" });
  }
};

// Get all purchases
exports.getAllPurchases = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM purchases");
    res.json(results);
  } catch (err) {
    console.error("Error fetching purchases:", err);
    res.status(500).json({ error: "Server error while fetching purchases" });
  }
};
