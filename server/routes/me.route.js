const Router = require("koa-router");
const router = new Router();
const auth = require("../utils/bearer-auth");
const light = auth({ fast: true });

const { uploadFile } = require("../utils/s3-client");

const upload = require("koa-multer")({ dest: "tmp/" });

const { validate, Joi } = require("../utils/joi-validator");

router.get("/", auth(), async ctx => {
  ctx.status = 200;
  ctx.body = await ctx.state.user.getRegInfo();
});

router.post(
  "/",
  auth,
  validate({
    body: {
      avatar: Joi.string().disallow()
    }
  }),
  async ctx => {
    Object.assign(ctx.state.user, ctx.request.body);
    try {
      await ctx.state.user.save();
      ctx.status = 200;
    } catch (e) {
      console.log(e);
      ctx.throwCode(500);
    }
  }
);

router.put(
  "/device-token",
  light,
  validate({
    body: {
      deviceToken: Joi.string().required()
    }
  }),
  async ctx => {
    try {
      await global.user.changeDeviceToken(
        ctx.state.user.id,
        ctx.state.authToken,
        ctx.request.body.deviceToken
      );
      ctx.status = 200;
    } catch (e) {
      console.error(e);
      ctx.throw(500);
    }
  }
);

router.put("/avatar", auth(), upload.single("picture"), async ctx => {
  console.log(ctx.file, ctx.files);
  try{
    let file = await uploadFile(ctx.file, ctx.file.filename);
  }catch(e){
    return ctx.throw(500);
  }  
  console.log(file);
  ctx.state.user.avatar = file.url;
  await ctx.state.user.save();
  ctx.status = 200;
  ctx.body = file.url;
});

module.exports = router;
