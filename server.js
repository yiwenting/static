var express = require('express');
var app = express();
var methodOverride = require('method-override');
var device = require('express-device');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var contactMe = require('./controllers/contact_me');
var sendSellerInfo = require('./controllers/send_seller_info');

app.use(methodOverride());
app.use(cookieParser());
app.use(bodyParser.json());                        
app.use(bodyParser.urlencoded({ extended: true }));
app.use(device.capture({
    parseUserAgent: true
}));
app.use(express.static(__dirname + '/client'));
app.post('/sendContactInfo', function(req, res) {
    contactMe(req, res);
});
app.post('/sendSellerInfo', function(req, res) {
    sendSellerInfo(req, res);
});

app.listen(process.env.PORT || 3000, function() {
    console.log('App started listening on port 3000!');
})