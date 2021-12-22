import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Platform } from 'react-native';

import MapView from 'react-native-map-clustering';

import { Callout, CalloutSubview, Marker } from 'react-native-maps';
import openMap, { createMapLink } from 'react-native-open-maps';

import * as Linking from 'expo-linking';

import { useApi, useLocation } from '@app/hooks';
import { stores as storesApi } from '@app/api';
import { Stores as StoresComponents } from '@app/components';
import { StoreType } from '@app/types';
import { COLORS } from '@app/constants';

function CustomView(props: StoreType) {
  const { title, url } = props;
  const adress = `${props.street}, ${props.postal}, ${props.city}`;

  function handleRouteClick() {
    const destination = {
      latitude: Number(props.latitude),
      longitude: Number(props.longitude),
    };
    const link = createMapLink({
      provider: Platform.OS === 'ios' ? 'apple' : 'google',
      query: `${props.street},${props.city}`,
      latitude: destination.latitude,
      longitude: destination.longitude,
    });

    openMap({ query: link });
  }

  function handleURLClick() {
    Linking.openURL(url.includes('http') ? url : `https://${url}`);
  }

  return (
    <View style={styles.customMarkerContainer}>
      <Text style={styles.customMarkerTitle}>{title}</Text>
      <View style={styles.subContainer}>
        <Text style={styles.customMarkerAdress}>{adress}</Text>
      </View>
      {Platform.OS === 'android' && (
        <Text style={styles.customMarkerUrl}>{url}</Text>
      )}

      <View>
        <View style={styles.subContainer}>
          {Platform.OS === 'ios' && (
            <>
              <CalloutSubview
                style={styles.calloutSubView}
                onPress={() => handleRouteClick()}
              >
                <View style={styles.customMarkerRoute}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: '600',
                    }}
                  >
                    Route anzeigen
                  </Text>
                </View>
              </CalloutSubview>
              <CalloutSubview
                style={styles.calloutSubView}
                onPress={handleURLClick}
              >
                <View style={styles.customMarkerWebsite}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: '600',
                    }}
                  >
                    Webseite
                  </Text>
                </View>
              </CalloutSubview>
            </>
          )}
          {Platform.OS !== 'ios' && (
            <>
              <View style={styles.calloutSubView}>
                <View style={styles.customMarkerRoute}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: '600',
                    }}
                  >
                    Route anzeigen
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

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
                      <CustomView {...marker} />
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
                      <CustomView {...marker} />
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

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
  calloutText: {
    padding: 20,
    backgroundColor: COLORS.white,
    color: COLORS.black,
    borderRadius: 15,
    elevation: 20,
    borderColor: '#000',
    borderWidth: 2,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  customMarkerContainer: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 3,
    position: 'relative',
    maxWidth: 300,
  },
  customMarkerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  customMarkerAdress: {
    width: '100%',
    alignSelf: 'flex-start',
  },
  customMarkerUrl: {
    fontWeight: '500',
    color: COLORS.wmsColorDark,
    marginTop: 5,
  },
  subContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  calloutSubView: {
    marginTop: 15,
    marginRight: 5,
    width: '50%',
  },
  customMarkerRoute: {
    color: 'white',
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'rgb(51,102,187)',
  },
  customMarkerWebsite: {
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: COLORS.wmsColorDark,
  },
});

export default StoresScreen;
