module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                orange: "#E29358",
                purple: "#920fc3",
                blood: "#eb336e",
            },
        },
    },
    plugins: [require("tailwindcss-open-variant")()],
    modules: {
        backgroundColors: ["responsive", "hover", "focus", "open"],
        borderColors: ["responsive", "hover", "focus", "group-hover", "open"],
        borderRadius: ["responsive", "hover", "group-hover", "open"],
        borderStyle: ["responsive", "open"],
        display: ["responsive", "open"],
        shadows: ["responsive", "hover", "focus", "open"],
        textColors: ["responsive", "hover", "focus", "group-hover", "open"],
    },
};
