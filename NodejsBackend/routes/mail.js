let nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'homiecrewtm@gmail.com',
    pass: '12V34l56a78d' // system vulnerability => hide system configs;
  }
})

var mailOptions = {
  from: 'homiecrewtm@gmail.com',
  to: '',
  subject: 'Verify email',
  text: ''
};

module.exports = {
  send: function(to, text) {
    mailOptions.to = to;
    mailOptions.text = text;
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.log(err)
      else console.log("Email sent: " + info.responce)
    })
  }
}