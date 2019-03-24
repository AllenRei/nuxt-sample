module.exports = {
  async paginate(ctx, next) {
    try {
      ctx.state.limit = ctx.query["limit"] ? parseInt(ctx.query["limit"]) : 10;
      ctx.state.skip = ctx.query["offset"] ? parseInt(ctx.query["offset"]) : 0;
      await next();
    } catch (e) {
      console.log(e);
      return ctx.throw(400);
    }
  },
}
