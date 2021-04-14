'use strict'

/**
 * Namespace for functions dealing with parsing/manuipulating Javascript objects
 * @namespace lib/object
 * @borrows module:lib/object/get-property as get
 * @borrows module:lib/object/set-property as set
 * @borrows module:lib/object/has-property as has
 * @borrows module:lib/object/filter as filter
 **/

module.exports = {
  filter: require('./filter.js')
, get: require('./get-property.js')
, has: require('./has-property.js')
, set: require('./set-property.js')
}

