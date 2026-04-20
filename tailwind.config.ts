import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "green-dark": "#0d5c3a",
        "green-mid": "#1D9E75",
        "green-light": "#e8f5ee",
        "green-border": "#a8d5b8",
        amber: "#e8a000",
        "amber-light": "#fdf8e8",
        "amber-border": "#e8d580",
        "amber-dark": "#8a5a00",
        "red-crisis": "#8a2000",
        "red-light": "#fdf0ee",
        "red-border": "#f0b8ad",
      },
    },
  },
  plugins: [],
};
export default config;
