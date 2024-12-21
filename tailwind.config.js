/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
      // --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
      // --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

      // --image-grayscale: 10%;
      // --image-opacity: 90%;

      colors: {
        /* Indigo */
        '--color-brand-50': '#eef2ff',
        '--color-brand-100': '#e0e7ff',
        '--color-brand-200': '#c7d2fe',
        '--color-brand-500': '#6366f1',
        '--color-brand-600': '#4f46e5',
        '--color-brand-700': '#4338ca',
        '--color-brand-800': '#3730a3',
        '--color-brand-900': '#312e81',

        /* Grey */
        '--color-grey-0': 'var(--color-grey-0)',
        '--color-grey-50': 'var(--color-grey-50)',
        '--color-grey-100': 'var(--color-grey-100)',
        '--color-grey-200': 'var(--color-grey-200)',
        '--color-grey-300': 'var(--color-grey-300)',
        '--color-grey-400': 'var(--color-grey-400)',
        '--color-grey-500': 'var(--color-grey-500)',
        '--color-grey-600': 'var(--color-grey-600)',
        '--color-grey-700': 'var(--color-grey-700)',
        '--color-grey-800': 'var(--color-grey-800)',
        '--color-grey-900': 'var(--color-grey-900)',

        '--color-blue-100': 'var(--color-blue-100)',
        '--color-blue-700': 'var(--color-blue-700)',
        '--color-green-100': 'var(--color-green-100)',
        '--color-green-700': 'var(--color-green-700)',
        '--color-yellow-100': 'var(--color-yellow-100)',
        '--color-yellow-700': 'var(--color-yellow-700)',
        '--color-silver-100': 'var(--color-silver-100)',
        '--color-silver-700': 'var(--color-silver-700)',
        '--color-indigo-100': 'var(--color-indigo-100)',
        '--color-indigo-700': 'var(--color-indigo-700)',

        '--color-red-100': 'var(--color-red-100)',
        '--color-red-700': 'var(--color-red-700)',
        '--color-red-800': 'var(--color-red-800)',

        '--backdrop-color': 'var(--backdrop-color)',

        '--shadow-sm': '0 1px 2px rgba(0, 0, 0, 0.04)',
        '--shadow-md': '0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06)',
        '--shadow-lg': '0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)',

        '--border-radius-tiny': '3px',
        '--border-radius-sm': '5px',
        '--border-radius-md': '7px',
        '--border-radius-lg': '9px',

        /* For dark mode */
        '--image-grayscale': '0',
        '--image-opacity': '100%',

      }
    },
  },
  plugins: [],
}

