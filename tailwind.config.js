/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.tsx",
        "./resources/**/*.vue",
    ],
    theme: {
            extend: {
                height: {
                    112: "28rem",
                    128: "32rem",
                    144: "36rem"
                },
                width: {
                    112: "28rem",
                    128: "32rem"
                },
        },
    },
    plugins: [],
}

