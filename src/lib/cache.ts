import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

const prefix = 'cache';
const expiryInMinutes = 5000;

const store = async (key, value) => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

const isExpired = (item) => {
  const now = dayjs();
  const storedTime = dayjs(item.timestamp);
  return now.diff(storedTime, 'minute') > expiryInMinutes;
};

const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);

    if (!item) return null;

    if (isExpired(item)) {
      // Command Query Separation (CQS)
      await AsyncStorage.removeItem(prefix + key);
      return null;
    }

    return item.value;
  } catch (error) {
    console.log(error);
  }
};

const clear = async (key) => {
  try {
    await AsyncStorage.removeItem(prefix + key);
    return null;
  } catch (error) {
    console.log(error);
  }
};
const totalClear = async () => {
  try {
    await AsyncStorage.clear();
    return null;
  } catch (error) {
    console.log(error);
  }
};

export default {
  store,
  get,
  clear,
  totalClear,
};
