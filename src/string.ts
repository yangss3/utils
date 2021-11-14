export function ensurePrefix (prefix: string, str: string) {
  if (!str.startsWith(prefix)) {
    return prefix + str
  } else {
    return str
  }
}

/**
 * 使用指定长度将字符串分割为数组
 * @param str 要分割的字符串
 * @param len 分割长度, 默认为 1
 * @returns string[]
 * @example
 * const strArr = splitStrByLen('abcdefg', 3) // ['abc', 'def', 'g']
 */
export function splitStrByLen (str: string, len = 1): string[] {
  if (len <= 1) {
    return str.split('')
  } else {
    const strLen = str.length
    if (strLen <= len) {
      return [str]
    } else {
      return [str.slice(0, len), ...splitStrByLen(str.slice(len), len)]
    }
  }
}

/**
 * 使用指定长度将字符串分割为数组，从右往左分割
 * @param str 要分割的字符串
 * @param len 分割长度, 默认为 1
 * @returns string[]
 * @example
 * const strArr = splitStrByLenReverse('abcdefg', 3) // ['a', 'bcd', 'efg']
 */
export function splitStrByLenReverse (str: string, len = 1): string[] {
  if (len <= 1) {
    return str.split('')
  } else {
    const strLen = str.length
    if (strLen <= len) {
      return [str]
    } else {
      return [...splitStrByLenReverse(str.slice(0, -len), len), str.slice(-len)]
    }
  }
}

export function reverseStr (str: string) {
  return str.split('').reverse().join('')
}

export function upperFirst (str: string) {
  return str === '' ? str : `${str[0].toUpperCase()}${str.slice(1)}`
}

export function lowerFirst (str: string) {
  return str === '' ? str : `${str[0].toLowerCase()}${str.slice(1)}`
}

export function capitalize (str: string) {
  return str === '' ? str : `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`
}


// export function camelCase(str: string): string {
//   // fooBar
// }
// export function kebabCase(str: string): string {
//   // foo-bar
// }
// export function snakeCase(str: string): string {
//   // foo_bar
// }
// export function camelCase(str: string): string {

// }
