const TOGGLE_CONFIG = [
  { key: 'upper', label: 'Uppercase (A–Z)' },
  { key: 'lower', label: 'Lowercase (a–z)' },
  { key: 'numbers', label: 'Numbers (0–9)' },
  { key: 'symbols', label: 'Symbols (!@#$)' },
  { key: 'excludeAmbiguous', label: 'Exclude look-alikes' },
];

export default function OptionToggles({ options, onToggle }) {
  return (
    <div className="toggles">
      {TOGGLE_CONFIG.map(({ key, label }) => (
        <div
          key={key}
          className={`toggle ${options[key] ? 'on' : ''}`}
          onClick={() => onToggle(key)}
        >
          <span>{label}</span>
          <div className="switch" />
        </div>
      ))}
    </div>
  );
}
