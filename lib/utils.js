var alphaState = exports.alphaState = {} // save on objects

function interpolateState (a, c, p, n) {
  for (var k in alphaState) { delete alphaState[k] }

  for (var k in c) {
    n = interpolate(a, c[k], p[k])
    n = fixFloat(n, global.FLOAT_PRECISION)
    alphaState[k] = n
  }

  return alphaState
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
exports.interpolateState = interpolateState
exports.interpolate = interpolate
exports.fixFloat = fixFloat
