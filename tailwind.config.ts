import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#4E8BD1",
        busy: "#F6A609",
        offline: "#C94B4B",
        neutral: "#98A2B3",
      },
      boxShadow: {
        card: "0 20px 50px rgba(15,23,42,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;

