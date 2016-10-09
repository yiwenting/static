var transporter = require('./transporter');
var config = require('../../config/config.json');

function send(subject, htmlContent, done) {
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"' + config.owner.name + '" <' + config.owner.email + '>',
        to: config.owner.email,
        subject: subject, // Subject line
        html: htmlContent // html body
    };
    
    // send mail with defined transport object
    transporter.sendMail(mailOptions, done);
}

module.exports = send;