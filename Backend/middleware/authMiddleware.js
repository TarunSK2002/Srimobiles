const jwt = require('jsonwebtoken');

// Utility: Check if required fields are present and not empty
function checkRequired(fields, body) {
  for (const field of fields) {
    if (!body[field] || body[field].toString().trim() === '') {
      return `${field} is required`;
    }
  }
  return null;
}

// 📌 Validate customer registration
exports.validateRegister = (req, res, next) => {
  const error = checkRequired(['username', 'password'], req.body);
  if (error) {
    return res.status(400).json({ error });
  }
  next();
};

// 📌 Validate admin registration (includes role)
exports.validateAdminRegister = (req, res, next) => {
  const error = checkRequired(['username', 'password', 'role'], req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  const { role } = req.body;
  if (!['admin', 'customer'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role: must be either admin or customer' });
  }

  next();
};

// 📌 Validate login
exports.validateLogin = (req, res, next) => {
  const error = checkRequired(['username', 'password'], req.body);
  if (error) {
    return res.status(400).json({ error });
  }
  next();
};

// 🔐 Authenticate JWT
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied, token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// 👮 Authorize Admin Role
exports.authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admins only' });
  }
  next();
};
