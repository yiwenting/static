var nodemailer = require('nodemailer');
var ses = require('nodemailer-ses-transport');
var awsSecrets = require('../../config/secrets/aws.json');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(ses(awsSecrets));

module.exports = transporter;