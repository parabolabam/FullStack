'use strict'

const router = (require('koa-router'))();
const parser = require('koa-bodyparser');
// const views = require('koa-views');
const db = require("../models/user_model.js");
const jwt = require('jsonwebtoken');
const mail = require('./mail.js');
const config = require('../CONFIG.js');
const md5 = require('js-md5');
const bcrypt = require('bcrypt-nodejs')

const hashRegExp = new RegExp(/hash=(.+)/g);
const uidREgExp = new RegExp(/uid=(\d+)/g);


router.use(parser())
// router.use(views('./views', {
//     map: {
//         html: 'nunjucks'
//     }
// }))

router.post('/', async (ctx, next) => {

    if (ctx.request.body.password === ctx.request.body.confirm) {
        const user = {
            login: ctx.request.body.login,
            email: ctx.request.body.email,
            password: ctx.request.body.password,
            confirm: ctx.request.body.confirm,
        }
        const token = jwt.sign(user.email, "SEcretKeyNoOneWillNeverRealizeHoWTo+&*Generate#$@(#8@())")

        user.token = token
        mail.send(user.email, "Follow the link below to confirm your Email address => " +
            `http://localhost:3001/auth/${user.token}`);
        await ctx.redirect("/signin")
        ctx.session.user = await user;
        await db.addUser(user)

    } else ctx.redirect("/error")
})

router.get('/logout', async (ctx, next) => {
    console.log("\nGOT ID\n");
    ctx.session = null;
    await ctx.redirect('/signin');


})

router.get('/auth/:token', async (ctx, next) => {

    console.log(ctx.originalUrl)
    let token_url = ctx.originalUrl;
    let token = token_url.split('/')[2]; // parsed token_url
    var ifSuccess = false;
    await db.getUserByToken(token).then((result) => {
        console.log("succsess => ", result)
        ifSuccess = true
    })
    // if (ifSuccess) ctx.redirect('/signin')
})


router.post('/set_new_password/:token', async (ctx, next) => {

    const password = ctx.request.body.password;
    const confirm = ctx.request.body.confirm;
    const token = ctx.originalUrl.split('/')[2]
    if (password === confirm) {
        console.log(token);
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(password, salt, null, (err, result) => {
                if (err) {
                    console.log("While encrypting ", err);
                }
                console.log("result ===>>>", result);
                db.resetPassByTokenDoubleProtection(token, result).then((data) => {
                    console.log("DB process finished with data " + data);

                }).catch((err) => {
                    console.log(err)
                });
            });
        });
        ctx.redirect('/signin');
    }


})


router.post('/reset/:token', async (ctx, next) => {
    console.log("kek");
    let token_url = ctx.originalUrl;
    let token = token_url.split('/')[2]; // parsed token_url
    console.log(token);
    var ifSuccess = false;
    await db.resetPassByToken(token).then(() => {
        ctx.redirect('/set_new_password/' + token);
    })
    // if (ifSuccess) ctx.redirect('/signin')
})


router.post('/resetpassword', async (ctx, next) => {
    const email = ctx.request.body.email;
    const token = jwt.sign(email, "SEcretKeyNoOneWillNeverRealizeHoWTo+&*Generate#$@(#8@())")
    mail.send(email, "Follow the link below to reset your password => " +
        `http://localhost:3000/reset/${token}`);
    ctx.body = "Check out your E-mail!";
})


router.post('/signin', async (ctx, next) => {
    console.log("Received");


    let login = ctx.request.body.login;
    let password = ctx.request.body.password;
    const resetPassword = ctx.request.body.resetPassword;

    if (resetPassword) {
        ctx.redirect('/resetpassword');
        return;
    }

    if (!login) {
        return
    }
    if (!password) {
        return
    }
    var user = await {
        login: login,
        password: password
    }
    var t = await db.getUser(user);
    var check_hashes = false;
    if (t !== null) {
        check_hashes = await db.check_hashes(user.password, t.password)
    }


    if (check_hashes) {
        // await ctx.redirect("/home");
        ctx.session.user = await user;
        console.log(`Session created on user ${user.login}`);
        ctx.redirect("/home");
    } else {
        await ctx.redirect("/error")
    }
});


router.post('/home', async (ctx, next) => {
    console.log("GOT IT");
    console.log(`session of user ${ctx.session.user.login} destroyed!`);
    ctx.session = await null;
    await ctx.redirect('/signin');
})


router.get('/home', async (ctx, next) => {
    try {


        const url = ctx.request.url;

        const urlHash = (hashRegExp.exec(url))[1]
        const urlUid = (uidREgExp.exec(url))[1]

        const secret_key = config.secret_key;
        const app_id = config.app_id;

        const checkHash = md5(app_id + urlUid + secret_key);

        if (checkHash === urlHash) {
            await ctx.render('home');
            return;

        }
    } catch (err) {
        await ctx.render('home')
    }

});

module.exports = router