'use strict'

const {test, threw} = require('tap')
const tryParseJSON = require('../../lib/json/parse.js')

test('json', async (t) => {
  t.test('parse', async (t) => {
    {
      const json_string = '{"hello": "there", "integer": 10}'
      const result = tryParseJSON(json_string)
      t.deepEqual(result, {
        hello: 'there'
      , integer: 10
      }, 'parsed json')
    }

    {
      const json_string = '{"hello": "th'
      const result = tryParseJSON(json_string)
      t.equal(result, undefined, 'invalid json returns undefined')
    }
  })
}).catch(threw)
