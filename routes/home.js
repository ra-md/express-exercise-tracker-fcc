const express = require('express');
const router = express.Router();

router.get('/', (_, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

module.exports = router;
