const prod = {
  url: {
    BASENAME: process.env.REACT_APP_PRODUCTION_BASENAME,
  },
};
const dev = {
  url: {
    BASENAME: process.env.REACT_APP_DEVELOPMENT_BASENAME,
  },
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
