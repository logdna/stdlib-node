'use strict'
/**
 * @module lib/typeof
 * @author Eric Satterwhite
 **/

const TYPE_EXP = /^\[object (.*)\]$/
const toString = Object.prototype.toString

module.exports = function typeOf(value) {
  const parts = TYPE_EXP.exec(toString.call(value))
  return parts[1].toLowerCase()
}

/**
 * A more accurate version of the javascript built-in function typeof
 * @function module:lib/type-of
 * @param {Any} value The javascript object to type check
 * @returns {String} The type of the object passed in
 * @example
 * typeOf([]) // 'array'
 * typeOf(/\w+/) // 'regexp'
 * @example
 * class FooBar {
 *   get [Symbol.toStringTag]() {
 *     return 'foobar'
 *   }
 * }
 * typeOf(new FooBar()) // 'foobar'
 **/

