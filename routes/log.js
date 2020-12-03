const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/log', async (req, res) => {
  const { query } = req;

  try {
    const user = await User.findById(query.userId);

    let filtered = user.log
      .filter((item) => {
        const fromDate = new Date(query.from);
        const toDate = new Date(query.to);

        if (query.from != null && query.to != null) {
          return (
            item.date.valueOf() > fromDate.valueOf() &&
            item.date.valueOf() < toDate.valueOf()
          );
        } else if (query.from != null) {
          return item.date.valueOf() > fromDate.valueOf();
        } else if (query.to != null) {
          return item.date.valueOf() < toDate.valueOf();
        }
        return item;
      })
      .slice(0, query.limit);

    res.json({
      _id: user._id,
      username: user.username,
      count: filtered.length,
      log: filtered
    });
  } catch (error) {
    console.log(error.message);
    res.json(error);
  }
});

module.exports = router;
