'use strict'

/**
 * Namespace for functions dealing with manipulating strings
 * @namespace lib/string
 * @borrows module:lib/string/camelcase as camelcase
 * @borrows module:lib/string/lowercase as lowercase
 * @borrows module:lib/string/slugify as slugify
 * @borrows module:lib/string/typecast as typecast
 * @borrows module:lib/string/uppercase as uppercase
 **/

module.exports = {
  camelcase: require('./camelcase.js')
, lowercase: require('./lowercase.js')
, slugify: require('./slugify.js')
, typecast: require('./typecast.js')
, uppercase: require('./uppercase.js')
}

