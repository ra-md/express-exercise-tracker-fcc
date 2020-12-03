const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/add', async (req, res) => {
  const body = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: body.userId },
      { useFindAndModify: false }
    );

    const newLog = {
      description: body.description,
      duration: Number(body.duration),
      date: new Date(body.date || Date.now())
    };

    user.count++;
    user.log.push(newLog);
    await user.save();

    res.json({
      _id: user._id,
      username: user.username,
      date: newLog.date,
      duration: newLog.duration,
      description: newLog.description
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
