const socket = io('http://192.168.0.126:4040')
const leftButton = document.getElementById('left-button')
const rightButton = document.getElementById('right-button')
const touchpad = document.getElementById('touchpad')
const touchpadCursor = document.getElementById('touchpad-cursor')

const touchMove = { x: 0, y: 0 }

const setTouchpadStyle = ({ mouse }, touchpad, cursor) => {
  const touchpadSize = {
    width: touchpad.offsetWidth,
    height: touchpad.offsetHeight,
    x: mouse.x - touchpad.offsetWidth / 2,
    y: mouse.y - touchpad.offsetHeight / 2
  }
  cursor.style.top = ''
  cursor.style.left = ''
  if (mouse.x < touchpadSize.width / 2) {
    touchpadSize.x = 0
    cursor.style.left = `${mouse.x}px`
  }
  if (mouse.y < touchpadSize.height / 2) {
    touchpadSize.y = 0
    cursor.style.top = `${mouse.y}px`
  }
  touchpad.style.objectPosition = `-${touchpadSize.x}px -${touchpadSize.y}px`
  touchpad.style.objectFit = 'none'
}

socket.on('connect', () => {
  console.log('connect http://192.168.0.126:4040', socket)
})
socket.on('img', (msg) => {
  console.log(msg.mouse)
  var blob = new Blob( [ msg.img ], { type: "image/jpeg" } );
  var urlCreator = window.URL || window.webkitURL;
  var imageUrl = urlCreator.createObjectURL(blob);
  touchpad.src = imageUrl
  setTouchpadStyle(msg, touchpad, touchpadCursor)
})

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
})
touchpad.addEventListener('touchend', (e) => {
  socket.emit('touchend', JSON.stringify(e))
})
touchpad.addEventListener('touchcancel', (e) => {
  socket.emit('touchcancel', JSON.stringify(e))
})
touchpad.addEventListener('touchmove', (e) => {
  socket.emit(
    'touchmove',
    JSON.stringify({
      x: touchMove.x - e.changedTouches[0].clientX,
      y: touchMove.y - e.changedTouches[0].clientY,
    })
  )
  touchMove.x = e.changedTouches[0].clientX
  touchMove.y = e.changedTouches[0].clientY
})
