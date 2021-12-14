import Constants from 'expo-constants';

const settings = {
  dev: {
    apiUrl: 'https://app-backend-api-dev-gwc.azurewebsites.net',
  },
  staging: {
    apiUrl: 'https://app-backend-api-dev-gwc.azurewebsites.net',
  },
  prod: {
    apiUrl: 'https://app-backend-api-dev-gwc.azurewebsites.net',
  },
  loginEntryPointUrl:
    'https://app-backend-api-dev-gwc.azurewebsites.net/auth/login/?p=B2C_1_signup',
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest?.releaseChannel === 'staging') return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
