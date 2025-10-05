const bcrypt = require('bcryptjs');
const jwt = require('jsonwentoken');
const User = require('../models/User');

const cookieOptions = {
    hhtpOnly: true,
    sameSite: 'lax',
    secure: false, // set to true for prod
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
};