import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Status colors
    'bg-blue-100',
    'text-blue-800',
    'bg-yellow-100',
    'text-yellow-800',
    'bg-orange-100',
    'text-orange-800',
    'bg-green-100',
    'text-green-800',
    'bg-gray-100',
    'text-gray-800',
    // Priority colors
    'bg-red-100',
    'text-red-800',
    'bg-red-600',
    'text-white',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
