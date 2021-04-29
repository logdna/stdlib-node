'use strict'

const typecast = require('../string/typecast.js')
const typeOf = require('../type-of.js')

module.exports = function typecastObject(obj, depth = 1000) {
  const out = Object.create(null)
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      out[key] = typecast(value)
      continue
    }

    if (depth && typeOf(value) === 'object') {
      out[key] = typecastObject(value, --depth)
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
 * @param {Object} depth The maximum depth to recursively typecast
 * @returns {Object} Returns a *new* object
 * @example
 * const obj = {foo: '1', bar: 'null', baz: 'three', qux: {foo: '2'}}
 * const casted = typecast(obj)
 * // {foo: 1, bar: null, baz: 'three', qux: {foo: 2}}
 * const with_depth = typecast(obj, 0)
 * // {foo: 1, bar: null, baz: 'three', qux: {foo: '2'}}
 */
