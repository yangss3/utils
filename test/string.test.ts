import { splitStrByLen, splitStrByLenReverse, ensurePrefix, reverseStr, upperFirst, lowerFirst, capitalize, camelCase, kebabCase, snakeCase } from '../src'

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

test('reverseStr', () => {
  expect(reverseStr('1234567')).toBe('7654321')
  expect(reverseStr('')).toBe('')
  expect(reverseStr(' 123')).toBe('321 ')
})

test('upperFirst', () => {
  expect(upperFirst('')).toBe('')
  expect(upperFirst('fooBar')).toBe('FooBar')
})

test('lowerFirst', () => {
  expect(lowerFirst('')).toBe('')
  expect(lowerFirst('FooBar')).toBe('fooBar')
})

test('capitalize', () => {
  expect(capitalize('')).toBe('')
  expect(capitalize('fooBar')).toBe('Foobar')
})

test('camelCase', () => {
  expect(camelCase('foo')).toBe('foo')
  expect(camelCase('FOO')).toBe('foo')
  expect(camelCase('Foo')).toBe('foo')
  expect(camelCase('-foo-')).toBe('foo')
  expect(camelCase('foo bar')).toBe('fooBar')
  expect(camelCase('foo-bar')).toBe('fooBar')
  expect(camelCase('foo_bar')).toBe('fooBar')
  expect(camelCase('FooBar')).toBe('fooBar')
  expect(camelCase(' foo  bar ')).toBe('fooBar')
  expect(camelCase('-foo-bar--')).toBe('fooBar')
  expect(camelCase('_foo--bar_')).toBe('fooBar')
  expect(camelCase('_foo-_bar_')).toBe('fooBar')
  expect(camelCase('__foo__bar')).toBe('fooBar')
  expect(camelCase('_FOO_bar')).toBe('fooBar')
  expect(camelCase('_FooBar--baz')).toBe('fooBarBaz')
  expect(camelCase('FOO_BAR')).toBe('fooBar')
  expect(camelCase('FOO BAR')).toBe('fooBar')
  expect(camelCase('__foo--BAR--baz__')).toBe('fooBarBaz')
})

test('kebabCase', () => {
  expect(kebabCase('foo bar')).toBe('foo-bar')
  expect(kebabCase('fooBar')).toBe('foo-bar')
  expect(kebabCase('foo_bar')).toBe('foo-bar')
  expect(kebabCase('FooBar')).toBe('foo-bar')
  expect(kebabCase(' foo  bar ')).toBe('foo-bar')
  expect(kebabCase('-foo-bar--')).toBe('foo-bar')
  expect(kebabCase('_foo--bar_')).toBe('foo-bar')
  expect(kebabCase('_foo bar_')).toBe('foo-bar')
  expect(kebabCase('__fooBar--')).toBe('foo-bar')
  expect(kebabCase('_FOO_bar')).toBe('foo-bar')
  expect(kebabCase('FOO_BAR')).toBe('foo-bar')
  expect(kebabCase('FOO BAR')).toBe('foo-bar')
  expect(kebabCase('__foo--BAR--baz__')).toBe('foo-bar-baz')
})

test('snakeCase', () => {
  expect(snakeCase('foo bar')).toBe('foo_bar')
  expect(snakeCase('fooBar')).toBe('foo_bar')
  expect(snakeCase('foo_bar')).toBe('foo_bar')
  expect(snakeCase('foo-bar')).toBe('foo_bar')
  expect(snakeCase('FooBar')).toBe('foo_bar')
  expect(snakeCase(' foo  bar ')).toBe('foo_bar')
  expect(snakeCase('-foo-bar--')).toBe('foo_bar')
  expect(snakeCase('_foo--bar_')).toBe('foo_bar')
  expect(snakeCase('_foo bar_')).toBe('foo_bar')
  expect(snakeCase('__fooBar--')).toBe('foo_bar')
  expect(snakeCase('_FOO_bar')).toBe('foo_bar')
  expect(snakeCase('FOO_BAR')).toBe('foo_bar')
  expect(snakeCase('FOO BAR')).toBe('foo_bar')
  expect(snakeCase('__foo--BAR--baz__')).toBe('foo_bar_baz')
})
