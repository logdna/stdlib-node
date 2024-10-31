'use strict'
/**
 * @module lib/object/set-property
 * @author Eric Satterwhite
 */

module.exports = setProperty

function setProperty(obj, prop, value, sep = '.', use_null_prototype = true) {
  sep = sep || '.' // handle `null`
  if (typeof prop !== 'string') {
    throw new TypeError(
      'second argument to object.setProperty must be a string'
    )
  }

  const keys = prop.split(sep)
  const last = keys.pop()
  if (!last) return obj

  _deepest(obj, keys, use_null_prototype)[last] = value
  return obj
}

function _deepest(obj, keys, use_null_prototype) {
  if (!keys.length) return obj
  for (const key of keys) {
    if (!obj[key]) {
      if (use_null_prototype) {
        obj[key] = Object.create(null)
      } else {
        obj[key] = {}
      }
    }
    obj = obj[key]
  }
  return obj
}

/**
 * Sets a property at the deepest level. Nested objects will be created if they do
 * not exist. Returns the modified object.
 * This will not work on complex Types like arrays or maps. only POJOs
 * @function module:lib/object/set-property
 * @param {Object} obj The input object
 * @param {String} string The key(s) value
 * @param {*} value The value to set
 * @param {String} [sep='.'] Delimit character
 * @param {Boolean} [use_null_prototype=true] If true, creates a new object with the
 *  prototype of null. This is minutely more efficient, but can cause deep equality issues.
 * @returns {Object} Returns the modified object
 * @example
 * const obj = {one: {two: {three: 3}}}
 * const value = setProperty(obj, 'four.five', 6)
 * // {one: {two: {three: 3 }}, four: {five: 6}}
 */

