import { useState, useEffect, useCallback, useRef } from 'react';
import PasswordDisplay from './components/PasswordDisplay';
import LengthSlider from './components/LengthSlider';
import OptionToggles from './components/OptionToggles';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { generatePassword, buildCharPool, getStrength } from './utils/passwordUtils';
import './App.css';

const DEFAULT_OPTIONS = {
  upper: true,
  lower: true,
  numbers: true,
  symbols: true,
  excludeAmbiguous: false,
};

function App() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [password, setPassword] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  const toastTimer = useRef(null);

  const regenerate = useCallback((len, opts) => {
    const pool = buildCharPool(opts);
    if (!pool) {
      setPassword('Select at least one character type');
      return;
    }
    setPassword(generatePassword(len, opts));
  }, []);

  useEffect(() => {
    regenerate(length, options);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fireToast = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setShowToast(false), 1600);
  };

  const handleLengthChange = (newLength) => {
    setLength(newLength);
    regenerate(newLength, options);
  };

  const handleToggle = (key) => {
    const activeCount = Object.entries(options).filter(
      ([k, v]) => v && k !== 'excludeAmbiguous'
    ).length;

    if (key !== 'excludeAmbiguous' && options[key] && activeCount <= 1) {
      fireToast('At least one character type required');
      return;
    }

    const newOptions = { ...options, [key]: !options[key] };
    setOptions(newOptions);
    regenerate(length, newOptions);
  };

  const handleRefresh = () => regenerate(length, options);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      fireToast('Copied to clipboard');
    } catch {
      fireToast('Copy failed — select and copy manually');
    }
  };

  const pool = buildCharPool(options);
  const strength = getStrength(length, pool.length);

  return (
    <div className="app">
      <div className="eyebrow">local &amp; offline — nothing leaves your browser</div>
      <h1>Keysmith</h1>
      <p className="subtitle">
        Generate strong, random passwords in your browser. No server, no tracking, no logs.
      </p>

      <PasswordDisplay
        password={password}
        strength={strength}
        onCopy={handleCopy}
        onRefresh={handleRefresh}
      />

      <div className="panel">
        <LengthSlider length={length} onChange={handleLengthChange} />
        <OptionToggles options={options} onToggle={handleToggle} />

        <button className="generate-btn" onClick={handleRefresh}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
          </svg>
          Generate new password
        </button>
      </div>

      <Footer />
      <Toast message={toastMsg} show={showToast} />
    </div>
  );
}

export default App;
