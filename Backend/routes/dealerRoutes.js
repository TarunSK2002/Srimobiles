// const express = require('express');
// const db = require('../db');  // Import the db pool with promise support
// const router = express.Router();

// // Utility function to get the next dealer ID starting from 2000
// const getNextDealerID = async () => {
//     try {
//         const [rows] = await db.query('SELECT MAX(dealer_id) AS maxId FROM dealers');
//         const nextDealerId = rows[0].maxId ? rows[0].maxId + 1 : 2000;  // Default to 2000 if no dealers exist
//         return nextDealerId;
//     } catch (err) {
//         console.error('Error fetching max dealer_id:', err);
//         throw err;  // Rethrow the error to be caught by the route handler
//     }
// };

// // POST route to add a new dealer
// router.post('/add', async (req, res) => {
//     const { name } = req.body;

//     if (!name) {
//         return res.status(400).json({ error: 'Dealer name is required' });
//     }

//     try {
//         const nextDealerId = await getNextDealerID();

//         // Insert the new dealer into the database
//         await db.query(
//             'INSERT INTO dealers (dealer_id, name, is_active, created_at) VALUES (?, ?, ?, NOW())',
//             [nextDealerId, name, 1]
//         );

//         res.json({ message: 'Dealer added successfully', dealer_id: nextDealerId });
//     } catch (err) {
//         console.error('Error in POST /add:', err);  // Log the error
//         res.status(500).json({ error: 'Server error while adding dealer' });
//     }
// });

// // Get all dealers
// router.get('/all', async (req, res) => {
//     try {
//         const [rows] = await db.query('SELECT * FROM dealers');
//         res.json(rows);  // Send all dealer records as JSON response
//     } catch (err) {
//         console.error('Error fetching all dealers:', err);
//         res.status(500).json({ error: 'Server error while fetching dealers' });
//     }
// });


// router.post('/toggle-status', async (req, res) => {
//     const { dealer_id, is_active } = req.body;

//     try {
//         const [result] = await db.query(
//             'UPDATE dealers SET is_active = ? WHERE dealer_id = ?',
//             [is_active, dealer_id]
//         );

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ error: 'Dealer not found' });
//         }

//         res.json({ message: 'Dealer status updated successfully' });
//     } catch (err) {
//         console.error('Error updating dealer status:', err);
//         res.status(500).json({ error: 'Server error while updating dealer status' });
//     }
// });

// // Get a dealer by ID
// router.get('/get/:dealer_id', async (req, res) => {
//     const { dealer_id } = req.params;

//     try {
//         const [rows] = await db.query('SELECT * FROM dealers WHERE dealer_id = ?', [dealer_id]);

//         if (rows.length === 0) {
//             return res.status(404).json({ error: 'Dealer not found' });
//         }

//         res.json(rows[0]);  // Send the dealer record as JSON response
//     } catch (err) {
//         console.error('Error fetching dealer by ID:', err);
//         res.status(500).json({ error: 'Server error while fetching dealer' });
//     }
// });


// module.exports = router;
















const express = require('express');
const router = express.Router();

const dealerController = require('../controller/dealerController');
const validateDealer = require('../middleware/validateDealer');

// Add dealer
router.post('/add', validateDealer.validateAddDealer, dealerController.addDealer);

// Get all dealers
router.get('/all', dealerController.getAllDealers);

// Toggle dealer status
router.post('/toggle-status', validateDealer.validateToggleStatus, dealerController.toggleDealerStatus);

// Get dealer by ID
router.get('/get/:dealer_id', validateDealer.validateGetDealerById, dealerController.getDealerById);

module.exports = router;
