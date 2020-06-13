const socket = io('http://192.168.0.126:4040')
const leftButton = document.getElementById('left-button')
const rightButton = document.getElementById('right-button')
const touchpad = document.getElementById('touchpad')

const touchMove = { x: 0, y: 0 }

socket.on('connect', () => {
  console.log('connect http://192.168.0.126:4040', socket)
})
socket.on('message', (msg) => {})

leftButton.addEventListener('click', () => {
  socket.emit('leftClick', new Date().getTime())
})
rightButton.addEventListener('click', () => {
  socket.emit('rightClick', new Date().getTime())
})

touchpad.addEventListener('touchstart', (e) => {
  socket.emit('touchstart', JSON.stringify(e))
  touchMove.x = e.changedTouches[0].clientX
  touchMove.y = e.changedTouches[0].clientY
  console.log('touchstart', `${touchMove.x} : ${touchMove.y}`)
})
touchpad.addEventListener('touchend', (e) => {
  socket.emit('touchend', JSON.stringify(e))
  console.log(
    'touchend',
    `${e.changedTouches[0].clientX} : ${e.changedTouches[0].clientY}`
  )
})
touchpad.addEventListener('touchcancel', (e) => {
  socket.emit('touchcancel', JSON.stringify(e))
  console.log(
    'touchcancel',
    `${e.changedTouches[0].clientX} : ${e.changedTouches[0].clientY}`
  )
})
touchpad.addEventListener('touchmove', (e) => {
  socket.emit(
    'touchmove',
    JSON.stringify({
      x: touchMove.x - e.changedTouches[0].clientX,
      y: touchMove.y - e.changedTouches[0].clientY,
    })
  )
  console.log(
    'touchmove',
    `${touchMove.x - e.changedTouches[0].clientX} : ${
      touchMove.y - e.changedTouches[0].clientY
    }`
  )
  touchMove.x = e.changedTouches[0].clientX
  touchMove.y = e.changedTouches[0].clientY
})
