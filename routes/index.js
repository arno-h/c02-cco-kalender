const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Kalender 4.0 at your service!');
});

module.exports = router;
