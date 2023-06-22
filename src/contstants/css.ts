export const COLORS = {
  black: "0 0% 12%",
  white: "0deg 0% 100%",
  yellow: {
    100: "55deg 100% 50%",
    300: "52deg 100% 50%",
    500: "49deg 80% 50%",
    700: "46deg 100% 50%",
    900: "43deg 100% 33%"
  },
  gray: {
    100: "0deg 0% 30%)",
    300: "0deg 0% 80%",
    500: "196deg 4% 60%",
    700: "220deg 5% 40%",
    900: "220deg 3% 20%"
  },
  font: {
    primary: "54deg 33% 25%"
  },

  primary: "207deg, 100%, 49%",
  secondary: "240deg 60% 63%",
  accent: "28deg 75% 71%",
  background: "65deg 79% 74%",
  backgroundAlert: {
    success: "158deg 67% 95%",
    info: "187deg 86% 95%",
    warning: "43deg 100% 96%",
    error: "353deg 80% 96%"
  }
};

export const FONTS = {
  primary: "Open Sans, sans-serif",
  heading:
    "Lilita One, Noto Sans Canadian Aboriginal Variable, Open Sans, sans-serif",
  subheading:
    "Noto Sans Canadian Aboriginal Variable, Lilita One, Open Sans, sans-serif"
};

export const FONT_SIZES = {
  xxs: "8px",
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "48px",
  xxxl: "64px"
};

export const WEIGHTS = {
  lightest: 300,
  light: 400,
  normal: 500,
  medium: 600,
  semiBold: 700,
  bold: 800
};

export const SPACING = {
  xxxs: "4px",
  xxs: "8px",
  xsm: "12px",
  sm: "16px",
  md: "24px",
  lg: "32px",
  xl: "48px",
  xxl: "64px"
};

export const BORDER_RADIUS = {
  xxs: "4px",
  xs: "8px",
  sm: "12px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "48px"
};

export const BREAKPOINTS = {
  phone: 600,
  tablet: 810,
  laptop: 1300
};

export const QUERIES = {
  tabletAndBigger: `(min-width: ${BREAKPOINTS.tablet / 16}rem)`
};
