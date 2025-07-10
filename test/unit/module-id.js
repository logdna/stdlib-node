'use strict'

const {test} = require('tap')
const {moduleId} = require('../../lib/path/index.js')

test('moduleId', async (t) => {
  t.equal(
    moduleId(__filename, __dirname)
  , 'module-id'
  , 'correct id for __filename, __dirname'
  )

  t.equal(
    moduleId('lib/module-id.js', undefined, '|')
  , 'lib|module-id'
  , 'correct id for lib file, | delimiter'
  )

  // Verify function doesn't throw when `null` root is passed
  t.equal(
    moduleId('lib/module-id.js', null, '|')
  , 'lib|module-id'
  , 'correct id for lib file, | delimiter with null root'
  )
})
