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
        'b8s-navy': '#1a237e',
        'b8s-orange': '#e65100',
        'b8s-orange-light': '#f57c00',
      },
      fontFamily: {
        'heading': ['Fredoka', 'sans-serif'],
        'body': ['Open Sans', 'sans-serif'],
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
      },
      animation: {
        'brick-drop': 'brick-drop 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) both',
      },
    },
  },
  plugins: [
    require('flyonui'),
    require('flyonui/plugin'),
  ],
}

export default config
