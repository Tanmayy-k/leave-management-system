// Tailwind v4 is handled by the @tailwindcss/vite plugin in vite.config.js.
// PostCSS only needs autoprefixer here — do NOT add tailwindcss to this file
// or you will get the "moved to a separate package" error.
export default {
  plugins: {
    autoprefixer: {},
  },
};
