// API Router
// =====================================================================================================================
var express = require('express');
var apiRouter = express.Router();
var UserManager = require('./userManager.js');
var userManager = new UserManager();
var md5 = require('md5');
var pause = require('connect-pause');

var treeData = require('../data/tree.json');
var timeOut = 1 * 1000;

// API / USER DATA
// =====================================================================================================================
apiRouter.route('/checksession')
    .get(function (req, res) {
        if (req.session.authenticated) {

            userManager.getUser(req.session.user.email)
                .then(function (data) {
                    req.session.touch(req.session.id, req.session);
                    res.send({
                        success: true,
                        user: data
                    });
                })
                .catch(function (err) {
                    req.session.touch(req.session.id, req.session);
                    res.send({
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
    });

// API / USER (SINGLES)
// =====================================================================================================================
apiRouter.route('/createUser')

// USER - Create single user
// =================================================================================================================
    .post(pause(timeOut), function (req, res) {
        if (req.session.authenticated) {
            var user = new UserManager({
                email: req.body.email,
                password: md5(req.body.password)
            });
            user.createUser()
                .then(function (data) {
                    res.send({
                        success: true,
                        user: data
                    });
                }).catch(function (err) {
                res.send({
                    success: false,
                    error: {
                        code: 500,
                        message: err
                    }
                });
            });

        } else {
            res.sendStatus(401);
        }


    });

apiRouter.route('/users/:user_id')

// USER - Get single user
// =====================================================================================================================
    .get(pause(timeOut), function (req, res) {

        if (req.session.authenticated) {
            // userManager.getUser(req.session.user.email)
            userManager.getUser(req.params.user_id)
                .then(function (data) {
                    req.session.touch(req.session.id, req.session);
                    res.send({
                        success: true,
                        user: data
                    });
                })
                .catch(function (err) {
                    req.session.touch(req.session.id, req.session);
                    res.send({
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
    // =================================================================================================================
    .put(pause(timeOut), function (req, res) {

        if (req.session.authenticated) {

            userManager.updateUser(req.body)
                .then(function (data) {
                    req.session.touch(req.session.id, req.session);
                    res.send({
                        success: true,
                        user: data
                    });
                }).catch(function (err) {

                req.session.touch(req.session.id, req.session);
                res.send({
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

    // USER - Delete single user
    // =================================================================================================================
    .delete(pause(timeOut), function (req, res) {
        if (req.session.authenticated) {
            userManager.deleteUser(req.params.user_id)
                .then(function () {
                    res.send({
                        success: true,
                    });
                })
                .catch(function (err) {
                    res.send({
                        success: false,
                        error: {
                            code: 500,
                            message: err
                        }
                    });
                });

        } else {
            res.sendStatus(401);
        }
    });

// USERS
// =====================================================================================================================
apiRouter.route('/userslist')
    .get(pause(timeOut), function (req, res) {
        if (req.session.authenticated) {
            userManager.getAllUsers().then(function (users) {
                res.send({
                    success: true,
                    users: users
                });
            }).catch(function (err) {
                res.send({
                    success: false,
                    error: {
                        code: 500, //todo: change code
                        message: err
                    }
                });

            });

        } else {
            res.sendStatus(401);
        }
    });

// Get Tree
// =====================================================================================================================
apiRouter.route('/getTree')
    .get(function (req, res) {
        if (req.session.authenticated) {
            res.send({
                success: true,
                tree: treeData.tree
            });
        } else {
            res.sendStatus(401);
        }
    });


// Exports
// =====================================================================================================================
module.exports = apiRouter;