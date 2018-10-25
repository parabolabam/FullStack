var koa = require('koa');
var request = require('supertest');
var session = require('./');
var should = require('should');

/*
Based on https://github.com/koajs/session/blob/master/test.js
 */

describe('Koa Session Store', function() {
  var cookie, httpServer;

  afterEach(function(done) {
    if (httpServer) {
      httpServer.close(done);
    } else {
      done();
    }
  });

  describe('cookie options', function() {
    describe('when signed = true', function() {
      describe('when app keys are set', function() {
        it('should work', function(done) {
          var app = new koa();
          app.keys = ['a', 'b'];
          app.use(session());
          app.use(async(ctx, next) => {
            ctx.session.message = 'hi';
            ctx.response.body = ctx.session;
          });

          request(httpServer = app.listen())
            .get('/')
            .expect(200, done);
        });
      });

      describe('when app keys are not set', function() {
        it('should NOT work', function(done) {
          var app = new koa();
          app.use(session());
          app.use((ctx, next) => {
            ctx.session.message = 'hi';
            ctx.response.body = ctx.session;
          });

          request(httpServer = app.listen())
            .get('/')
            .expect(500, done);
        });
      });
    });

    describe('when signed = false', function() {
      describe('when app keys are not set', function() {
        it('should work', function(done) {
          var app = new koa();
          app.use(session({
            cookie: {
              signed: false
            }
          }));
          app.use((ctx, next) => {
            ctx.session.message = 'hi';
            ctx.response.body = ctx.session;
          });

          request(httpServer = app.listen())
            .get('/')
            .expect(200, done);
        });
      });
    });
  });

  describe('Storage: Cookie', function() {

    describe('new session', function() {
      describe('when not accessed', function() {
        it('should not set the cookie', function(done) {
          var app = App();
          app.use(async(ctx, next) => {
            ctx.response.body = 'greetings';
          });
          request(httpServer = app.listen())
            .get('/')
            .expect(200, function(err, res) {
              if (err) return done(err);
              res.header.should.not.have.property('set-cookie');
              done();
            });
        });
      });

      describe('when accessed and not populated', function() {
        it('should not set the cookie', function(done) {
          var app = App();
          app.use(async(ctx, next) => {
            ctx.response.body = ctx.session;
          });
          request(httpServer = app.listen())
            .get('/')
            .expect(200, function(err, res) {
              if (err) return done(err);
              res.header.should.not.have.property('set-cookie');
              done();
            });
        })
      });

      describe('when accessed and populated', function() {
        it('should set the cookie', function(done) {
          var app = App();
          app.use(async(ctx, next) => {
            ctx.session.message = 'hello';
            ctx.response.body = '';
          });
          request(httpServer = app.listen())
            .get('/')
            .expect('Set-Cookie', /koa:sess/)
            .expect('Set-Cookie', /hello/)
            .expect(200, function(err, res) {
              if (err) return done(err);
              cookie = res.header['set-cookie'].join(';');
              done();
            });
        });
      });
    });

    describe('saved session', function() {
      describe('when not accessed', function() {
        it('should not set the cookie', function(done) {
          var app = App();
          app.use(async(ctx, next) => {
            ctx.response.body = 'aklsdjflasdjf';
          });
          request(httpServer = app.listen())
            .get('/')
            .set('Cookie', cookie)
            .expect(200, function(err, res) {
              if (err) return done(err);
              res.header.should.not.have.property('set-cookie');
              done();
            });
        });
      });

      describe('when accessed but not changed', function() {
        it('should be the same session', function(done) {
          var app = App();
          app.use(async(ctx, next) => {
            ctx.session.message.should.equal('hello');
            ctx.response.body = 'aklsdjflasdjf';
          });
          request(httpServer = app.listen())
            .get('/')
            .set('Cookie', cookie)
            .expect(200, done);
        });

        it('should not set the cookie', function(done) {
          var app = App();
          app.use(async(ctx, next) => {
            ctx.session.message.should.equal('hello');
            ctx.response.body = 'aklsdjflasdjf';
          });
          request(httpServer = app.listen())
            .get('/')
            .set('Cookie', cookie)
            .expect(200, function(err, res) {
              if (err) return done(err);
              res.header.should.not.have.property('set-cookie');
              done();
            });
        });
      });

      describe('when accessed and changed', function() {
        it('should set the cookie', function(done) {
          var app = App();
          app.use(async(ctx, next) => {
            ctx.session.message = 'hello2';
            ctx.response.body = 'aklsdjflasdjf';
          });
          request(httpServer = app.listen())
            .get('/')
            .set('Cookie', cookie)
            .expect('Set-Cookie', /hello2/)
            .expect(200, done);
        });
      });
    });

    describe('when session = ', function() {
      describe('null', function() {
        it('should expire the cookie', function(done) {
          var app = App();
          app.use(async(ctx, next) => {
            ctx.session = null;
            ctx.response.body = 'asdf';
          })
          request(httpServer = app.listen())
            .get('/')
            .set('Cookie', cookie)
            .expect('Set-Cookie', /expire/)
            .expect(200, done);
        });
      });

      describe('{}', function() {
        it('should not set the cookie', function(done) {
          var app = App();
          app.use(async(ctx, next) => {
            ctx.session = {};
            ctx.response.body = 'asdf';
          })
          request(httpServer = app.listen())
            .get('/')
            .expect(200, function(err, res) {
              if (err) return done(err);
              res.header.should.not.have.property('set-cookie');
              done();
            });
        });
      });

      describe('{a: b}', function() {
        it('should create a session', function(done) {
          var app = App();
          app.use(async(ctx, next) => {
            ctx.session = {
              message: 'hello'
            };
            ctx.response.body = 'asdf';
          })
          request(httpServer = app.listen())
            .get('/')
            .expect('Set-Cookie', /hello/)
            .expect(200, done);
        });
      });

      describe('anything else', function() {
        it('should throw', function(done) {
          var app = App();
          app.use(async(ctx, next) => {
            ctx.session = 'asdf';
          });
          request(httpServer = app.listen())
            .get('/')
            .expect(500, done);
        });
      });
    });

  });


  describe('Storage: Custom layer', function() {

    var db = {};
    var layer = {
      load: async function(sid) {
        return db[sid];
      },
      save: async function(sid, data) {
        layer.saveCount++;
        db[sid] = data;
      },
      remove: async function(sid) {
        delete db[sid];
      }
    };

    var options = {
      store: layer
    };

    cookie = null;
    var sid = null;

    beforeEach(function() {
      layer.saveCount = 0;

      if (cookie) {
        sid = cookie.match(/_sid\":\"([^"]+)\"/i)[1];
      } else {
        sid = null;
      }
    });

    describe('new session', function() {
      describe('when not accessed', function() {
        it('should not set the cookie', function(done) {
          var app = App(options);
          app.use(async(ctx, next) => {
            ctx.response.body = 'greetings';
          });
          request(httpServer = app.listen())
            .get('/')
            .expect(200, function(err, res) {
              if (err) return done(err);
              res.header.should.not.have.property('set-cookie');
              done();
            });
        });
        it('should not set any data', function(done) {
          var app = App(options);
          app.use(async(ctx, next) => {
            ctx.response.body = 'greetings';
          });
          request(httpServer = app.listen())
            .get('/')
            .expect(200, function(err, res) {
              if (err) return done(err);
              layer.saveCount.should.eql(0);
              db.should.eql({});
              done();
            });
        });
      });

      describe('when accessed and not populated', function() {
        it('should not set the cookie', function(done) {
          var app = App(options);
          app.use(async(ctx, next) => {
            ctx.response.body = ctx.session;
          });
          request(httpServer = app.listen())
            .get('/')
            .expect(200, function(err, res) {
              if (err) return done(err);
              res.header.should.not.have.property('set-cookie');
              done();
            });
        });
        it('should not set any data', function(done) {
          var app = App(options);
          app.use(async(ctx, next) => {
            ctx.response.body = ctx.session;
          });
          request(httpServer = app.listen())
            .get('/')
            .expect(200, function(err, res) {
              if (err) return done(err);
              layer.saveCount.should.eql(0);
              db.should.eql({});
              done();
            });
        });
      });

      describe('when accessed and populated', function() {
        it('should set the cookie', function(done) {
          var app = App(options);
          app.use(async(ctx, next) => {
            ctx.session.message = 'hello';
            ctx.response.body = '';
          });
          request(httpServer = app.listen())
            .get('/')
            .expect('Set-Cookie', /koa:sess/)
            .expect(200, function(err, res) {
              if (err) return done(err);
              cookie = res.header['set-cookie'].join(';');
              cookie.indexOf('hello').should.eql(-1);
              done();
            });
        });
        it('should set data', function(done) {
          var app = App(options);
          app.use(async(ctx, next) => {
            ctx.session.message = 'hello';
            ctx.response.body = '';
          });
          request(httpServer = app.listen())
            .get('/')
            .expect(200, function(err, res) {
              if (err) return done(err);
              layer.saveCount.should.eql(1);
              for (var key in db) break;
              db[key].should.eql(JSON.stringify({
                message: 'hello'
              }));
              done();
            });
        });
      });
    });

    describe('saved session', function() {
      describe('when not accessed', function() {
        it('should not set the cookie', function(done) {
          var app = App(options);
          app.use(async(ctx, next) => {
            ctx.response.body = 'aklsdjflasdjf';
          });
          request(httpServer = app.listen())
            .get('/')
            .set('Cookie', cookie)
            .expect(200, function(err, res) {
              if (err) return done(err);
              res.header.should.not.have.property('set-cookie');
              done();
            });
        });
        it('should not set the data', function(done) {
          var app = App(options);
          app.use(async(ctx, next) => {
            ctx.response.body = 'aklsdjflasdjf';
          });
          request(httpServer = app.listen())
            .get('/')
            .set('Cookie', cookie)
            .expect(200, function(err, res) {
              if (err) return done(err);
              layer.saveCount.should.eql(0);
              done();
            });
        });
      });

      describe('when accessed but not changed', function() {
        it('should be the same session', function(done) {
          var app = App(options);
          app.use(async(ctx, next) => {
            ctx.session.message.should.equal('hello');
            ctx.response.body = 'aklsdjflasdjf';
          });
          request(httpServer = app.listen())
            .get('/')
            .set('Cookie', cookie)
            .expect(200, done);
        });

        it('should not set the cookie', function(done) {
          var app = App(options);
          app.use(async(ctx, next) => {
            ctx.session.message.should.equal('hello');
            ctx.response.body = 'aklsdjflasdjf';
          });
          request(httpServer = app.listen())
            .get('/')
            .set('Cookie', cookie)
            .expect(200, function(err, res) {
              if (err) return done(err);
              res.header.should.not.have.property('set-cookie');
              done();
            });
        });
        it('should not set the data', function(done) {
          var app = App(options);
          app.use(async(ctx, next) => {
            ctx.session.message.should.equal('hello');
            ctx.response.body = 'aklsdjflasdjf';
          });
          request(httpServer = app.listen())
            .get('/')
            .set('Cookie', cookie)
            .expect(200, function(err, res) {
              if (err) return done(err);
              layer.saveCount.should.eql(0);
              done();
            });
        });
      });

      describe('when accessed and changed', function() {
        it('should not set the cookie', function(done) {
          var app = App(options);
          app.use(async(ctx, next) => {
            ctx.session.message = 'hello2';
            ctx.response.body = 'aklsdjflasdjf';
          });
          request(httpServer = app.listen())
            .get('/')
            .set('Cookie', cookie)
            .expect(200, function(err, res) {
              if (err) return done(err);
              res.header.should.not.have.property('set-cookie');
              done();
            });
        });
        it('should set the data', function(done) {
          db[sid] = JSON.stringify({
            hello: 'world'
          });

          var app = App(options);
          app.use(async(ctx, next) => {
            ctx.session.message = 'hello3';
            ctx.response.body = 'aklsdjflasdjf';
          });
          request(httpServer = app.listen())
            .get('/')
            .set('Cookie', cookie)
            .expect(200, function(err, res) {
              if (err) return done(err);
              layer.saveCount.should.eql(1);
              db[sid].should.eql(JSON.stringify({
                hello: 'world',
                message: 'hello3'
              }));
              done();
            });
        });
      });
    });

    describe('when session = ', function() {
      describe('null', function() {
        it('should delete the data', function(done) {
          db = {};
          db[sid] = JSON.stringify('test');

          var app = App(options);
          app.use(async(ctx, next) => {
            ctx.session = null;
            ctx.response.body = 'asdf';
          })
          request(httpServer = app.listen())
            .get('/')
            .set('Cookie', cookie)
            .expect(200, function(err, res) {
              if (err) return done(err);
              db.should.eql({});
              done();
            });
        });
        it('should expire the cookie', function(done) {
          var app = App(options);
          app.use(async(ctx, next) => {
            ctx.session = null;
            ctx.response.body = 'asdf';
          });
          request(httpServer = app.listen())
            .get('/')
            .set('Cookie', cookie)
            .expect('Set-Cookie', /expire/)
            .expect(200, done);
        });
      });

      describe('{}', function() {
        it('should not set the cookie', function(done) {
          var app = App(options);
          app.use(async(ctx, next) => {
            ctx.session = {};
            ctx.response.body = 'asdf';
          })
          request(httpServer = app.listen())
            .get('/')
            .expect(200, function(err, res) {
              if (err) return done(err);
              res.header.should.not.have.property('set-cookie');
              done();
            });
        });
        it('should not set data', function(done) {
          db = {};
          var app = App(options);
          app.use(async(ctx, next) => {
            ctx.session = {};
            ctx.response.body = 'asdf';
          })
          request(httpServer = app.listen())
            .get('/')
            .expect(200, function(err, res) {
              if (err) return done(err);
              db.should.eql({});
              done();
            });
        });
      });

      describe('{a: b}', function() {
        it('should set the session cookie', function(done) {
          var app = App(options);
          app.use(async(ctx, next) => {
            ctx.session = {
              message: 'hello'
            };
            ctx.response.body = 'asdf';
          })
          request(httpServer = app.listen())
            .get('/')
            .expect('Set-Cookie', /koa:sess/)
            .expect(200, done);
        });
        it('should set the session data', function(done) {
          db = {};

          var app = App(options);
          app.use(async(ctx, next) => {
            ctx.session = {
              message: 'hello'
            };
            ctx.response.body = 'asdf';
          })
          request(httpServer = app.listen())
            .get('/')
            .expect(200, function(err, res) {
              if (err) return done(err);
              for (var key in db) break;
              db[key].should.eql(JSON.stringify({
                message: 'hello'
              }));
              done();
            });
        });
      });

      describe('anything else', function() {
        it('should throw', function(done) {
          var app = App(options);
          app.use(async(ctx, next) => {
            ctx.session = 'asdf';
          });
          request(httpServer = app.listen())
            .get('/')
            .expect(500, done);
        });
      });
    });

  });
});



function App(options) {
  var app = new koa();
  app.keys = ['a', 'b'];
  app.use(session(options));
  return app;
}