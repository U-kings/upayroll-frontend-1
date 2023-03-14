// color design tokens export
export const tokensDark = {
  grey: {
    0: "#ffffff", // manually adjusted
    10: "#f6f6f6", // manually adjusted
    50: "#f0f0f0", // manually adjusted
    100: "#e1e1e3",
    200: "#c2c4c7",
    300: "#a4a6aa",
    400: "#85898e",
    500: "#676b72",
    600: "#52565b",
    700: "#3e4044",
    800: "#292b2e",
    900: "#151517",
    1000: "#000000", // manually adjusted
  },
  primary: {
    // blue
    100: "#cdd3df",
    200: "#9ba8bf",
    300: "#697c9e",
    400: "#37517e",
    500: "#05255e",
    600: "#041e4b",
    700: "#031638",
    800: "#020f26",
    900: "#010713",
  },
  secondary: {
    // white
    100: "#ffffff",
    200: "#fdfdfd",
    300: "#fbfbfb",
    400: "#f9f9f9",
    500: "#f7f7f7",
    600: "#f5f5f5",
    700: "#c4c4c4",
    800: "#939393",
    900: "#626262",
    1000: "#313131",
  },
  blue: {
    50: "#003063",
    100: "#cdd3df",
    200: "#9ba8bf",
    300: "#697c9e",
    400: "#578DEF",
    500: "#05255e",
    600: "#2364D9",
    700: "#031638",
    800: "#020f26",
    900: "#010713",
    1000: "#060a20",
  },
  red: {
    100: "#ffd7d5",
    200: "#ffafab",
    300: "#ff8882",
    400: "#ff6058",
    500: "#ff382e",
    600: "#cc2d25",
    700: "#99221c",
    800: "#661612",
    900: "#330b09",
  },
};

// function that reverses the color palette
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      // ...(mode === "dark"
      ...(mode === "light"
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            blue: {
              ...tokensDark.blue,
              main: tokensDark.blue[500],
            },
            red: {
              ...tokensDark.red,
              main: tokensDark.red[500],
            },
            background: {
              default: tokensDark.primary[600],
              alt: tokensDark.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensDark.grey[50],
              light: tokensDark.grey[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[600],
              light: tokensDark.secondary[700],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[500],
            },
            blue: {
              ...tokensLight.blue,
              main: tokensDark.blue[500],
            },
            red: {
              ...tokensLight.red,
              main: tokensDark.red[500],
            },
            background: {
              default: tokensDark.grey[0],
              alt: tokensDark.grey[50],
            },
          }),
    },
    typography: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontSize: 24,
      // fontSize: 12,
      h1: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          outlined: {
            textTransform: "none",
            boxShadow: "none",
            // border: "none",
            // backgroundColor: "green",
            "&:hover": {
              boxShadow: "none",
              // border: "none",
              color: "inherit",
              // border: "inherit",
            },
          },
          contained: {
            textTransform: "none",
            boxShadow: "none",
            // backgroundColor: "green",
            // border:"none",
            "&:hover": {
              boxShadow: "none",
              // border: "none",
              color: "inherit",
              border: "inherit",
            },
          },
        },
      },
    },
  };
};
