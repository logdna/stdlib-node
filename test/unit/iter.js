'use strict'

const {test, threw} = require('tap')
const cycle = require('../../lib/iter/cycle.js')

test('iter', async (t) => {
  t.test('cycle', async (t) => {
    const items = [1, /\w+/, {a: 2}, true]
    const cycler = cycle(items)

    t.throws(() => {
      cycle(1).next()
    }, /first argument to cycle must be an array/gi)

    t.doesNotThrow(() => {
      let times = items.length * 2
      while (times--) {
        const {value, done} = cycler.next()
        t.ok(value, 'next value returned')
        t.notOk(done, 'cycle never ends')
      }
    })

    while (items.length) {
      const {value} = cycler.next()
      const element = items.shift()
      t.same(value, element, `elements cycled in order ${value} == ${element}`)
    }
  })

}).catch(threw)
