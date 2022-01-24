/* eslint-disable prefer-regex-literals */
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
  isSameType,
  isPromise,
  isFalsy,
  isRegExp,
  isSet,
  isMap,
  isEqual
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
  expect(isObject(/a/)).toBe(false)
  expect(isObject(new Set())).toBe(false)
  expect(isObject(new Map())).toBe(false)
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
  expect(isPrimitive(/a/)).toBe(false)
  expect(isPrimitive(new Set())).toBe(false)
  expect(isPrimitive(new Map())).toBe(false)
})

test('isSameType', () => {
  expect(isSameType(null, null)).toBe(true)
  expect(isSameType(undefined, undefined)).toBe(true)
  expect(isSameType(1, 0.5)).toBe(true)
  expect(isSameType('a', 'b')).toBe(true)
  expect(isSameType(true, false)).toBe(true)
  expect(isSameType(Symbol('a'), Symbol('b'))).toBe(true)
  expect(isSameType({}, { a: 1 })).toBe(true)
  expect(isSameType([], [1, 2])).toBe(true)
  expect(isSameType(/a/, new RegExp('a'))).toBe(true)
  expect(isSameType(new Set([1]), new Set(['a']))).toBe(true)
  expect(isSameType(() => {}, function () {})).toBe(true)
  expect(isSameType(null, undefined)).toBe(false)
  expect(isSameType(null, 0)).toBe(false)
  expect(isSameType(null, {})).toBe(false)
  expect(isSameType(1, '1')).toBe(false)
  expect(isSameType(1, true)).toBe(false)
  expect(isSameType('1', true)).toBe(false)
  expect(isSameType('1', Symbol('1'))).toBe(false)
  expect(isSameType(Symbol('a'), {})).toBe(false)
  expect(isSameType({}, [])).toBe(false)
  expect(isSameType({}, /a/)).toBe(false)
  expect(isSameType({}, new Set())).toBe(false)
  expect(isSameType({}, new Map())).toBe(false)
  expect(isSameType({}, () => {})).toBe(false)
  expect(isSameType([], () => {})).toBe(false)
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

test('isRegExp', () => {
  expect(isRegExp(/a/)).toBe(true)
  expect(isRegExp(new RegExp('a'))).toBe(true)
})


test('isSet', () => {
  expect(isSet(new Set())).toBe(true)
  expect(isSet(new Map())).toBe(false)
  expect(isSet([])).toBe(false)
})

test('isMap', () => {
  expect(isMap(new Map())).toBe(true)
  expect(isMap(new Set())).toBe(false)
  expect(isMap({})).toBe(false)
})

test('isEqual', () => {
  expect(isEqual(1, 1)).toBe(true)
  expect(isEqual('a', 'a')).toBe(true)
  expect(isEqual(true, true)).toBe(true)
  expect(isEqual(Number.NaN, 0 / 0)).toBe(true)
  expect(isEqual(undefined, undefined)).toBe(true)
  expect(isEqual(null, null)).toBe(true)
  expect(isEqual([], [])).toBe(true)
  expect(isEqual([null], [null])).toBe(true)
  expect(isEqual({}, {})).toBe(true)
  expect(isEqual(/a/, /a/)).toBe(true)
  const a = { a: 1 }
  const aa = a
  expect(isEqual(a, aa)).toBe(true)
  expect(isEqual(a, { a: 1 })).toBe(true)
  expect(isEqual({ a: 1, b: 2, c: 3 }, { c: 3, b: 2, a: 1 })).toBe(true)
  const b = [1, 2]
  const bb = b
  expect(isEqual(b, bb)).toBe(true)
  expect(isEqual(b, b.slice())).toBe(true)
  expect(isEqual(
    [
      1,
      'a',
      {
        c: { d: 1 },
        e: [
          1,
          { f: [1, true] }
        ]
      }
    ],
    [
      1,
      'a',
      {
        c: { d: 1 },
        e: [
          1,
          { f: [1, true] }
        ]
      }
    ]
  )).toBe(true)
  expect(isEqual(
    [
      1,
      'a',
      {
        c: { d: 1 },
        e: [
          1,
          { f: [1, true] }
        ],
        g: [1, 2, 3]
      }
    ],
    [
      1,
      'a',
      {
        c: { d: 1 },
        g: [1, 2, 3],
        e: [
          1,
          { f: [1, true] }
        ]
      }
    ]
  )).toBe(true)

  expect(isEqual(1, '1')).toBe(false)
  expect(isEqual('a', 'b')).toBe(false)
  expect(isEqual(true, false)).toBe(false)
  expect(isEqual(Number.NaN, false)).toBe(false)
  expect(isEqual(undefined, null)).toBe(false)
  expect(isEqual(null, false)).toBe(false)
  expect(isEqual([], [1])).toBe(false)
  expect(isEqual([null], [undefined])).toBe(false)
  expect(isEqual({}, [])).toBe(false)
  expect(isEqual(/a/, /^a/)).toBe(false)

  expect(isEqual({ a: 1 }, { a: true })).toBe(false)
  expect(isEqual({ a: 1 }, { b: 1 })).toBe(false)
  expect(isEqual([1], [2])).toBe(false)
  expect(isEqual([1, 2, 3], [2, 1, 3])).toBe(false)
  expect(isEqual(
    [
      1,
      'a',
      {
        c: { d: 1 },
        e: [
          1,
          { f: [1, true] }
        ]
      }
    ],
    [
      1,
      'a',
      {
        c: { d: 1 },
        e: [
          1,
          { f: [1, false] }
        ]
      }
    ]
  )).toBe(false)
  expect(isEqual(
    [
      1,
      'a',
      {
        c: { d: 1 },
        e: [
          1,
          { f: [1, true] }
        ]
      }
    ],
    [
      1,
      'a',
      {
        c: { d: 1 },
        e: [
          1,
          { f: [1, false] }
        ],
        g: true
      }
    ]
  )).toBe(false)
  expect(isEqual(
    [
      1,
      'a',
      {
        c: { d: 2 },
        e: [
          1,
          { f: [1, true] }
        ]
      }
    ],
    [
      1,
      'a',
      {
        c: { d: 1 },
        e: [
          1,
          { f: [1, false] }
        ],
        g: true
      }
    ]
  )).toBe(false)
})
