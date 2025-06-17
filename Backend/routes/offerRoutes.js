
// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const db = require('../db'); // your database connection instance
// const router = express.Router();

// // Multer setup: save files in uploads/offers
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/offers');
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, uniqueName + path.extname(file.originalname)); // unique filename + extension
//   }
// });
// const upload = multer({ storage });

// // Add new offer
// router.post('/add', upload.single('image'), async (req, res) => {
//   const { title, description, start_date, end_date } = req.body;

//   // Store only the filename, NOT full path
//   const image = req.file ? req.file.filename : null;

//   if (!title || !image || !start_date || !end_date) {
//     return res.status(400).json({ error: 'Title, image, start_date, and end_date are required.' });
//   }

//   try {
//     const [result] = await db.query(
//       `INSERT INTO offers (title, image, description, start_date, end_date, created_at, is_active)
//        VALUES (?, ?, ?, ?, ?, NOW(), true)`,
//       [title, image, description || null, start_date, end_date]
//     );
//     res.json({ message: 'Offer added successfully', offerId: result.insertId });
//   } catch (err) {
//     console.error('Error inserting offer:', err);
//     res.status(500).json({ error: 'Database error adding offer.' });
//   }
// });

// // Get all offers
// router.get('/all', async (req, res) => {
//   try {
//     const [results] = await db.query('SELECT * FROM offers ORDER BY created_at DESC');
//     res.json(results);
//   } catch (err) {
//     console.error('Error fetching offers:', err);
//     res.status(500).json({ error: 'Database error fetching offers.' });
//   }
// });

// module.exports = router;


























const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../db'); // Your database connection instance

const router = express.Router();

// Directory to save offer images
const offerUploadPath = path.join(__dirname, '..', 'uploads', 'offers');

// Ensure upload directory exists
if (!fs.existsSync(offerUploadPath)) {
  fs.mkdirSync(offerUploadPath, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, offerUploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

/**
 * Add new offer (POST /api/offers/add)
 */
router.post('/add', upload.single('image'), async (req, res) => {
  const { title, description, start_date, end_date } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!title || !image || !start_date || !end_date) {
    return res.status(400).json({ error: 'Title, image, start_date, and end_date are required.' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO offers (title, image, description, start_date, end_date, created_at, is_active)
       VALUES (?, ?, ?, ?, ?, NOW(), true)`,
      [title, image, description || null, start_date, end_date]
    );
    res.json({ message: 'Offer added successfully', offerId: result.insertId });
  } catch (err) {
    console.error('Error inserting offer:', err);
    res.status(500).json({ error: 'Database error adding offer.' });
  }
});

/**
 * Get all offers (GET /api/offers/all)
 */
router.get('/all', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM offers ORDER BY created_at DESC');
    res.json(results);
  } catch (err) {
    console.error('Error fetching offers:', err);
    res.status(500).json({ error: 'Database error fetching offers.' });
  }
});

/**
 * Update offer status (PATCH /api/offers/status/:id)
 */
router.patch('/status/:id', async (req, res) => {
  const offerId = req.params.id;
  const { active } = req.body;

  try {
    const [result] = await db.query('UPDATE offers SET is_active = ? WHERE id = ?', [active, offerId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Offer not found' });
    }

    res.json({ message: 'Offer status updated successfully' });
  } catch (err) {
    console.error('Error updating offer status:', err);
    res.status(500).json({ error: 'Database error updating offer status' });
  }
});

/**
 * Delete offer (DELETE /api/offers/:id)
 */
router.delete('/:id', async (req, res) => {
  const offerId = req.params.id;

  try {
    // Get image filename
    const [[offer]] = await db.query('SELECT image FROM offers WHERE id = ?', [offerId]);
    if (!offer) return res.status(404).json({ error: 'Offer not found' });

    // Delete from DB
    await db.query('DELETE FROM offers WHERE id = ?', [offerId]);

    // Delete image file
    const imagePath = path.join(offerUploadPath, offer.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    res.json({ message: 'Offer deleted successfully' });
  } catch (err) {
    console.error('Error deleting offer:', err);
    res.status(500).json({ error: 'Database error deleting offer.' });
  }
});

module.exports = router;
