const JWT = require('jsonwebtoken');

// Protected Routes token base
const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    console.log("Token is: " + req.headers.authorization);
console.log(req.body);
console.log(req.file);
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired." });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token." });
    } else {
      return res.status(401).json({ message: "Authorization error." });
    }
  }
};

module.exports = { requireSignIn };
