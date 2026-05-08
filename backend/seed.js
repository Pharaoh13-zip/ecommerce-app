require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  { name: 'Wireless Headphones', description: 'Premium sound quality', price: 79.99, category: 'Electronics', image: 'https://via.placeholder.com/300' },
  { name: 'Running Shoes', description: 'Lightweight and comfortable', price: 59.99, category: 'Footwear', image: 'https://via.placeholder.com/300' },
  { name: 'Coffee Maker', description: 'Brews the perfect cup', price: 49.99, category: 'Kitchen', image: 'https://via.placeholder.com/300' },
  { name: 'Backpack', description: 'Durable everyday backpack', price: 39.99, category: 'Bags', image: 'https://via.placeholder.com/300' },
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Products seeded!');
    process.exit();
  });