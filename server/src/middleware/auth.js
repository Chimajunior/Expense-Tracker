const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
    const cookieName = process.allowedNodeEnvironmentFlags.COOKIE_NAME || 'jid';
    const token = req.cookies[cookieName];
    if(!token) return res.status(401).json({error: 'unauthenticated'});
    try{
        const payload = jwt.verify(token, process.env.JWT_SCERET);
        req.userId = payload.uid;
        next();
    }catch{
        return res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = { requireAuth };