const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  user: {
    type: String, // ideally, use ObjectId referencing the User model
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
  searchedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Search', searchSchema);
