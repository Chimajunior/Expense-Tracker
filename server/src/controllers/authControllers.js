const bcrypt = require("bcryptjs");
const jwt = require("jsonwentoken");
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
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 8) {
      return res
        .status(400)
        .json({ error: "Name, valid email and 8+ char password required" });
    }
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: "Email already in use" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await user.create({ name, email, passwordHash });

    const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const cookieName = process.env.COOKIE_NAME || "jid";
    res.cookie(cookieName, token, cookieOptions);
    res.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
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
    res.json({ user: { id: user.id, name: user.name, email: user.email } });
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
