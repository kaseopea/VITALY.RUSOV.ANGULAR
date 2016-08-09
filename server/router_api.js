// API Router
// =====================================================================================================================
var express = require('express');
var apiRouter = express.Router();
var UserManager = require('./userManager.js');
var userManager = new UserManager();
var md5 = require('md5');

var timeOut = 3*1000;

// API / USER DATA
// =====================================================================================================================
apiRouter.route('/checksession')
    .get(function(req,res) {
        if(req.session.authenticated) {

            userManager.getUser(req.session.user.email)
                .then(function(data) {
                    delete data.password;
                    delete data._id;
                    res.send({
                        success: true,
                        user: data
                    });
                })
                .catch(function(err) {
                    res.send({
                        success: false,
                        error: {
                            code: 500, //todo: change code
                            message: 'Something go wrong while getting data on serverside'
                        }
                    });
                });
        } else {
            res.send({
                success: false,
                error: {
                    code: 401,
                    message: 'You are not authorized!'
                }
            });
        }
    });

// API / USER (SINGLES)
// =====================================================================================================================
apiRouter.route('/users/:user_id')

// USER - Get single user
// =====================================================================================================================
    .get(function (req, res) {

        if (req.session.authenticated) {
            userManager.getUser(req.session.user.email)
                .then(function(data) {
                    delete data.password;
                    delete data._id;
                    res.setTimeout(timeOut, function () {
                        res.send({
                            success: true,
                            user: data
                        });
                    });
                })
                .catch(function(err) {
                    res.json({
                        success: false,
                        error: {
                            code: 500, //todo: change code
                            message: 'Something go wrong while getting data on serverside'
                        }
                    });

                });

        } else {
            res.sendStatus(401);
        }


    })

// USER - Update single user
// =====================================================================================================================
    .put(function (req, res) {

        if (req.session.authenticated) {
            userManager.updateUser(req.body)
                .then(function(data) {
                    //console.log(data);
                    res.send({
                        success: true,
                        user: data
                    });
                }).catch(function(err) {
                    res.json({
                        success: false,
                        error: {
                            code: 500, //todo: change code
                            message: 'Something go wrong while getting data on serverside'
                        }
                    });
                });

        } else {
            res.sendStatus(401);
        }
    })

// USER - Create single user
// =====================================================================================================================
    .post(function (req, res) {

        console.log('Saving new user!');
        res.json({
            STATUS: 'Not implemented yet'
        });
    })

// USER - Delete single user
// =====================================================================================================================
    .delete(function (req, res) {
        res.json({
            STATUS: 'Not implemented yet'
        })
    });


// Exports
// =====================================================================================================================
module.exports = apiRouter;