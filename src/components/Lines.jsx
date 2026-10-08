/** 문자열 배열을 줄바꿈(<br />)으로 이어서 렌더링 */
export default function Lines({ lines }) {
  return lines.map((line, i) => (
    <span key={i}>
      {i > 0 && <br />}
      {line}
    </span>
  ))
}
