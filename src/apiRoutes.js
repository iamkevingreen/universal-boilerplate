var express = require('express');
var router = express.Router();

router.get('/taco', (req, res) => {
  return res.status(200).send('get /taco');
});

module.exports = router;
