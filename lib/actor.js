/**
 * Actor ctor
 */
function Actor () {
  this.state = this._current = []
  this._previous = []
  this._alpha = []
  this.precision = global.FLOAT_PRECISION
}

/**
 * Update (or advance) the simulation one
 * frame forward
 * 
 * Override this in your actor prototype
 * 
 * @returns {Array} State
 */
Actor.prototype.update = function () {}

/**
 * Renders a frame
 * 
 * Override this in your actor prototype
 * 
 * @param   {Number} state State to render
 */
Actor.prototype.render = function (state) {} // override this

/**
 * Checks relevancy between our actor and another
 * 
 * Override this in your actor prototype
 * 
 * @param   {Object}  actor An Actor instance
 * @returns {Boolean}       Relevancy truth
 */
Actor.prototype.isRelevantTo = function (actor) {
  return true
}

/**
 * Private update
 */
Actor.prototype._update = function () {
  this._previous = this._current
  this.state = this._current =  this.update()
}

/**
 * Private render
 * 
 * @param   {Number} alpha Alpha value
 */
Actor.prototype._render = function (alpha) {
  this.render(this.interpolate(alpha))
}

/**
 * Interpolate
 * 
 * @param   {Number} a Alpha value
 * @returns {Array}    Alpha state
 */
Actor.prototype.interpolate = function (a) {
  this._alpha = []

  for (var i = 0, n, len = this._current.length; i < len; i++) {
    n = interpolate(a, this._current[i], this._previous[i])
    n = fixFloat(n, this.precision)
    this._alpha.push(n)
  }

  return this._alpha
}

/**
 * Main exports
 * 
 * @type {Function} Actor ctor
 */
exports = module.exports = Actor

/**
 * Interpolate between two values
 * 
 * @param   {Number} a Alpha
 * @param   {Number} c Current
 * @param   {Number} p Previous
 * @returns {Number}   Interpolated value
 */
function interpolate (a, c, p) {
  if (c !== p)
    return c * a + ( p * (1 - a) )
  else return c
}

/**
 * Fix floating point precision
 * 
 * @param   {Number} i         The Number we want to fix
 * @param   {Number} precision Precision scalar
 * @returns {Number}           The Number with a fixed decimal digit length
 */
function fixFloat (i, precision) {
  return Math.round(i * precision) / precision
}
