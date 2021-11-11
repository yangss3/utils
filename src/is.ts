/* eslint-disable @typescript-eslint/ban-types */
const toString = (val: unknown) => Object.prototype.toString.call(val)

export const isString = (val: unknown): val is string => typeof val === 'string'
export const isNumber = (val: unknown): val is number => typeof val === 'number'
export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'
export const isObject = (val: unknown): val is Record<string, any> => toString(val) === '[object Object]'
export const isFunction = <T extends Function>(val: unknown): val is T => typeof val === 'function'
export const isBrowser = typeof window !== 'undefined'

export const isPhoneNumber = (val: string) => /^[1]\d{10}$/.test(val)
export const isEmail = (val: string) => /^[^\s@]+@[^\s@]+$/.test(val)
