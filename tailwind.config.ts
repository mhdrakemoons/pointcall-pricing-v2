import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0b0c0f',
        surface: '#0f1115',
        muted: '#1a1d24',
        accent: {
          DEFAULT: '#2563eb',
          soft: '#3b82f6',
        },
        text: {
          DEFAULT: '#e5e7eb',
          muted: '#a1a1aa',
          subtle: '#9ca3af',
          strong: '#f3f4f6',
        },
        ring: '#60a5fa',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.35)',
        card: '0 6px 20px rgba(0,0,0,0.25)',
        outline: '0 0 0 4px rgba(37, 99, 235, 0.35)',
      },
      borderRadius: {
        xl: '1rem',
      },
      fontSize: {
        '2xs': ['0.7rem', { lineHeight: '1rem' }],
      },
    },
  },
  plugins: [],
}
export default config


