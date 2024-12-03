/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'scale-up': 'scaleUp 0.3s ease-in-out',
        'marquee': 'marquee 10s linear infinite',  // Added marquee animation
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        scaleUp: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        marquee: {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(-100%)',
          },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
  const colors = theme("colors");
  const flattenColors = (obj, prefix = '') =>
    Object.entries(obj).reduce((acc, [key, value]) => {
      if (typeof value === 'object' && value !== null) {
        Object.assign(acc, flattenColors(value, `${prefix}${key}-`));
      } else {
        acc[`--${prefix}${key}`] = value;
      }
      return acc;
    }, {});

  const newVars = flattenColors(colors);

  addBase({
    ":root": newVars,
  });
}
