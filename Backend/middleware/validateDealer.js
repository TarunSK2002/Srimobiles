// middleware/validateDealer.js

exports.validateAddDealer = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Dealer name is required' });
  }
  next();
};

exports.validateToggleStatus = (req, res, next) => {
  const { dealer_id, is_active } = req.body;
  if (typeof dealer_id === 'undefined' || typeof is_active === 'undefined') {
    return res.status(400).json({ error: 'dealer_id and is_active are required' });
  }
  next();
};

exports.validateGetDealerById = (req, res, next) => {
  const { dealer_id } = req.params;
  if (!dealer_id) {
    return res.status(400).json({ error: 'dealer_id param is required' });
  }
  next();
};
