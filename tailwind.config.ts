import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flyonui/dist/js/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'bates-navy': '#1a237e',
        'bates-orange': '#e65100',
        'bates-orange-light': '#f57c00',
      },
      fontFamily: {
        'heading': ['Cinzel', 'serif'],
        'body': ['Philosopher', 'sans-serif'],
      },
      keyframes: {
        'brick-drop': {
          '0%': {
            transform: 'translateY(-100vh)',
            opacity: '1',
          },
          '1%': {
            opacity: '1',
          },
          '60%': {
            transform: 'translateY(0)',
          },
          '72%': {
            transform: 'translateY(-12px)',
          },
          '82%': {
            transform: 'translateY(0)',
          },
          '88%': {
            transform: 'translateY(-4px)',
          },
          '94%': {
            transform: 'translateY(0)',
          },
          '97%': {
            transform: 'translateY(-1px)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        'tool-shake': {
          '0%, 100%': {
            transform: 'rotate(0deg)',
          },
          '20%': {
            transform: 'rotate(-3deg)',
          },
          '40%': {
            transform: 'rotate(3deg)',
          },
          '60%': {
            transform: 'rotate(-2deg)',
          },
          '80%': {
            transform: 'rotate(2deg)',
          },
        },
      },
      animation: {
        'brick-drop': 'brick-drop 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'tool-shake': 'tool-shake 0.4s ease-in-out',
      },
    },
  },
  plugins: [
    require('flyonui'),
    require('flyonui/plugin'),
  ],
}

export default config
