'use strict'

const {test, threw} = require('tap')

const string = require('../../lib/string/index.js')

test('string', async (t) => {
  t.test('slugify', async (t) => {
    t.type(string.slugify, 'function', 'slugify is a function')
    t.test('default separator', async (t) => {
      const cases = [{
        value: 'Hello World!'
      , expected: 'hello-world'
      }, {
        value: 'HEllo: - - - WORLD!!'
      , expected: 'hello-world'
      }, {
        value: 'HELLO   - 1 - 2 - WoRld   !'
      , expected: 'hello-1-2-world'
      }, {
        value: ''
      , expected: ''
      , message: '\'\' == \'\''
      }]

      for (const current of cases) {
        t.equal(
          string.slugify(current.value)
        , current.expected
        , current.message || `slugify(${current.value}) == ${current.expected}`
        )
      }
    })

    t.test('custom separator', async (t) => {
      const cases = [{
        value: 'Hello World!'
      , expected: 'hello.world'
      }, {
        value: 'HEllo: - - - WORLD!!'
      , expected: 'hello.world'
      }, {
        value: 'HELLO   - 1 - 2 - WoRld   !'
      , expected: 'hello.1.2.world'
      }, {
        value: ''
      , expected: ''
      , message: '\'\' == \'\''
      }]

      for (const current of cases) {
        t.equal(
          string.slugify(current.value, '.')
        , current.expected
        , current.message || `slugify(${current.value}) == ${current.expected}`
        )
      }
    })
  })

  t.test('uppercase', async (t) => {
    t.type(string.uppercase, 'function', 'uppercase is a function')
    const cases = [{
      value: 'test'
    , expected: 'TEST'
    }, {
      value: 'this Is A test'
    , expected: 'THIS IS A TEST'
    }, {
      value: null
    , expected: ''
    }, {
      value: undefined
    , expected: ''
    }, {
      value: {}
    , expected: '[OBJECT OBJECT]'
    }]

    for (const current of cases) {
      t.equal(
        string.uppercase(current.value)
      , current.expected
      , current.message || `uppercase(${current.value}) == ${current.expected}`
      )
    }

    t.throws(() => {
      string.uppercase(Object.create(null))
    }, 'string.uppercase called on non-string value')
  })

  t.test('lowercase', async (t) => {
    t.type(string.lowercase, 'function', 'lowercase is a function')
    const cases = [{
      value: 'test'
    , expected: 'test'
    }, {
      value: 'this Is A test'
    , expected: 'this is a test'
    }, {
      value: null
    , expected: ''
    }, {
      value: undefined
    , expected: ''
    }, {
      value: {}
    , expected: '[object object]'
    }]

    for (const current of cases) {
      t.equal(
        string.lowercase(current.value)
      , current.expected
      , current.message || `lowercase(${current.value}) == ${current.expected}`
      )
    }

    t.throws(() => {
      string.lowercase(Object.create(null))
    }, 'string.lowercase called on non-string value')
  })

  t.test('camelcase', async (t) => {
    t.type(string.camelcase, 'function', 'camelcase is a function')
    const cases = [{
      value: 'Hello World!'
    , expected: 'helloWorld'
    }, {
      value: 'hello-world'
    , expected: 'helloWorld'
    }, {
      value: 'HELLO_WORLD!!'
    , expected: 'helloWorld'
    }, {
      value: ''
    , expected: ''
    , message: '\'\' == \'\''
    }, {
      value: null
    , expected: ''
    , message: 'null == \'\''
    }, {
      value: '\x20'
    , expected: ''
    , message: '\x20 == \'\''
    }]

    for (const current of cases) {
      t.equal(
        string.camelcase(current.value)
      , current.expected
      , current.message || `camelCase(${current.value}) == ${current.expected}`
      )
    }
  })

  t.test('typecast', async (t) => {
    t.type(string.typecast, 'function', 'typecast is a function')
    t.same(string.typecast({x: 1}), {x: 1}, 'non string value')
    const cases = [{
      value: 'foo'
    , expected: 'foo'
    }, {
      value: 'true'
    , expected: true
    }, {
      value: 'false'
    , expected: false
    }, {
      value: '123'
    , expected: 123
    , message: 'integer value'
    }, {
      value: '123.45'
    , expected: 123.45
    , message: 'float value'
    }, {
      value: 'null'
    , expected: null
    , message: 'null string value'
    }, {
      value: null
    , expected: null
    , message: 'null literal value'
    }, {
      value: 'undefined'
    , expected: undefined
    , message: 'undefined string value'
    }, {
      value: undefined
    , expected: undefined
    , message: 'undefined literal value'
    }, {
      value: ''
    , expected: ''
    , message: 'empty string value'
    }, {
      value: Infinity
    , expected: Infinity
    , message: 'Infinity returns input'
    }]

    for (const current of cases) {
      t.equal(
        string.typecast(current.value)
      , current.expected
      , current.message || `camelCase(${current.value}) == ${current.expected}`
      )
    }
  })
}).catch(threw)
