import { MaybeArray } from './types'

export function toArray<T> (val: MaybeArray<T>) {
  return !val
    ? []
    : Array.isArray(val)
      ? val
      : [val]
}
