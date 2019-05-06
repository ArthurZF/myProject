const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const mainProgram = require('./mainProgram/mainProgram.js')
const app = new Koa()

app.use(bodyParser())
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    await next()
});
app.use(async (ctx) => {
    if (ctx.method == "POST") {
        let data=await mainProgram(JSON.parse(ctx.request.body.data));
        console.log(data);
        ctx.response.status = data.resCode;
        ctx.response.body = data;
    } else {
        ctx.response.body = {
            resCode: 500,
            resMsg: "请求方式错误"
        }
    }
})
app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            message: err.message
        };
        // 手动释放error事件
        ctx.app.emit('error', err, ctx);
    }
});
app.on('error', (err, ctx) => {
    console.error('server error', err);
});
app.listen(3000)
console.log("Koa服务开始了！")