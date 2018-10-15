var nodemailer = require('nodemailer');

function sendEmail(subject, text){

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rodrigo.brandao@gmail.com',
      pass: 'xxxxxx'
    }
  });
  
  var mailOptions = {
    from: 'rodrigo.brandao@gmail.com',
    to: 'rodrigo.brandao@atento.com',
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

exports.sendEmail = sendEmail;