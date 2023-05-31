// color design tokens export
export const tokensDark = {
  grey: {
    100: "#d6d6d6",
    200: "#adadad",
    300: "#858585",
    400: "#5c5c5c",
    500: "#333333",
    600: "#292929",
    700: "#1f1f1f",
    800: "#141414",
    900: "#0a0a0a",
  },
  primary: {
    // blue
    100: "#cdebef",
    200: "#9bd7df",
    300: "#68c4ce",
    400: "#36b0be",
    500: "#049cae",
    600: "#037d8b",
    700: "#025e68",
    800: "#023e46",
    900: "#011f23",
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
    100: "#cdebef",
    200: "#9bd7df",
    300: "#68c4ce",
    400: "#36b0be",
    500: "#049cae",
    600: "#037d8b",
    700: "#025e68",
    800: "#023e46",
    900: "#011f23",
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
  yellow: {
    100: "#ffeee5",
    200: "#ffdecc",
    300: "#ffcdb2",
    400: "#ffbd99",
    500: "#ffac7f",
    600: "#cc8a66",
    700: "#99674c",
    800: "#664533",
    900: "#332219",
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
            yellow: {
              ...tokensDark.yellow,
              main: tokensDark.yellow[500],
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
            yellow: {
              ...tokensLight.yellow,
              main: tokensDark.yellow[500],
            },
            background: {
              default: tokensDark.grey[0],
              alt: tokensDark.grey[50],
            },
          }),
    },
    typography: {
      fontFamily: ["Outfit", "sans-serif"].join(","),
      fontSize: 24,
      // fontSize: 12,
      h1: {
        fontFamily: ["Outfit", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Outfit", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Outfit", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Outfit", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Outfit", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Outfit", "sans-serif"].join(","),
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
              border: "inherit",
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
