import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

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
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return location;
}
