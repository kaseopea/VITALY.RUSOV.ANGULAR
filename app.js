// BASE SETUP
// =====================================================================================================================
var rootDir = __dirname;
var port = process.env.PORT || 9000;

var md5 = require('md5');
var express = require('express');
var router = require('./server/router.js');
var apiRouter = require('./server/router_api.js');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

// USER MODEL
// =====================================================================================================================
var UserManager = require('./server/userManager.js');
var user1 = new UserManager({
    email: 'olga@mail.ru',
    password: md5('123'),
    name: 'Olga',
    birthdate: '08-04-1984',
    age: 32,
    bio: 'Nice beaver!'
});
var user2 = new UserManager({
    email: 'peter@mail.ru',
    password: md5('123'),
    name: 'Peter',
    birthdate: '11-10-1991',
    age: 18,
    bio: 'Do not have any bio right now!'
});
//user2.createUser();


// CONFIGS
// =====================================================================================================================
// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Method Override
app.use(methodOverride('X-HTTP-Method-Override'));

//Session settings
app.use(session({
    secret: 'angular secret key',
    resave: true,
    rolling: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 10 * 60 * 1000
    }

}));

// Static content
app.use( "/", express.static(rootDir));

// timeout for all requests
//app.use(function(req,res,next){
//    setTimeout(next, 10*1000)
//});


// Router Settings
// =====================================================================================================================
app.use('/', router);

// All of the API routes will be prefixed with '/api'
app.use('/api', apiRouter);

// check all API routes for all requests - user should be authenticated
app.all('/api/*', function (req, res, next) {
    if (req.session.authenticated) {
        next();
    } else {
        res.sendStatus(401);
    }
});


// START THE SERVER
// =====================================================================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
