'use strict'

const {test, threw} = require('tap')
const object = require('../../lib/object/index.js')

test('object', async (t) => {
  t.test('Exports as expected', async (t) => {
    const entries = Object.entries(object)
    t.equal(entries.length, 4, 'function count')
    t.match(object, {
      filter: Function
    , get: Function
    , set: Function
    , has: Function
    }, 'function names')
  })

  t.test('object.has', async (t) => {
    const obj = {a: 'b'}
    t.equal(object.has(obj, 'a'), true, 'true for defined property')
    t.equal(
      object.has(obj, 'hasOwnProperty')
    , false
    , 'false for propertied defined on prototype'
    )
  })

  t.test('object.get', async (t) => {
    const get = object.get
    const input = {
      l1: {
        l1p1: 2
      , l1p2: {
          l3p1: 4
        , l3p2: null
        }
      }
    }

    t.equal(get(undefined, 'l1'), undefined, 'object being undefined')
    t.equal(get(null, 'l1'), undefined, 'object being null')
    t.equal(get(input), undefined, 'default string')
    t.equal(get(input, 'l1.l1p2.l3p1'), 4, 'default separator')
    t.equal(get(input, 'l1-l1p2-l3p1', '-'), 4, 'custom separator')
    t.equal(get(input, 'l1.l1p2.l3p2.l4p1'), null, 'props beyond null values')
    t.equal(get(input, 'l1.l1p2.nope'), undefined, 'no match')
  }).catch(threw)

  t.test('object.set', async (t) => {
    const input = {}

    t.throws(() => {
      object.set(input, null, 1)
    }, /must be a string/ig)

    {
      const result = object.set(input, '', 1)
      t.deepEquals(result, {}, 'empty key results in no change')
    }

    {
      const result = object.set(input, 'x', 2)
      t.deepEquals(result, {x: 2}, 'singular key sets immeidate value')
    }

    {
      const result = object.set(input, 'foo.bar', 1)
      t.deepEquals(result, {
        x: 2
      , foo: {
          bar: 1
        }
      }, 'sets nested properties')
    }

    {
      const result = object.set(input, 'bar|baz|nested', [1, 2], '|')
      t.deepEquals(result, {
        x: 2
      , foo: {
          bar: 1
        }
      , bar: {
          baz: {
            nested: [1, 2]
          }
        }
      }, 'sets nested properties w/ custom separator')
    }

    {
      const result = object.set(input, 'foo.bar', 100)
      t.deepEquals(result, {
        x: 2
      , foo: {
          bar: 100
        }
      , bar: {
          baz: {
            nested: [1, 2]
          }
        }
      }, 'subsequent calls override previous values')
    }
  })

  t.test('object.filter', async (t) => {
    {
      const input = 100
      const output = object.filter(input, (key) => {
        return !key.match(/o/ig)
      })

      t.deepEqual(output, {}, 'number returns empty object')
    }

    {
      const input = null
      const output = object.filter(input, (key) => {
        return !key.match(/o/ig)
      })

      t.deepEqual(output, {}, 'null returns empty object')
    }

    {
      const input = {one: 1, two: 2, three: 3, four: 4}
      const output = object.filter(input, (key) => {
        return !key.match(/o/ig)
      })

      t.deepEqual(output, {three: 3}, 'filters out non matching keys')
    }
  })
}).catch(threw)
