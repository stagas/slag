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
 * Join an Actor in our World
 * @param   {Object} actor Actor instance
 * @returns {Number}       Number of Actors
 */
World.prototype.join = function (actor) {
  return this.actors.add(actor)
}

/**
 * Main loop function
 * @param   {Function} fn Function that is called on every tick
 */
World.prototype.loop = function (fn) {
  fn.call(this.state.current)
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
