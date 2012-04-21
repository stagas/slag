var utils = require('./utils')

/**
 * Actor ctor
 */
function Actor () {
  this.state = this._current = {}
  this._previous = {}
  this._alpha = {}
}

/**
 * Update (or advance) the simulation one
 * frame forward
 * 
 * Override this in your actor prototype
 * 
 * @returns {Object} State snapshot
 */
Actor.prototype.update = function () {}

/**
 * Renders a frame
 * 
 * Override this in your actor prototype
 * 
 * @param   {Number} snapshot Snapshot to render
 */
Actor.prototype.render = function (snapshot) {} // override this

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
 * @param   {Object} c Current snapshot
 * @param   {Object} p Previous snapshot
 * @returns {Object}   Alpha snapshot
 */
Actor.prototype.interpolate = function (alpha) {
  return utils.interpolateSnapshots(alpha, this._current, this._previous)
}

/**
 * Main exports
 * 
 * @type {Function} Actor ctor
 */
exports = module.exports = Actor
