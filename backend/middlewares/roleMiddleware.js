// Middleware for role-based access control

exports.adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access restricted to administrators" });
  }
  next();
};

exports.ownerOnly = (req, res, next) => {
  if (req.user.role !== "restaurant_owner") {
    return res.status(403).json({ message: "Only restaurant owners allowed" });
  }
  next();
};

exports.userOnly = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Action permitted for users only" });
  }
  next();
};
