/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: [
        "./node_modules/flowbite-react/**/*.js",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "orange-peel": "#FF9F1C",
                "pumpkin": "#FE7F2D",
                "light-cyan": "#CBF3F0",
                "tiffany-blue": "#2EC4B6",
                "mellow-apricot": "#F7B267",
            },
        },
    },
    darkMode: "class",

    plugins: [
        require("daisyui", "flowbite/plugin"),
        require('@tailwindcss/forms'),
    ],
};
