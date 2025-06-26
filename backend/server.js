// const express = require('express');
// const app = express();
// const cors = require('cors');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');

// dotenv.config();

// // ✅ Middleware
// app.use(cors());
// app.use(express.json()); // ✅ THIS must be before routes

// // ✅ Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/search', require('./routes/search'));

// // ✅ MongoDB connect
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('MongoDB Connected');
//     app.listen(process.env.PORT || 5000, () => console.log('Server started'));
//   })
//   .catch(err => console.log('Mongo Error:', err));
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/search', require('./routes/search'));

// Serve static HTML files (images, CSS, JS, HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Explicit route handlers for each page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// 404 fallback for undefined HTML routes
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Connect to MongoDB & start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB Error:', err));
