import React, { useEffect } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';

import { profiles, localClient } from '@app/api';
import { Common, Card, Loader } from '@app/components';
import { useApi, useLocale } from '@app/hooks';
import { useAuth } from '@app/auth';
import { routes } from '@app/navigation';
import { ProfileType, Size } from '@app/types';

import { date as dateUtils } from '@app/utility';

type ItemType = {
  item: ProfileType;
};

function ProfilesScreen({ navigation }: any) {
  const { t } = useLocale();
  const SCOPE_OPTIONS = {
    scope: 'screens.ProfilesScreen',
  };

  const getProfilesApiLive = useApi(profiles.getProfiles);
  const getMeasurementsLocal = useApi(localClient.getLocalMeasurements);
  const { user, logOut } = useAuth();

  const convertDate = (unixSecs: number): string => {
    const dateObject = new Date(1970, 0, 1); // Epoch
    dateObject.setSeconds(unixSecs);
    return dateObject.toLocaleString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProfilesApiLive.request(user);
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }: ItemType) => {
    return (
      <Card
        name={item.name}
        shoeSize={item.lastMeasurementSize ?? ''}
        lastMeasurement={
          item.lastMeasurementUnix
            ? convertDate(item.lastMeasurementUnix)
            : dateUtils.now()
        }
        image={
          item.gender === 'MALE'
            ? require('@app/images/ic_boy.png')
            : require('@app/images/ic_boy.png')
        }
        onPress={async () => {
          const localFP = await getMeasurementsLocal.request(item);
          item.FPs = localFP;
          navigation.navigate(routes.PROFILE_DETAILS, item);
        }}
      />
    );
  };

  return (
    <Common.Screen style={styles.screen}>
      {getProfilesApiLive.error ? (
        <View style={{ marginBottom: 10 }}>
          <Text
            style={{
              width: '100%',
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '700',
              marginBottom: 4,
            }}
          >
            Session Expired
          </Text>
          <Common.Button
            title={t('actions.logOut', SCOPE_OPTIONS)}
            onPress={() => logOut()}
            theme="secondary"
            size={Size.SM}
          />
        </View>
      ) : (
        <>
          <Common.Button
            title={t('actions.addProfile', SCOPE_OPTIONS)}
            onPress={() => navigation.navigate(routes.NEW_PROFILE)}
            icon="plus-circle"
            iconSize={50}
            order="ltr"
            size={Size.MD}
          />
          <Loader isVisible={getProfilesApiLive.loading} />
          <View
            style={{
              marginTop: 10,
              flex: 1,
            }}
          >
            <FlatList
              data={getProfilesApiLive.data}
              keyExtractor={(item, index) =>
                item['profile_id'] ?? index.toString()
              }
              renderItem={renderItem}
            />
          </View>
        </>
      )}
    </Common.Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 10,
    paddingHorizontal: 5,
    flex: 1,
  },
});

export default ProfilesScreen;
