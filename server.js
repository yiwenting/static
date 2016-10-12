var express = require('express');
var app = express();
var path = require('path');
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
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views/mobile');
app.set('view engine', 'ejs');
app.post('/sendContactInfo', function(req, res) {
    contactMe(req, res);
});
app.post('/sendSellerInfo', function(req, res) {
    sendSellerInfo(req, res);
});

// routes
app.get('/', function(req, res) {
    res.render('index.ejs', {
        page: {
            title: "Sarah Lu's Website"
        }
    });
});
app.get('/about', function(req, res) {
    res.render('about.ejs', {
        page: {
            title: "About Sarah"
        }
    });
});
app.get('/contact', function(req, res) {
    res.render('contact.ejs', {
        page: {
            title: "Contact Me"
        }
    });
});
app.get('/complete', function(req, res) {
    res.render('complete.ejs', {
        page: {
            title: "Message Sent"
        }
    });
});
app.get('/seller', function(req, res) {
    res.render('seller.ejs', {
        page: {
            title: "For Sellers"
        }
    });
});
app.get('/buyer', function(req, res) {
    res.render('buyer.ejs', {
        page: {
            title: "For Buyers"
        }
    });
});
app.get('/pick', function(req, res) {
    res.render('pick.ejs', {
        page: {
            title: "Sarah's Pick"
        }
    });
});
app.get('/local', function(req, res) {
    res.render('local.ejs', {
        page: {
            title: "Local Fun"
        }
    });
});

app.listen(process.env.PORT || 3000, function() {
    console.log('App started listening on port 3000!');
})