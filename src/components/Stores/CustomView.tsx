import React from 'react';
import { StyleSheet, View, Text, Dimensions, Platform } from 'react-native';

import { CalloutSubview } from 'react-native-maps';
import openMap, { createMapLink } from 'react-native-open-maps';

import * as Linking from 'expo-linking';

import { useLocale } from '@app/hooks';
import { StoreType } from '@app/types';
import { COLORS } from '@app/constants';

function CustomView(props: StoreType) {
  const { t } = useLocale();
  const SCOPE_OPTIONS = {
    scope: 'components.Stores.CustomView',
  };
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
                    {t('actions.route', SCOPE_OPTIONS)}
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
                    {t('actions.website', SCOPE_OPTIONS)}
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
                    {t('actions.route', SCOPE_OPTIONS)}
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

export default CustomView;
