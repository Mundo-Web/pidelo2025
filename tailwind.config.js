/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
        "./resources/**/*.vue",
    ],
    theme: {
        extend: {
            fontFamily: {
                "font-general": ["Mulish", "serif"], //"Lato" "serif" usado para Sala Fabulosa
                "font-primary": ["Rajdhani", "sans-serif"], // usado para Stech Peru
                "font-secondary": ["Open Sans", "serif"],
            },
            margin: {
                primary: "5%",
            },
            padding: {
                primary: "5%",
            },
            // Puedes agregar personalizaciones aquí si es necesario
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("tailwindcss-animated"),
        // Otros plugins si los tienes
    ],
};
