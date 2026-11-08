/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 950: '#080B12', 900: '#0C111B', 800: '#121929', 700: '#1B2436' },
        line: 'rgba(148, 170, 210, 0.12)',
        fg: { DEFAULT: '#E8EDF6', muted: '#8E9AB0', dim: '#5D6880' },
        electric: { DEFAULT: '#3B82F6', bright: '#5B9BFF', deep: '#1D4ED8' },
        cyan: { soft: '#5EEAD4', glow: '#22D3EE' },
        violet: { soft: '#8B7CF6' },
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Geist', '"Geist Fallback"', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
      maxWidth: { site: '1200px' },
    },
  },
  plugins: [],
};
