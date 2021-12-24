import React, { useRef, useEffect, useState } from 'react';
import { View, Platform } from 'react-native';

import MapView from 'react-native-map-clustering';

import { Callout, Marker } from 'react-native-maps';
import openMap, { createMapLink } from 'react-native-open-maps';

import { useApi, useLocation } from '@app/hooks';
import { stores as storesApi } from '@app/api';
import { Stores as StoresComponents } from '@app/components';
import { StoreType } from '@app/types';

function StoresScreen() {
  const getStoresLocal = useApi(storesApi.getStores);
  const [shops, setShops] = useState<StoreType[]>([]);

  const mapRef = useRef<any>(null); // fix, should be MapView but .animateToRegion throws errors
  const location = useLocation();
  const INITIAL_REGION = {
    latitude: 52.150002,
    longitude: 10.333333,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5,
  };

  const cacheStores = async () => {
    let localStores = await getStoresLocal.request();
    setShops(localStores.data);
  };

  const handleRouteAndroidClick = ({
    latitude,
    longitude,
    street,
    city,
  }: StoreType) => {
    const destination = {
      latitude: Number(latitude),
      longitude: Number(longitude),
    };
    const link = createMapLink({
      provider: Platform.OS === 'ios' ? 'apple' : 'google',
      query: `${street},${city}`,
      latitude: destination.latitude,
      longitude: destination.longitude,
    });

    openMap({ query: link, navigate: true });
  };

  const animateToRegion = (lat = 0, long = 0) => {
    if (!mapRef.current) return;
    const fakeLat = 52.150002;
    const fakeLong = 10.333333;
    let region = {
      latitude: lat !== 0 ? Number(lat) : fakeLat,
      longitude: long !== 0 ? Number(long) : fakeLong,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };
    mapRef.current.animateToRegion(region, 2000);
  };

  useEffect(() => {
    if (location && location.latitude !== 0) {
      location.latitude = 52.49550285399195;
      location.longitude = 13.466747225256396;
      animateToRegion(location.latitude, location.longitude);
      cacheStores();
    }
  }, [location]);

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <StoresComponents.LocationSearchBar animateToRegion={animateToRegion} />
      {
        <MapView
          ref={mapRef}
          initialRegion={INITIAL_REGION}
          style={{ flex: 1 }}
        >
          {shops.map((marker) => {
            return (
              <Marker
                coordinate={{
                  latitude: Number(marker.latitude),
                  longitude: Number(marker.longitude),
                }}
                key={marker.shop_id}
                title={marker.title}
                description={marker.description}
              >
                {Platform.OS === 'ios' && (
                  <>
                    <Callout tooltip>
                      <StoresComponents.CustomView {...marker} />
                    </Callout>
                  </>
                )}
                {Platform.OS !== 'ios' && (
                  <>
                    <Callout
                      tooltip
                      onPress={() => {
                        handleRouteAndroidClick(marker);
                      }}
                    >
                      <StoresComponents.CustomView {...marker} />
                    </Callout>
                  </>
                )}
              </Marker>
            );
          })}
        </MapView>
      }
    </View>
  );
}

export default StoresScreen;
