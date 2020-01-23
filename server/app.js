const Koa = require('koa');
const koaStatic = require('koa-static');
const router = require('./routes');
const flash = require('koa-connect-flash');
const path = require('path');
const session = require('koa-session');
const config = require('./config');
const Pug = require('koa-pug');

const app = new Koa();

const pug = new Pug({
  viewPath: './views',
  pretty: false,
  basedir: './views',
  noCache: true,
  app: app
});

app.use(koaStatic('./public'));
app.use(flash());

app
  .use(session(config.session, app))
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3030);
