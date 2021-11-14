/* eslint-disable @typescript-eslint/ban-types */
const toString = (val: unknown) => Object.prototype.toString.call(val)

export const isBrowser = typeof window !== 'undefined'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isNumber = (val: unknown): val is number => typeof val === 'number'
export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'
export const isArray = <T extends any[]>(val: unknown): val is T => Array.isArray(val)
export const isObject = (val: unknown): val is Record<string, any> => toString(val) === '[object Object]'
export const isFunction = <T extends Function>(val: unknown): val is T => typeof val === 'function'
export const isSymbol = (val: unknown): val is Symbol => typeof val === 'symbol'
export const isUndef = (val: unknown): val is undefined => typeof val === 'undefined'
export const isNull = (val: unknown): val is null => toString(val) === '[object Null]'
export const isPrimitive = (val: unknown): boolean => !isArray(val) && !isObject(val) && !isFunction(val)
export const isSameBaseType = (val1: unknown, val2: unknown) => {
  if (isArray(val1) && isArray(val2)) return true
  else if (isObject(val1) && isObject(val2)) return true
  else if (isFunction(val1) && isFunction(val2)) return true
  else if (typeof val1 === typeof val2 && isPrimitive(val1) && isPrimitive(val2)) return true
  else return false
}

export const isPhoneNumber = (val: string) => /^[1]\d{10}$/.test(val)
export const isEmail = (val: string) => /^[^\s@]+@[^\s@]+$/.test(val)

