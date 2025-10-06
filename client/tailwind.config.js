// /** @type {import('tailwindcss').Config} */
// export default {
//     content: ['./index.html', './src/**/*.{js,jsx}'],
//     theme: {
//       extend: {
//         colors: {
//           brand: { red: '#D71920', ink: '#0B2239' },
//         },
//       },
//     },
//     plugins: [],
//   }

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#D71920", // your main accent – action buttons, highlights
          redDark: "#BE161C", // hover version for buttons
          ink: "#0B2239", // dark navy for text & navbar
          gray: "#F8FAFC", // light background panels
          success: "#10B981", // green for income / positive amounts
        },
      },
    },
  },
  plugins: [],
};
