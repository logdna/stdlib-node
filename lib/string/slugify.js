'use strict'

/**
 * @module lib/string/slugify
 * @author Eric Satterwhite
 **/

module.exports = function slugify(str, sep = '-') {
  if (!str) return ''
  const NON_ALPHA_NUM_RE = new RegExp(`[^\\w\\s${sep}]+`, 'g')
  const EXTRA_SEP_RE = new RegExp(`[\\${sep}\\s]+`, 'g')
  return (
    str
      .replace(NON_ALPHA_NUM_RE, '')
      .trim()
      .replace(EXTRA_SEP_RE, sep)
      .toLowerCase()
  )
}

/**
 * Converts a string to a url friendly format by replacing spaces and symbols
 * with a known value and converting to lower case
 * @function module:lib/string/slugify
 * @param {String} str The string value to slugify
 * @param {String} [sep='-'] the value to use as a replacement
 * @return {String} slug The slugified variant of the string
 * @example
 * slugify('A fake Sentence') // a-fake-sentence
 * @example
 * slugify('A fake Sentence', '::') // a::fake::sentence
 **/
