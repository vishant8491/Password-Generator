export default function PasswordDisplay({ password, strength, onCopy, onRefresh }) {
  return (
    <div className="display">
      <div className="output-row">
        <input
          type="text"
          readOnly
          value={password}
          aria-label="Generated password"
          id="output"
        />
        <button className="icon-btn" onClick={onCopy} title="Copy to clipboard" aria-label="Copy password">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        </button>
        <button className="icon-btn" onClick={onRefresh} title="Generate new password" aria-label="Generate new password">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 2v6h-6" />
            <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
            <path d="M3 22v-6h6" />
            <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          </svg>
        </button>
      </div>
      <div className="strength-row">
        <div className="strength-bar">
          <div
            className="strength-fill"
            style={{ width: `${strength.pct}%`, background: strength.color }}
          />
        </div>
        <div className="strength-label">{strength.label}</div>
      </div>
    </div>
  );
}
