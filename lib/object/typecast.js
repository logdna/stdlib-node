'use strict'

const typecast = require('../string/typecast.js')
const typeOf = require('../type-of.js')

module.exports = function typecastObject(obj, depth = 1000, use_null_prototype = true) {
  depth = depth || 1000 // handle `null`
  let out
  if (use_null_prototype) {
    out = Object.create(null)
  } else {
    out = {}
  }
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      out[key] = typecast(value)
      continue
    }

    if (depth && typeOf(value) === 'object') {
      out[key] = typecastObject(value, --depth, use_null_prototype)
      continue
    }

    out[key] = value
  }

  return out
}

/**
 * Recursively typecast string values of enumerable object properties.
 * @function module:lib/object/typecast
 * @param {Object} obj The input object
 * @param {Object} [depth=1000] The maximum depth to recursively typecast
 * @param {Boolean} [use_null_prototype=true] If true, creates a new object with the
 *  prototype of null. This is minutely more efficient, but can cause deep equality issues.
 * @returns {Object} Returns a *new* object
 * @example
 * const obj = {foo: '1', bar: 'null', baz: 'three', qux: {foo: '2'}}
 * const casted = typecast(obj)
 * // {foo: 1, bar: null, baz: 'three', qux: {foo: 2}}
 * const with_depth = typecast(obj, 0)
 * // {foo: 1, bar: null, baz: 'three', qux: {foo: '2'}}
 */
