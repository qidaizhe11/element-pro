const jsonServer = require('json-server')
const roadhog = require('./utils/roadhog')

const server = jsonServer.create()
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

// roadhog mock模式

roadhog.init(server)

// 传统json-server模式

const router = jsonServer.router()

server.use(router)

const port = process.env.PORT || 8082

server.listen(port, () => {
  console.log('json-server running at port:', port)
})
