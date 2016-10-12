var sendMail = require('../business/mailer');
var dynamoDB = require('../business/dynamoDB');

function contactMe(req, res) {
    var subject = 'New contact info from ' + req.body.name;
    var content = '<p><b>Name: </b>' + req.body.name + '</p>'
                + '<p><b>Phone: </b>' + req.body.phone + '</p>'
                + '<p><b>Email: </b>' + req.body.email + '</p>'
                + '<p><b>Message: </b>' + (req.body.message || '(No message)') + '</p>';
    sendMail(subject, content, function(err, result) {
        if (err) {
            return res.status(500).send('Failed to contact.');
        }
        res.redirect('/complete');
    });
    dynamoDB.insert(req.body, req.device, dynamoDB.infoType.contact);
}

module.exports = contactMe;