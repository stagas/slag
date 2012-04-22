/**
 * State
 */

/**
 * Dependencies
 */
var Timer = require('./timer')
var ActorsList = require('./actorslist')

/**
 * State ctor
 */
function State () {
  this.frame = -2
  this.running = false
  this.actors = new ActorsList()
}

/**
 * state.stopped getter
 * 
 * @returns {Boolean} Stopped truth
 */
State.prototype.__defineGetter__('stopped', function () {
  return !this.running
})

/**
 * Init/start state activity
 * 
 * @returns {Object} State instance
 */
State.prototype.start = function () {
  this.resume()
  this.actors.init()
  this.timer = new Timer()

  // we need two states to interpolate
  // so instead of a conditional
  // that runs in every loop
  // we generate them here
  this.update()
  this.update()

  return this
}

/**
 * Stop/pause state activity
 */
State.prototype.stop = function () {
  this.running = false
}

/**
 * Resume state activity
 */
State.prototype.resume = function () {
  this.running = true
}

/**
 * Update state
 */
State.prototype.update = function () {
  this.actors.update()
}

/**
 * Render alpha state
 */
State.prototype.render = function () {
  this.actors.render(this.timer.alpha)
}

/**
 * Tick state
 * 
 * @param   {Function} alphafn Function to be called on every alpha value
 * @param   {Function} tickfn  Function to be called on every full tick
 */
State.prototype.tick = function (alphafn, tickfn) {
  this.timer.tick()
  while (this.timer.overflow()) {
    this.frame++
    tickfn(this.frame)
  }
  this.timer.makeAlpha(alphafn)
}

/**
 * Main exports
 * 
 * @type {Function} State ctor
 */
exports = module.exports = State
