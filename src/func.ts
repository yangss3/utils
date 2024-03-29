import { unique } from './array'
import { isPrimitive, isArray, isObject, isUndef, isFunction, isSameType } from './is'
import { random } from './number'

export function throttle<T extends(...args: any[]) => any> (f: T, ms: number) {
  let isCoolDown = false
  let savedArgs: any[] | null = null
  let savedThis: any = null

  const wrapper = function (this: any, ...args: any[]) {
    if (isCoolDown) {
      savedArgs = args
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      savedThis = this
      return
    }
    f.apply(this, args)
    isCoolDown = true
    setTimeout(function () {
      isCoolDown = false
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs)
        savedArgs = savedThis = null
      }
    }, ms)
  } as T

  return wrapper
}

export function debounce<T extends(...args: any[]) => any> (f: T, ms: number) {
  let timeoutId: any
  let lastExecTimestamp: number
  let isBegin = true

  const wrapper = function (this: any, ...args: any[]) {
    const exec = () => {
      lastExecTimestamp = Date.now()
      timeoutId = setTimeout(() => {
        f.apply(this, args)
      }, ms)
    }
    if (isBegin) {
      isBegin = false
    } else if (Date.now() - lastExecTimestamp < ms) {
      clearTimeout(timeoutId)
    }
    exec()
  } as T

  return wrapper
}


/**
 * return a deep copy of the given value
 * @example
 * const obj = {
 *  a: 1,
 *  b: {
 *   c: 2,
 *   d: [1, 2, 3]
 *  }
 * }
 * const copy = deepClone(obj)
 * expect(copy).toEqual(obj)
 * expect(copy).not.toBe(obj) // not same reference
 */
export function deepClone<T>(val: T, cache = new WeakMap<any, any>()): T {
  if (!isArray(val) && !isObject(val)) {
    return val
  } else {
    if (cache.get(val)) {
      return val
    } else {
      cache.set(val, true)
      const copy = isArray(val)
        ? val.map(v => deepClone(v, cache)) as unknown as T
        : Object.keys(val).reduce((p, c) => {
          p[c as keyof T] = deepClone(val[c as keyof T], cache)
          return p
        }, {} as T)
      return copy
    }
  }
}

/**
 *
 * @param dest destination object
 * @param src source object
 * @returns return a new object with the properties from src and dest
 * @example
 * const dest = { a: 1, b: { c: 2 } }
 * const src = { b: { d: 3 } }
 * const result = deepMerge(dest, src) // { a: 1, b: { c: 2, d: 3 } }
 */
export function deepMerge<Dest, Src>(dest: Dest, src: Src): Dest & Src {
  if (isPrimitive(src) || isFunction(src) || !isSameType(dest, src)) {
    return deepClone(src) as Dest & Src
  } else {
    const destKeys = Object.keys(dest)
    const srcKeys = Object.keys(src)
    const allKeys = unique([...destKeys, ...srcKeys])
    const res = isArray(src) ? [] : {} as any
    return allKeys.reduce((p, c) => {
      const k = c as keyof (Dest | Src)
      if (isUndef(src[c as keyof Src])) {
        p[k] = deepClone(dest[k])
      } else {
        p[k] = deepMerge(dest[k], src[k])
      }
      return p
    }, res)
  }
}

/**
 * @param prefix prefix for the id, optional
 * @returns return an unique id
 */
export function uniqueId(prefix?: string) {
  const now = Date.now()
  const rand = random(9 ** 13, 10 ** 13)
  const uid = (now + rand).toString(16)
  return prefix ? prefix + uid : uid
}
