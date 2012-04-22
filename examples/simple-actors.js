var util = require('util')
var slag = require('../')

var Actor = slag.Actor

var matrix = new Array(21)
              .join(new Array(61)
              .join(' ') + '\n')
              .split('')

function Screen () {
  Actor.call(this)
  this.name = 'screen'
  this.points = matrix.slice()
}

util.inherits(Screen, Actor)

Screen.prototype.init = function () {
  process.stdout.write(new Array(10000).join(' '))
  cursorTo(process.stdout, 0, 0)
  clearScreenDown(process.stdout)
}

Screen.prototype.isRelevantTo = function (actor) {
  return actor.name === 'point' && actor.draw === true
}

Screen.prototype.render = function () {
  process.stdout.write(this.points.join('') + '\x1b[1;1H')
  this.points = matrix.slice()
}

function Point () {
  Actor.call(this)
  this.name = 'point'
  this.x = 20
  this.y = 1
  this.vx = 0
  this.vy = 0
  this.a = 0
  this.speed = 0
}

util.inherits(Point, Actor)

Point.renderfn = function (s) {
  this.scr.points[ (s.x | 0) + (s.y | 0)*61 ] = 'o'
}

Point.prototype.welcome = function (actor) {
  if ('screen' == actor.name) {
    this.constructor.prototype.scr = actor
    this.render = Point.renderfn
  }
}

Point.prototype.advance = function () {
  this.vx = this.speed * Math.cos(this.a * (Math.PI / 180))
  this.vy = (this.speed / 2) * Math.sin(this.a * (Math.PI / 180))
  this.x += this.vx
  this.y += this.vy
  if (this.x < 0) this.x = 0
  else if (this.x >= 59) this.x = 59
  if (this.y < 0) this.y = 0
  else if (this.y >= 19) this.y = 19
  this.speed *= 0.98
}

Point.Direction = {
  'right': 0
, 'left': 180
, 'down': 90
, 'up': -90
}

Point.prototype.update = function () {
  if (this.input) {
    this.speed += 0.015
    this.speed = Math.min(this.speed, 1)
    this.a = Point.Direction[this.input]
  }

  this.advance()

  return { x: this.x, y: this.y }
}

function FrameCounter () {
  Actor.call(this)
  this.frames = 0
  this.now = Date.now()
  this.before = this.now
}

util.inherits(FrameCounter, Actor)

FrameCounter.prototype.isRelevantTo = function (actor) {
  if ('screen' == actor.name) return true
}

FrameCounter.prototype.welcome = function (actor) {
  if ('screen' == actor.name) {
    this.render = function (s) {
      this.now = Date.now()
      this.updatelag = this.now - this.before
      this.before = this.now      
      var str = 'F:' + s.frames
        + ' l:'
        + (this.updatelag * 1/1e3)
            .toFixed(global.DECIMAL_DIGITS)
      str.split('').forEach(function (char, i) {
        actor.points[i] = char
      })
    }
  }
}

FrameCounter.prototype.update = function () {
  this.frames++
  return { frames: '' + this.frames }
}

function KeyHandler () {
  Actor.call(this)
  this.pressed = ''
  this.previous = ''
}

util.inherits(KeyHandler, Actor)

KeyHandler.prototype.init = function () {
  var self = this
  process.stdin.resume()
  require('tty').setRawMode(true)
  var keyTimeout
  clearTimeout(keyTimeout)
  process.stdin.on('keypress', function (chunk, key) {
    clearTimeout(keyTimeout)
    self.setPressed(key.name)
    keyTimeout = setTimeout(function () {
      self.setPressed('')
    }, 300)
    if (key && key.ctrl && key.name == 'c') process.exit()    
  })
}

KeyHandler.prototype.setPressed = function (pressed) {
  if (this.isNetDirty) return
  this.pressed = pressed
  this.controlled.input = this.pressed
  this.isNetDirty = true
}

KeyHandler.prototype.update = function () {
  if (this.pressed !== this.previous && !this.isNetDirty) {
    this.previous = this.pressed
    this.controlled.input = this.pressed    
    this.isNetDirty = true
  }
  return { pressed: this.pressed }
}

KeyHandler.prototype.control = function (actor) {
  this.controlled = actor
}

exports.Screen = Screen
exports.Point = Point
exports.FrameCounter = FrameCounter
exports.KeyHandler = KeyHandler

/**
* moves the cursor to the x and y coordinate on the given stream
*/

function cursorTo(stream, x, y) {
  if (typeof x !== 'number' && typeof y !== 'number')
    return;

  if (typeof x !== 'number')
    throw new Error("Can't set cursor row without also setting it's column");

  if (typeof y !== 'number') {
    stream.write('\x1b[' + (x + 1) + 'G');
  } else {
    stream.write('\x1b[' + (y + 1) + ';' + (x + 1) + 'H');
  }
}
exports.cursorTo = cursorTo;


/**
* moves the cursor relative to its current location
*/

function moveCursor(stream, dx, dy) {
  if (dx < 0) {
    stream.write('\x1b[' + (-dx) + 'D');
  } else if (dx > 0) {
    stream.write('\x1b[' + dx + 'C');
  }

  if (dy < 0) {
    stream.write('\x1b[' + (-dy) + 'A');
  } else if (dy > 0) {
    stream.write('\x1b[' + dy + 'B');
  }
}
exports.moveCursor = moveCursor;


/**
* clears the current line the cursor is on:
* -1 for left of the cursor
* +1 for right of the cursor
* 0 for the entire line
*/

function clearLine(stream, dir) {
  if (dir < 0) {
    // to the beginning
    stream.write('\x1b[1K');
  } else if (dir > 0) {
    // to the end
    stream.write('\x1b[0K');
  } else {
    // entire line
    stream.write('\x1b[2K');
  }
}
exports.clearLine = clearLine;


/**
* clears the screen from the current position of the cursor down
*/

function clearScreenDown(stream) {
  stream.write('\x1b[0J');
}
exports.clearScreenDown = clearScreenDown;