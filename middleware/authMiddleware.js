const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Invalid token.' });
    }

    // Attach the decoded user payload to the request object
    req.user = decoded; // Includes userId and other details in the token payload
    next();
  });
};

module.exports = authMiddleware;
