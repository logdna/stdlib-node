'use strict'

const {test, threw} = require('tap')
const cycle = require('../../lib/iter/cycle.js')

test('iter', async (t) => {
  t.test('cycle', async (tt) => {
    const items = [1, /\w+/, {a: 2}, true]
    const cycler = cycle(items)

    tt.throws(() => {
      cycle(1).next()
    }, /first argument to cycle must be an array/gi)

    tt.doesNotThrow(() => {
      let times = items.length * 2
      while (times--) {
        const {value, done} = cycler.next()
        tt.ok(value, 'next value returned')
        tt.notOk(done, 'cycle never ends')
      }
    })

    while (items.length) {
      const {value} = cycler.next()
      const element = items.shift()
      tt.deepEqual(value, element, `elements cycled in order ${value} == ${element}`)
    }
  })

}).catch(threw)
