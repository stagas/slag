var utils = require('./utils')

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
  var self = this
  var actors = [].slice.call(arguments)
  actors.forEach(function (actor) {
    actor.actors = actor.actors || self
  })
  this.actors.push.apply(this.actors, actors)
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

ActorsList.prototype.get = function (name) {
  for (var i = 0, len = this.actors.length; i < len; i++) {
    if (name === this.actors[i].name) return this.actors[i]
  }
}

/**
 * Get all relevant Actors to another Actor
 * @param   {Object} actor Actor instance
 * @returns {Object}       Relevant ActorsList
 */
ActorsList.prototype.getRelevantTo = function (actor) {
  var self = this
  var rlist = new ActorsList()
  this.actors
    .filter(function (el) {
      return actor !== el && (actor.isRelevantTo(el) || el.isRelevantTo(actor))
    })
    .forEach(function (el) { rlist.add(el) })
  return rlist
}

ActorsList.prototype.hello = function (actor) {
  this.forEach(function (el) {
    el.welcome(actor)
  })
}

/**
 * Make a snapshot of all actors states
 * @returns {Array} Snapshot
 */
ActorsList.prototype.snapshot = function () {
  var snapshot = []
  this.actors.forEach(function (actor) {
    snapshot.push(actor.snapshot())
  })
  return snapshot
}

/**
 * forEach Actors
 * @param   {Function} fn Function to run forEach
 */
ActorsList.prototype.forEach = function (fn) {
  this.actors.forEach(fn)
}

/**
 * Init all actors
 */
ActorsList.prototype.init = function () {
  this.forEach(function (actor) { actor.init() })
}

/**
 * Update all actors
 */
ActorsList.prototype.update = function () {
  this.forEach(function (actor) { actor._update() })
}

/**
 * Render all actors
 * 
 * @param   {Number} alpha Alpha value
 */
ActorsList.prototype.render = function (alpha) {
  this.forEach(function (actor) { actor._render(alpha) })
}

/**
 * Main exports
 * @type {Function} ActorsList ctor
 */
exports = module.exports = ActorsList
