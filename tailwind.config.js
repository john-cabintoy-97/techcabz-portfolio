/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "var(--color-base)",
        surface: "var(--color-surface)",
        "surface-2": "var(--color-surface-2)",
        border: "var(--color-border)",
        accent: "var(--color-accent)",
        "accent-hover": "var(--color-accent-hover)",
        "accent-muted": "var(--color-accent-muted)",
        foreground: "var(--color-foreground)",
        muted: "var(--color-muted)",
        "muted-2": "var(--color-muted-2)",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "dot-grid": "radial-gradient(circle, #2D2B55 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      backgroundSize: {
        "dot-sm": "24px 24px",
        "dot-md": "32px 32px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-up": "slideUp 0.6s ease forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        "gift-float": "gift-float 3.6s ease-in-out infinite",
        "gift-float2": "gift-float2 4.2s ease-in-out infinite",
        "gift-pop": "gift-pop 0.6s ease forwards",
        "gift-fall": "gift-fall linear forwards",
        "gift-wiggle": "gift-wiggle 5s ease-in-out infinite",
        "gift-bob": "gift-bob 1.6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },

        "gift-float": {
          "0%, 100%": { transform: "translateY(0) rotate(-3deg)" },
          "50%": { transform: "translateY(-18px) rotate(3deg)" },
        },
        "gift-float2": {
          "0%, 100%": { transform: "translateY(0) rotate(3deg)" },
          "50%": { transform: "translateY(-24px) rotate(-3deg)" },
        },
        "gift-pop": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "70%": { transform: "scale(1.1)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "gift-fall": {
          "0%": { transform: "translateY(-20px) rotate(0deg)", opacity: "1" },
          "100%": {
            transform: "translateY(340px) rotate(360deg)",
            opacity: "0",
          },
        },
        "gift-wiggle": {
          "0%, 100%": { transform: "rotate(-1.5deg)" },
          "50%": { transform: "rotate(1.5deg)" },
        },
        "gift-bob": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
