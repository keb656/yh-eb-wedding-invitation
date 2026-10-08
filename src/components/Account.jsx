import { accounts, sectionIndex } from '../data/wedding'
import { useCopy } from '../hooks/useCopy'
import SectionHeader from './SectionHeader'

export default function Account() {
  const { copiedKey, message, copy } = useCopy()

  return (
    <section id="account" className="section" tabIndex={-1} aria-labelledby="account-title">
      <SectionHeader
        index={sectionIndex('account')}
        title="ACCOUNT"
        id="account-title"
        subtitle="참석이 어려우신 분들을 위해 계좌번호를 안내드립니다."
      />

      {accounts.map((group) => (
        <div className="info-group" key={group.side}>
          <h3 className="info-group__title">
            {group.side} · {group.title}
          </h3>
          <ul className="account-list">
            {group.items.map((item) => {
              const key = `${group.side}-${item.role}`
              return (
                <li key={key} className="account">
                  <div className="account__who">
                    <span className="account__role">{item.role}</span>
                    <strong>{item.name}</strong>
                  </div>
                  <div className="account__number">
                    <span>
                      {item.bank} {item.number}
                    </span>
                    <button
                      type="button"
                      className="line-button line-button--small"
                      onClick={() => copy(key, `${item.bank} ${item.number}`, `${item.name}님 계좌번호가 복사되었습니다`)}
                      aria-label={`${item.role} ${item.name} 계좌번호 복사`}
                    >
                      {copiedKey === key ? 'COPIED' : 'COPY'}
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      ))}

      <p className={`toast${message ? ' is-visible' : ''}`} role="status" aria-live="polite">
        {message}
      </p>
    </section>
  )
}
