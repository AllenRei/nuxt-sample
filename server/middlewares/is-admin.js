module.exports = {
    async isAdmin(ctx, next) {
        console.log("checking" + ctx.state.user);
        await next();
    },
} 