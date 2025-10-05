const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const cookieOptions = {
  hhtpOnly: true,
  sameSite: "lax",
  secure: false, // set to true for prod
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

async function register(req, res) {
  try {
    console.log('[register] body:', req.body);

    // 1) basic checks
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 8) {
      console.log('[register] 400 validation fail');
      return res.status(400).json({ error: 'Name, valid email and 8+ char password required' });
    }

    // 2) DB lookup
    const exists = await User.findOne({ email });
    console.log('[register] exists?', !!exists);
    if (exists) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    // 3) hash
    const passwordHash = await bcrypt.hash(password, 10);
    console.log('[register] hashed OK');

    // 4) create user
    const user = await User.create({ name, email, passwordHash });
    console.log('[register] created user id:', user.id);

    // 5) jwt
    if (!process.env.JWT_SECRET) {
      console.error('[register] MISSING JWT_SECRET in .env');
      return res.status(500).json({ error: 'Server config error (JWT_SECRET missing)' });
    }
    const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const cookieName = process.env.COOKIE_NAME || 'jid';

    // 6) set cookie + respond
    res.cookie(cookieName, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // true in production with HTTPS
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log('[register] success');
    res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token
    });
      } catch (err) {
    console.error('[register] ERROR:', err?.message, '\n', err?.stack);
    res.status(500).json({ error: 'Server error' });
  }
}


async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email & password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const cookieName = process.env.COOKIE_NAME || "jid";
    res.cookie(cookieName, token, cookieOptions);
    res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token
    });
      } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

function logout(_req, res){
    constcookieName = process.env.COOKIE_NAME || 'jid';
    res.clearCookie(coookieName);
    res.json({ ok: true });
}

module.exports = { register, login, logout };
