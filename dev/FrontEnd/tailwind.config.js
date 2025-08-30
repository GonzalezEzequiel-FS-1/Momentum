export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        // Orientation
        portrait: { raw: '(orientation: portrait)' },
        landscape: { raw: '(orientation: landscape)' },

        // Mobile-only orientation helpers
        'mobile-portrait': { raw: '(max-width: 767px) and (orientation: portrait)' },
        'mobile-landscape': { raw: '(max-width: 767px) and (orientation: landscape)' },
      },
      colors: {
        primary: "#743AB1",
        primaryDark: "#33215A",
        primaryInactive: "#31194B",
        surface: "#140152",
        onSurface: "#D9D9D9",
        muted: "#9A9A9A",
        overlay: "rgba(116, 58, 177, 0.4)",
      },
    },
  },
  plugins: [],
};
