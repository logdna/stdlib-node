'use strict'

const {test, threw} = require('tap')
const array = require('../../lib/array/index.js')

test('array', async (t) => {
  t.test('toArray', async (t) => {
    const cases = [
      {value: undefined, expected: [], message: 'toArray(undefined) == []'}
    , {value: null, expected: [], message: 'toArray(null) == []'}
    , {value: 1, expected: [1], message: 'toArray(1) == [1]'}
    , {value: '', expected: [], message: 'toArray(\'\') == []'}
    , {value: 'test', expected: ['test']}
    , {value: '1,2,3', expected: ['1', '2', '3']}
    , {value: '1, 2, 3', expected: ['1', '2', '3']}
    , {value: '1, 2, 3', expected: ['1', ' 2', ' 3'], sep: ','}
    , {value: '1|2|3', expected: ['1', '2', '3'], sep: '|'}
    , {value: [1, 2, 3], expected: [1, 2, 3]}
    , {value: new Set([1, null, 'test']), expected: [1, null, 'test']}
    ]
    for (const current of cases) {
      const args = [current.value]
      if (current.sep) {
        args.push(current.sep)
      }

      t.same(
        array.toArray(...args)
      , current.expected
      , current.message || `toArray(${current.value}) == ${current.expected}`
      )
    }
  })

  test('chunk', async (t) => {
    t.test('throws on invalid input array', async (t) => {
      t.throws(() => { array.chunk('not an array', 2) }, {
        name: 'TypeError'
      , message: 'first argument must be an array'
      , meta: {
          arr: 'not an array'
        , type: 'string'
        }
      })
    })

    t.test('throws on invalid size', async (t) => {
      t.throws(() => { array.chunk([1, 2, 3], 'bad') }, {
        name: 'TypeError'
      , message: 'second argument must be an integer'
      , meta: {
          size: 'bad'
        , type: 'string'
        }
      })

      t.throws(() => { array.chunk([1, 2, 3], 1.2345) }, {
        name: 'TypeError'
      , message: 'second argument must be an integer'
      , meta: {
          size: 1.2345
        , type: 'number'
        }
      })

      t.throws(() => { array.chunk([1, 2, 3], 0) }, {
        name: 'RangeError'
      , message: 'size must be >= 1'
      , meta: {
          size: 0
        }
      })

      t.throws(() => { array.chunk([1, 2, 3], -2) }, {
        name: 'RangeError'
      , message: 'size must be >= 1'
      , meta: {
          size: -2
        }
      })
    })

    t.test('chunks empty array', async (t) => {
      const input = []
      const result = array.chunk([], 2)
      t.same(input, [], 'empty array')
      t.not(input, result, 'new array created')
    })

    t.test('chunks input array', async (t) => {
      t.same(array.chunk([1, 2, 3], 1), [[1], [2], [3]], 'single element chunks')
      t.same(
        array.chunk([1, 2, 3, 4, 5], 2)
      , [[1, 2], [3, 4], [5]]
      , 'remainder in separate chunk')
      t.same(
        array.chunk([{a: 'b'}, {c: 'd'}, {e: 'f'}], 2)
      , [[{a: 'b'}, {c: 'd'}], [{e: 'f'}]]
      , 'chunks an array of objects')
    })
  })
}).catch(threw)
