const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
    type: { type: String, enum: ['expense', 'income'], default: 'expense', index: true },
    amountMinor: { type: Number, required: true }, // £12.34 => 1234
    currency: { type: String, default: 'GBP' },
    category: { type: String, index: true },
    note: String,
    date: { type: Date, index: true, required: true },
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', TransactionSchema);
