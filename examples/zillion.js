var util = require('util')
var slag = require('../')
var actors = require('./simple-actors')

// create world
var world = slag.createWorld()

// join a zillion actors :P
var point
for (var i = 5000; i--;) {
  point = new actors.Point()
  if (i > 0) point.render = function () {}
  world.join(point)
}

// create and join frame counter actor
console.log('Number of actors:', world.join(new actors.FrameCounter))

// prepare world
world.prepare()

// set fps
world.fps = 4

console.log('WORLD:', world)

// loop world
world.loop(function () {
  this.render()
}, function () {
  this.update()
})
