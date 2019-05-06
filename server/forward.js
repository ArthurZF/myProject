const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const router = require('koa-router')();
const app = new Koa()
const staticPath = '../webapps/'
app.use(router.routes());
app.use(static(path.join(__dirname, staticPath)))
app.listen(8080, () => {
    console.log('staic is starting at port 8080')
})