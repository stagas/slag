/**
 * Interpolate between two snapshots
 * 
 * @param   {Number} a Alpha
 * @param   {Object} c Current snapshot
 * @param   {Object} p Previous snapshot
 * @returns {Object}   Alpha snapshot
 */
var alphaSnapshot = exports.alphaSnapshot = {} // save on objects
function interpolateSnapshots (a, c, p) {
  var n
  for (var k in alphaSnapshot) { delete alphaSnapshot[k] }

  for (var k in c) {
    if ('number' == typeof c[k]) {
      n = interpolate(a, c[k], p[k])
      n = fixFloat(n, global.FLOAT_PRECISION)
    } else {
      n = a >= 0.5 ? c[k] : p[k]
    }
    alphaSnapshot[k] = n
  }

  return alphaSnapshot
}

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
 * Make a diff
 * @param   {Object} a
 * @param   {Object} b
 * @returns {Mixed}    Diff or false
 */
function makeDiff (a, b) {
  if (!a || !b) return false
  var diff = {}, dirty = false
  for (var k in a) {
    if (a[k] !== b[k]) diff[k] = a[k], dirty = true
  }
  for (var k in b) {
    if (a[k] !== b[k]) diff[k] = b[k], dirty = true
  }
  return dirty && diff || false
}

/**
 * Diff two arrays
 * @param   {Array} a
 * @param   {Array} b
 * @returns {Array}   Diff
 */
function makeDiffArray (a, b) {
  var arr = []
  a.forEach(function (el, i) {
    arr.push(makeDiff(el, b[i]))
  })
  return arr
}

/**
 * Fix floating point precision
 * 
 * @param   {Number} i The Number we want to fix
 * @returns {Number}   The Number with a fixed decimal digit length
 */
function fixFloat (i) {
  return Math.round(i * global.FLOAT_PRECISION) / global.FLOAT_PRECISION
}

/**
 * Exports
 */
exports.interpolateSnapshots = interpolateSnapshots
exports.interpolate = interpolate
exports.fixFloat = fixFloat
exports.makeDiff = makeDiff
exports.makeDiffArray = makeDiffArray
