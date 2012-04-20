var util = require('util')
var slag = require('../')
var actors = require('./simple-actors')

// create world
var world = slag.createWorld()

// create a point
var point = new actors.Point()

// join point actor in world
world.join(point)

// create and join frame counter actor
world.join(new actors.FrameCounter)

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
