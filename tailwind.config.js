/** @type {import('tailwindcss').Config} */
// ── "Private Wealth" custom theme (built with theme-factory · not a stock preset) ──
// Quiet-luxury boutique wealth palette: money-green anchor, warm ivory grounds,
// champagne gold as the single luxury accent, deep-green charcoal ink.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        ivory: '#FBF8F1',
        cream: '#F5F0E6',
        parchment: '#EFE8D8',
        // Greens (the wealth anchor)
        emerald: {
          DEFAULT: '#14563B', // primary
          deep: '#0E3A28',    // CTA band / darkest
          800: '#123F2C',
          700: '#14563B',
          600: '#1C6A49',
          500: '#2A7D58',
        },
        sage: {
          DEFAULT: '#6BA98A',
          light: '#9BC5AC',
          soft: '#CFE1D5',
        },
        // Champagne gold — luxury accent only (dividers, underlines, eyebrows)
        gold: {
          DEFAULT: '#C6A253',
          light: '#D9BE7E',
          deep: '#A6863B',
        },
        // Ink
        ink: {
          DEFAULT: '#26362E', // deep green charcoal — body text, never pure black
          soft: '#4A5A50',
          muted: '#6E7B72',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Helvetica Neue', 'sans-serif'],
      },
      fontSize: {
        // one clean type scale used across all pages
        eyebrow: ['0.72rem', { lineHeight: '1', letterSpacing: '0.28em' }],
        body: ['1.0625rem', { lineHeight: '1.7' }], // 17px, generous
        lead: ['1.25rem', { lineHeight: '1.65' }],
      },
      letterSpacing: {
        eyebrow: '0.28em',
      },
      maxWidth: {
        content: '1200px',
        prose: '68ch',
      },
      boxShadow: {
        soft: '0 18px 50px -24px rgba(14, 58, 40, 0.28)',
        lift: '0 30px 70px -32px rgba(14, 58, 40, 0.38)',
        header: '0 10px 40px -22px rgba(14, 58, 40, 0.30)',
      },
      transitionTimingFunction: {
        lux: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
