'use strict'

/**
 * @module lib/string/camelcase
 * @author Eric Satterwhite
 * @requires lib/string/uppercase
 * @requires lib/string/lowercase
 **/

const upperCase = require('./uppercase.js')
const lowerCase = require('./lowercase.js')
const PATTERN = /[^\x20\x2D0-9A-Z\x5Fa-z\xC0-\xD6\xD8-\xF6\xF8-\xFF]/g

module.exports = camelcase

function camelcase(str) {
  return removeNonWord(lowerCase(str))
    .replace(/[-_.]/g, ' ') // convert all hyphens and underscores to spaces
    .replace(/\s[a-z]/g, upperCase) // convert first char of each word to UPPERCASE
    .replace(/\s+/g, '') // remove spaces
    .replace(/^[A-Z]/g, lowerCase) // convert first char to lowercase
}

function removeNonWord(str) {
  return str.replace(PATTERN, '')
}

/**
 * Casts a string value its to camel case (best effort)
 * @function module:lib/string/camelcase
 * @param {String} str The string value to convert
 * @return {String} The camelcased value
 * @example
 * camelcase('hello WORLD') // helloWorld
 * @example
 * camelcase('A short. Sentence') // aShortSentence
 **/

