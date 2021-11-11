import { splitStrByLen, splitStrByLenReverse, ensurePrefix } from '../src'

test('splitStrByLen', () => {
  expect(splitStrByLen('abcdefg')).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
  expect(splitStrByLen('abcdefg', 0)).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
  expect(splitStrByLen('abcdefg', 3)).toEqual(['abc', 'def', 'g'])
  expect(splitStrByLen('abcdefg', 7)).toEqual(['abcdefg'])
  expect(splitStrByLen('abcdefg', 10)).toEqual(['abcdefg'])
})

test('splitStrByLenReverse', () => {
  expect(splitStrByLenReverse('abcdefg')).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
  expect(splitStrByLenReverse('abcdefg', 0)).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
  expect(splitStrByLenReverse('abcdefg', 3)).toEqual(['a', 'bcd', 'efg'])
  expect(splitStrByLenReverse('abcdefg', 7)).toEqual(['abcdefg'])
  expect(splitStrByLenReverse('abcdefg', 10)).toEqual(['abcdefg'])
})


test('ensurePrefix', () => {
  expect(ensurePrefix('__', 'hello')).toBe('__hello')
  expect(ensurePrefix('__', '__hello')).toBe('__hello')
})
