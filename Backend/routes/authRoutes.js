
// const express = require('express');
// const bcrypt = require('bcrypt');
// const db = require('../db'); // mysql2/promise
// const router = express.Router();

// // === UI Registration (Customer only) ===
// router.post('/register', async (req, res) => {
//     const { username, password } = req.body;
//     if (!username || !password) return res.status(400).json({ error: 'Username and password are required' });

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Check if user already exists
//         const [existingUsers] = await db.query('SELECT * FROM login_auth WHERE username = ?', [username]);
//         if (existingUsers.length > 0) return res.status(409).json({ error: 'User already exists' });

//         // Insert new customer (role is hardcoded)
//         await db.query(
//             'INSERT INTO login_auth (username, password, role) VALUES (?, ?, ?)',
//             [username, hashedPassword, 'customer']
//         );

//         res.json({ message: 'Customer registered successfully' });
//     } catch (error) {
//         console.error('Customer registration error:', error);
//         res.status(500).json({ error: 'Registration failed' });
//     }
// });

// // === Admin Registration (Postman only) ===
// router.post('/admin-register', async (req, res) => {
//     const { username, password, role } = req.body;
//     if (!username || !password || !role) return res.status(400).json({ error: 'All fields are required' });

//     if (!['admin', 'customer'].includes(role)) return res.status(400).json({ error: 'Invalid role' });

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Check if user already exists
//         const [existingUsers] = await db.query('SELECT * FROM login_auth WHERE username = ?', [username]);
//         if (existingUsers.length > 0) return res.status(409).json({ error: 'User already exists' });

//         // Insert new user with given role
//         await db.query(
//             'INSERT INTO login_auth (username, password, role) VALUES (?, ?, ?)',
//             [username, hashedPassword, role]
//         );

//         res.json({ message: `${role} registered successfully` });
//     } catch (error) {
//         console.error('Admin registration error:', error);
//         res.status(500).json({ error: 'Registration failed' });
//     }
// });

// // === Shared Login Route ===
// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     if (!username || !password) return res.status(400).json({ error: 'Username and password are required' });

//     try {
//         const [users] = await db.query('SELECT * FROM login_auth WHERE username = ?', [username]);
//         if (users.length === 0) return res.status(401).json({ error: 'Invalid username or password' });

//         const user = users[0];
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(401).json({ error: 'Invalid username or password' });

//         const { password: _, ...userWithoutPassword } = user;
//         res.json({ message: 'Login successful', user: userWithoutPassword });
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).json({ error: 'Login failed' });
//     }
// });


// // === Get all users ===
// router.get('/all-users', async (req, res) => {
//   try {
//     const [users] = await db.query('SELECT id, username, role, created_at FROM login_auth');
//     res.json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ error: 'Failed to fetch users' });
//   }
// });



// module.exports = router;

















// const express = require('express');
// const router = express.Router();
// const authController = require('../controller/authController');

// // UI registration (customer only)
// router.post('/register', authController.registerCustomer);

// // Admin registration (postman only)
// router.post('/admin-register', authController.registerAdmin);

// // Shared login
// router.post('/login', authController.loginUser);

// // Get all users
// router.get('/all-users', authController.getAllUsers);

// module.exports = router;












//30-05-25  ---working

// const express = require('express');
// const router = express.Router();
// const authController = require('../controller/authController');
// const validate = require('../middleware/authMiddleware');

// // Customer Registration
// router.post('/register', validate.validateRegister, authController.registerCustomer);

// // Admin Registration
// router.post('/admin-register', validate.validateAdminRegister, authController.registerAdmin);

// // Login
// router.post('/login', validate.validateLogin, authController.loginUser);

// // Get all users
// router.get('/all-users', authController.getAllUsers);

// module.exports = router;

























//30-05-25

// const express = require('express');
// const router = express.Router();
// const authController = require('../controller/authController');
// const validate = require('../middleware/authMiddleware');

// // Customer Registration
// router.post('/register', validate.validateRegister, authController.registerCustomer);

// // Admin Registration
// router.post('/admin-register', validate.validateAdminRegister, authController.registerAdmin);

// // Login
// router.post('/login', validate.validateLogin, authController.loginUser);

// // Get all users
// router.get('/all-users', authController.getAllUsers);

// // Get user by user_id (e.g. 'sri_01') - custom user ID for customers
// router.get('/user/:userId', authController.getUserByUserId);

// module.exports = router;













const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const validate = require('../middleware/authMiddleware');

// Customer Registration
router.post('/register', validate.validateRegister, authController.registerCustomer);

// Admin Registration
router.post('/admin-register', validate.validateAdminRegister, authController.registerAdmin);

// Login
router.post('/login', validate.validateLogin, authController.loginUser);

// Get all users
router.get('/all-users', authController.getAllUsers);

// Get user by user_id
router.get('/user/:userId', authController.getUserByUserId);

module.exports = router;
