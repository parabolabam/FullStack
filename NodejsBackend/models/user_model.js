var mongoose = require("../DBCommunicate/DBConnect.js")
const bcrypt = require('bcrypt-nodejs')

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

    getUserByToken: function(token_, email) {
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
    check_hashes: function(plainTextPass, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plainTextPass, hash, function(err, res) {
                resolve(res)
            })
        })
    }
}