var mongoose = require("../DBCommunicate/DBConnect.js")
const bcrypt = require('bcrypt-nodejs')
//There are duplicates - think how to fix it
var userSchema = new mongoose.Schema({
    id: { type: Number },
    login: { type: String },
    email: { type: String },
    password: { type: String },
    confirm: { type: String },
    token: { type: String },
    email_confirm: { type: Boolean },
}, { timestamps: true });

var User = mongoose.model('User', userSchema, 'users')

module.exports = {
    addUser: function addUser(user) {
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(user.password, salt, null, (err, result) => {
                var us = user;
                us.password = result;
                us.confirm = 'confirmed';
                us.email_confirm = false;
                const user_ = new User(user);
                user_.save().then(() => {
                    console.log("OK")
                })
            });
        })
    },
    getUser: function(user) {
        return new Promise((resolve, reject) => {
            var query = User.findOne({
                login: user.login
            });
            query.select('password');
            query.exec().then((success) => {
                resolve(success)
            }).catch((fail) => {
                console.log(fail)
                reject(fail)
            })
        })
    },

    getUserByToken: function(token_) {
        return new Promise((resolve, reject) => {
            var query = User.findOne({
                token: token_
            });
            query.select('token email');
            query.exec().then((success) => {
                success.email_confirm = true;
                success.save().then(() => {
                    console.log('data changed in db!')
                })
                resolve(success)
            }).catch((fail) => {
                console.log(fail)
                reject(fail)
            })
        })
    },
    resetPassByToken: function(token_) {
        return new Promise((resolve, reject) => {
            var query = User.findOne({
                token: token_
            });
            query.select('token email login password');
            query.exec().then((user) => {
                if (user) {
                    user.password = '...in progress of being set with changes...';
                    user.save().then(() => {
                        console.log('Password has been reset in db!');
                        resolve(user);
                    }).catch(fail => {
                        console.log(fail);
                        reject(fail);
                    })
                } else {
                    reject(null);
                }
            }).catch((fail) => {
                console.log(fail)
                reject(fail)
            })
        })
    },
    resetPassByTokenDoubleProtection: function(token_, passwordHash) {
        return new Promise((resolve, reject) => {
            var query = User.findOne({
                token: token_
            });
            query.select('token email login password');
            query.exec().then((user) => {
                if (user) {
                    user.password = passwordHash;
                    user.save().then(() => {
                        console.log('Password has been reset in db!');
                        resolve(user);
                    }).catch(fail => {
                        console.log(fail);
                        reject(fail);
                    })
                } else {
                    reject(null);
                }
            }).catch((fail) => {
                console.log(fail)
                reject(fail)
            })
        })
    },
    getUserByEmail: function(email) {
        return new Promise((resolve, reject) => {
            var query = User.findOne({
                email: email
            });
            query.select('email email_confirms');
            query.exec().then((user) => {
                resolve(user);
            }).catch((fail) => {
                console.log(fail)
                reject(fail)
            })
        })
    },
    check_hashes: function(plainTextPass, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plainTextPass, hash, function(err, res) {
                resolve(res)
            })
        })
    }
}