'use strict'

/**
 * @module lib/object/filter
 * @author Eric Satterwhite
 **/

const typeOf = require('../type-of.js')
module.exports = filter

function filter(obj, fn) {
  const out = Object.create(null)
  if (typeOf(obj) !== 'object') return out
  for (const key of Object.keys(obj)) {
    if (fn(key)) out[key] = obj[key]
  }
  return out
}

/**
 * similar to array.filter, removes keys from an input object
 * @function module:lib/object/filter
 * @param {Object} obj The object to filter
 * @param {Function} fn A test function. return a truthy value to keep the key
 * @example
 * object.filter({two: 2, three: 3}, (key) =>{
 *    return key.match(/ee$/)
 * }) {three: 3}
 **/

