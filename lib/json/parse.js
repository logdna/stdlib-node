'use strict'

/**
 * @module lib/json/parse
 * @author Eric Satterwhite
 **/

module.exports = function tryParseJSON(input, defaultReturn) {
  try {
    return JSON.parse(input)
  } catch (e) {
    return defaultReturn
  }
}
/**
 * Attempts to json parse a string. If it cannont, undefined will be returned
 * @function module:lib/json/parse
 * @param {String} input The json input to parse
 * @param {Object} [defaultReturn = undefined] Optional return value if parsing fails.
 * @returns {Object} The parsed object
 * @example
 * json.parse('') // ''
 * @example
 * json.parse('{"foo":"bar"}') // {foo: 'bar'}
 * @example
 * json.parse({}) // undefined
 * @example
 * json.parse('NOPE', {}) // {}
 * @example
 * json.parse('NOPE', {err: 'did not parse'}) // {err: 'did not parse'}
 **/

