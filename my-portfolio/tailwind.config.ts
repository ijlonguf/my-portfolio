import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lightblue: '#ADD8E6',
        mediumslateblue: '#6A5ACD',
        mediumpurple: '#9370DB',
        indigo: '#4B0082',
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
        spinBorder: 'spinBorder 2s linear infinite', // Custom spin for the border
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        spinBorder: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backgroundImage: {
        shimmer: 'linear-gradient(110deg, #000103 45%, #1e2631 55%, #000103)',
        border: 'conic-gradient(from 90deg at 50% 50%, #E2CBFF 0%, #393BB2 50%, #E2CBFF 100%)',
      },
    },
  },
  plugins: [],
};

export default config;