'use strict'

/**
 * @module lib/object/get-property
 * @author Eric Satterwhite
 */

module.exports = function getProperty(obj, string = '', sep = '.') {
  /* eslint-disable-next-line no-eq-null */
  if (obj == null || string == null) return undefined
  if (typeof string !== 'string') {
    throw new TypeError(
      'second argument to object.getProperty must be a string'
    )
  }

  if (sep && typeof sep !== 'string') {
    throw new TypeError(
      'third argument to object.getProperty must be a string'
    )
  }

  const parts = string.split(sep)
  let ret = obj
  const last = parts.pop()
  let prop
  while ((prop = parts.shift())) {
    ret = ret[prop]

    /* eslint-disable-next-line no-eq-null */
    if (ret == null) return ret
  }

  return ret[last]
}

/**
 * Given an object and a character-delimited string of keys (for deep nesting),
 * returns the value for the key.
 * @function module:lib/object/get-property
 * @param {Object} obj The input object
 * @param {String} string The key(s) value
 * @param {String} [sep='.'] Delimiter character
 * @returns {Mixed} Returns whatever value is found at the key
 * @example
 * const obj = {one: {two: {three: 3}}}
 * const value = getProperty(obj, 'one-two-three', '-') // 3
 * @example
 * const obj = {one: 1}
 * const value = getProperty(obj, 'one.two.three') // undefined
 */

