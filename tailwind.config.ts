import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        shops: {
          'primary': '#4f47e6',      // Azul Marinho (Principal)
          'neutral-light': '#f7f8fa',    // branco azulado (Para fundos mais neutros)
          'secondary': '#ffffff',    // Cinza Claro (Plano de fundo/Listas)
          'base': '#edf3ff',         // Branco (Fundo principal/Texto)
          'text-dark': '#1f2a38',    // Para texto principal escuro
        },
      },
    },
  },
  plugins: [],
};

export default config;