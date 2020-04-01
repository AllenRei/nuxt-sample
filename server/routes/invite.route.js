const Router = require("koa-router");
const router = new Router();
const auth = require("../utils/bearer-auth");
const light = auth({ fast: true });

const { validate, Joi } = require("../utils/joi-validator");
const { decryptCode } = require("../utils/helpers");
const { fetchToState } = require("../middlewares/fetch-to-state");

router.post('/', auth(), async ctx => {
    try {
        let { code, hash } = ctx.query;
        let event = null;
        console.log(`code: ${code}, hash: ${hash}`);
        if(code) event = await global.model.event.applyInvite(code, ctx.state.user);
        if(hash) event = await global.model.event.applyInvite(decryptCode(hash), ctx.state.user);
        console.log(event)
        if(event) {
            ctx.status = 200;
            ctx.body = event;            
        }else{
            console.warn("Event for invite not found");
            ctx.throw(400);
        }        
    }catch(e) {
        console.error("Error while adding user")
        ctx.throw(400);
    }

})
module.exports = router;