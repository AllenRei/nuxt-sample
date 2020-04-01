const Router = require("koa-router");
const router = new Router();

const { validate, Joi } = require("../utils/joi-validator");
const { ACTION_TYPES, ACTION_TYPES_VALIDATIONS } = global.constants;
const { validateAction } = require("../utils/helpers");
const { paginate } = require("../middlewares/paginate");
const mongoose = require('mongoose');

router.post(
  "/",
  validate({
    body: {
      type: Joi.number().required(),
      tag: Joi.string().optional(),
      amount: Joi.number().required(),
      comment: Joi.string().max(256).optional(),
      target: Joi.string().optional()
    }
  }),
  async ctx => {
    if (!validateAction(ctx.request.body.type, ctx.request.body)) return ctx.throw(400);

    let options = {
      _id : mongoose.Types.ObjectId(),
      author: ctx.state.user.id,
      tag: ctx.request.body.tag,
      action_type: ctx.request.body.type,
      amount: ctx.request.body.amount,
      event: ctx.state.event._id,
      comment : ctx.request.body.comment,
      date: Date.now()
    };
    
    if(!ctx.state.event.amount) ctx.state.event.amount = 0;
    if(options.amount) ctx.state.event.amount += Math.abs(options.amount);

    ctx.state.event.actions.push(options);
    await ctx.state.event.save();
    ctx.status = 200;
    ctx.body = options;
  }
);

router.get("/", paginate, async ctx => {
  let items,
    count = ctx.state.event.actions.length;
  if (ctx.query["tag"]) {
    items = ctx.state.event.actions.filter(a => a.tag === ctx.query["tag"]);
    count = items.length;
  } else {
    items = ctx.state.event.toObject().actions;
  }
  // items = ctx.state.event.actions.slice(
  //   ctx.state.skip,
  //   ctx.state.skip + ctx.state.limit
  // );
  items = items.map(i => {
    let p = ctx.state.user.pointers.find(
      po => po.event.toString()===ctx.state.event.id.toString()
    );
    if(!p || i.date >= p.date) i.is_new = true;
    return i;
  })
  ctx.status = 200;
  ctx.body =  items;
});

module.exports = router;
