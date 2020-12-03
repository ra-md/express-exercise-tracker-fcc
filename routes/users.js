const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/users', async (_, res) => {
  try {
    const users = await User.find({}, '-count -log');
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
