import { splitStrByLenReverse } from './string'
import { isNumber } from './is'
const { isInteger, parseFloat } = Number

export function decimalCount (val: number) {
  return isInteger(val) ? 0 : val.toString().split('').reverse().indexOf('.')
}

export function toNumber (val: string | number) {
  return isNumber(val) ? val : parseFloat(val)
}

export function add (a: number, b: number) {
  a = toNumber(a)
  b = toNumber(b)
  if (isInteger(a) && isInteger(b)) {
    return a + b
  } else {
    const scale = 10 ** Math.max(decimalCount(a), decimalCount(b))
    return (a * scale + b * scale) / scale
  }
}

export function minus (a: number, b: number) { return add(a, -b) }

export function multiply (a: number, b: number) {
  a = toNumber(a)
  b = toNumber(b)
  if (isInteger(a) && isInteger(b)) {
    return a * b
  } else {
    const n1 = decimalCount(a)
    const n2 = decimalCount(b)
    a = a * (10 ** n1)
    b = b * (10 ** n2)
    return (a * b) / (10 ** (n1 + n2))
  }
}

export function divide (a: number, b: number) { return toNumber(a) / toNumber(b) }

/**
 * 将数值转换为千分位表示法
 *
 * @param val 数值，可以是字符串
 * @returns 数字的千分位表示
 * @example
 * const numStr = toThousandSeparated(12345.6) // '12,345.6'
 */
export function toThousandSeparated (val: number | string) {
  const num = toNumber(val)
  const symbol = num < 0 ? '-' : ''
  const numStr = num.toString()
  const startIdx = symbol ? 1 : 0
  const endIdx = isInteger(num) ? numStr.length : -decimalCount(num) - 1
  const unIntNumStr = numStr.slice(startIdx, endIdx)
  const decimalStr = numStr.slice(endIdx)
  const unIntLen = unIntNumStr.length
  const str = unIntLen <= 3 ? unIntNumStr : splitStrByLenReverse(unIntNumStr, 3).join(',')
  return `${symbol}${str}${decimalStr}`
}


