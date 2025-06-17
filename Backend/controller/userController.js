//30-05-25 --- working

// const db = require('../db');

// exports.getUserById = async (req, res) => {
//   const userId = Number(req.params.id);
//   if (isNaN(userId)) {
//     return res.status(400).json({ error: 'Invalid user ID' });
//   }

//   try {
//     const [rows] = await db.query('SELECT id, username, email FROM login_auth WHERE id = ?', [userId]);

//     if (rows.length > 0) {
//       res.json(rows[0]);
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (err) {
//     console.error('Error fetching user data:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };
























const db = require('../db');

exports.getUserByUserId = async (req, res) => {
  const userId = req.params.userId; // expecting something like 'sri_01'

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const [rows] = await db.query(
      'SELECT id, user_id, username, role FROM login_auth WHERE user_id = ?',
      [userId]
    );

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
