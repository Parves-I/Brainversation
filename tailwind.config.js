/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        // Brand palette (Serene Editorial)
        brand: {
          DEFAULT: '#6D28D9',
          600: '#7C3AED',
          dark: '#2A0E54',
        },
        rose: {
          DEFAULT: '#A8326A',
          dark: '#872655',
        },
        soft: '#C4B5FD',
        cool: '#A78BFA',
        cream: '#FCFAFF',
        wash: '#F2ECFC',
        ink: '#2B2540',
        muted: '#5C5570',
        // shadcn-compatible semantic tokens (so 21st.dev components work)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        display: ['Lora', 'Georgia', 'serif'],
        sans: ['Raleway', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 6px)',
        sm: 'calc(var(--radius) - 10px)',
        '2xl': '24px',
        '3xl': '34px',
      },
      backgroundImage: {
        'grad-brand': 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 55%, #2A0E54 100%)',
        'grad-soft': 'linear-gradient(160deg, #F7F2FF 0%, #EFE7FD 100%)',
      },
      boxShadow: {
        soft: '0 18px 50px -24px rgba(76, 29, 149, 0.35)',
        card: '0 10px 30px -14px rgba(76, 29, 149, 0.22)',
        glow: '0 12px 34px -10px rgba(109, 40, 217, 0.55)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        blob: {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(30px,-20px) scale(1.05)' },
          '66%': { transform: 'translate(-20px,30px) scale(0.95)' },
          '100%': { transform: 'translate(15px,15px) scale(1.02)' },
        },
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        blob: 'blob 14s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
