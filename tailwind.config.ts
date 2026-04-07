import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0f2740',
        steel: '#1d3e61',
        accentGreen: '#1ca16a',
        accentOrange: '#e47f1f'
      },
      boxShadow: {
        panel: '0 14px 34px rgba(8, 26, 45, 0.12)'
      },
      backgroundImage: {
        'industrial-grid':
          'linear-gradient(to right, rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.09) 1px, transparent 1px)'
      },
      backgroundSize: {
        grid: '40px 40px'
      }
    }
  },
  plugins: []
};

export default config;
