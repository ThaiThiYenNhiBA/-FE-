module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './app/globals.css', // Đảm bảo Tailwind biết theo dõi tệp globals.css
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
