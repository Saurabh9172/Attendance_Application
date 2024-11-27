const authMiddleware = (roles = []) => (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ msg: 'Access denied' });
      }
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ msg: 'Invalid token' });
    }
  };
  
  module.exports = authMiddleware;
  