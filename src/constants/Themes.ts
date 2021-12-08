import Colors from './Colors';

export default {
  button: {
    primary: {
      text: Colors.white,
      background: Colors.wmsColorMedium,
    },
    secondary: {
      text: Colors.white,
      background: Colors.primary,
    },
    info: {
      text: Colors.light,
      background: Colors.medium,
    },
  },
  radioInput: {
    primary: {
      selected: {
        text: Colors.primary,
        background: Colors.wmsColorMedium,
        border: Colors.primary,
      },
      notSelected: {
        text: Colors.wmsColorDark,
        background: Colors.wmsColorMedium,
        border: 'transparent',
      },
    },
    secondary: {
      selected: {
        text: Colors.primary,
        background: Colors.wmsColorMedium,
        border: Colors.primary,
      },
      notSelected: {
        text: Colors.wmsColorDark,
        background: Colors.wmsColorMedium,
        border: 'transparent',
      },
    },
  },
  textInput: {
    primary: {
      text: Colors.black,
      background: Colors.white,
      placeholder: undefined,
    },
    secondary: {
      text: Colors.white,
      background: Colors.black,
      placeholder: Colors.light,
    },
  },
};
