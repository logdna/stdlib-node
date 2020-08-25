'use strict'

/**
 * @module lib/string/lowercase
 * @author Eric Satterwhite
 **/

module.exports = function lowercase(str) {
  /* eslint-disable no-eq-null */
  const val = (str == null) ? '' : str.toString()
  /* eslint-enable no-eq-null */
  return val.toLowerCase()
}

/**
 * Function to safely convert a value to its lowercased variant
 * @function module:lib/string/lowercase
 * @param {String} str The string value to convert
 * @return {String} The lower cased value
 * @example
 * lowercase('hello WORLD') // hello world
 * @example
 * lowercase('A short. Sentence') // a short. sentence
 * @example
 * lowercase(null) // ''
 **/

