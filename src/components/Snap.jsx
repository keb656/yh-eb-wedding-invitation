import { useEffect, useId, useRef, useState } from 'react'
import { SNAP_UPLOAD_ENDPOINT, snapConfig } from '../data/wedding'
import { isEndpointConfigured, uploadSnaps } from '../utils/snapUpload'
import SectionHeader from './SectionHeader'

let nextId = 0
const demoMode = !isEndpointConfigured(SNAP_UPLOAD_ENDPOINT)

export default function Snap() {
  const inputId = useId()
  const [items, setItems] = useState([]) // { id, file, url }
  const [uploader, setUploader] = useState('')
  const [status, setStatus] = useState('idle') // idle | uploading | done | error
  const [progress, setProgress] = useState({ done: 0, total: 0 })
  const [notice, setNotice] = useState('')

  // 미리보기 URL 정리
  const itemsRef = useRef(items)
  useEffect(() => {
    itemsRef.current = items
  }, [items])
  useEffect(() => () => itemsRef.current.forEach((item) => URL.revokeObjectURL(item.url)), [])

  const busy = status === 'uploading'

  const onSelect = (event) => {
    const picked = [...event.target.files].filter((file) => file.type.startsWith('image/'))
    event.target.value = '' // 같은 파일을 다시 선택할 수 있도록 초기화
    if (!picked.length) return

    const room = snapConfig.maxFiles - items.length
    const accepted = picked.slice(0, Math.max(room, 0))
    setNotice(picked.length > accepted.length ? `한 번에 최대 ${snapConfig.maxFiles}장까지 보낼 수 있습니다.` : '')
    setStatus('idle')
    setItems((prev) => [
      ...prev,
      ...accepted.map((file) => ({ id: (nextId += 1), file, url: URL.createObjectURL(file) })),
    ])
  }

  const remove = (id) => {
    setItems((prev) => {
      const target = prev.find((item) => item.id === id)
      if (target) URL.revokeObjectURL(target.url)
      return prev.filter((item) => item.id !== id)
    })
  }

  const clearAll = () => {
    items.forEach((item) => URL.revokeObjectURL(item.url))
    setItems([])
    setNotice('')
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!items.length || busy) return

    setStatus('uploading')
    setNotice('')
    setProgress({ done: 0, total: items.length })

    try {
      await uploadSnaps(
        items.map((item) => item.file),
        {
          endpoint: SNAP_UPLOAD_ENDPOINT,
          uploader: uploader.trim(),
          compress: { maxDimension: snapConfig.maxDimension, quality: snapConfig.quality },
          onProgress: (done, total) => setProgress({ done, total }),
        },
      )
      items.forEach((item) => URL.revokeObjectURL(item.url))
      setItems([])
      setStatus('done')
    } catch (error) {
      setStatus('error')
      setNotice(error instanceof Error ? error.message : '업로드 중 문제가 발생했습니다.')
    }
  }

  return (
    <section id="snap" className="section" tabIndex={-1} aria-labelledby="snap-title">
      <SectionHeader
        index="06"
        title="WEDDING SNAP"
        id="snap-title"
        subtitle={
          <>
            결혼식에서 담아주신 소중한 순간을
            <br />
            저희에게 보내주세요.
          </>
        }
      />

      <form className="snap" onSubmit={onSubmit}>
        <input
          id={inputId}
          className="visually-hidden"
          type="file"
          accept="image/*"
          multiple
          onChange={onSelect}
          disabled={busy}
        />
        <label htmlFor={inputId} className={`line-button line-button--block${busy ? ' is-disabled' : ''}`}>
          사진 선택
        </label>

        {items.length > 0 && (
          <>
            <div className="snap__meta">
              <span>{items.length}장 선택됨</span>
              <button type="button" className="text-button" onClick={clearAll} disabled={busy}>
                전체 삭제
              </button>
            </div>

            <ul className="snap__grid">
              {items.map((item, i) => (
                <li key={item.id}>
                  <img src={item.url} alt={`선택한 사진 ${i + 1}`} />
                  <button
                    type="button"
                    className="snap__remove"
                    onClick={() => remove(item.id)}
                    disabled={busy}
                    aria-label={`선택한 사진 ${i + 1} 삭제`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        <label className="field">
          <span>보내는 분 (선택)</span>
          <input
            type="text"
            value={uploader}
            onChange={(e) => setUploader(e.target.value)}
            placeholder="성함을 남겨주시면 감사히 기억하겠습니다"
            maxLength={30}
            disabled={busy}
          />
        </label>

        <button type="submit" className="line-button line-button--solid line-button--block" disabled={!items.length || busy}>
          {busy ? 'UPLOADING…' : 'UPLOAD'}
        </button>

        <div className="snap__status" role="status" aria-live="polite">
          {busy && (
            <>
              <progress value={progress.done} max={progress.total} />
              <span>
                {progress.done} / {progress.total} 업로드 중
              </span>
            </>
          )}
          {status === 'done' && (
            <p className="snap__done">
              소중한 사진이 전달되었습니다. 감사합니다.
              {demoMode && <small> (데모 모드 — 실제 전송은 되지 않았습니다)</small>}
            </p>
          )}
          {notice && <p className={status === 'error' ? 'snap__error' : 'note'}>{notice}</p>}
        </div>

        <p className="note">
          업로드 전 사진은 자동으로 용량이 줄어듭니다. 한 번에 최대 {snapConfig.maxFiles}장까지 선택할 수 있습니다.
        </p>
      </form>
    </section>
  )
}
