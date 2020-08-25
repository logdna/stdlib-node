'use strict'

/**
 * @module lib/string/uppercase
 * @author Eric Satterwhite
 **/

module.exports = function upperCase(str) {
  /* eslint-disable no-eq-null */
  const val = (str == null) ? '' : str.toString()
  /* eslint-enable no-eq-null */
  return val.toUpperCase()
}

/**
 * Function to safely conver a value to its uppercased variant
 * @function module:lib/string/uppercase
 * @param {String} str The string value to convert
 * @return {String} The upper cased value
 * @example
 * uppercase('hello WORLD') // hello world
 * @example
 * uppercase('A short. Sentence') // a short. sentence
 * @example
 * uppercase({}) // [OBJECT OBJECT]
 **/

