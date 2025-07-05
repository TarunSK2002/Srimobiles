// const express = require('express');
// const router = express.Router();
// const db = require('../db'); // Adjust the path
// const Razorpay = require('razorpay');

// // Razorpay instance
// const razorpay = new Razorpay({
//     key_id: 'rzp_test_theRKeq6fdRQfl',   // ✅ Replace with your Razorpay key_id
//     key_secret: 'mXzcPiwit5ZjWztfLFfNyxBN', // ✅ Replace with your Razorpay key_secret
// });

// // Create Razorpay order
// router.post('/create-razorpay-order', async (req, res) => {
//     const { amount } = req.body;

//     if (!amount) {
//         return res.status(400).json({ error: 'Amount is required' });
//     }

//     const options = {
//         amount: amount * 100, // Razorpay expects amount in paise
//         currency: "INR",
//         receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
//     };

//     try {
//         const order = await razorpay.orders.create(options);
//         res.json(order);
//     } catch (error) {
//         console.error('❌ Error creating Razorpay order:', error);
//         res.status(500).json({ error: 'Failed to create Razorpay order' });
//     }
// });

// // Place order
// router.post('/place-order', async (req, res) => {
//     const orderItems = req.body.items; // Expecting array of items
//     const userId = req.body.userId;    // User ID passed from frontend

//     if (!Array.isArray(orderItems) || orderItems.length === 0) {
//         return res.status(400).json({ error: 'No items provided in the order' });
//     }

//     const connection = await db.getConnection();

//     try {
//         await connection.beginTransaction();

//         const totalAmount = orderItems.reduce((total, item) => total + (item.totalPrice || 0), 0);

//         const [orderResult] = await connection.query(
//             'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)',
//             [userId, totalAmount]
//         );
//         const orderId = orderResult.insertId;

//         const productIds = orderItems.map(item => item.id);
//         const [productData] = await connection.query('SELECT id, stock FROM products WHERE id IN (?)', [productIds]);

//         const stockMap = productData.reduce((map, product) => {
//             map[product.id] = product.stock;
//             return map;
//         }, {});

//         for (const item of orderItems) {
//             const gramsPerUnit = parseInt(item.unit);

//             if (isNaN(gramsPerUnit)) {
//                 return res.status(400).json({ error: `Invalid unit for item ${item.name}` });
//             }

//             const totalGramsToDeduct = gramsPerUnit * item.quantity;
//             const currentStock = stockMap[item.id];

//             if (currentStock === undefined) {
//                 return res.status(400).json({ error: `Product not found: ${item.name}` });
//             }

//             if (currentStock < totalGramsToDeduct) {
//                 return res.status(400).json({
//                     error: `Not enough stock for ${item.name}. Available: ${currentStock}g, Required: ${totalGramsToDeduct}g`
//                 });
//             }

//             const newStock = currentStock - totalGramsToDeduct;
//             await connection.query('UPDATE products SET stock = ? WHERE id = ?', [newStock, item.id]);

//             await connection.query(
//                 'INSERT INTO order_items (order_id, product_id, product_name, unit, quantity, total_grams, total_price) VALUES (?, ?, ?, ?, ?, ?, ?)',
//                 [orderId, item.id, item.name, item.unit, item.quantity, totalGramsToDeduct, item.totalPrice]
//             );
//         }

//         await connection.commit();
//         res.json({ message: 'Order placed successfully!' });

//     } catch (error) {
//         await connection.rollback();
//         console.error('❌ Error placing order:', error);
//         res.status(500).json({ error: 'Internal server error while placing order' });
//     } finally {
//         connection.release();
//     }
// });

// // Fetch orders by user
// router.get('/user/:id', async (req, res) => {
//     const userId = req.params.id;
//     const connection = await db.getConnection();

//     try {
//         const [ordersData] = await connection.query('SELECT * FROM orders WHERE user_id = ?', [userId]);
//         if (!ordersData.length) {
//             return res.status(404).json({ error: `No orders found for user ${userId}` });
//         }
//         res.json(ordersData);
//     } catch (error) {
//         console.error('❌ Error fetching orders:', error);
//         res.status(500).json({ error: 'Internal server error while fetching orders' });
//     } finally {
//         connection.release();
//     }
// });

// // Fetch order details by order ID
// router.get('/order/:orderId', async (req, res) => {
//     const orderId = req.params.orderId;
//     const connection = await db.getConnection();

//     try {
//         const [orderData] = await connection.query('SELECT * FROM orders WHERE id = ?', [orderId]);
//         if (!orderData.length) {
//             return res.status(404).json({ error: `Order ${orderId} not found` });
//         }

//         const [orderItemsData] = await connection.query('SELECT * FROM order_items WHERE order_id = ?', [orderId]);
//         const order = orderData[0];
//         order.items = orderItemsData;

//         res.json(order);

//     } catch (error) {
//         console.error('❌ Error fetching order:', error);
//         res.status(500).json({ error: 'Internal server error while fetching order' });
//     } finally {
//         connection.release();
//     }
// });

// module.exports = router;




















// const express = require('express');
// const db = require('../db');
// const router = express.Router();

// // Place an order
// router.post('/place', async (req, res) => {
//   const { user_id, items, total_amount } = req.body;

//   if (!user_id || !Array.isArray(items) || items.length === 0) {
//     return res.status(400).json({ error: 'Invalid order data' });
//   }

//   let connection;
//   try {
//     connection = await db.getConnection();
//     await connection.beginTransaction();

//     // Insert into orders
//     const [orderResult] = await connection.query(
//       'INSERT INTO orders (user_id, total_amount, status, created_at) VALUES (?, ?, ?, NOW())',
//       [user_id, total_amount, 'Pending']
//     );
//     const orderId = orderResult.insertId;

//     // Insert each item and update product stock
//     for (const item of items) {
//       const { product_id, product_name, unit, quantity, total_grams, total_price } = item;

//       await connection.query(
//         'INSERT INTO order_items (order_id, product_id, product_name, unit, quantity, total_grams, total_price) VALUES (?, ?, ?, ?, ?, ?, ?)',
//         [orderId, product_id, product_name, unit, quantity, total_grams, total_price]
//       );

//       await connection.query(
//         'UPDATE products SET stock = stock - ? WHERE id = ?',
//         [total_grams, product_id]
//       );
//     }

//     await connection.commit();
//     res.json({ message: 'Order placed successfully', order_id: orderId });
//   } catch (err) {
//     if (connection) await connection.rollback();
//     console.error('Order placement failed:', err);
//     res.status(500).json({ error: 'Order placement failed', details: err.message });
//   } finally {
//     if (connection) connection.release();
//   }
// });

// // Get all orders — accessible via GET /api/orders (added this for convenience)
// router.get('/', async (req, res) => {
//   try {
//     const [orders] = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
//     res.json(orders);
//   } catch (err) {
//     console.error('Error fetching orders:', err);
//     res.status(500).json({ error: 'Failed to fetch orders' });
//   }
// });

// // Also keep your /all route (optional, you can remove it if you want)
// router.get('/all', async (req, res) => {
//   try {
//     const [orders] = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
//     res.json(orders);
//   } catch (err) {
//     console.error('Error fetching orders:', err);
//     res.status(500).json({ error: 'Failed to fetch orders' });
//   }
// });

// // Get order details by ID
// router.get('/:id', async (req, res) => {
//   const orderId = req.params.id;

//   let connection;
//   try {
//     connection = await db.getConnection();

//     const [order] = await connection.query('SELECT * FROM orders WHERE id = ?', [orderId]);
//     if (order.length === 0) {
//       return res.status(404).json({ error: 'Order not found' });
//     }

//     const [items] = await connection.query('SELECT * FROM order_items WHERE order_id = ?', [orderId]);

//     res.json({ ...order[0], items });
//   } catch (err) {
//     console.error('Failed to fetch order details:', err);
//     res.status(500).json({ error: 'Failed to fetch order details', details: err.message });
//   } finally {
//     if (connection) connection.release();
//   }
// });

// // Update order status
// router.post('/update-status', async (req, res) => {
//   const { order_id, status } = req.body;

//   if (!order_id || !status) {
//     return res.status(400).json({ error: 'Missing order_id or status' });
//   }

//   try {
//     const [result] = await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, order_id]);
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: 'Order not found' });
//     }
//     res.json({ message: 'Order status updated successfully' });
//   } catch (err) {
//     console.error('Error updating status:', err);
//     res.status(500).json({ error: 'Failed to update status', details: err.message });
//   }
// });

// module.exports = router;
















// routes/orderRoutes.js
const express = require('express');
const db = require('../db');
const router = express.Router();

// Place an order
router.post('/place', async (req, res) => {
  const { user_id, items, total_amount } = req.body;

  if (!user_id || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Invalid order data' });
  }

  let connection;
  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

    // Insert into orders table with correct column names
    const [orderResult] = await connection.query(
      'INSERT INTO orders (user_id, total_amount, order_status, order_date) VALUES (?, ?, ?, NOW())',
      [user_id, total_amount, 'Pending']
    );
    const orderId = orderResult.insertId;

    // Insert each item and update product stock
    for (const item of items) {
      const { product_id, product_name, unit, quantity, total_grams, total_price } = item;

      await connection.query(
        `INSERT INTO order_items 
          (order_id, product_id, product_name, unit, quantity, total_grams, total_price) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [orderId, product_id, product_name, unit, quantity, total_grams, total_price]
      );

      // Update stock in products table
      await connection.query(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [total_grams, product_id]
      );
    }

    await connection.commit();
    res.json({ message: 'Order placed successfully', order_id: orderId });
  } catch (err) {
    if (connection) await connection.rollback();
    console.error('Order placement failed:', err);
    res.status(500).json({ error: 'Order placement failed', details: err.message });
  } finally {
    if (connection) connection.release();
  }
});

// Get all orders
router.get('/', async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();

    // Use correct column name 'order_date'
    const [orders] = await connection.query('SELECT * FROM orders ORDER BY order_date DESC');
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  } finally {
    if (connection) connection.release();
  }
});

// Get order details by ID
router.get('/:id', async (req, res) => {
  const orderId = req.params.id;

  let connection;
  try {
    connection = await db.getConnection();

    const [order] = await connection.query('SELECT * FROM orders WHERE id = ?', [orderId]);
    if (order.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const [items] = await connection.query('SELECT * FROM order_items WHERE order_id = ?', [orderId]);

    res.json({ ...order[0], items });
  } catch (err) {
    console.error('Failed to fetch order details:', err);
    res.status(500).json({ error: 'Failed to fetch order details', details: err.message });
  } finally {
    if (connection) connection.release();
  }
});

// Update order status
router.post('/update-status', async (req, res) => {
  const { order_id, status } = req.body;

  if (!order_id || !status) {
    return res.status(400).json({ error: 'Missing order_id or status' });
  }

  try {
    const [result] = await db.query('UPDATE orders SET order_status = ? WHERE id = ?', [status, order_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order status updated successfully' });
  } catch (err) {
    console.error('Error updating status:', err);
    res.status(500).json({ error: 'Failed to update status', details: err.message });
  }
});

module.exports = router;
