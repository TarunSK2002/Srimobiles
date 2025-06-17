// const express = require('express');
// const db = require('../db');
// const router = express.Router();

// // Add customer (called from register page)
// router.post('/add', (req, res) => {
//     const { name, email, mobile, gender } = req.body;
//     if (!name || !email || !mobile || !gender) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }

//     db.query(
//         'INSERT INTO users (name, email, mobile, gender, created_at) VALUES (?, ?, ?, ?, NOW())',
//         [name, email, mobile, gender],
//         (err) => {
//             if (err) return res.status(500).json({ error: err });
//             res.json({ message: 'Customer added successfully' });
//         }
//     );
// });

// // Get all customers
// router.get('/all', (req, res) => {
//     db.query('SELECT * FROM users ORDER BY created_at DESC', (err, results) => {
//         if (err) return res.status(500).json({ error: err });
//         res.json(results);
//     });
// });

// module.exports = router;















//30-05-25


// const express = require('express');
// const db = require('../db');
// const router = express.Router();

// // --- MOCK middleware for auth and role, replace with real JWT/session auth ---
// function authMiddleware(req, res, next) {
//   // Simulated user session (Change this for real implementation)
//   req.user = { id: 1, role: 'admin' }; // Change to `{ id: 5, role: 'customer' }` to test customer
//   next();
// }

// function requireRole(role) {
//   return (req, res, next) => {
//     if (req.user.role !== role) {
//       return res.status(403).json({ error: 'Forbidden: insufficient rights' });
//     }
//     next();
//   };
// }

// router.use(authMiddleware);

// //
// // ---------- Public Route (No Auth Needed for Registration) ----------
// //

// router.post('/add', (req, res) => {
//   const { name, email, mobile, gender } = req.body;
//   if (!name || !email || !mobile || !gender) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   db.query(
//     'INSERT INTO users (name, email, mobile, gender, is_active, created_at) VALUES (?, ?, ?, ?, 1, NOW())',
//     [name, email, mobile, gender],
//     (err) => {
//       if (err) return res.status(500).json({ error: err });
//       res.json({ message: 'Customer added successfully' });
//     }
//   );
// });

// //
// // ---------------- Admin Routes ----------------
// //

// // Get all customers
// router.get('/admin/customers', requireRole('admin'), (req, res) => {
//   db.query('SELECT * FROM users ORDER BY created_at DESC', (err, results) => {
//     if (err) return res.status(500).json({ error: err });
//     res.json(results);
//   });
// });

// // Delete a customer
// router.delete('/admin/customers/:id', requireRole('admin'), (req, res) => {
//   const customerId = req.params.id;
//   db.query('DELETE FROM users WHERE id = ?', [customerId], (err, result) => {
//     if (err) return res.status(500).json({ error: err });
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: 'Customer not found' });
//     }
//     res.json({ message: 'Customer deleted successfully' });
//   });
// });

// // Deactivate a customer
// router.patch('/admin/customers/:id/deactivate', requireRole('admin'), (req, res) => {
//   const customerId = req.params.id;
//   db.query('UPDATE users SET is_active = 0 WHERE id = ?', [customerId], (err, result) => {
//     if (err) return res.status(500).json({ error: err });
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: 'Customer not found' });
//     }
//     res.json({ message: 'Customer deactivated successfully' });
//   });
// });

// //
// // ---------------- Customer Routes ----------------
// //

// // Get own profile
// router.get('/customer/me', requireRole('customer'), (req, res) => {
//   db.query(
//     'SELECT id, name, email, mobile, gender, is_active, created_at FROM users WHERE id = ?',
//     [req.user.id],
//     (err, results) => {
//       if (err) return res.status(500).json({ error: err });
//       if (results.length === 0) {
//         return res.status(404).json({ error: 'Customer not found' });
//       }
//       res.json(results[0]);
//     }
//   );
// });

// // Update own profile
// router.put('/customer/me', requireRole('customer'), (req, res) => {
//   const { name, email, mobile, gender } = req.body;
//   if (!name || !email || !mobile || !gender) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   db.query(
//     'UPDATE users SET name = ?, email = ?, mobile = ?, gender = ? WHERE id = ?',
//     [name, email, mobile, gender, req.user.id],
//     (err, result) => {
//       if (err) return res.status(500).json({ error: err });
//       if (result.affectedRows === 0) {
//         return res.status(404).json({ error: 'Customer not found' });
//       }
//       res.json({ message: 'Customer updated successfully' });
//     }
//   );
// });

// module.exports = router;






























// const express = require('express');
// const router = express.Router();
// const db = require('../db'); // your db connection

// // Mock middleware (replace with real auth later)
// function authMiddleware(req, res, next) {
//   req.user = { id: 1, role: 'admin' }; // Example user: admin or customer
//   next();
// }

// function requireRole(role) {
//   return (req, res, next) => {
//     if (req.user.role !== role) {
//       return res.status(403).json({ error: 'Forbidden: insufficient rights' });
//     }
//     next();
//   };
// }

// function authorizeCustomerOrAdmin(req, res, next) {
//   const requestedId = Number(req.params.id);
//   if (req.user.role === 'admin' || req.user.id === requestedId) {
//     next();
//   } else {
//     return res.status(403).json({ error: 'Forbidden: insufficient rights' });
//   }
// }

// router.use(authMiddleware);

// async function generateUserCode() {
//   const [rows] = await db.query('SELECT COUNT(*) AS count FROM users');
//   const count = rows[0].count + 1;
//   return `sri_${String(count).padStart(2, '0')}`;
// }

// router.post('/add', async (req, res) => {
//   try {
//     const { full_name, gender, email, phone } = req.body;
//     if (!full_name || !gender || !email) {
//       return res.status(400).json({ error: 'Full name, gender, and email are required' });
//     }
//     const user_code = await generateUserCode();
//     await db.query(
//       `INSERT INTO users (user_code, full_name, gender, email, phone, is_active, created_at)
//        VALUES (?, ?, ?, ?, ?, 1, NOW())`,
//       [user_code, full_name, gender, email, phone || null]
//     );
//     res.json({ message: 'Customer added successfully', user_code });
//   } catch (err) {
//     if (err.code === 'ER_DUP_ENTRY') {
//       return res.status(400).json({ error: 'Email already exists' });
//     }
//     res.status(500).json({ error: err.message });
//   }
// });

// router.get('/admin/customers', requireRole('admin'), async (req, res) => {
//   try {
//     res.set('Cache-Control', 'no-store');
//     const [rows] = await db.query('SELECT * FROM users ORDER BY created_at DESC');
//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.delete('/admin/customers/:id', requireRole('admin'), async (req, res) => {
//   try {
//     const [result] = await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
//     if (result.affectedRows === 0) return res.status(404).json({ error: 'Customer not found' });
//     res.json({ message: 'Customer deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.patch('/admin/customers/:id/deactivate', requireRole('admin'), async (req, res) => {
//   try {
//     const [result] = await db.query('UPDATE users SET is_active = 0 WHERE id = ?', [req.params.id]);
//     if (result.affectedRows === 0) return res.status(404).json({ error: 'Customer not found' });
//     res.json({ message: 'Customer deactivated successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.get('/customer/:id', authorizeCustomerOrAdmin, async (req, res) => {
//   try {
//     const [rows] = await db.query(
//       'SELECT id, user_code, full_name, gender, email, phone, is_active, created_at FROM users WHERE id = ?',
//       [req.params.id]
//     );
//     if (rows.length === 0) return res.status(404).json({ error: 'Customer not found' });
//     res.json(rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.put('/customer/:id', authorizeCustomerOrAdmin, async (req, res) => {
//   try {
//     const { full_name, gender, email, phone } = req.body;
//     if (!full_name || !gender || !email) {
//       return res.status(400).json({ error: 'Full name, gender, and email are required' });
//     }
//     const [result] = await db.query(
//       'UPDATE users SET full_name = ?, gender = ?, email = ?, phone = ? WHERE id = ?',
//       [full_name, gender, email, phone || null, req.params.id]
//     );
//     if (result.affectedRows === 0) return res.status(404).json({ error: 'Customer not found' });
//     res.json({ message: 'Customer updated successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;




















const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Dummy customer data
const customers = [
  { id: 1, full_name: 'John Doe', email: 'john@example.com', phone: '1234567890', gender: 'Male' },
  { id: 2, full_name: 'Jane Smith', email: 'jane@example.com', phone: null, gender: 'Female' },
];

// Customer admin routes
const customerAdminRoutes = express.Router();

customerAdminRoutes.get('/customers', (req, res) => {
  res.json(customers);
});

// Mount route
app.use('/api/customer/admin', customerAdminRoutes);

// Basic test route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
