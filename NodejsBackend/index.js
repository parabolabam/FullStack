'use strict'

const Koa_2 = require('koa2')
const logger = require('koa-morgan');
const router = require('./routes/index.js')
const parser = require('koa-bodyparser')
const session = require("koa-session-minimal")
const CONFIG = require("./CONFIG.js")


const app = new Koa_2();

app.use(session(CONFIG, app));
// app.use((require('koa-static'))("./views/.", {}));

app.use(router.router.routes()).use(router.router.allowedMethods())
app.use(logger())
app.use(parser())
app.on('error', async err => {
    await console.log(err)
})
module.exports = app
app.listen(process.env.PORT || 3001, ()=>{
	console.log(`App listens on localhost:${process.env.PORT || 3001}`);
})