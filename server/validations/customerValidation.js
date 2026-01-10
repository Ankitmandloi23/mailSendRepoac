const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key";


exports.verifyToken = async (req, res, next) => {
  console.log("testing",req.headers.authorization);
  
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // Get token from Bearer <token>

  try {
    // Verify and decode JWT
    const decoded = jwt.verify(token, SECRET_KEY);
    // Attach user data to request for downstream usage
    req.user = decoded;

    next();
  } catch (err) {
    console.log("err occured",err)
    return res.status(403).json({ success: false, message: 'Invalid or expired token.' });
  }
};