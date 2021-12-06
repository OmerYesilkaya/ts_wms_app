const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const wmsColor = '#e6f8ec';
const primary = '#354671';
const secondary = '#4ecdc4';
const black = '#000';
const white = '#fff';
const medium = '#6e6969';
const light = '#f4f8f6';
const dark = '#0c0c0c';
const dark2 = '#383b42';
const danger = '#a6040b';
const wmsColorMedium = '#a9d285';
const wmsColorDark = '#83b83f';

export default {
  light: {
    text: white,
    background: black,
    tint: medium,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    primary: primary,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
  button: {
    text: {
      primary: white,
      secondary: white,
      info: light,
    },
    background: {
      primary: wmsColorMedium,
      secondary: primary,
      info: medium,
    },
  },
};
