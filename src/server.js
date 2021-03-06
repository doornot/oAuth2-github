const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const fetch = require('node-fetch')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

//
const { client_id, client_secret, access_token_url, fetch_user_url } = require('./utils/config')
const { decodeQuery } = require('./utils')

router.post('/auth', async ctx => {
  const { code } = ctx.request.body
  const params = { client_id, client_secret, code }

  // 第二步请求 access_token_url 获取token
  // 返回值类似 access_token=f6ae30958d382951fbde91791f7575aa24ed23dc&scope=&token_type=bearer
  const callbackURL = await fetch(access_token_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }).then(res => res.text())

  const { access_token } = decodeQuery(callbackURL)

  const userInfo = await fetch(`${fetch_user_url}?access_token=${access_token}`).then(res => res.json())

  ctx.body = userInfo
})

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes(), router.allowedMethods())

app.listen(6060, () => {
  console.log('sever listen on http://127.0.0.1:6060')
})
