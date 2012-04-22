var util = require('util')
var slag = require('../')
var actors = require('./simple-actors')

// create world
var world = slag.createWorld()

// join network thing
var net = new slag.Actors.Net(world)
net.onSync(function (diff) {
  //console.log('diff:', diff)
})

world.join(net)

var scr = new actors.Screen
world.join(scr)

var keys = new actors.KeyHandler
world.join(keys)

// create and join frame counter actor
world.join(new actors.FrameCounter)

// create a zillion points
var point
for (var i = 1000; i--;) {
  point = new actors.Point()

  // the last point
  if (!i) {
    // flags
    point.draw = true
    point.isNetOwner = true

    // attach keyhandler to point
    keys.control(point)
  }

  // join point actor in world
  world.join(point)
}

// start world
world.start()

// set fps
world.fps = 60

// loop world
world.loop(function () {
  this.render()
}, function () {
  this.update()
})
