const mongoose = require('mongoose');
const { SUPPORTED_CURRENCIES } = require('../constants/currencies');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, index: true },
    passwordHash: { type: String, required: true },
    defaultCurrency: { type: String, enum: SUPPORTED_CURRENCIES, default: 'GBP' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
