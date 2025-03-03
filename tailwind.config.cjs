/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",  // This will include all JS/TS/JSX/TSX files in src
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('tailwind-scrollbar'),
    ],
}