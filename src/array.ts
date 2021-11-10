import { MaybeArray } from './types'

export const toArray = <T>(val?: MaybeArray<T>) => {
  return !val
    ? []
    : Array.isArray(val)
      ? val
      : [val]
}
