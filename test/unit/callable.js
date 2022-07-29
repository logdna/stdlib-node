'use strict'

const {test, threw} = require('tap')
const typeOf = require('../../lib/type-of.js')
const Callable = require('../../lib/callable.js')

test('callable', async (t) => {
  t.test('string representation', async (t) => {
    t.equal(typeOf(new Callable()), 'callable', 'identifies as callable')
  })

  t.test('extensbility', async (t) => {
    const __call__ = Symbol.for('call')
    class Sum extends Callable {
      [__call__](a, b = 1) {
        return a + b
      }
    }

    const sum = new Sum()
    t.equal(sum(10, 3), 13, 'call function executed')
  })
}).catch(threw)
