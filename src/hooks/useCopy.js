import { useCallback, useEffect, useRef, useState } from 'react'
import { copyText } from '../utils/clipboard'

/** 복사 후 잠시 동안 어떤 항목이 복사되었는지(copiedKey) / 결과 메시지를 알려줍니다. */
export function useCopy(duration = 2000) {
  const [state, setState] = useState({ key: null, message: '' })
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = useCallback(
    async (key, text, successMessage = '복사되었습니다') => {
      const ok = await copyText(text)
      clearTimeout(timer.current)
      setState({ key: ok ? key : null, message: ok ? successMessage : '복사에 실패했습니다. 길게 눌러 직접 복사해주세요.' })
      timer.current = setTimeout(() => setState({ key: null, message: '' }), duration)
    },
    [duration],
  )

  return { copiedKey: state.key, message: state.message, copy }
}
