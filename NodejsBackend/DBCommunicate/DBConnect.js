//var DB_URL = "mongodb://parabolabam:12V34l56a78d@ds145752.mlab.com:45752/devdb";
var mongoose = require('mongoose');
const DB_URL_HEROKU = process.env.MONGO_DB || "mongodb://heroku_0h5zx10c:p5s4sfrg6j8lj34fidisq78b5r@ds163382.mlab.com:63382/heroku_0h5zx10c";

// how to correct that path with credentials?
mongoose.connect(DB_URL_HEROKU, {
    useNewUrlParser: true
}).then(res => {
    if (DB_URL_HEROKU === process.env.MONGO_DB) {
        console.log("DataBase connection is OK")
    }
    if (DB_URL_HEROKU === "mongodb://heroku_0h5zx10c:p5s4sfrg6j8lj34fidisq78b5r@ds163382.mlab.com:63382/heroku_0h5zx10c") {
        console.log("EXport address as system var!");
        console.log("DataBase connection is OK")

    }

}).catch(err => console.log(err))
module.exports = mongoose