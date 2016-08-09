// General Router
// =====================================================================================================================
var express = require('express');
var router = express.Router();
var UserManager = require('./userManager.js');
var userManager = new UserManager();
var md5 = require('md5');
var bodyParser = require('body-parser');

// Login
// =====================================================================================================================
router.route('/login')
    .post(function (req, res) {

        //Parsing body vars with bodyParser
        var email = req.body.email;
        var pass = req.body.password;

        // Check promised result
        userManager.authenticate(email, md5(pass))
            .then(function (userObj) {

                //password is correct, we can authorize user
                req.session.authenticated = true;

                // remove unwanted data from user object
                delete userObj.password;
                delete userObj._id;

                // set user data in session
                req.session.user = userObj;

                res.send({
                    success: true,
                    user: userObj
                });
            })
            .catch(function (err) {
                //not authorized
                res.send({
                    success: false,
                    error: {
                        code: 401,
                        message: err.toString()
                    }
                });
            });

    });

// Logout
// =====================================================================================================================
router.route('/logout').get(function (req, res) {
    req.session.destroy(function (err) {
        if (!err) {
            res.send({
                success: true
            });
        } else {
            res.send({
                success: false,
                error: {
                    code: 500,
                    message: 'Problems with session destroy'
                }
            });
        }
    });
});

// Forgot Password
// =====================================================================================================================
router.route('/forgot').get(function (req, res) {
    res.send({
        success: true,
        message: 'Activation link has been sent to your email'
    });
});

// Exports
// =====================================================================================================================
module.exports = router;
