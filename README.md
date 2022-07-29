## stdlib

[![Coverage Status](https://coveralls.io/repos/github/logdna/stdlib-node/badge.svg?branch=main)](https://coveralls.io/github/logdna/stdlib-node?branch=main)&nbsp;[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)&nbsp;<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Standardized modular package exposing language constructs - free of business logic.
A departure from ldshared exposing only what you need to implement business logic
in a clean and consitent fashion. Nothing more, and nothing less.

## Main Goals

* Free of business logic
* Consistent api
* Explicitness
* Lacking in dependencies
* Lacking indirection
* Highly debuggable
* Highly testable


## Installation

```bash
> npm install @logdna/stdlib
```

* [API](#api)
  * [array](#array)
    * [`toArray`(item: `any`): Array](#toarrayitem-any-array)
  * [iter](#iter)
    * [`cycle`(items: Array): Generator](#cycleitems-array-generator)
  * [json](#json)
    * [`parse`(input: String): Object](#parseinput-string-object)
  * [object](#object)
    * [`has`(obj: Object, property: String [, separator: String = '.']): Boolean](#hasobj-object-property-string--separator-string---boolean)
    * [`get`(obj: Object, property: String [, separator: String = '.']): any](#getobj-object-property-string--separator-string---any)
    * [`set`(obj: Object, property: String, value: `any` [, separator: String = '.' ]): Object](#setobj-object-property-string-value-any--separator-string----object)
    * [`filter`(obj: Object, test: Function): Object](#filterobj-object-test-function-object)
    * [`typecast`(obj: Object [, depth: Number = 1000]): Object](#typecastobj-object--depth-number--1000-object)
  * [string](#string)
    * [`camelcase`(text: String): String](#camelcasetext-string-string)
    * [`lowercase`(text: String): String](#lowercasetext-string-string)
    * [`uppercase`(text: String): String](#uppercasetext-string-string)
    * [`slugify`(text: String [, separator: String = '-']): String](#slugifytext-string--separator-string----string)
    * [`typecast`(text: String): Object](#typecasttext-string-object)
  * [`typeOf`(element: `any`): String](#typeofelement-any-string)
  * [`Callable`: Class](#callable-class)
* [Authors](#authors)
* [Contributors ✨](#contributors-)

## API

### array

Common array manipulation functions

#### `toArray`(item: `any`): [Array][]

Converts or wraps anything in an array. [Set][] objects will be converted to arrays.
A [String][] will be treated as a CSV and parsed into an array. If an array cannont
be coerced from the input value, it will be wrapped in an a single element array

**Arguments**:

* `item` - The element to convert to an array.

**returns** `result` [Array][]: The resulting array for input coercion

##### Example
```javascript
const {array} = require('@logdna/stdlib')
array.toArray() // []
array.toArray(null) // []
array.toArray(1) // [1]
array.toArray('1,2, 4, 3') // [1, 2, 4, 3]
```

### iter

Iteration tools for complex and efficient iteration. Inspired by python's itertools

#### `cycle`(items: [Array][]): [Generator][]

Iterates endlessly over a single array of items. The elements of the array can be of any type.

**Arguments**:

* `items` ([Array][]) - An array to iterate over

**returns** [Generator][] A generator object containing the passed in elements

##### Example

```javascript
const {iter} = require('@logdna/stdlib')
const numbers = iter.cycle([1, 2, 3])

numbers.next().value // 1
numbers.next().value // 2
numbers.next().value // 3
numbers.next().value // 1
numbers.next().value // 2
numbers.next().value // 3
```

### json

Common json functions

#### `parse`(input: [String][]): [Object][]

Safe json parsing function that attempts to json parse a string. If it cannont, undefined will be returned

**Arguments**

* `input` ([String][]) - a json string to parse

**returns** [Object][] A fully parsed javascript object

##### Example

```javascript
const {json} = require('@logdna/stdlib')
json.parse('{"valid": "json"}') // {valid: 'json'}
json.parse('{"invalid" json') // undefined
```

### object

Common object manipulation and intropsection functions

#### `has`(obj: [Object][], property: [String][] [, separator: [String][] = '.']): [Boolean][]

Determines if a specified key is a direct property of an object. This function is safe
to call on objects that do not inherit from Object.prototype, unlike attempting to call `.hasOwnProperty`
on input objects

**Arguments**

* `obj` ([Object][]) - The object to introspect
* `key` ([String][]) - The name of the property to locate
* (optional) `separator` ([String][]) - Delimiter character
  * default: `'.'`

**returns** [Boolean][] - True of the key is defined on the input object.

##### Example

```javascript
const {object} = require('@logdna/stdlib')
object.has({a: 1}, 'a') // true
object.has({}, 'test') // false
object.has(Object.create(null), 'test') // false
object.has({}, 'hasOwnProperty') // false
object.has({one: {two: {three: 3}}}, 'one-two-three', '-') // true
```

#### `get`(obj: [Object][], property: [String][] [, separator: [String][] = '.']): any

Returns the value from an object at a specified object path.

**Arguments**

* `obj` ([Object][]) - The object to introspect
* `key` ([String][]) - The name of the property to local
* (optional) `separator` ([String][]) - Delimiter character
  * default: `'.'`

**returns** `any` - The value at the specified key. If no value is found, `undefined` will be returned.

##### Example

```javascript
const {object} = require('@logdna/stdlib')
const obj = {one: {two: {three: 3}}}
const value = object.get(obj, 'one-two-three', '-') // 3
```
#### `set`(obj: [Object][], property: [String][], value: `any` [, separator: [String][] = '.' ]): [Object][]

Sets a property at the deepest level. Nested objects will be created if they do
not exist. Returns the modified object. This will not work on complex Types
like arrays or maps. Only POJOs

`NOTE`: if you find your self wanting to set the value at a specific index of an array - you probably want an object.

**Arguments**

* `obj` ([Object][]) - The object to introspect
* `key` ([String][]) - The name of the property to local
* `value` (`any`) - The value to set at the specified path
* (*optional*) `separator` ([String][]) - Delimiter character
  * default: `'.'`

##### Example

```javascript
const {object} = require('@logdna/stdlib')
const obj = {one: {two: {three: 3}}}
const value = object.set(obj, 'four.five', 6)
// {one: { two: three: 3 }, four: {five: 6}}
```

#### `filter`(obj: [Object][], test: [Function][]): [Object][]

Similar to array.filter, removes keys from an input object that do not pass the
`test` function

`NOTE`: This function returns a `null` object - `Object.create(null)` which does not
inherit from Object.prototype

**Arguments**

* `obj` ([Object][]) - The object to introspect
* `test` ([Function][]) - The function to be used to reject keys from the input object.
  If this function returns a `truthy` value, the key will be included in the final output. If `falsey`
  it will be excluded

##### Example

```javascript
const {object} = require('@logdna/stdlib')
const obj = {one: { two: three: 3 } }

object.filter({two: 2, three: 3}, (key) => {
   return key.match(/ee$/)
}) // {three: 3}
```

**returns** [Object][] An object containing only the keys which passed the test function.
The return object will have a `null` prototype.

#### `typecast`(obj: [Object][] [, depth: [Number][] = 1000]): [Object][]

Recursively typecast string values of enumerable object properties,
using [`string.typecast()`](#typecasttext-string-object)

**Arguments**

* `obj` ([Object][]) - The input object
* `key` ([Number][]) - The maximum depth to recursively typecast

**returns** [Object][] A *new* object with all string properties typecast.

##### Example

```javascript
const {object} = require('@logdna/stdlib')
const obj = {foo: '1', bar: 'null', baz: 'three', qux: {foo: '2'}}
const casted = typecast(obj)
// {foo: 1, bar: null, baz: 'three', qux: {foo: 2}}
const with_depth = typecast(obj, 0)
// {foo: 1, bar: null, baz: 'three', qux: {foo: '2'}}
```

### string

#### `camelcase`(text: [String][]): [String][]

Casts a string value to its [camel case](https://en.wikipedia.org/wiki/Camel_case) variant

**Arguments**

* `str` [String][] - The string value to convert

**returns** [String][] A camelcase version of the input string

##### Example

```javascript
const {string} = require('@logdna/stdlib')
string.camelcase('Hello George Washington') // helloGeorgeWashington
```

#### `lowercase`(text: [String][]): [String][]

A safe alternative to String.prototype.toLowerCase(). This can be called non string inputs and they
will be converted to string prior to lower casing.

**Arguments**

* `str` [String][] - The string value to convert

**returns** [String][] A lowercased version of the input string

##### Example

```javascript
const {string} = require('@logdna/stdlib')
string.lowercase('Hello George Washington') // hello george washington
string.lowercase({}) // [object object]
string.lowercase(null) // ''
string.lowercase(undefined) // ''
```

#### `uppercase`(text: [String][]): [String][]

A safe alternative to String.prototype.toUpperCase(). This can be called non string inputs and they
will be converted to string prior to upper casing.

**Arguments**

* `str` [String][] - The string value to convert

**returns** [String][] A uppercased version of the input string

##### Example

```javascript
const {string} = require('@logdna/stdlib')
string.uppercase('Hello George Washington') // HELLO GEORGE WASHINGTON
string.uppercase({}) // [OBJECT OBJECT]
string.uppercase(null) // ''
string.uppercase(undefined) // ''
```
#### `slugify`(text: [String][] [, separator: [String][] = '-']): [String][]

Converts a string to a url friendly format by replacing spaces and symbols
with a known value and converting to lower case

**Arguments**

* `str` [String][] - The string value to convert
* (optional) `separator` ([String][]) - Delimiter character
  * default: `'-'`

**returns** [String][] A slugified version of the input string

##### Example

```javascript

const {string} = require('@logdna/stdlib')
string.slugify('A fake Sentence') // a-fake-sentence
string.slugify('A fake Sentence', '::') // a::fake::sentence
```

#### `typecast`(text: [String][]): [Object][]

Best effort to cast a string to its native couter part where possible.
Supported casts are booleans, numbers, null and undefined

**Arguments**

* `value` - The value to cast

**returns** The native representation of the string input. If the value could not be cast,
it will be returned as it was passed.

##### Example

```javascript
const {string} = require('@logdna/stdlib')
string.typecast('null') // null
string.typecast('true') // true
string.typecast('10.01') // 10.01
string.typecast({}) // {}
```

### `typeOf`(element: `any`): [String][]

A more accurate version of the javascript built-in function typeof

**Arguments**

* `input` - The input object to introspect

**returns** [String][] A normalized string representation of the input object

##### Example

```javascript
const {typeOf} = require('@logdna/stdlib')
typeOf(new Date()) // 'date'
typeOf(/\w+/) // regexp
typeOf(() => {}) // function
typeOf(new Set()) // set
```

### `Callable`: [Class][]

A class object whose instances are derived from [Function][] and can be called.
When exteded, a [Symbol][] function defined by `Symbol.for('call')` will be executed
with any arguments that were passed

##### Example

```javascript
const {Callable} = require('@logdna/stdlib')
const __call__ = Symbol.for('call')
class Hello extends Callable {
  constructor(opts) {
    this.yell = !!opts.yell
  }
  [__call__](name) {
    const output = `Hello, ${name}`
    console.log(this.yell ? `${output.toUpperCase()}!` : output)
  }
}

const screamAt = new Hello({yell: true})

screamAt('bill') // HELLO, BILL!
```

## Authors

* [**Eric Satterwhite**](mailto:eric.satterwhite@logdna.com) &lt;eric.satterwhite@logdna.com&gt;


[Set]: https://mdn.io/set
[Boolean]: https://mdn.io/boolean
[Array]: https://mdn.io/array
[String]: https://mdn.io/string
[Number]: https://mdn.io/number
[Object]: https://mdn.io/object
[Function]: https://mdn.io/function
[Class]: https://mdn.io/class
[Symbol]: https://mdn.io/symbol
[Generator]: https://mdn.io/generator
[itertools]: https://docs.python.org/3.7/library/itertools.html

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/darinspivey"><img src="https://avatars.githubusercontent.com/u/1874788?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Darin Spivey</b></sub></a><br /><a href="https://github.com/logdna/stdlib-node/commits?author=darinspivey" title="Code">💻</a> <a href="https://github.com/logdna/stdlib-node/pulls?q=is%3Apr+reviewed-by%3Adarinspivey" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/logdna/stdlib-node/commits?author=darinspivey" title="Tests">⚠️</a> <a href="https://github.com/logdna/stdlib-node/commits?author=darinspivey" title="Documentation">📖</a></td>
    <td align="center"><a href="http://codedependant.net/"><img src="https://avatars.githubusercontent.com/u/148561?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Eric Satterwhite</b></sub></a><br /><a href="https://github.com/logdna/stdlib-node/commits?author=esatterwhite" title="Code">💻</a> <a href="https://github.com/logdna/stdlib-node/pulls?q=is%3Apr+reviewed-by%3Aesatterwhite" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/logdna/stdlib-node/commits?author=esatterwhite" title="Tests">⚠️</a> <a href="https://github.com/logdna/stdlib-node/commits?author=esatterwhite" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/mdeltito"><img src="https://avatars.githubusercontent.com/u/69520?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mike Del Tito</b></sub></a><br /><a href="https://github.com/logdna/stdlib-node/commits?author=mdeltito" title="Code">💻</a> <a href="https://github.com/logdna/stdlib-node/pulls?q=is%3Apr+reviewed-by%3Amdeltito" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/logdna/stdlib-node/commits?author=mdeltito" title="Tests">⚠️</a> <a href="https://github.com/logdna/stdlib-node/commits?author=mdeltito" title="Documentation">📖</a></td>
    <td align="center"><a href="http://linkedin.com/in/samirmusali"><img src="https://avatars.githubusercontent.com/u/34287490?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Samir Musali</b></sub></a><br /><a href="https://github.com/logdna/stdlib-node/commits?author=smusali" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/weizou19"><img src="https://avatars.githubusercontent.com/u/56563346?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Wei Zou</b></sub></a><br /><a href="https://github.com/logdna/stdlib-node/commits?author=weizou19" title="Code">💻</a> <a href="https://github.com/logdna/stdlib-node/pulls?q=is%3Apr+reviewed-by%3Aweizou19" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/logdna/stdlib-node/commits?author=weizou19" title="Tests">⚠️</a> <a href="https://github.com/logdna/stdlib-node/commits?author=weizou19" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
