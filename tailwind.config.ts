import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", ".dark"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // HeyGen Brand Colors
        heygen: {
          teal: "#00C2B2",
          "teal-dark": "#009E90",
          "teal-light": "#33CEBC",
          purple: "#7C3AED",
          "purple-light": "#A78BFA",
          dark: "#0A0A0F",
          "dark-2": "#111118",
          "dark-3": "#1A1A24",
          "dark-4": "#22222F",
          "dark-5": "#2D2D3D",
          gray: "#6B7280",
          "gray-light": "#9CA3AF",
          white: "#F9FAFB",
          "white-dim": "#E5E7EB",
          green: "#10B981",
          red: "#EF4444",
          orange: "#F59E0B",
          blue: "#3B82F6",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "heygen-gradient": "linear-gradient(135deg, #00C2B2 0%, #7C3AED 100%)",
        "heygen-gradient-subtle": "linear-gradient(135deg, rgba(0,194,178,0.15) 0%, rgba(124,58,237,0.15) 100%)",
        "card-gradient": "linear-gradient(145deg, #1A1A24 0%, #22222F 100%)",
        "dark-gradient": "linear-gradient(180deg, #0A0A0F 0%, #111118 100%)",
      },
      boxShadow: {
        "heygen": "0 0 30px rgba(0, 194, 178, 0.15)",
        "heygen-sm": "0 0 15px rgba(0, 194, 178, 0.1)",
        "card": "0 4px 24px rgba(0, 0, 0, 0.4)",
        "card-hover": "0 8px 32px rgba(0, 194, 178, 0.2)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
