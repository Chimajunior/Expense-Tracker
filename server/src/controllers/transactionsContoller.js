const Transactions = require('../models/Transaction');

async function list(req, res) {
    const {month} = req.query; // e.g 2025-10
    const match = { userId: req.userId };
    if (month) {
        const [y, m] = String(month).split('-').map(Number);
        const start = new Date(Date.UTC(y, m - 1, 1));
        const end = new Date(Date.UTC(y, m, 1));
        match.date = { $gte: start, $lt: end };
    }
    const items = await Transactions.find(match).sort({ date: -1 }); 
    res.json({ items });
}

async function create(req, res) {
    try {
      const { type = 'expense', amountMinor, currency = 'GBP', category, note, date, tags } = req.body;
      if (!amountMinor || !category || !date)
        return res.status(400).json({ error: 'amountMinor, category, date are required' });
      if (!Number.isInteger(Number(amountMinor)))
        return res.status(400).json({ error: 'amountMinor must be an integer (minor units, e.g. pence)' });
  
      const tx = await Transaction.create({
        userId: req.userId,
        type,
        amountMinor: Number(amountMinor),
        currency,
        category,
        note,
        date: new Date(date),
        tags: Array.isArray(tags) ? tags : [],
      });
      res.status(201).json({ item: tx });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }

  async function remove(req, res) {
    const { id } = req.params;
    await Transaction.deleteOne({ _id: id, userId: req.userId });
    res.json({ ok: true });
  }

module.exports = { list, create, remove};
