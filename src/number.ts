import { splitStrByLenReverse } from './string'
import { isNumber, isUndef, isBoolean } from './is'

const { isInteger, parseFloat } = Number
const { random: _random, floor } = Math

export function decimalCount(val: number) {
  return isInteger(val) ? 0 : val.toString().split('').reverse().indexOf('.')
}

export function toNumber(val: string | number) {
  return isNumber(val) ? val : parseFloat(val)
}

export function add(n1: number, ...args: number[]): number {
  n1 = toNumber(n1)
  if (args.length === 0) {
    return n1
  } else if (args.length === 1) {
    const n2 = toNumber(args[0])
    if (isInteger(n1) && isInteger(n2)) {
      return n1 + n2
    } else {
      const scale = 10 ** Math.max(decimalCount(n1), decimalCount(n2))
      return (n1 * scale + n2 * scale) / scale
    }
  } else {
    return add(add(n1, args[0]), ...args.slice(1))
  }
}

export function subtract(n1: number, ...args: number[]): number {
  return add(n1, ...args.map(n => -n))
}

export function multiply(n1: number, ...args: number[]): number {
  n1 = toNumber(n1)
  if (args.length === 0) {
    return n1
  } else if (args.length === 1) {
    let n2 = toNumber(args[0])
    if (isInteger(n1) && isInteger(n2)) {
      return n1 * n2
    } else {
      const c1 = decimalCount(n1)
      const c2 = decimalCount(n2)
      n1 = n1 * (10 ** c1)
      n2 = n2 * (10 ** c2)
      return (n1 * n2) / (10 ** (c1 + c2))
    }
  } else {
    return multiply(multiply(n1, args[0]), ...args.slice(1))
  }
}

export function divide(n1: number, ...args: number[]): number {
  n1 = toNumber(n1)
  if (args.length === 0) {
    return n1
  } else {
    return args.reduce((p, c) => p / toNumber(c), n1)
  }
}

/**
 * 将数值转换为千分位表示法
 *
 * @param val 数值，可以是字符串
 * @returns 数字的千分位表示
 * @example
 * toThousandSeparated(12345.6) // '12,345.6'
 * toThousandSeparated('12345.6') // '12,345.6'
 */
export function toThousandSeparated(val: number | string) {
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

/**
 * 在指定范围内生成一个随机数
 *
 * @example
 * random(10) // 生成 [0, 10) 内的一个整数
 * random(10.5) // 生成 [0, 10.5) 内的一个小数
 * random(10, true) // 生成 [0, 10) 内的一个小数
 * random(10, 20) // 生成 [10, 20) 内的一个整数
 * random(10, 20.5) // 生成 [10, 20.5) 内的一个小数
 * random(10, 20, true) // 生成 [10, 20) 内的一个小数
 */
export function random (upper: number): number
export function random (upper: number, floating: boolean): number
export function random (lower: number, upper: number): number
export function random (lower: number, upper: number, floating: boolean): number
export function random(...args: any[]) {
  const [p1, p2, p3] = args
  let r: number
  if (isUndef(p2) || isBoolean(p2)) {
    r = _random() * p1
    return isUndef(p2)
      ? isInteger(p1)
        ? floor(r)
        : r
      : p2 === true
        ? r
        : floor(r)
  } else {
    r = p1 + _random() * (p2 - p1)
    return isUndef(p3)
      ? isInteger(p1) && isInteger(p2)
        ? floor(r)
        : r
      : p3 === true
        ? r
        : floor(r)
  }
}

/**
 *
 * @param num Number or string of number
 * @param precision Number of digits after the decimal point, must be integer
 * @returns Returns a number in fixed-point notation.
 *
 * @example
 * toFixedNum(1.2345, 2) // 1.23
 * toFixedNum(-1.230, 3) // -1.23
 */
export function toFixedNum(num: number | string, precision: number) {
  const n = toNumber(num)
  return parseFloat(n.toFixed(precision))
}
