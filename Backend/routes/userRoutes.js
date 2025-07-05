// const express = require('express');
// const router = express.Router();
// const mysql = require('mysql2');

// // Route to get user details by user ID
// router.get('/user/:id', (req, res) => {
//     const userId = req.params.id;
  
//     // SQL query to fetch user details from the database
//     const query = `SELECT * FROM users WHERE id = ?`;  // Adjust the table name to your actual user table
//     db.query(query, [userId], (err, result) => {
//       if (err) {
//         console.error('Error fetching user data:', err);
//         return res.status(500).json({ message: 'Server error' });
//       }
  
//       if (result.length > 0) {
//         res.json(result[0]);  // Send back user details
//       } else {
//         res.status(404).json({ message: 'User not found' });
//       }
//     });
//   });
  

//   router.get('/:id', (req, res) => {
//     const userId = req.params.id;
//     const query = `SELECT * FROM users WHERE id = ?`;
//     db.query(query, [userId], (err, result) => {
//       if (err) {
//         console.error('Error fetching user data:', err);
//         return res.status(500).json({ message: 'Server error' });
//       }
//       if (result.length > 0) {
//         res.json(result[0]);
//       } else {
//         res.status(404).json({ message: 'User not found' });
//       }
//     });
//   });
  
//   module.exports = router;









// // === userRoutes.js ===
// const express = require('express');
// const router = express.Router();
// const db = require('../db'); // Adjust the path as needed

// // Route to get user details by user ID
// router.get('/user/:id', async (req, res) => {
//   const userId = req.params.id;

//   try {
//     const [rows] = await db.query('SELECT * FROM login_auth WHERE id = ?', [userId]);

//     if (rows.length > 0) {
//       res.json(rows[0]);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (err) {
//     console.error('Error fetching user data:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// router.get('/test', (req, res) => {
//   res.send('User route working!');
// });

// module.exports = router;





















const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const validateUserId = require('../middleware/validateUserId');

router.get('/test', (req, res) => {
  res.send('User route working!');
});

// Use validation middleware before controller
router.get('/:id', validateUserId, userController.getUserByUserId);


module.exports = router;
