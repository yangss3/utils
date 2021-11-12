import { MaybeArray } from './types'

export function toArray<T> (val: MaybeArray<T>) {
  return !val
    ? []
    : Array.isArray(val)
      ? val
      : [val]
}

export function at<T> (arr: readonly T[], index: number): T {
  const len = arr.length
  if (index >= 0 && index < len) {
    return arr[index]
  } else if (index >= len) {
    return arr[len - 1]
  } else {
    index = len + index
    if (index >= 0) {
      return arr[index]
    } else {
      return arr[0]
    }
  }
}

export function unique<T> (arr: readonly T[]): T[] {
  return Array.from(new Set(arr))
}
