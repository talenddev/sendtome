var express = require('express');
var router = express.Router();

var helper = require('sendgrid').mail;
var from_email = new helper.Email(process.env.EMAIL_FROM);
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

router.get('/:text(*)', function(req, res, next) {
    var cookie = req.cookies.logged;
    var text = req.params.text;

    var to_email = new helper.Email('test@example.com'); // TODO get from cookie
    var subject = 'Hello World from the SendGrid Node.js Library!'; // TODO ?
    var content = new helper.Content('text/plain', text);
    var mail = new helper.Mail(from_email, subject, to_email, content);

    var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
    });

    sg.API(request, function(error, response) {
        console.debug(response.statusCode);
        console.debug(response.body);
        console.debug(response.headers);
    });

    res.render('send', { title: 'Sendme', user: 'get from cookie', text: text }); //TODO
});

module.exports = router;
