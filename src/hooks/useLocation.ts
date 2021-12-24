import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

type Location = null | {
  latitude: number;
  longitude: number;
};

export default function useLocation() {
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = (await Location.getLastKnownPositionAsync())!;
      setLocation({ latitude, longitude });
    } catch (error) {
      Alert.alert(
        'Error',
        'There was a problem while getting the location. Please check logs the get more information.',
        [
          {
            text: 'Okay',
            onPress: () => null,
            style: 'default',
          },
        ]
      );
      console.log('location.get', error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return location;
}
