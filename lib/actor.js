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
 * Init Actor
 * 
 * Override this in your actor prototype
 */
Actor.prototype.init = function () {}

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
Actor.prototype.isRelevantTo = function (actor) { return false }

/**
 * Get relevant ActorsList
 * 
 * @returns {Object} Relevant ActorsList
 */
Actor.prototype.getRelevant = function () {
  return this.actors.getRelevantTo(this)
}

/**
 * Private update
 */
Actor.prototype._update = function () {
  this._previous = this._current
  this.state = this._current = this.update()
  for (var k in this._current) {
    this._current[k] = 'number' == typeof this._current[k]
      ? utils.fixFloat(this._current[k])
      : this._current[k]
  }
}

/**
 * Private render
 * 
 * @param   {Number} alpha Alpha value
 */
Actor.prototype._render = function (alpha) {
  alpha = this.interpolate(alpha)
  for (var k in alpha) { this._alpha[k] = alpha[k] }
  this.render(alpha)
}


Actor.prototype.snapshot = function () {
  // TODO: real clone
  return JSON.parse(JSON.stringify(this._current))
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
