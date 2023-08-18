/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "iphone-image": "url('/src/Images/iphone.png')",
      },
      colors: {
        "empty": "#eee",
      },
      fontFamily: {
        'body': ['Raleway', 'sans-serif']
      },
    },
  },
  plugins: [],
};
