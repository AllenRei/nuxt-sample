
module.exports = {
  fetchToState(param, name) {
    return async (ctx, next) => {
      let elem;
      try {
        elem = await global.model[name].findById(ctx.params[param]);
      } catch (e) {
        console.log(e);
        return ctx.throw(500);
      }

      if (!elem) {
        return ctx.throwJson(404, {
          err: `${name} Not found!`
        });
      }
      ctx.state[name] = elem;
      await next();
    };
  },
}
