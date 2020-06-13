// Move the mouse across the screen as a sine wave.
const robot = require('robotjs')
const screenshot = require('screenshot-desktop')
 




// Speed up the mouse.
// robot.setMouseDelay(2)

// var twoPI = Math.PI * 2.0
// var screenSize = robot.getScreenSize()
// var height = screenSize.height / 2 - 10
// var width = screenSize.width

// for (var x = 0; x < width; x++) {
//   y = height * Math.sin((twoPI * x) / width) + height
//   robot.moveMouse(x, y)
// }
// imageminJpegtran
module.exports = {
  leftClick: robot.mouseClick,
  rightClick: robot.mouseClick.bind(null, 'right'),
  mouseMove: (dx, dy) => {
    const mouse = robot.getMousePos()
    const result = { x: mouse.x - dx, y: mouse.y - dy }
    const screen = robot.getScreenSize()
    if (result.x > screen.width) result.x = screen.width - 1
    if (result.x < 0) result.x = 1
    if (result.y > screen.height) result.y = screen.height - 1
    if (result.y < 15) result.y = 15
    robot.moveMouse(result.x - dx, result.y - dy)
  },
  getScreenCapture: async (x = 0, y = 0, width = 128, height = 96) => {
    // const buffer = robot.screen.capture(x, y, width, height).image
    // const base64 = buffer.toString('base64')
    const res = await new Promise((resolve, reject) => {
      screenshot({ format: 'png' }).then((img) => {
        resolve(img)
      }).catch((err) => {
        reject(err)
      })
    })
    return {img: res, mouse: robot.getMousePos(), screen: robot.getScreenSize()}
  }
}
