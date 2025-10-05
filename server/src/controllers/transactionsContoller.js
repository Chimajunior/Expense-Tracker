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

module.exports = { list};
