'use strict'

/**
 * @module lib/object/has-property
 * @author Eric Satterwhite
 **/

module.exports = function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

/**
 * wrapper Object.hasOwnProperty that can safely be called on object that
 * do not inherit from Object.prototype
 * @function module:lib/object/has-property
 * @param {Object} obj The object to inspect
 * @param {String} key The name of the property to locate
 * @returns {Boolean} true if the key is defined on the root object
 * @example
 * object.has({a: 1}, 'a') // true
 * @example
 * object.has({}, 'test') // false
 * @example
 * object.has(Object.create(null), 'test') // false
 **/

