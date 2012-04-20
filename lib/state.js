/**
 * State
 */

/**
 * Dependencies
 */
var Timer = require('./timer')

/**
 * State ctor
 */
function State () {
  this.frame = 0
  this.current = {}
  this.running = false
}

State.prototype.start = function () {
  this.running = true
  this.timer = new Timer()
}

State.prototype.stop = function () {
  this.running = false
}

State.prototype.tick = function (alphafn, tickfn) {
  this.timer.tick()
  while (this.timer.overflow()) {
    this.frame++
    tickfn()
  }
  this.timer.makeAlpha(alphafn)
}

exports = module.exports = State
