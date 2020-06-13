const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const actions = require('./src/robot_actions')

app.use(express.static(__dirname + '/public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (client) => {
  client.on('message', (data) => {
    console.log(data)
  })
  client.on('leftClick', (data) => {
    actions.leftClick()
    console.log(`LeftClick | ping: ${new Date().getTime() - data}`)
  })
  client.on('rightClick', (data) => {
    actions.rightClick()
    console.log(`RightClick | ping: ${new Date().getTime() - data}`)
  })
  client.on('touchmove', (data) => {
    const coords = JSON.parse(data)
    const n = 1.5
    coords.x *= n
    coords.y *= n
    actions.mouseMove(coords.x, coords.y)
  })
  client.on('disconnect', () => {})
})

http.listen(4040, '0.0.0.0', () => {
  console.log('listening on 192.168.0.126:4040')
})
