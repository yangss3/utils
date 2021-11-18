import { unique } from './array'
import { isPrimitive, isArray, isUndef, isFunction, isSameBaseType } from './is'
import { random } from './number'

export function throttle<T extends (...args: any[]) => any> (f: T, ms: number) {
  let isCoolDown = false
  let savedArgs: any[] | null = null
  let savedThis: any = null

  const wrapper = function (this: any, ...args: any[]) {
    if (isCoolDown) {
      savedArgs = args
      savedThis = this
      return
    }
    f.apply(this, args)
    isCoolDown = true
    setTimeout(function () {
      isCoolDown = false
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs)
        savedArgs = savedThis = null
      }
    }, ms)
  } as T

  return wrapper
}

export function debounce<T extends (...args: any[]) => any> (f: T, ms: number) {
  let timeoutId: any
  let lastExecTimestamp: number
  let isBegin = true

  const wrapper = function (this: any, ...args: any[]) {
    const exec = () => {
      lastExecTimestamp = Date.now()
      timeoutId = setTimeout(() => {
        f.apply(this, args)
      }, ms)
    }
    if (isBegin) {
      isBegin = false
    } else if (Date.now() - lastExecTimestamp < ms) {
      clearTimeout(timeoutId)
    }
    exec()
  } as T

  return wrapper
}

export function deepClone<T> (val: T): T {
  if (isPrimitive(val) || isFunction(val)) {
    return val
  } if (isArray(val)) {
    return val.map(v => deepClone(v)) as unknown as T
  } else {
    return Object.keys(val).reduce((p, c) => {
      p[c as keyof T] = deepClone(val[c as keyof T])
      return p
    }, {} as T)
  }
}

export function deepMerge<Dest, Src> (dest: Dest, src: Src): Dest & Src {
  if (isPrimitive(src) || isFunction(src) || !isSameBaseType(dest, src)) {
    return deepClone(src) as Dest & Src
  } else {
    const destKeys = Object.keys(dest)
    const srcKeys = Object.keys(src)
    const allKeys = unique([...destKeys, ...srcKeys])
    const res = isArray(src) ? [] : {} as any
    return allKeys.reduce((p, c) => {
      const k = c as keyof (Dest | Src)
      if (isUndef(src[c as keyof Src])) {
        p[k] = deepClone(dest[k])
      } else {
        p[k] = deepMerge(dest[k], src[k])
      }
      return p
    }, res)
  }
}

export function uniqueId (prefix?: string) {
  const now = Date.now()
  const rand = random(9 ** 13, 10 ** 13)
  const uid = (now + rand).toString(16)
  return prefix ? prefix + uid : uid
}
