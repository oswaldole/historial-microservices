/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Windows 11 Color Palette
        win11: {
          // Primary Blues
          blue: {
            DEFAULT: '#0067C0',
            light: '#4CC2FF',
            dark: '#005A9E',
            accent: '#0078D4',
          },
          // Neutral Grays
          gray: {
            bg: '#F3F3F3',
            light: '#FAFAFA',
            card: '#FFFFFF',
            border: '#E5E5E5',
            text: '#1B1B1B',
            muted: '#605E5C',
          },
          // Accent Colors
          green: '#10893E',
          red: '#D13438',
          orange: '#CA5010',
          purple: '#8764B8',
          teal: '#00B7C3',
        }
      },
      boxShadow: {
        'win11': '0 2px 6px rgba(0, 0, 0, 0.08)',
        'win11-lg': '0 8px 16px rgba(0, 0, 0, 0.12)',
        'win11-hover': '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'win11': '8px',
        'win11-sm': '4px',
      }
    },
  },
  plugins: [],
}
