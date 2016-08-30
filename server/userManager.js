var schemas = require("./db-schema.js"); // Database scheme
var _ = require("lodash");

//Cache Database
var db = require("./db.js");

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
    var data = data || {};
    var schema = schemas.user;
    return _.pick(_.defaults(data, schema), _.keys(schema));
};

// Create user
// =====================================================================================================================
UserManager.prototype.createUser = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
        db.find(self.data, function (err, found) {
            if (!found.length) {
                //inserting
                db.insert(self.data, function (err, newData) {
                    if (err) {
                        reject('[Error] ', err);
                    } else {
                        resolve(newData);
                    }
                });
            } else {
                reject('[ERROR] Already have such record!');
            }
        });
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
	var login = userObj.email;
    var userID = userObj._id;

    return new Promise(function (resolve, reject) {
        db.update({
            // email: userObj.email
            _id: userID
        }, {
            $set: {
                "email": userObj.email,
                "name": userObj.name,
                "birthdate": userObj.birthdate,
                "age": userObj.age,
                "bio": userObj.bio,
                "role": userObj.role
            }
        }, {}, function (err, numReplaced) {
            if (numReplaced) {
                db.persistence.compactDatafile();

	            db.findOne({
		            email: login
	            }, function (err, found) {
		            if (found) {
			            resolve(found);
		            } else {
			            reject(new Error('User not found'));
		            }
	            });

            } else {
                reject(new Error('User not found'));
            }
        });

    });
};

// Update User
// =====================================================================================================================
UserManager.prototype.deleteUser = function(login) {
	return new Promise(function (resolve, reject) {
		db.remove({
			email: login
		}, {}, function (err, numRemoved) {
			if (numRemoved) {
				db.persistence.compactDatafile();
				resolve(numRemoved);
			} else {
				reject(new Error('Error! User not deleted.'));
			}
		});

	});
};

// GET ALL USERS
// =====================================================================================================================
UserManager.prototype.getAllUsers = function() {

    return new Promise(function (resolve, reject) {
        db.find({
        }, function (err, found) {
            if (found) {
                resolve(found);
            } else {
                reject(new Error('User not found'));
            }
        });

    });
};

// Exports
// =====================================================================================================================
module.exports = UserManager;