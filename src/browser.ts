/**
 * 文件转 base64
 * @param file 文件的二进制Blob对象
 */
export function fileToBase64 (file: Blob): Promise<string> {
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
export function downloadFile (
  file: Blob | string,
  fileName: string,
  fileType?: string
) {
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
export function triggerResize () {
  window.dispatchEvent(new Event('resize'))
}
