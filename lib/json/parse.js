'use strict'

/**
 * @module lib/json/parse
 * @author Eric Satterwhite
 **/

module.exports = function tryParseJSON(input) {
  try {
    return JSON.parse(input)
  } catch (e) {
    return undefined
  }
}
/**
 * Attempts to json parse a string. If it cannont, undefined will be returned
 * @function module:lib/json/parse
 * @param {String} json The json input to parse
 * @returns {Object} The parsed object
 * @example
 * json.parse('') // ''
 * @example
 * json.parse('{"foo":"bar"}') // {foo: 'bar'}
 * @example
 * json.parse({}) // undefined
 **/

