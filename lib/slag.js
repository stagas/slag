/**
 * slag
 */

var ActorList = require('./actorlist')
var State = require('./state')

/**
 * World ctor
 */
function World () {
  this.actors = new ActorList()
  this.state = new State()
}

/**
 * Frames per second getter
 * @returns {Number} Frames per second
 */
World.prototype.__defineGetter__('fps', function () {
  return this.state.timer.fps
})

/**
 * Frames per second setter
 * @param   {Number} fps Frames per second
 */
World.prototype.__defineSetter__('fps', function (fps) {
  this.state.timer.fps = fps
})

/**
 * Start world simulation (doesn't start loop)
 */
World.prototype.prepare
= World.prototype.start
= function () {
  this.state.start()
  return this
}

/**
 * Join an Actor in our World
 * @param   {Object} actor Actor instance
 * @returns {Number}       Number of Actors
 */
World.prototype.join = function (actor) {
  return this.actors.add(actor)
}

/**
 * Starts main loop
 * @param   {Function} fn Function that is called on every tick
 */
World.prototype.loop = function (alphafn, tickfn) {
  var self = this
  alphafn = alphafn.bind(self.state)
  tickfn = tickfn.bind(self.state)
  ;(function loop () {
    self.state.tick(alphafn, tickfn)
    process.nextTick(loop)
  }());
}

/**
 * Main exports
 * 
 * @type {Function} World ctor
 */
exports = module.exports = World
exports.World = World

/**
 * World instance factory
 * 
 * @returns {Object} An instance of World
 */
exports.createWorld = function () {
  return new World()
}
