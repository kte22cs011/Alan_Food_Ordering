const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  try {
    const authToken = req.cookies.token;

    if (!authToken) {
      return res.status(401).json({ message: "Authentication token missing" });
    }

    const userData = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = userData;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
