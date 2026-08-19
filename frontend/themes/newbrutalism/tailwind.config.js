/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "surface-container": "#eeeeee",
        "primary": "#000000",
        "on-secondary": "#ffffff",
        "on-secondary-fixed": "#001355",
        "primary-fixed-dim": "#c6c6c6",
        "surface-container-low": "#f3f3f3",
        "outline": "#7e7576",
        "surface-variant": "#e2e2e2",
        "on-primary-fixed": "#1b1b1b",
        "on-surface": "#1b1b1b",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
        "on-background": "#1b1b1b",
        "on-secondary-fixed-variant": "#0036bc",
        "on-primary": "#ffffff",
        "surface-container-lowest": "#ffffff",
        "surface-bright": "#f9f9f9",
        "secondary-fixed-dim": "#b8c3ff",
        "inverse-surface": "#303030",
        "tertiary-container": "#1b1b1b",
        "inverse-primary": "#c6c6c6",
        "on-error": "#ffffff",
        "secondary": "#003fd8",
        "surface-tint": "#5e5e5e",
        "surface": "#f9f9f9",
        "surface-dim": "#dadada",
        "on-secondary-container": "#eaebff",
        "surface-container-high": "#e8e8e8",
        "on-tertiary-fixed": "#1b1b1b",
        "inverse-on-surface": "#f1f1f1",
        "secondary-fixed": "#dde1ff",
        "on-tertiary": "#ffffff",
        "tertiary-fixed-dim": "#c6c6c6",
        "on-tertiary-fixed-variant": "#474747",
        "surface-container-highest": "#e2e2e2",
        "tertiary-fixed": "#e2e2e2",
        "secondary-container": "#2558ff",
        "primary-container": "#1b1b1b",
        "background": "#f9f9f9",
        "error": "#ba1a1a",
        "on-tertiary-container": "#848484",
        "on-surface-variant": "#4c4546",
        "on-primary-container": "#848484",
        "tertiary": "#000000",
        "outline-variant": "#cfc4c5",
        "on-primary-fixed-variant": "#474747",
        "primary-fixed": "#e2e2e2"
      },
      borderRadius: {
        "DEFAULT": "0px",
        "lg": "0px",
        "xl": "0px",
        "full": "9999px"
      },
      spacing: {
        "margin-desktop": "64px",
        "margin-mobile": "24px",
        "border-width": "3px",
        "gutter": "24px",
        "unit": "8px",
        "shadow-offset": "6px"
      },
      fontFamily: {
        "headline-lg": ["Space Grotesk"],
        "body-lg": ["Hanken Grotesk"],
        "headline-md": ["Space Grotesk"],
        "body-md": ["Hanken Grotesk"],
        "headline-lg-mobile": ["Space Grotesk"],
        "display-lg": ["Space Grotesk"],
        "label-mono": ["JetBrains Mono"]
      },
      fontSize: {
        "headline-lg": ["64px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "body-lg": ["20px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "headline-md": ["32px", { "lineHeight": "1.2", "fontWeight": "600" }],
        "body-md": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "headline-lg-mobile": ["40px", { "lineHeight": "1.1", "fontWeight": "700" }],
        "display-lg": ["96px", { "lineHeight": "1.0", "letterSpacing": "-0.04em", "fontWeight": "700" }],
        "label-mono": ["14px", { "lineHeight": "1.0", "fontWeight": "500" }]
      },
      animation: {
        'marquee': 'marquee 15s linear infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
