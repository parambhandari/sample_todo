const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const extractToken = (req) => {
  let token = req.headers['authorization'];
  if (!token) return null;

  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  }
  return token;
};

const authentication = (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      return res.status(401).json({ success: false, message: 'Token is missing' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);

    if (!decodedToken || !decodedToken.userId || !decodedToken.firstName || decodedToken.role) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    req._id = decodedToken.userId;
    req.firstName = decodedToken.firstName;
    req.role = decodedToken.role
    next();
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = authentication;
