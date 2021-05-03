'use strict'

/**
 * @module lib/object/has-property
 * @author Eric Satterwhite
 **/

module.exports = function hasProperty(obj, string = '', sep = '.') {
  /* eslint-disable-next-line no-eq-null */
  if (obj == null || string == null) return false
  if (typeof string !== 'string') {
    throw new TypeError(
      'second argument to object.hasProperty must be a string'
    )
  }

  if (sep && typeof sep !== 'string') {
    throw new TypeError(
      'third argument to object.hasProperty must be a string'
    )
  }

  const parts = string.split(sep)
  let ret = obj
  /* eslint-disable-next-line no-unused-vars */
  const last = parts.pop()
  let prop
  while ((prop = parts.shift())) {
    if (Object.prototype.hasOwnProperty.call(ret, prop)) {
      ret = ret[prop]
    }

    /* eslint-disable-next-line no-eq-null */
    if (ret == null) return false
  }

  return Object.prototype.hasOwnProperty.call(ret, last)
}

/**
 * wrapper Object.hasOwnProperty that can safely be called on object that
 * do not inherit from Object.prototype
 * @function module:lib/object/has-property
 * @param {Object} obj The object to inspect
 * @param {String} string The key(s) value
 * @param {String} [sep='.'] Delimiter character
 * @returns {Boolean} true if the key is defined on the root object
 * @example
 * object.has({a: 1}, 'a') // true
 * @example
 * object.has({}, 'test') // false
 * @example
 * object.has(Object.create(null), 'test') // false
 * @example
 * object.has({one: {two: {three: 3}}}, 'one-two-three', '-') // true
 **/

