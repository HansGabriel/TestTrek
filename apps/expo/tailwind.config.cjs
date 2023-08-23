/** @type {import("tailwindcss").Config} */
module.exports = {
  presets: [require("@acme/tailwind-config")],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito-Regular"],
        "nunito-black": ["Nunito-Black"],
        "nunito-bold": ["Nunito-Bold"],
        "nunito-extrabold": ["Nunito-ExtraBold"],
        "nunito-extralight": ["Nunito-ExtraLight"],
        "nunito-light": ["Nunito-Light"],
        "nunito-semibold": ["Nunito-SemiBold"],
        "nunito-medium": ["Nunito-Medium"],
      },
      colors: {
        primary: {
          1: "#6949FF",
          2: "#876DFF",
          3: "#A592FF",
          4: "#C3B6FF",
          5: "#F0EDFF",
        },
      },
    },
  },
};
