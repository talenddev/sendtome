var express = require('express');
var router = express.Router();

router.post('/join', function(req, res, next) {
  var email = req.body.email;
  
  res.cookie('saveto',email, { maxAge: 900000, httpOnly: false });

  res.redirect('back');
});

module.exports = router;
