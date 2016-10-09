var transporter = require('./transporter');

function send(subject, htmlContent, done) {
    // setup e-mail data with unicode symbols
    var mailOptions = {
        subject: subject, // Subject line
        html: htmlContent // html body
    };
    
    // send mail with defined transport object
    transporter.sendMail(mailOptions, done);
}

module.exports = send;