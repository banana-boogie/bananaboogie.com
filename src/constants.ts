export const COLORS = {
  black: "0 0% 12%",
  white: "0deg 0% 100%",
  blue: {
    100: "190deg 77% 88%",
    200: "190deg 76% 82%",
    300: "189deg 75% 75%",
    400: "190deg 74% 59%",
    500: "190deg, 100%, 42%",
    600: "195deg, 100%, 39%",
    700: "201deg, 100%, 36%",
    800: "214deg, 97%, 27%",
    900: "239deg, 94%, 19%",
  },
  yellow: {
    100: "55deg 100% 50%",
    300: "52deg 100% 50%",
    500: "49deg 80% 50%",
    700: "46deg 100% 50%",
    900: "43deg 100% 33%",
  },
  gray: {
    100: "185deg 5% 95%",
    300: "190deg 5% 80%",
    500: "196deg 4% 60%",
    700: "220deg 5% 40%",
    900: "220deg 3% 20%",
  },
  primary: "340deg 65% 47%",
  secondary: "240deg 60% 63%",
};

export const WEIGHTS = {
  normal: 500,
  medium: 600,
  bold: 800,
};

export const BREAKPOINTS = {
  phone: 600,
  tablet: 950,
  laptop: 1300,
};

export const QUERIES = {
  phoneAndSmaller: `max-width: ${BREAKPOINTS.phone / 16}rem`,
  tabletAndSmaller: `max-width: ${BREAKPOINTS.tablet / 16}rem`,
  laptopAndSmaller: `max-width: ${BREAKPOINTS.laptop / 16}rem`,
};
