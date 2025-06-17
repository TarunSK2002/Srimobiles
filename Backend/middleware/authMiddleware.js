// //30-05-25  ---working

// // middleware/validateRequest.js

// // Validate required fields for registration and login
// exports.validateRegister = (req, res, next) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json({ error: 'Username and password are required' });
//   }
//   next();
// };

// exports.validateAdminRegister = (req, res, next) => {
//   const { username, password, role } = req.body;
//   if (!username || !password || !role) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }
//   if (!['admin', 'customer'].includes(role)) {
//     return res.status(400).json({ error: 'Invalid role' });
//   }
//   next();
// };

// exports.validateLogin = (req, res, next) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json({ error: 'Username and password are required' });
//   }
//   next();
// };





















// middleware/validateRequest.js

// function checkRequired(fields, body) {
//   for (const field of fields) {
//     if (!body[field] || !body[field].toString().trim()) {
//       return `${field} is required`;
//     }
//   }
//   return null;
// }

// exports.validateRegister = (req, res, next) => {
//   const error = checkRequired(['username', 'password'], req.body);
//   if (error) return res.status(400).json({ error });
//   next();
// };

// exports.validateAdminRegister = (req, res, next) => {
//   const error = checkRequired(['username', 'password', 'role'], req.body);
//   if (error) return res.status(400).json({ error });

//   const { role } = req.body;
//   if (!['admin', 'customer'].includes(role)) {
//     return res.status(400).json({ error: 'Invalid role' });
//   }
//   next();
// };

// exports.validateLogin = (req, res, next) => {
//   const error = checkRequired(['username', 'password'], req.body);
//   if (error) return res.status(400).json({ error });
//   next();
// };










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
