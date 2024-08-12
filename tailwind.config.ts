import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "monkey-brown": "#534f2a"
      },
      fontFamily: {
        "happy-monkey": ["Happy Monkey", "cursive"],
        "lilita-one": ["Lilita One", "cursive"]
      },
      rotate: {
        "13": "13deg"
      }
    }
  },
  plugins: []
};
export default config;
