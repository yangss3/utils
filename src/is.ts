/* eslint-disable @typescript-eslint/ban-types */
const toString = (val: unknown) => Object.prototype.toString.call(val)

export const isString = (val: unknown): val is string => typeof val === 'string'
export const isNumber = (val: unknown): val is number => typeof val === 'number'
export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'
export const isArray = <T extends any[]>(val: unknown): val is T => Array.isArray(val)
export const isObject = (val: unknown): val is Record<string, any> => toString(val) === '[object Object]'
export const isFunction = <T extends Function>(val: unknown): val is T => typeof val === 'function'
export const isSymbol = (val: unknown): val is Symbol => typeof val === 'symbol'
export const isUndef = (val: unknown): val is undefined => typeof val === 'undefined'
export const isNull = (val: unknown): val is null => toString(val) === '[object Null]'
export const isPromise = <T>(val: unknown): val is Promise<T> => val instanceof Promise
export const isRegExp = (val: unknown): val is RegExp => val instanceof RegExp
export const isSet = <T>(val: unknown): val is Set<T> => val instanceof Set
export const isMap = <K, V>(val: unknown): val is Map<K, V> => val instanceof Map
export const isPrimitive = (val: unknown): boolean => isNull(val) || (typeof val !== 'object' && !isFunction(val))
export const isSameType = (val: unknown, other: unknown) => toString(val) === toString(other)

export const isFalsy = (val: unknown): boolean => {
  return val === false
    || val === undefined
    || val === null
    || val === ''
    || val === 0
    || Number.isNaN(val)
}

export const isBrowser = typeof window !== 'undefined'
export const isMobile = () => 'ontouchstart' in document.documentElement

export const isPhoneNumber = (val: string) => /^[1]\d{10}$/.test(val)
export const isEmail = (val: string) => /^[^\s@]+@[^\s@]+$/.test(val)

export function isEqual(val: any, other: any): boolean {
  // if they are strictly equal, then return true directly
  if (val === other || Object.is(val, other))
    return true
  // if they have different type, then return false directly
  if (!isSameType(val, other))
    return false
  else {
    // in here, they must have same type
    if (isRegExp(val)) {
      return val.toString() === other.toString()
    } else if (isArray(val) || isObject(val)) {
      const valKeys = Object.keys(val)
      const otherKeys = Object.keys(other)
      if (valKeys.length !== otherKeys.length) {
        return false
      } else {
        let res = true
        for (let i = 0; i < valKeys.length; i++) {
          const key = valKeys[i] as any
          if (!isEqual(val[key], other[key])) {
            res = false
            break
          }
        }
        return res
      }
    } else {
      return false
    }
  }
}
