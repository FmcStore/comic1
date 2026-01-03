import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: { 900: '#0b0b0f', 800: '#121216', 700: '#18181b' },
        amber: { 500: '#f59e0b' }
      },
    },
  },
  plugins: [],
};
export default config;
