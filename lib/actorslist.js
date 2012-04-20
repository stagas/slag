/**
 * ActorsList ctor
 */
function ActorsList () {
  this.actors = []
}

/**
 * Add an Actor in our list
 * 
 * @param   {Object} actor Actor instance
 * @returns {Number}       Number of actors
 */
ActorsList.prototype.add = function (/* actor[, actor[, ...]] */) {
  this.actors.push.apply(this.actors, arguments)
  return this.actors.length
}

/**
 * Remove an Actor from our list
 * 
 * @param   {Object} actor Actor instance
 * @returns {Object}       Removed Actor instance
 */
ActorsList.prototype.remove = function (actor) {
  var idx = this.actors.indexOf(actor)
  if (~idx) return this.actors.splice(idx, 1)
}

/**
 * Update all actors
 */
ActorsList.prototype.update = function () {
  this.actors.forEach(function (actor) {
    actor._update()
  })
}

/**
 * Render all actors
 * 
 * @param   {Number} alpha Alpha value
 */
ActorsList.prototype.render = function (alpha) {
  this.actors.forEach(function (actor) {
    actor._render(alpha)
  })
}

/**
 * Main exports
 * @type {Function} ActorsList ctor
 */
exports = module.exports = ActorsList
