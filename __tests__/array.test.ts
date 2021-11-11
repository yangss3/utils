import { toArray } from '../src'

test('toArray', () => {
  expect(toArray(undefined)).toEqual([])
  expect(toArray(null)).toEqual([])
  expect(toArray(1)).toEqual([1])
  expect(toArray({ a: 1 })).toEqual([{ a: 1 }])
  expect(toArray([1, 2])).toEqual([1, 2])
})
