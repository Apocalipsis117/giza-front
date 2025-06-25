/** @type {import('tailwindcss').Config} */
module.exports= {
    content: ["./src/**/*.{html,ts,json}"],
    theme: {
        extend: {
            colors: {
                default: {
                    50: '#f3faff',
                    100: '#dbf0ff',
                    200: '#b8e3ff',
                    300: '#8dd1ff',
                    400: '#46b5ff',
                    500: '#0099ff',
                    600: '#0084dc',
                    700: '#0071bc',
                    800: '#005893',
                    900: '#024e80',
                    950: '#003a60'
                }
            }
        },
    },
    plugins: [],
}

