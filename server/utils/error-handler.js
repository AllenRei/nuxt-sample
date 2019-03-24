const { ERRORS } = require("../constants");
var jsonHandler = function(code, obj) {
  this.jsonError = obj;
  this.throw(code, obj);
};
var codeHandler = function(error) {
  // TODO
};
module.exports = async (ctx, next) => {
  try {
    ctx.throwJson = jsonHandler;
    ctx.throwCode = codeHandler;
    await next();
  } catch (err) {
    if (!err) console.warn("Warning! Throwed error without status");
    console.log(err);
    console.log(`err handler on ${ctx.path}`);
    ctx.status = err.status || 500;
    ctx.body = ctx.jsonError || err.message;
  }
};
