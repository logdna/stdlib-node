'use strict'

const {test, threw} = require('tap')
const typeOf = require('../../lib/type-of.js')

class FooBar {
  get [Symbol.toStringTag]() {
    return 'FooBar'
  }
}

test('typeOf', async (t) => {
  t.type(typeOf, 'function', 'typeOf is a function')
  const cases = [
    {
      value: ''
    , expected: 'string'
    }
  , {
      value: new Date().toISOString()
    , expected: 'string'
    }
  , {
      value: new Date()
    , expected: 'date'
    }
  , {
      value: null
    , expected: 'null'
    }
  , {
      value: undefined
    , expected: 'undefined'
    }
  , {
      value: 1.1
    , expected: 'number'
    }
  , {
      value: /\w+/
    , expected: 'regexp'
    }
  , {
      value: new RegExp('\\w+')
    , expected: 'regexp'
    }
  , {
      value: new FooBar()
    , expected: 'foobar'
    }
  , {
      value: new Set()
    , expected: 'set'
    }
  , {
      value: [1, 2]
    , expected: 'array'
    }
  , {
      value: {}
    , expected: 'object'
    }
  , {
      value: true
    , expected: 'boolean'
    }
  , {
      value: () => {}
    , expected: 'function'
    }
  , {
      value: async () => {}
    , expected: 'asyncfunction'
    }
  ]
  for (const current of cases) {
    t.equal(
      typeOf(current.value)
    , current.expected
    , current.message || `typeOf(${current.value}) == ${current.expected}`
    )
  }
}).catch(threw)
