const cache = new Map()

/** 외부 스크립트를 한 번만 로드 */
export function loadScript(src) {
  if (!cache.has(src)) {
    cache.set(
      src,
      new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.async = true
        script.onload = () => resolve()
        script.onerror = () => {
          cache.delete(src)
          reject(new Error(`스크립트를 불러오지 못했습니다: ${src}`))
        }
        document.head.appendChild(script)
      }),
    )
  }
  return cache.get(src)
}
