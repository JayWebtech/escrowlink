/** @type {import('tailwindcss').Config} */
export default {
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
        primary: "#96EA63",
        secondary: "#A8FE3B"
      },
      fontFamily: {
        'sans': ['var(--font-geist-sans)', 'sans-serif'],
        'mono': ['var(--font-geist-mono)', 'monospace'],
        'bricolage': ['var(--font-bricolage-grotesque)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
