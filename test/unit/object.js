'use strict'

const {test, threw} = require('tap')
const object = require('../../lib/object/index.js')

test('object', async (t) => {
  t.test('Exports as expected', async (t) => {
    const entries = Object.entries(object)
    t.equal(entries.length, 5, 'function count')
    t.match(object, {
      filter: Function
    , get: Function
    , set: Function
    , has: Function
    , typecast: Function
    }, 'function names')
  })

  t.test('object.has', async (t) => {
    const has = object.has
    const input = {
      l1: {
        l1p1: 2
      , l1p2: {
          l3p1: 4
        , l3p2: null
        }
      }
    }

    t.equal(has(undefined, 'l1'), false, 'object being undefined')
    t.equal(has(null, 'l1'), false, 'object being null')
    t.equal(has(input), false, 'default string')
    t.equal(has(input, 'l1p2.l3p1'), false, 'default separator')
    t.equal(has(input, 'l1.l1p2.l3p1'), true, 'default separator')
    t.equal(has(input, 'l1-l1p2-l3p1', '-'), true, 'custom separator')
    t.equal(has(input, 'l1.l1p2.l3p2'), true, 'value being null')
    t.equal(has(input, 'l1.l1p2.l3p2.l4p1'), false, 'props beyond null values')
    t.equal(has(input, 'l1.l1p2.nope'), false, 'no match')
    t.throws(() => {
      object.has(input, 0)
    }, /must be a string/ig)

    t.throws(() => {
      object.has(input, 'l1.l1p2.l3p2', 2)
    }, /must be a string/ig)

    t.equal(has({one: 1}, 'one'), true, 'returns early if there is no delimiter to split')
  }).catch(threw)

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
    t.throws(() => {
      object.get(input, 0)
    }, /must be a string/ig)

    t.throws(() => {
      object.get(input, 'l1.l1p2.l3p2', 2)
    }, /must be a string/ig)
  }).catch(threw)

  t.test('object.set', async (t) => {
    const input = {}

    t.throws(() => {
      object.set(input, null, 1)
    }, /must be a string/ig)

    {
      const result = object.set(input, '', 1)
      t.same(result, {}, 'empty key results in no change')
    }

    {
      const result = object.set(input, 'x', 2)
      t.same(result, {x: 2}, 'singular key sets immeidate value')
    }

    {
      const result = object.set(input, 'foo.bar', 1)
      t.same(result, {
        x: 2
      , foo: {
          bar: 1
        }
      }, 'sets nested properties')
    }

    {
      const result = object.set(input, 'bar|baz|nested', [1, 2], '|')
      t.same(result, {
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
      t.same(result, {
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

      t.same(output, {}, 'number returns empty object')
    }

    {
      const input = null
      const output = object.filter(input, (key) => {
        return !key.match(/o/ig)
      })

      t.same(output, {}, 'null returns empty object')
    }

    {
      const input = {one: 1, two: 2, three: 3, four: 4}
      const output = object.filter(input, (key) => {
        return !key.match(/o/ig)
      })

      t.same(output, {three: 3}, 'filters out non matching keys')
    }
  })

  test('object.typecast', async (t) => {
    {
      const input = {
        foo: 'true'
      , bar: '1'
      , baz: {
          bazfoo: 1
        , bazbar: '-1'
        , bazbaz: 'null'
        , deep: {
            string: 'true'
          }
        }
      , qux: [1, 2, '3']
      }

      t.same(object.typecast(input), {
        foo: true
      , bar: 1
      , baz: {
          bazfoo: 1
        , bazbar: -1
        , bazbaz: null
        , deep: {
            string: true
          }
        }
      , qux: [1, 2, '3']
      }, 'typecasted object matches')
    }

    {
      const input = {
        one: {
          foo: '1'
        , two: {
            foo: '1'
          , three: {
              foo: '1'
            }
          }
        }
      }

      t.same(object.typecast(input, 2), {
        one: {
          foo: 1
        , two: {
            foo: 1
          , three: {
              foo: '1'
            }
          }
        }
      }, 'respects depth')

      t.same(object.typecast(input, 1), {
        one: {
          foo: '1'
        , two: {
            foo: '1'
          , three: {
              foo: '1'
            }
          }
        }
      }, 'respects depth')
    }
  })
}).catch(threw)
