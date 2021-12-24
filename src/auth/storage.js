import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
import { Alert } from 'react-native';

const key = 'authToken';

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    Alert.alert(
      'Error',
      'There was a problem while storing the auth token. Please check logs the get more information.',
      [
        {
          text: 'Okay',
          onPress: () => null,
          style: 'default',
        },
      ]
    );
    console.log('auth.store', error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    Alert.alert(
      'Error',
      'There was a problem while getting the auth token. Please check logs the get more information.',
      [
        {
          text: 'Okay',
          onPress: () => null,
          style: 'default',
        },
      ]
    );
    console.log('auth.get', error);
  }
};

const getUser = async () => {
  const token = await getToken();
  return token ? jwtDecode(token) : null;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    Alert.alert(
      'Error',
      'There was a problem while removing the auth token. Please check logs the get more information.',
      [
        {
          text: 'Okay',
          onPress: () => null,
          style: 'default',
        },
      ]
    );
    console.log('auth.remove', error);
  }
};

export default { getToken, getUser, removeToken, storeToken };
