var express = require('express');
var router = express.Router();

var mail = require('../controllers/mail');

router.get('/:text(*)', function(req, res, next) {
    var email = req.session.saveto;
    var text = req.params.text;

    mail.send(email, 'U fsave it!', text); 

    res.render('send', { title: 'F save it', user: email, text: text });
});

module.exports = router;
