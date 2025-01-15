/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  darkMode: "false", // Disable dark mode entirely
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    //require('daisyui'),
  ],
  // Optional DaisyUI config if included
  /*daisyui: {
    themes: ["light"],
  }*/
};
