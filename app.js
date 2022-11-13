const express = require('express')
const products = require('./storage/products')
const messages = require('./storage/messages')

const { Server: HttpServer } = require('http')
const { Server: IoServer } = require('socket.io')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', './views')
app.set('view engine', 'ejs')

const logger = require('morgan')

require('dotenv').config()

const http = new HttpServer(app)
const io = new IoServer(http)

app.use(logger('dev'))
app.use(express.static('public'))

app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    environment: process.env.ENVIRONMENT || 'undefined',
    health: 'Up'
  })
})

const PORT = process.env.PORT || 3000

http.listen(PORT, () => console.info(`Server up and running on port ${PORT}`))

const router = require('./src/routes/index')

app.use('/api', router)

io.on('connection', socket => {
  console.log('nuevo cliente socket conectado')
  socket.on('NEW_PRODUCT_CLI', async product => {
    const newProduct = await products.save(product)
    io.sockets.emit('NEW_PRODUCT_SERVER', newProduct)
  })
  socket.on('NEW_MESSAGE_CLI', async message => {
    const newMessage = await messages.save(message)
    io.sockets.emit('NEW_MESSAGE_SERVER', newMessage)
  })
})
