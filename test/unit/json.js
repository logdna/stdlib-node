'use strict'

const {test, threw} = require('tap')
const tryParseJSON = require('../../lib/json/parse.js')

test('json', async (t) => {
  t.test('parse', async (t) => {
    {
      const json_string = '{"hello": "there", "integer": 10}'
      const result = tryParseJSON(json_string)
      t.same(result, {
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

  t.test('parse accepts a default return value', async (t) => {
    const EMPTY = {}
    const ERRMSG = {err: 'There was a parsing error'}

    const emptyObj = tryParseJSON('NOPE', EMPTY)
    t.same(emptyObj, EMPTY, 'Default empty object was returned')

    const someErr = tryParseJSON('NAH', ERRMSG)
    t.same(someErr, ERRMSG, 'Default error object was returned')
  })
}).catch(threw)
