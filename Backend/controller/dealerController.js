const db = require('../db');

// Get next dealer ID
const getNextDealerID = async () => {
  const [rows] = await db.query('SELECT MAX(dealer_id) AS maxId FROM dealers');
  return rows[0].maxId ? rows[0].maxId + 1 : 2000;
};

exports.addDealer = async (req, res) => {
  try {
    const { name } = req.body;
    const nextDealerId = await getNextDealerID();

    await db.query(
      'INSERT INTO dealers (dealer_id, name, is_active, created_at) VALUES (?, ?, ?, NOW())',
      [nextDealerId, name, 1]
    );

    res.json({ message: 'Dealer added successfully', dealer_id: nextDealerId });
  } catch (err) {
    console.error('Error in addDealer:', err);
    res.status(500).json({ error: 'Server error while adding dealer' });
  }
};

exports.getAllDealers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM dealers');
    res.json(rows);
  } catch (err) {
    console.error('Error in getAllDealers:', err);
    res.status(500).json({ error: 'Server error while fetching dealers' });
  }
};

exports.toggleDealerStatus = async (req, res) => {
  try {
    const { dealer_id, is_active } = req.body;
    const [result] = await db.query(
      'UPDATE dealers SET is_active = ? WHERE dealer_id = ?',
      [is_active, dealer_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Dealer not found' });
    }

    res.json({ message: 'Dealer status updated successfully' });
  } catch (err) {
    console.error('Error in toggleDealerStatus:', err);
    res.status(500).json({ error: 'Server error while updating dealer status' });
  }
};

exports.getDealerById = async (req, res) => {
  try {
    const { dealer_id } = req.params;
    const [rows] = await db.query('SELECT * FROM dealers WHERE dealer_id = ?', [dealer_id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Dealer not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Error in getDealerById:', err);
    res.status(500).json({ error: 'Server error while fetching dealer' });
  }
};
