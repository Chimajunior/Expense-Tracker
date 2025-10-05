const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const cookieName = process.env.COOKIE_NAME || 'jid';
  const authHeader = req.headers.authorization || '';
  const bearer = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const token = req.cookies[cookieName] || bearer;

  if (!token) return res.status(401).json({ error: 'Unauthenticated' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.uid;
    next();
  } catch (err) {
    console.error('JWT verify failed:', err.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = { requireAuth };
