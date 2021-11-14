import {
  isBoolean,
  isNumber,
  isString,
  isObject,
  isFunction,
  isUndef,
  isNull,
  isSymbol,
  isPrimitive,
  isSameBaseType,
  isPromise,
  isFalsy
} from '../src'

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

test('isSymbol', () => {
  expect(isSymbol(1)).toBe(false)
  expect(isSymbol(Symbol('symbol'))).toBe(true)
})

test('isUndef', () => {
  expect(isUndef(undefined)).toBe(true)
  expect(isUndef(null)).toBe(false)
})

test('isNull', () => {
  expect(isNull(null)).toBe(true)
  expect(isNull(undefined)).toBe(false)
  expect(isNull({})).toBe(false)
})

test('isPrimitive', () => {
  expect(isPrimitive(null)).toBe(true)
  expect(isPrimitive(undefined)).toBe(true)
  expect(isPrimitive(1)).toBe(true)
  expect(isPrimitive('a')).toBe(true)
  expect(isPrimitive(true)).toBe(true)
  expect(isPrimitive(Symbol('a'))).toBe(true)
  expect(isPrimitive({})).toBe(false)
  expect(isPrimitive([])).toBe(false)
  expect(isPrimitive(() => {})).toBe(false)
})

test('isSameBaseType', () => {
  expect(isSameBaseType(null, null)).toBe(true)
  expect(isSameBaseType(undefined, undefined)).toBe(true)
  expect(isSameBaseType(1, 0.5)).toBe(true)
  expect(isSameBaseType('a', 'b')).toBe(true)
  expect(isSameBaseType(true, false)).toBe(true)
  expect(isSameBaseType(Symbol('a'), Symbol('b'))).toBe(true)
  expect(isSameBaseType({}, { a: 1 })).toBe(true)
  expect(isSameBaseType([], [1, 2])).toBe(true)
  expect(
    isSameBaseType(
      () => {},
      function () {}
    )
  ).toBe(true)

  expect(isSameBaseType(null, undefined)).toBe(false)
  expect(isSameBaseType(null, 0)).toBe(false)
  expect(isSameBaseType(null, {})).toBe(false)
  expect(isSameBaseType(1, '1')).toBe(false)
  expect(isSameBaseType(1, true)).toBe(false)
  expect(isSameBaseType('1', true)).toBe(false)
  expect(isSameBaseType('1', Symbol('1'))).toBe(false)
  expect(isSameBaseType(Symbol('a'), {})).toBe(false)
  expect(isSameBaseType({}, [])).toBe(false)
  expect(isSameBaseType([], () => {})).toBe(false)
  expect(isSameBaseType(() => {}, {})).toBe(false)
})

test('isPromise', () => {
  expect(isPromise(1)).toBe(false)
  expect(isPromise(Promise.resolve())).toBe(true)
  expect(isPromise(Promise.resolve(1))).toBe(true)
  expect(isPromise((async () => {})())).toBe(true)
})


test('isFalsy', () => {
  expect(isFalsy('')).toBe(true)
  expect(isFalsy(0)).toBe(true)
  expect(isFalsy(-0)).toBe(true)
  expect(isFalsy(Number('a'))).toBe(true)
  expect(isFalsy(NaN)).toBe(true)
  expect(isFalsy(false)).toBe(true)
  expect(isFalsy(undefined)).toBe(true)
  expect(isFalsy(null)).toBe(true)
  expect(isFalsy(' ')).toBe(false)
})
