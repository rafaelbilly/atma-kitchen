/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#29565B",
        "primary-dark": "#18373B",
        "primary-light": "#537478",
        "primary-lighter": "#DAE4E5",
        secondary: "#B69231",
        "secondary-dark": "#634E16",
        "secondary-light": "#F5F1E4",
        black: "#040A0A",
        white: "#FBFBFB",
        footer: "#1D1C1C",
        "secondary-white": "#FFFFFF",
        body: "#64748B",
        bodydark: "#AEB7C0",
        bodydark1: "#DEE4EE",
        bodydark2: "#8A99AF",
        sidebar: "#1C2434",
        graydark: "#333A48",
        boxdark: "#24303F",
        "boxdark-2": "#1A222C",
        blue: "#3C50E0",
      },
      fontFamily: {
        serif: ["Cormorant", "serif"],
        sans: ["Mulish", "sans-serif"],
      },
      fontSize: {
        "title-xxl": ["44px", "55px"],
        "title-xl": ["36px", "45px"],
        "title-xl2": ["33px", "45px"],
        "title-lg": ["28px", "35px"],
        "title-md": ["24px", "30px"],
        "title-md2": ["26px", "30px"],
        "title-sm": ["20px", "26px"],
        "title-xsm": ["18px", "24px"],
      },
      zIndex: {
        999999: "999999",
        99999: "99999",
        9999: "9999",
        999: "999",
        99: "99",
        9: "9",
        1: "1",
      },
      fontFamily: {
        serif: ["Cormorant", "serif"],
        sans: ["Mulish", "sans-serif"],
      },
      backgroundImage: (theme) => ({
        texture: "url('/src/assets/images/others/Texture.png')",
      }),
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#29565B",
          "primary-content": "#FBFBFB",
          secondary: "#B69231",
          "secondary-content": "#FBFBFB",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
