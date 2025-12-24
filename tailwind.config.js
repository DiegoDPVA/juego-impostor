/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: {
                    main: "#0f1115",
                    panel: "#161a22",
                    soft: "#1d2230",
                },
                accent: {
                    primary: "#3b82f6",   // azul sobrio
                    danger: "#ef4444",    // impostor
                    warning: "#facc15",   // turno / empieza
                },
                text: {
                    main: "#e5e7eb",
                    muted: "#9ca3af",
                },
            },

            boxShadow: {
                soft: "0 10px 30px rgba(0,0,0,0.4)",
                glowBlue: "0 0 15px rgba(59,130,246,0.4)",
                glowRed: "0 0 15px rgba(239,68,68,0.5)",
            },

            animation: {
                fadeIn: "fadeIn 0.4s ease-out forwards",
                scaleIn: "scaleIn 0.4s ease-out forwards",
                pulseSlow: "pulseSlow 2s ease-in-out infinite",
            },

            keyframes: {
                fadeIn: {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
                scaleIn: {
                    from: { opacity: 0, transform: "scale(0.95)" },
                    to: { opacity: 1, transform: "scale(1)" },
                },
                pulseSlow: {
                    "0%, 100%": { opacity: 1 },
                    "50%": { opacity: 0.6 },
                },
            },
        },
    },
    plugins: [],
};
