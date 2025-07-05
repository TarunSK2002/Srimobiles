

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); // using mysql2/promise

// Utility function to generate next user_id with prefix and zero padding
function getNextUserId(prefix, lastId) {
  if (!lastId) return `${prefix}01`;

  const number = parseInt(lastId.replace(prefix, ''), 10);
  const nextNumber = (number + 1).toString().padStart(2, '0');
  return prefix + nextNumber;
}

// Fetch last user_id for the role and generate the next one
async function generateNewUserId(prefix, role) {
  const [rows] = await db.query(
    'SELECT user_id FROM login_auth WHERE role = ? ORDER BY user_id DESC LIMIT 1',
    [role]
  );

  const lastId = rows.length ? rows[0].user_id : null;
  return getNextUserId(prefix, lastId);
}

// ================================
// 📌 Customer Registration
// ================================
exports.registerCustomer = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const [existingUsers] = await db.query('SELECT * FROM login_auth WHERE username = ?', [username]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Generate user_id for customer, prefix "SRI_"
    const userId = await generateNewUserId('SRI_', 'customer');

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO login_auth (user_id, username, password, role) VALUES (?, ?, ?, ?)',
      [userId, username, hashedPassword, 'customer']
    );

    res.json({ message: 'Customer registered successfully', user_id: userId });
  } catch (error) {
    console.error('Customer registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// ================================
// 📌 Admin Registration
// ================================
exports.registerAdmin = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ error: 'Username, password, and role are required' });
    }

    const [existingUsers] = await db.query('SELECT * FROM login_auth WHERE username = ?', [username]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Generate user_id for admin, prefix "Admin_"
    const userId = await generateNewUserId('Admin_', role);

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO login_auth (user_id, username, password, role) VALUES (?, ?, ?, ?)',
      [userId, username, hashedPassword, role]
    );

    res.json({ message: `${role} registered successfully`, user_id: userId });
  } catch (error) {
    console.error('Admin registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// ================================
// 📌 User Login
// ================================
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const [users] = await db.query('SELECT * FROM login_auth WHERE username = ?', [username]);
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Create JWT payload
    const payload = {
      userId: user.user_id,
      username: user.username,
      role: user.role,
    };

    // Sign the token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

// ================================
// 📌 Get All Users (Admin only)
// ================================
exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query(
      'SELECT user_id, username, role, created_at FROM login_auth ORDER BY created_at DESC'
    );
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// ================================
// 📌 Get user by user_id (Optional, if added later)
// ================================
exports.getUserByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await db.query('SELECT * FROM login_auth WHERE user_id = ?', [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching user by user_id:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};
