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


// export function deepMerge () {

// }

// export function deepClone () {

// }
