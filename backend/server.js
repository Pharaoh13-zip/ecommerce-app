const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

aapp.use(cors({
  origin: 'https://ecommerce-j77ug93ja-pharaoh13-zips-projects.vercel.app'
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
})  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log('DB error:', err));

// Routes
// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/checkout', require('./routes/checkout'));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});