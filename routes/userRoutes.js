// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Endpoint to check if email already exists
router.post('/check-email', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(200).json({ message: 'Email available' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
