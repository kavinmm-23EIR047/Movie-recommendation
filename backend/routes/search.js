const express = require('express');
const router = express.Router();
const Search = require('../models/Search');

// ✅ Save a search (automatically when user searches)
router.post('/', async (req, res) => {
  const { userName, userEmail, query } = req.body;

  if (!userName || !userEmail || !query) {
    return res.status(400).json({ message: "userName, userEmail, and query are required" });
  }

  try {
    const userIdentifier = `${userName} <${userEmail}>`;

    // Avoid duplicate for same user & same query
    const existing = await Search.findOne({ user: userIdentifier, query });
    if (existing) {
      return res.status(200).json({ message: 'Search already exists' });
    }

    await Search.create({ user: userIdentifier, query });
    res.status(201).json({ message: 'Search saved' });
  } catch (err) {
    console.error('❌ DB Save Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ✅ Get all searches by user
router.get('/:userEmail', async (req, res) => {
  const email = req.params.userEmail;
  try {
    const searches = await Search.find({ user: new RegExp(`<${email}>$`) }).sort({ searchedAt: -1 });
    res.status(200).json(searches);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch search history', error: err.message });
  }
});

module.exports = router;
