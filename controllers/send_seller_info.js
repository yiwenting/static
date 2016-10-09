var sendMail = require('../business/mailer');
var dynamoDB = require('../business/dynamoDB');

function sendSellerInfo(req, res) {
    _transform(req.body);
    var subject = 'New seller info from ' + req.body.firstname + ' ' + req.body.lastname;
    var content = '<p><b>Property Address: </b>' + req.body.address + '</p>'
                + '<p><b>Are you the owner? </b>' + req.body.owner + '</p>'
                + '<p><b>How soon do you want to sell it? </b>' + req.body.plan + '</p>'
                + '<p><b>First Name: </b>' + req.body.firstname + '</p>'
                + '<p><b>Last Name: </b>' + req.body.lastname + '</p>'
                + '<p><b>Phone: </b>' + req.body.phone + '</p>'
                + '<p><b>Email: </b>' + req.body.email + '</p>';
    sendMail(subject, content, function(err, result) {
        if (err) {
            return res.status(500).send('Failed to contact.');
        }
        res.redirect('/complete.html');
    });
    dynamoDB.insert(req.body, req.device, dynamoDB.infoType.seller);
}

function _transform(message) {
    message.firstname = message['first name'];
    message.lastname = message['last name'];
    delete message['first name'];
    delete message['last name'];
}

module.exports = sendSellerInfo;