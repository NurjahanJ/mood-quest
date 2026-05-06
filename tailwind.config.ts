import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        night: {
          950: '#1a1424',
          900: '#241a32',
          850: '#2a1f3a',
          800: '#2f2240',
          700: '#3d2c52',
          600: '#4f3a6b',
        },
        cream: {
          50: '#fef6e8',
          100: '#fdf0d8',
          200: '#f5e0bc',
          300: '#d8c4a3',
          400: '#b8a080',
        },
        amber: {
          warm: '#f5a35a',
          glow: '#f5a35a33',
        },
        rose: {
          warm: '#e87a8c',
          glow: '#e87a8c33',
        },
        peach: {
          warm: '#ffb88c',
          glow: '#ffb88c33',
        },
        sage: {
          warm: '#9bbf94',
          glow: '#9bbf9433',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-night': 'linear-gradient(180deg, #241a32 0%, #1a1424 100%)',
        'glow-amber': 'radial-gradient(ellipse at 50% 0%, #f5a35a22 0%, transparent 60%)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.8' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}
export default config
