var helper = require('sendgrid').mail;
var from_email = new helper.Email(process.env.EMAIL_FROM);
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

module.exports.send = function(email, subject, text) {
  var to_email = new helper.Email(email); 
  var subject = subject;
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
};