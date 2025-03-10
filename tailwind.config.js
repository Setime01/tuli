const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      margin: {
        "5em": "5em",
      },
      linearBorderGradients: {
        directions: {
          tr: "to top right",
          r: "to right",
          t: "to top",
          b: "to bottom",
        },
        colors: {
          "blue-pink": ["#27B0E6", "#FA52A0"],
          "pink-red-light-brown": ["#FE5A75", "#FEC464"],
          "purple-blue": ["#462CA9", "#2517FF"],
          "blue-green": ["#2517FF", "#15F195"],
        },
        background: {
          "dark-1000": "#0D0415",
          "dark-900": "#161522",
          "dark-800": "#202231",
          "dark-pink-red": "#4e3034",
        },
        border: {
          1: "1px",
          2: "2px",
          3: "3px",
          4: "4px",
        },
      },
      backgroundImage: {
        "gradient-1":
          "linear-gradient(0deg, rgba(0, 0, 0, 0.44), rgba(0, 0, 0, 0.44))",
      },
      colors: {
        dark: "#00143A",
        dark1: "#344054",
        accent: "#667085",
        accent1: "#0066F5",
        grey1: "#FAFAFA",
        grey2: "#757575",
        grey3: "#292D32",
        border: "#E4E4E4",
        border1: "#E0E0E0",
        blue: "#137AD4",
      },
      lineHeight: {
        "48px": "48px",
      },
      fontFamily: {
        sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        label: ["12px"],
      },
      borderRadius: {
        none: "0",
        px: "1px",
        DEFAULT: "0.625rem",
      },
      boxShadow: {
        bx1: "0px 4px 10px rgba(0, 0, 0, 0.05)",
        bx2: "0px 4px 50px rgba(0, 0, 0, 0.04)",
        bx3: "20px 4px 64px rgba(0, 0, 0, 0.15)",
        bx4: "20px 4px 64px rgba(0, 0, 0, 0.05)",
      },

      ringWidth: {
        DEFAULT: "1px",
      },
      padding: {
        px: "1px",
        "3px": "3px",
      },
      minHeight: {
        5: "1.25rem",
        empty: "128px",
        cardContent: "230px",
        fitContent: "fit-content",
        nftContainer: "503px",
      },
      minWidth: {
        5: "1.25rem",
      },
      maxWidth: {
        22: "22.06rem",
      },

      screens: {
        "3xl": "1600px",
        'xxs': {'max': '349px'}
      },

      keyframes: {
        ellipsis: {
          "0%": { content: '"."' },
          "33%": { content: '".."' },
          "66%": { content: '"..."' },
        },
        opacity: {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
      },
      zIndex: {
        888: "888",
        999: "999",
      },
    },
  },
  variants: {
    linearBorderGradients: ["responsive", "hover", "dark"], // defaults to ['responsive']
    extend: {
      backgroundColor: ["checked", "disabled"],
      backgroundImage: ["hover", "focus"],
      borderColor: ["checked", "disabled"],
      cursor: ["disabled"],
      opacity: ["hover", "disabled"],
      placeholderColor: ["hover", "active"],
      ringWidth: ["disabled"],
      ringColor: ["disabled"],
    },
  },
  plugins: [
    // require('tailwindcss-border-gradient-radius'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".header-border-b": {
          background:
            "linear-gradient(to right, rgba(39, 176, 230, 0.2) 0%, rgba(250, 82, 160, 0.2) 100%) left bottom no-repeat",
          backgroundSize: "100% 1px",
        },
      });
    }),
  ],
};
