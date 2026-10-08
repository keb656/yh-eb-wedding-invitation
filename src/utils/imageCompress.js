/**
 * 업로드 전 이미지 압축 (긴 변을 maxDimension 이하로 줄이고 JPEG로 변환)
 * 디코딩이 불가능한 형식(예: 일부 HEIC)이거나 압축 결과가 더 크면 원본을 그대로 반환합니다.
 */
export async function compressImage(file, { maxDimension = 2000, quality = 0.82 } = {}) {
  if (!file.type.startsWith('image/') || file.type === 'image/gif') return file

  try {
    const source = await loadImage(file)
    const width = source.naturalWidth || source.width
    const height = source.naturalHeight || source.height
    const scale = Math.min(1, maxDimension / Math.max(width, height))

    const canvas = document.createElement('canvas')
    canvas.width = Math.round(width * scale)
    canvas.height = Math.round(height * scale)
    canvas.getContext('2d').drawImage(source, 0, 0, canvas.width, canvas.height)
    source.close?.()

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality))
    if (!blob || (scale === 1 && blob.size >= file.size)) return file

    return new File([blob], file.name.replace(/\.[^.]+$/, '') + '.jpg', { type: 'image/jpeg' })
  } catch {
    return file
  }
}

async function loadImage(file) {
  if ('createImageBitmap' in window) {
    try {
      // EXIF 회전 정보 반영
      return await createImageBitmap(file, { imageOrientation: 'from-image' })
    } catch {
      // 아래 <img> 방식으로 재시도
    }
  }

  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('이미지를 읽을 수 없습니다.'))
    }
    img.src = url
  })
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).split(',')[1])
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}
