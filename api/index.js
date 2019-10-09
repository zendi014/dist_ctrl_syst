var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  let dt = { title: 'Express' }
  res.json(dt);
});


module.exports = router;
