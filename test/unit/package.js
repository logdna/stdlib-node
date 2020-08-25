'use strict'

const {test, threw} = require('tap')

test('stdlib', async (t) => {
  const stdlib = require('../../index.js')
  const exported = Object.keys(stdlib)
  t.equal(exported.length, 6, 'number of exports')
  t.match(stdlib, {
    array: Object
  , iter: Object
  , json: Object
  , string: Object
  , typeOf: Function
  }, 'export types')
}).catch(threw)
