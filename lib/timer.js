var utils = require('./utils')

/**
 * Timer
 */
 
function Timer () {
  this.now = Date.now()
  this.before = this.now
  this.alpha = -1
  this.delta = 0
  this.fps = 60
  this.accumulator = 0
}

Timer.prototype.__defineGetter__('fps', function () {
  return this._fps
})

Timer.prototype.__defineSetter__('fps', function (fps) {
  this._fps = fps
  this.ms = utils.fixFloat(1000 / fps)
})

Timer.prototype.tick = function () {
  this.now = Date.now()
  this.delta = this.now - this.before
  this.accumulator += this.delta
  this.before = this.now
}

Timer.prototype.overflow = function () {
  if (this.accumulator >= this.ms) {
    this.accumulator -= this.ms
    return true
  }
  return false
}

Timer.prototype.makeAlpha = function (fn) {
  var a = utils.fixFloat(this.accumulator / this.ms)
  if (this.alpha !== a) {
    this.alpha = a
    fn(this.alpha)
  }
}

/**
 * Main exports
 * @type {Function} Timer ctor
 */
module.exports = Timer
