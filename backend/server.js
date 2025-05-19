require("dotenv").config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/auth');
// app.use('/api/auth', authRoutes);


const app = express();

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/expense-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Root route to prevent "Cannot GET /"
app.get('/', (req, res) => {
  res.send('🚀 Expense Tracker API running...');
});

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/signup', signupRoute);
app.use('/api/login', loginRoute);
app.use('/api/expenses', expenseRoutes);

// ✅ Start server
app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
