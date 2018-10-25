const router = (require('koa-router'))()
const parser = require('koa-bodyparser')
const views = require('koa-views')
const db = require("../models/user_model.js")
const validate = require('./validation/validate.js')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const mail = require('./mail.js')
const config = require('../CONFIG.js')
const md5 = require('js-md5')

router.use(parser())
router.use(views('./views', {
    map: {
        html: 'nunjucks'
    }
}))
router.get('/', async (ctx, next) => {
    ctx.session = null;
    await ctx.render('index')

});
router.post('/', async (ctx, next) => {

    if (ctx.request.body.password === ctx.request.body.confirm) {
        let user = {
            login: ctx.request.body.login,
            email: ctx.request.body.email,
            password: ctx.request.body.password,
            confirm: ctx.request.body.confirm,
        }
        var token = jwt.sign(user.email, "SEcretKeyNoOneWillNeverRealizeHoWTo+&*Generate#$@(#8@())")

        user.token = token
        mail.send(user.email, "Follow the link below to confirm your Email address => " + `http://localhost:3000/auth/${user.token}`);
        await ctx.redirect("/signin")
        ctx.session.user = await user;
        await db.addUser(user)

    } else ctx.redirect("/error")
})


router.get("/tic-tac-toe", async (ctx, next) => {
    await ctx.render("tic_tac_toe")
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
    if (ifSuccess) ctx.redirect('/signin')
})

router.get('/signin', async (ctx, next) => {
    ctx.session = null;
    await ctx.render('signin');
})


router.post('/signin', async (ctx, next) => {

    let login = ctx.request.body.login;
    let password = ctx.request.body.password;

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
        await ctx.redirect("/home");
        ctx.session.user = await user;
        console.log(`Session created on user ${user.login}`)
    } else {
        await ctx.resirect("/error")
    }
});

router.get('/snake', async (ctx, next) => {
    await ctx.render('snake')
});

router.get('/home', async (ctx, next) => {
    try {
        var hashRegExp = new RegExp(/hash=(.+)/g);
        var uidREgExp = new RegExp(/uid=(\d+)/g)

        var url = ctx.request.url;

        var urlHash = (hashRegExp.exec(url))[1]
        var urlUid = (uidREgExp.exec(url))[1]

        var secret_key = config.secret_key;
        var app_id = config.app_id;

        var checkHash = md5(app_id + urlUid + secret_key);
        if (checkHash === urlHash) {
            await ctx.render('home');
            return;

        }
    } catch (err) {
        await ctx.render('home')
    }

});

router.get('/error', async (ctx, next) => {
    await ctx.render('error')
});




module.exports = {
    router: router
}