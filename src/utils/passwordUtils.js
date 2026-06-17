export const CHARSETS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

const AMBIGUOUS = /[Il1O0]/g;

function secureRandomInt(max) {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % max;
}

export function buildCharPool(options) {
  let pool = '';
  if (options.upper) pool += CHARSETS.upper;
  if (options.lower) pool += CHARSETS.lower;
  if (options.numbers) pool += CHARSETS.numbers;
  if (options.symbols) pool += CHARSETS.symbols;
  if (options.excludeAmbiguous) pool = pool.replace(AMBIGUOUS, '');
  return pool;
}

export function generatePassword(length, options) {
  const pool = buildCharPool(options);
  if (!pool) return '';

  let result = '';
  for (let i = 0; i < length; i++) {
    result += pool[secureRandomInt(pool.length)];
  }
  return result;
}

export function getStrength(length, poolSize) {
  const entropy = length * Math.log2(poolSize || 1);

  if (entropy < 40) return { pct: 25, color: 'var(--danger)', label: 'Weak' };
  if (entropy < 65) return { pct: 55, color: 'var(--warn)', label: 'Okay' };
  if (entropy < 90) return { pct: 80, color: 'var(--accent-dim)', label: 'Strong' };
  return { pct: 100, color: 'var(--accent)', label: 'Excellent' };
}
