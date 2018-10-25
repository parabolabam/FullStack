# koa2-session-store


Session middleware for koa2 .
you can use the 2.0middleware of pluggable storage laye work with it.(async/await install of  generator )
base on [koa-session-store](https://github.com/hiddentao/koa-session-store/)

## Installation

```
npm install koa2-session-store
```
## Usage 

```
 const koa = require('koa');
 const session = require('koa2-session-store');
 const app = new koa();
 
 
app.keys = ['some secret key']; // needed for cookie-signing

// cookie will be named "koa:sess" and session data will be stored in the cookie itself
app.use(session({
    name: "test1",
    secret: "test",
    cookie: {
        maxAge: 33333333 // just example
    }
}));
app.use(async(ctx, next) => {
    var n = ctx.session.views || 0;
    ctx.session.views = ++n;
    ctx.response.body = n + ' views';
})
app.listen(3000);
console.log('listening on port 3000');
```

To delete an existing session:

```
cxt.session = null;
```

The following configuration options are available:

```
app.use(session({
  name: 'mysite'    // cookie name
  store: <object instance> or "cookie"   // session storage layer - see below
  cookie: {
    // cookie configuration options - see below
  }
}));

```



