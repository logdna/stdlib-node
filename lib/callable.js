'use strict'
/**
 * @module lib/callable
 * @author Eric Satterwhite
 **/

/**
 * A class object whose instances are also callable
 * To define a callable object, extend this class and gif it a symbol function
 * using Symbol.for("call")
 * @constructor
 * @alias module:lib/callable
 * @extends Function
 * @example
 * class Message extends Callable {
 *  constructor(name) {
 *    super()
 *    this.name = name
 *  }
 *
 *  [__call__]() {
 *    return `Hello ${this.name}`
 *  }
 * }
 *
 * const bob = new Message('bob')
 * bob.name // bob
 * bob() // Hello bob
 **/
class Callable extends Function {
  get [Symbol.toStringTag]() {
    return 'Callable'
  }

  constructor() {
    super('...args', 'return this._bound[Symbol.for("call")](...args)')
    this._bound = this.bind(this)
    return this._bound
  }
}

module.exports = Callable
