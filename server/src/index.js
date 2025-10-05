const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();


const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const txRoutes = require('./routes/transactions');


const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173', credentials: true }));


app.get('/health', (_req, res) => res.json({ ok: true }));


app.use('/api/auth', authRoutes);
app.use('/api/transactions', txRoutes);


const PORT = process.env.PORT || 4000;
connectDB()
.then(() => {
app.listen(PORT, () => console.log(`API on :${PORT}`));
})
.catch((err) => {
console.error('DB connection failed', err);
process.exit(1);
});