var slag = require('../')

var world = slag.createWorld()
world.prepare()
world.fps = 1

console.log(world)

world.loop(function (alpha) {
  console.log('alpha:', alpha)
}, function () {
  console.log('******** frame:', this.frame)
})
