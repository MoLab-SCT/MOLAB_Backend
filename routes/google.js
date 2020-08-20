const express = require('express');
const router = express.Router();

// @route GET /google
// @desc  Test route
// @access Public

router.get('/', (req, res) => {
  res.send('google route');
});

module.exports = router;
