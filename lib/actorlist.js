/**
 * ActorList ctor
 */
function ActorList () {
  this.actors = []
}

/**
 * Add an Actor in our list
 * @param {Object}  Actor instance
 */
ActorList.prototype.add = function (/* actor[, actor[, ...]] */) {
  this.actors.push.apply(this.actors, arguments)
  return this.actors.length
}

/**
 * Remove an Actor from our list
 * @param   {Object} actor Actor instance
 * @returns {Object}       Removed Actor instance
 */
ActorList.prototype.remove = function (actor) {
  var idx = this.actors.indexOf(actor)
  if (~idx) return this.actors.splice(idx, 1)
}

/**
 * Main exports
 * @type {Function} ActorList ctor
 */
exports = module.exports = ActorList
