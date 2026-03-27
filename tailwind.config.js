/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ost: {
          sand: '#eeece1',
          straw: '#cbbc9d',
          coal: '#231f20',
          apple: '#7f072a',
          fog: '#f7f7f7',
        },
      },
      // display/body = Syne; accent = Anton — see docs/DESIGN-DNA.md + design-visual-language cursor rule
      fontFamily: {
        display: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        body: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-anton)', 'system-ui', 'sans-serif'],
        'ost-display': ['owners-xnarrow', 'sans-serif'],
        'ost-body': ['Moderngothic', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        reading: '65ch',
      },
      spacing: {
        '30': '7.5rem',
        'ost-4': '1rem',
        'ost-8': '2rem',
        'ost-16': '4rem',
      },
      borderRadius: {
        pill: '100rem',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        modalIn: {
          from: { opacity: '0', transform: 'scale(0.97)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 200ms ease-out',
        'modal-in': 'modalIn 250ms ease-out',
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.prose-editorial p + p': { marginTop: '1.5rem' },
        '.prose-editorial p': {
          color: 'rgb(38 38 38)',
          lineHeight: '1.75',
        },
        '.prose-editorial strong': {
          color: 'rgb(10 10 10)',
          fontWeight: '500',
        },
      });
    },
  ],
};
