// const express = require('express');
// const router = express.Router();
// const db = require('../db');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// // Admin Register
// router.post('/register', async (req, res) => {
//   const { username, password } = req.body;
//   const hashed = await bcrypt.hash(password, 10);
//   db.query('INSERT INTO admin (username, password) VALUES (?, ?)', [username, hashed],
//     (err) => {
//       if (err) return res.status(500).json({ error: err.message });
//       res.json({ message: "Admin registered" });
//     });
// });

// // Admin Login
// router.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   db.query('SELECT * FROM admin WHERE username = ?', [username], async (err, result) => {
//     if (err || result.length === 0) return res.status(401).json({ error: "Invalid credentials" });
//     const admin = result[0];
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
//     const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET);
//     res.json({ token });
//   });
// });

// module.exports = router;



// // const express = require('express');
// // const router = express.Router();
// // const { registerAdmin, loginAdmin } = require('../controllers/adminController');

// // router.post('/register', registerAdmin);
// // router.post('/login', loginAdmin);

// // module.exports = router;
