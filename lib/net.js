var util = require('util')
var utils = require('./utils')
var Actor = require('./actor')

function Net () {
  Actor.call(this)
  this.name = 'net'
  this.relevant = {}
  this.previous = []
  this.snapshot = []
}

util.inherits(Net, Actor)

Net.prototype.isRelevantTo = function (actor) {
  return !!actor.isNetDirty
}

Net.prototype.onSync = function (fn) {
  this.syncfn = fn
}

Net.prototype.update = function () {
  this.relevant = this.getRelevant()
  this.snapshot = this.relevant.snapshot()
  this.diff = utils.makeDiffArray(this.previous, this.snapshot)
  if (this.diff.filter(function (el) { return !!el }).length) {
    this.syncfn(this.diff)
  }
  this.relevant.forEach(function (actor) { actor.isNetDirty = false })
  this.previous = this.snapshot
}

exports = module.exports = Net
