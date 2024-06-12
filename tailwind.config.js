/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "rgb(var(--color-black))",
        gray: {
          "50": "#f7f8f8",
          "100": "#edeef1",
          "200": "#d8dbdf",
          "300": "#b6bac3",
          "400": "#8e95a2",
          "500": "#6b7280",
          "600": "#5b616e",
          "700": "#4a4e5a",
          "800": "#40444c",
          "900": "#383a42",
          "950": "#25272c",
        },
        background: "rgb(var(--color-background) / <alpha-value>)",
        semibackground: "rgb(var(--color-semibackground) / <alpha-value>)",
        midground: "rgb(var(--color-midground) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
    },
  },
  plugins: [],
}