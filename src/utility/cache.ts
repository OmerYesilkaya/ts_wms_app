import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import { Alert } from 'react-native';

const prefix = 'cache';
const expiryInMinutes = 5000;

const store = async (key: string, value: any) => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (error) {
    Alert.alert(
      'Error',
      'There was a problem while storing to cache. Please check the logs for more information.',
      [
        {
          text: 'Okay',
          onPress: () => null,
          style: 'default',
        },
      ]
    );
    console.log('cache.store', error);
  }
};

const isExpired = (item: { timestamp: number }) => {
  const now = dayjs();
  const storedTime = dayjs(item.timestamp);
  return now.diff(storedTime, 'minute') > expiryInMinutes;
};

const get = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = value ? JSON.parse(value) : undefined;

    if (!item) return null;

    if (isExpired(item)) {
      // Command Query Separation (CQS)
      await AsyncStorage.removeItem(prefix + key);
      return null;
    }

    return item.value;
  } catch (error) {
    Alert.alert(
      'Error',
      'There was a problem while getting the cache. Please check the logs for more information.',
      [
        {
          text: 'Okay',
          onPress: () => null,
          style: 'default',
        },
      ]
    );
    console.log('cache.get', error);
  }
};

const clear = async (key: string) => {
  try {
    await AsyncStorage.removeItem(prefix + key);
    return null;
  } catch (error) {
    Alert.alert(
      'Error',
      'There was a problem while clearing the cache. Please check the logs for more information.',
      [
        {
          text: 'Okay',
          onPress: () => null,
          style: 'default',
        },
      ]
    );
    console.log('cache.clear', error);
  }
};
const totalClear = async () => {
  try {
    await AsyncStorage.clear();
    return null;
  } catch (error) {
    Alert.alert(
      'Error',
      'There was a problem while resetting the cache. Please check the logs for more information.',
      [
        {
          text: 'Okay',
          onPress: () => null,
          style: 'default',
        },
      ]
    );
    console.log('cache.reset', error);
  }
};

export default {
  store,
  get,
  clear,
  totalClear,
};
