const Router = require('koa-router');
const router = new Router();

router.get('/error', function (ctx) {
    ctx.throwJson(400, { err : "ORA ORA ORA ORA" });
});
router.get('/', function (ctx) {
    console.log('test triggered');
    ctx.status = 200;
    ctx.body = `saranhe`
});

module.exports = router;