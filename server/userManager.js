var schemas = require("./db-schema.js"); // Database scheme
var _ = require("lodash");

//Cache Database
var db = require("./db.js");
//var NodeCache = require( "node-cache" );
//var cache = new NodeCache( { checkperiod: 0 } );
//var db = require('../data/users.json');

// USER MODEL Structure
// =====================================================================================================================
var UserManager = function (data) {
    this.data = this.sanitize(data);
};

UserManager.prototype.data = {};

// Get value by name
// =====================================================================================================================
UserManager.prototype.get = function (name) {
    return this.data[name];
};

// Set value by name
// =====================================================================================================================
UserManager.prototype.set = function (name, value) {
    this.data[name] = value;
};

// Sanitize data
// =====================================================================================================================
UserManager.prototype.sanitize = function (data) {
    data = data || {};
    schema = schemas.user;
    return _.pick(_.defaults(data, schema), _.keys(schema));
};

// Create user
// =====================================================================================================================
UserManager.prototype.createUser = function () {

    var self = this;

    // todo:validation
    // before inserting check if already exists
    db.find(self.data, function (err, found) {
        if (!found.length) {

            //inserting
            db.insert(self.data, function (err, newData) {
                if (err) {
                    console.log('[Error] ', err);
                } else {
                    console.log('[SUCCESS] Added new record: ', newData);
                }
            });
        } else {
            console.log('[ERROR] Already have such record!');
        }
    });
};

// Check User
// =====================================================================================================================
UserManager.prototype.authenticate = function (email, password) {
    return new Promise(function (resolve, reject) {
        db.findOne({
            email: email
        }, function (err, found) {

            if (found) {
                if (found.password === password) {
                    resolve(found);
                } else {
                    reject(new Error('Invalid password'));
                }
            } else {
                reject(new Error('User not found'));
            }
        });

    });
};

// Get Single User
// =====================================================================================================================
UserManager.prototype.getUser = function(email) {

    return new Promise(function (resolve, reject) {
        db.findOne({
            email: email
        }, function (err, found) {
            if (found) {
                resolve(found);
            } else {
                reject(new Error('User not found'));
            }
        });

    });
};

// Update User
// =====================================================================================================================
UserManager.prototype.updateUser = function(userObj) {

    return new Promise(function (resolve, reject) {
        db.update({
            email: userObj.email
        }, {
            $set: {
                "email": userObj.email,
                "name": userObj.name,
                "birthdate": userObj.birthdate,
                "age": userObj.age,
                "bio": userObj.bio,
            }
        }, {}, function (err, numReplaced) {
            if (numReplaced) {
                db.persistence.compactDatafile();
                resolve(numReplaced);
            } else {
                reject(new Error('User not found'));
            }
        });

    });
};

// Exports
// =====================================================================================================================
module.exports = UserManager;