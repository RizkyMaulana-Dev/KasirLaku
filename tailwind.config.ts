/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        page: '#FFFFFF',
        'surface-alt': '#F6F7F9',
        ink: '#111827',
        muted: '#4B5563',
        primary: '#0F766E',
        'primary-hover': '#115E59',
        'primary-soft': '#E6F4F2',
        line: '#E5E7EB',
        'control-line': '#6B7280',
        'disabled-bg': '#F3F4F6',
        'warn-bg': '#FEF3C7',
        'warn-ink': '#78350F',
        danger: '#B91C1C',
        'toast-bg': '#111827',
        'toast-accent': '#5EEAD4',
      },
      borderRadius: {
        'r-md': '12px',
        'r-lg': '14px',
        'r-xl': '16px',
        'r-2xl': '24px',
        'r-pill': '999px',
      },
    },
  },
  plugins: [],
}
