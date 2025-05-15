require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // For logging

// Import routes
const userRoutes = require('./routes/user.routes');
const formRoutes = require('./routes/form.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // HTTP request logger

// Routes
app.use('/api/users', userRoutes);
app.use('/api/forms', formRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;