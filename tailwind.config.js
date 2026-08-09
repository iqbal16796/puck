/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/blocks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/configs/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        "primary-glow": "hsl(var(--primary-glow))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Semantic Theme Tokens
        crust: "hsl(var(--crust))",
        dough: "hsl(var(--dough))",
        ember: "hsl(var(--ember))",
        cream: "hsl(var(--cream))",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        signature: ["var(--font-signature)", "cursive"],
      },
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
        "3xl": "calc(var(--radius) + 12px)",
        "4xl": "calc(var(--radius) + 16px)",
      },
      animation: {
        drift: "drift 18s ease-in-out infinite",
        shimmer: "shimmer-sweep 6s linear infinite",
        rise: "rise 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        marquee: "marquee-x 32s linear infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
        grid: "grid-pan 12s linear infinite",
        ring: "ring-spin 1s linear infinite",
        "fade-in": "fade-in-soft 0.3s ease-out",
        "scale-in": "scale-in-soft 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        sheen: "sheen 1.4s infinite",
      },
      keyframes: {
        sheen: {
          "100%": { transform: "translateX(200%) skewX(-12deg)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "33%": { transform: "translate3d(6%, -8%, 0) scale(1.15)" },
          "66%": { transform: "translate3d(-7%, 5%, 0) scale(0.92)" },
        },
        "shimmer-sweep": {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        rise: {
          from: { opacity: "0", transform: "translateY(28px) scale(0.985)", filter: "blur(6px)" },
          to: { opacity: "1", transform: "none", filter: "blur(0)" },
        },
        "marquee-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.15", transform: "scale(0.8)" },
          "50%": { opacity: "0.9", transform: "scale(1.3)" },
        },
        "grid-pan": {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "60px 60px" },
        },
        "ring-spin": {
          to: { transform: "rotate(360deg)" },
        },
        "fade-in-soft": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in-soft": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

module.exports = config;
