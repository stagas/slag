/**
 * Timer
 */
 
function Timer () {
  this.now = Date.now()
  this.before = this.now
  this.alpha = 0
  this.delta = 0
  this.accumulator = 0
  this.precision = global.FLOAT_PRECISION || Math.pow(10, 3)
  this.fps = 60
}

Timer.prototype.__defineGetter__('fps', function () {
  return this._fps
})

Timer.prototype.__defineSetter__('fps', function (fps) {
  this._fps = fps
  this.ms = fixFloat(1000 / fps, this.precision)
})

Timer.prototype.tick = function () {
  this.now = Date.now()
  this.delta = this.now - this.before
  this.accumulator += this.delta
  this.before = this.now
  return this.delta
}

Timer.prototype.overflow = function () {
  if (this.accumulator >= this.ms) {
    this.accumulator -= this.ms
    return true
  }
  return false
}

Timer.prototype.makeAlpha = function (fn) {
  var a = fixFloat(this.accumulator / this.ms, this.precision)
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

/**
 * Fix floating point precision
 * @param   {Number} i         The Number we want to fix
 * @param   {Number} precision Precision scalar
 * @returns {Number}           The Number with a fixed decimal digit length
 */
function fixFloat (i, precision) {
  return Math.round(i * precision) / precision
}