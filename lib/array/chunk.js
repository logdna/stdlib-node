'use strict'

module.exports = chunk

function chunk(arr, size) {
  if (!Array.isArray(arr)) {
    const error = new TypeError('first argument must be an array')
    error.meta = {
      arr
    , type: typeof arr
    }
    throw error
  }

  if (!Number.isInteger(size)) {
    const error = new TypeError('second argument must be an integer')
    error.meta = {
      size
    , type: typeof size
    }
    throw error
  }

  if (size <= 0) {
    const error = new RangeError('size must be >= 1')
    error.meta = {
      size
    }
    throw error
  }

  const out = []
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size))
  }
  return out
}

/**
 * Splits an array into arrays of a given `size`, and returns a new array.
 * @param {Array} arr The subject array
 * @param {Integer} size Positive integer of chunk size to generate from the subject array
 * @returns {Array} A new array of chunks
 * @example
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 **/

