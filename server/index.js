const Koa = require('koa')
const consola = require('consola')
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser")
const {
  Nuxt,
  Builder
} = require('nuxt')
const morgan = require("koa-morgan");
const cors = require('koa2-cors');
const mongoose = require("mongoose");

let admin = require("firebase-admin");

require("dotenv").config();

global.constants = require("../constants");
global.basepath = __dirname;
global.config = require("./config.js");
global.helpers = require("./utils/helpers.js");

mongoose.connect(
  process.env.ENV === 'prod' ? global.config.DB_PROD : global.config.DB_DEV
);
mongoose.connection.on("error", console.error.bind(console, "Mongo connection error:"));
mongoose.connection.once("open", () => {
  console.log("Connected to Mongo");
});

admin.initializeApp({
  credential: admin.credential.cert(global.config.FIREBASE),
  databaseURL: global.config.FIREBASE_DB
});

const auth = require('./routes/auth.route');
const users = require('./routes/users.route');
const test = require('./routes/test.route');
const event = require('./routes/event.route');
const invites = require('./routes/invite.route');
const me = require('./routes/me.route');

const api = Router({
  prefix: '/api'
});
api.use(morgan(global.config.MORGAN));
api.use(require('./utils/error-handler'));
api.use(cors())
api.use(bodyParser())
api.use('/auth', auth.routes());
api.use('/users', users.routes());
api.use('/test', test.routes());
api.use('/events', event.routes());
api.use('/me', me.routes());
api.use('/invites', invites.routes());

const app = new Koa()


// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
      port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  app
    .use(api.routes())
    .use(api.allowedMethods());

  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
