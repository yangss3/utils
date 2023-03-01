import type { Fn } from './types'
import { debounce as _debounce } from './func'
import { isBrowser } from './is'

/**
 * 文件转 base64
 * @param file 文件的二进制Blob对象
 */
export function fileToBase64(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
  })
}

/**
 * 文件下载
 * @param file 文件流或base64
 * @param fileName 文件名
 * @param fileType 文件类型
 */
export function downloadFile(
  file: Blob | string,
  fileName: string,
  fileType?: string
) {
  if (!isBrowser)
    return
  let url: string
  if (typeof file === 'string') {
    url = file
  } else {
    const data = new Blob([file], { type: fileType })
    url = URL.createObjectURL(data)
  }

  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  if (typeof file !== 'string') {
    URL.revokeObjectURL(url)
  }
}

/**
 * 触发浏览器resize事件
 */
export function triggerWindowResize() {
  if (!isBrowser)
    return
  window.dispatchEvent(new Event('resize'))
}

/**
 * 注册窗口 resize 事件
 * @param callback 回调函数
 * @param debounce 是否去抖，默认 true
 * @param ms 去抖时间间隔，默认 300
 * @returns `() => void` 移除监听器
 * @example
 * const unlisten = onWindowResize(() => {
 *  console.log('resize')
 * }, true, 500)
 *
 */
export function onWindowResize(callback: Fn, debounce = true, ms = 300) {
  callback = debounce ? _debounce(callback, ms) : callback
  const listener = () => callback()
  window.addEventListener('resize', listener)
  return () => window.removeEventListener('resize', listener)
}


/**
 * 获取给定的文本宽度, 使用 dom 测量
 * @param text 文本
 * @param style 样式
 * @returns number
 * @example
 * getTextWidth('hello world', { fontSize: '14px', fontFamily: 'sans-serif' })
 */
export function getTextWidth(text: string, style: CSSStyleDeclaration) {
  if (!isBrowser) {
    console.warn('getTextWidthByDom can only be used in browser environment')
    return 0
  }

  const dom = document.createElement('span')
  dom.innerText = text
  Object.assign(dom.style, style)
  document.body.appendChild(dom)
  const width = dom.offsetWidth
  document.body.removeChild(dom)
  return width
}


interface GetTextWidthByCanvas {
  (text: string, style: string | CSSStyleDeclaration): number;
  canvas?: HTMLCanvasElement;
}

/**
 * 获取给定的文本宽度, 使用 canvas 测量
 * @param text 文本
 * @param style 样式
 * @returns number
 * @example
 * getTextWidth('hello world', 'font-size: 14px; font-family: sans-serif;')
 */

export const getTextWidthByCanvas: GetTextWidthByCanvas = (text: string, style: string | CSSStyleDeclaration) => {
  if (!isBrowser) {
    console.warn('getTextWidth can only be used in browser environment')
    return 0
  }

  const canvas = getTextWidthByCanvas.canvas || (getTextWidthByCanvas.canvas = document.createElement('canvas'))
  const ctx = canvas.getContext('2d')!
  ctx.font = typeof style === 'string'
    ? style
    : [
      style.fontStyle,
      style.fontVariant,
      style.fontStretch,
      style.fontWeight,
      style.fontSize,
      style.fontFamily
    ].filter(Boolean).join(' ')

  return ctx.measureText(text).width
}
