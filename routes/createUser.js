const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/new-user', async (req, res) => {
  const username = req.body.username;

  try {
    let user = await User.findOne({ username }).select('username');

    if (user != null) return res.json({ error: 'Username already exist' });

    user = new User({
      username
    });

    await user.save();
    res.json({
      _id: user.id,
      username: user.username
    });
  } catch ({ errors }) {
    if (errors.username) return res.json({ error: errors.username.message });
    return res.json({ error: errors });
  }
});

module.exports = router;
