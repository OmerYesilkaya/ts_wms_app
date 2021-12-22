import COLORS from './Colors';

export default {
  button: {
    primary: {
      text: COLORS.white,
      background: COLORS.wmsColorDark,
    },
    secondary: {
      text: COLORS.white,
      background: COLORS.primary,
    },
    info: {
      text: COLORS.light,
      background: COLORS.medium,
    },
  },
  radioInput: {
    primary: {
      selected: {
        text: COLORS.primary,
        background: COLORS.wmsColorMedium,
        border: COLORS.primary,
      },
      notSelected: {
        text: COLORS.wmsColorDark,
        background: COLORS.wmsColorMedium,
        border: 'transparent',
      },
    },
    secondary: {
      selected: {
        text: COLORS.primary,
        background: COLORS.wmsColorMedium,
        border: COLORS.primary,
      },
      notSelected: {
        text: COLORS.wmsColorDark,
        background: COLORS.wmsColorMedium,
        border: 'transparent',
      },
    },
  },
  textInput: {
    primary: {
      text: COLORS.black,
      background: COLORS.white,
      placeholder: undefined,
    },
    secondary: {
      text: COLORS.white,
      background: COLORS.black,
      placeholder: COLORS.light,
    },
  },
};
