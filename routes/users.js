var express = require('express');
var router = express.Router();

var mail = require('../controllers/mail');

router.get('/join', function(req, res, next) {
  res.render('join', { title: 'F save it' });
});

router.post('/join', function(req, res, next) {
  var email = req.body.email;

  // mail.send(email, 'U wanna join fsave.it', ''); 
  
  req.session.saveto=email
  
  res.redirect('back');
});

router.get('/leave', function(req, res, next) {
  res.render('leave', { title: 'F save it' });
});

module.exports = router;

router.post('/leave', function(req, res, next) {
  var email = req.body.email;
  
  if(req.session.saveto == req.body.email) {
    req.session.saveto = null
  }
  // mail.send(email, 'U wanna join fsave.it', ''); 
  
  res.redirect('/');
});
