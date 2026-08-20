/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#0A121F",
        panel: "#101B2D",
        raised: "#16243A",
        blueprint: "#2B4A66",
        primary: "#E8EEF5",
        muted: "#7E93AC",
        signal: "#FF8A3D",
        zone1: "#4C8DFF",
        zone2: "#3DD68C",
        zone3: "#F2C230",
        zone4: "#F2543D",
        zone5: "#29D4D4",
        zone6: "#E14FD4",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["IBM Plex Sans", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
