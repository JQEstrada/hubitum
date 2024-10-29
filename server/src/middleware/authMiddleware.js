const jwt = require('jsonwebtoken');
const config = require('../config/config')
const secretKey = config.authentication.jwtSecret

module.exports = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // The format is 'Bearer <token>'

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid or expired token:' + token});
    }

    // Token is valid, extract the userId from the payload
    req.userId = decoded.id; // Assuming the token payload contains the user's ID

    // Proceed to the next middleware or route handler
    next();
  });
};