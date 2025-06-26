const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // ✅ THIS must be before routes

// ✅ Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/search', require('./routes/search'));

// ✅ MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT || 5000, () => console.log('Server started'));
  })
  .catch(err => console.log('Mongo Error:', err));
