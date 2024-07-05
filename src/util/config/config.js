const prod = {
  url: {
    BASENAME: process.env.REACT_APP_BASENAME,
    PROXYURL: process.env.REACT_APP_PROXY_URL,
  },
};

const dev = {
  url: {
    BASENAME: process.env.REACT_APP_BASENAME,
    PROXYURL: process.env.REACT_APP_PROXY_URL,
  },
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
export const urlConfig = process.env.NODE_ENV === "development" ? dev : prod;