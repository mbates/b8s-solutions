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
    },
  },
  plugins: [
    require('flyonui'),
    require('flyonui/plugin'),
  ],
}

export default config
