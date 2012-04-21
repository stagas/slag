var util = require('util')
var slag = require('../')

function Point () {
  slag.Actor.call(this)
  this.x = 20
  this.y = 0
  this.vx = 0
  this.vy = 0
  this.a = 0
  this.speed = 2
}

util.inherits(Point, slag.Actor)

Point.prototype.advance = function () {
  this.vx = this.speed * Math.cos(this.a * (Math.PI / 180))
  this.vy = this.speed * Math.sin(this.a * (Math.PI / 180))
  this.x += this.vx
}

Point.prototype.update = function () {
  if (this.speed <= 1) {
    this.a = 180 - this.a
  }
  if (this.a > 90) {
    this.speed = (this.x) * 0.8
  } else {
    this.speed = (40 - this.x) * 0.8
  }
  this.advance()
  return { x: this.x }
}

Point.prototype.render = function (s) {
  var len = (s.x | 0) + 1
  process.stdout.write(
    '\033[s\033[14C'
  + 'ipl x:' + s.x.toFixed(global.DECIMAL_DIGITS)
  + ' real x:' + this.x.toFixed(global.DECIMAL_DIGITS)
  + new Array(len).join(' ')
  + '*'
  + new Array(Math.max(0, 42 - len)).join(' ')
  + '\033[u'
  )
}

function FrameCounter () {
  slag.Actor.call(this)
  this.frames = 0
  this.now = Date.now()
  this.before = this.now
}

util.inherits(FrameCounter, slag.Actor)

FrameCounter.prototype.update = function () {
  this.now = Date.now()
  this.updatelag = this.now - this.before
  this.before = this.now  
  this.frames++
  return { frames: this.frames }
}

FrameCounter.prototype.render = function (s) {
  process.stdout.write(
    '\033[s'
  + 'F:' + this.frames
  + ' l:' + (this.updatelag * 1/1e4).toFixed(global.DECIMAL_DIGITS)
  + '\033[u'
  )
}

exports.Point = Point
exports.FrameCounter = FrameCounter
