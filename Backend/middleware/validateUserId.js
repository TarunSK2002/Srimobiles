// Simple middleware to validate userId param is a valid number
module.exports = (req, res, next) => {
  const userId = req.params.id;
  if (!userId || isNaN(Number(userId))) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
  next();
};
