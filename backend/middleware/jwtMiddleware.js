const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
  // Get the token from the request header
  const token = req.header("x-auth-token");

  // Check if there's no token
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed: No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId; // Set the authenticated user in the request object
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Authentication failed: Invalid token." });
  }
}

module.exports = authenticateJWT;
