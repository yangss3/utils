import { add, minus, multiply, divide, toNumber, decimalCount, toThousandSeparated } from '../src'

test('add', () => {
  expect(add(0.1)).toBe(0.1)
  expect(add(0.1, 0.2)).toBe(0.3)
  expect(add(0.1, 0.2, 0.3)).toBe(0.6)
  expect(add(0.1, 0.2, 0.3, 0.1)).toBe(0.7)
  expect(add(0.123, 10.324, -0.01)).toBe(10.437)
})

test('minus', () => {
  expect(minus(0.1)).toBe(0.1)
  expect(minus(0.3, 0.2)).toBe(0.1)
  expect(minus(0.3, 0.2, 0.1)).toBe(0)
  expect(minus(0.3, 0.2, -0.1)).toBe(0.2)
})

test('multiply', () => {
  expect(multiply(0.1)).toBe(0.1)
  expect(multiply(0.1, 0.1)).toBe(0.01)
  expect(multiply(0.1, 0.1, 0.1)).toBe(0.001)
  expect(multiply(0.1, 0.2, 0.3, 0.4)).toBe(0.0024)
  expect(multiply(12, 0.1)).toBe(1.2)
})

test('divide', () => {
  expect(divide(0.1, 0.2)).toBe(0.5)
  expect(divide(0.1, 0.1, 0.1)).toBe(10)
})

test('toNumber', () => {
  expect(toNumber(1.0)).toBe(1)
  expect(toNumber('1.01')).toBe(1.01)
})

test('decimalCount', () => {
  expect(decimalCount(0.123)).toBe(3)
  expect(decimalCount(12.1)).toBe(1)
  expect(decimalCount(-2.12)).toBe(2)
  expect(decimalCount(12)).toBe(0)
})

test('toThousandSeparated', () => {
  expect(toThousandSeparated(0.123)).toBe('0.123')
  expect(toThousandSeparated(123)).toBe('123')
  expect(toThousandSeparated(1234567)).toBe('1,234,567')
  expect(toThousandSeparated('-12345.67')).toBe('-12,345.67')
})

