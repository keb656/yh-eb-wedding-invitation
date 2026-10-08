import { compressImage, fileToBase64 } from './imageCompress'

export const isEndpointConfigured = (endpoint) =>
  Boolean(endpoint) && !endpoint.includes('YOUR_DEPLOYMENT_ID')

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const safeName = (value) => value.replace(/[^\w.\-가-힣]/g, '_').slice(0, 60)

/**
 * 사진을 한 장씩 압축 → base64 → POST 합니다.
 * Google Apps Script는 CORS preflight를 지원하지 않으므로
 * Content-Type을 text/plain으로 보내 preflight를 피합니다.
 *
 * 요청 body (JSON): { filename, mimeType, data(base64), uploader, phone }
 * 응답 (JSON, 선택): { ok: true } / { ok: false, error }
 */
export async function uploadSnaps(files, { endpoint, uploader = '', phone = '', compress = {}, onProgress }) {
  const live = isEndpointConfigured(endpoint)
  const stamp = Date.now()

  for (let i = 0; i < files.length; i += 1) {
    const compressed = await compressImage(files[i], compress)
    const filename = `${stamp}_${String(i + 1).padStart(2, '0')}_${safeName(uploader || 'guest')}_${safeName(compressed.name)}`

    if (live) {
      const data = await fileToBase64(compressed)
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ filename, mimeType: compressed.type, data, uploader, phone }),
      })
      if (!response.ok) throw new Error(`업로드 실패 (${response.status})`)
      const result = await response.json().catch(() => ({}))
      if (result.ok === false) throw new Error(result.error || '업로드 실패')
    } else {
      // 데모 모드: 엔드포인트 미설정 시 전송 없이 진행 상태만 표시
      await wait(500)
    }

    onProgress?.(i + 1, files.length)
  }

  return { live }
}
