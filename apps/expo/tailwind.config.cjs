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
    },
  },
};
