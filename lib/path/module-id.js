'use strict'

const path = require('path')

/**
 * Identifies the name of the module specified by the location
 * paramater relative to the root parameter
 * @param {String} location
 * @param {String} [root=process.cwd()] root, default process.cwd()
 * @param {String} [sep=':'] sep, default ':'
 * @example
 * moduleId(__filename) // path:module-id
 * @returns Module name delimited by sep parameter
 */
module.exports = function moduleID(location, root = process.cwd(), sep = ':') {
  const relative = path.relative(root ?? process.cwd(), location)
  const path_bits = path.parse(relative)
  return path.join(path_bits.dir, path_bits.name).replaceAll('/', sep)
}
