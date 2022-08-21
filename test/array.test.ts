import { toArray, at, unique } from '../src'

test('toArray', () => {
  expect(toArray(undefined)).toEqual([])
  expect(toArray(null)).toEqual([])
  expect(toArray(1)).toEqual([1])
  expect(toArray({ a: 1 })).toEqual([{ a: 1 }])
  expect(toArray([1, 2])).toEqual([1, 2])
})

test('at', () => {
  expect(at([1, 2, 3, 4, 5], 0)).toBe(1)
  expect(at([1, 2, 3, 4, 5], 3)).toBe(4)
  expect(at([1, 2, 3, 4, 5], 5)).toBe(undefined)
  expect(at([1, 2, 3, 4, 5], -1)).toBe(5)
  expect(at([1, 2, 3, 4, 5], -3)).toBe(3)
  expect(at([1, 2, 3, 4, 5], -5)).toBe(1)
  expect(at([1, 2, 3, 4, 5], -10)).toBe(undefined)
})


test('unique', () => {
  expect(unique([1, 2, 2, 3, 3])).toEqual([1, 2, 3])
})
