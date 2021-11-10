import { isBoolean, isNumber, isString, isObject, isFunction } from '../src'

test('isString', () => {
  expect(isString('hello')).toBe(true)
  expect(isString(1)).toBe(false)
})
test('isNumber', () => {
  expect(isNumber(0.3)).toBe(true)
  expect(isNumber(-1)).toBe(true)
  expect(isNumber(-1)).toBe(true)
})
test('isBoolean', () => {
  expect(isBoolean(null)).toBe(false)
  expect(isBoolean(undefined)).toBe(false)
  expect(isBoolean(true)).toBe(true)
})
test('isObject', () => {
  expect(isObject('hello')).toBe(false)
  expect(isObject(null)).toBe(false)
  expect(isObject([])).toBe(false)
  expect(isObject({})).toBe(true)
  expect(isObject({ a: 1 })).toBe(true)
})
test('isFunction', () => {
  expect(isFunction(() => {})).toBe(true)
  expect(isFunction(function () {})).toBe(true)
})
