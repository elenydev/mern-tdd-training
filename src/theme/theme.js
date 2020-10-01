const breakpoints = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
  xlg: 1500,
};

export const theme = {
  colors: {
    white: "#FFF",
    black: "#111",
    red: "#FF0000",
    brightOrange: "#f8982d",
    onion: "#494430",
    darkGray: "#dedede",
    lightGray: "#efefef",
  },
  font: {
    weight: {
      light: 300,
      medium: 500,
      semibold: 600,
      bold: 700,
      xbold: 800,
    },
    size: {
      xxs: "1.4rem",
      xs: "1.6rem",
      sm: "2rem",
      md: "3rem",
      lg: "4rem",
      xlg: "5rem",
    },
  },
  mq: Object.keys(breakpoints).reduce((acc, breakpoint) => {
    acc[breakpoint] = `@media (min-width: ${breakpoints[breakpoint]}px)`;

    return acc;
  }, {}),
};
