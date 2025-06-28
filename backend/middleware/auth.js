const jwt = require('jsonwebtoken');

// Main authentication middleware
exports.authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ 
      status: 'error',
      message: 'Access denied. No token provided.' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user payload to request
    next();
  } catch (err) {
    res.status(401).json({
      status: 'error',
      message: 'Invalid or expired token'
    });
  }
};

// Role-specific middlewares
exports.isOwner = (req, res, next) => {
  if (req.user?.role !== 'restaurant_owner') {
    return res.status(403).json({
      status: 'error',
      message: 'Forbidden: Restaurant owners only'
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Forbidden: Admins only'
    });
  }
  next();
};

// Flexible role-based middleware
exports.requireRoles = (roles = []) => {
  return (req, res, next) => {
    if (!req.user?.role) {
      return res.status(401).json({
        status: 'error',
        message: 'User role not identified'
      });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: `Forbidden: Requires ${roles.join(' or ')} role`
      });
    }

    next();
  };
};