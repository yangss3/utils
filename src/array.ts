import type { MaybeArray } from './types'

/**
 *
 * transform a non-array value to array, ensure the return value is an array
 * @example
 * toArray(1) // [1]
 * toArray({ a: 1 }) // [{ a: 1 }]
 * toArray([1]) // [1]
 */
export function toArray<T>(val: MaybeArray<T>) {
  return !val
    ? []
    : Array.isArray(val)
      ? val
      : [val]
}

/**
 * @param arr an array
 * @param index index, can be negative
 * @returns return the element at index
 * @example
 * at([1, 2, 3], 0) // 1
 * at([1, 2, 3], -1) // 3
 * at([1, 2, 3], 5) // undefined
 * at([1, 2, 3], -4) // undefined
*/
export function at<T>(arr: readonly T[], index: number): T | undefined {
  const len = arr.length
  if (index >= 0 && index < len) {
    return arr[index]
  } else if (index >= len || index < -len) {
    return undefined
  } else {
    index = len + index
    if (index >= 0) {
      return arr[index]
    } else {
      return arr[0]
    }
  }
}

/**
 * return an array with unique elements
 * @example
 * unique([1, 2, 2, 3, 3]) // [1, 2, 3]
 */
export function unique<T>(arr: readonly T[]): T[] {
  return Array.from(new Set(arr))
}
