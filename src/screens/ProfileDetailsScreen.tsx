import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';

import { routes } from '@app/navigation';
import { useApi, useLocale } from '@app/hooks';
import { profiles } from '@app/api';
import { useAuth } from '@app/auth';
import { Size } from '@app/types';
import { COLORS } from '@app/constants';
import {
  Common,
  ProfileDetails as ProfileDetailsComponents,
} from '@app/components';
import { CommonActions } from '@react-navigation/native';

function ProfileDetailsScreen({ route, navigation }: any) {
  const { t } = useLocale();
  const SCOPE_OPTIONS = {
    scope: 'screens.ProfileDetailsScreen',
  };
  const { user } = useAuth();

  const profile = route.params;
  const deleteProfilesApi = useApi(profiles.deleteProfile);
  const handleDelete = () => {
    deleteProfilesApi.request(user, profile).then(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: routes.PROFILES }],
        })
      );
    });
  };

  return (
    <ScrollView style={styles.container}>
      <ProfileDetailsComponents.UserCard profile={profile} />
      <View style={styles.buttonContainer}>
        <Common.Button
          title={t('actions.edit', SCOPE_OPTIONS)}
          icon="pencil"
          onPress={() => navigation.navigate(routes.NEW_PROFILE, profile)}
          order="ltr"
          size={Size.SM}
          width="49%"
        />
        <Common.Button
          title={t('actions.delete', SCOPE_OPTIONS)}
          icon="delete"
          order="ltr"
          size={Size.SM}
          width="49%"
          onPress={() => {
            Alert.alert(
              t('alerts.delete.title', SCOPE_OPTIONS),
              t('alerts.delete.description', SCOPE_OPTIONS),
              [
                {
                  text: t('alerts.delete.confirm', SCOPE_OPTIONS),
                  style: 'default',
                  onPress: () => handleDelete(),
                },
                {
                  text: t('alerts.delete.cancel', SCOPE_OPTIONS),
                  style: 'cancel',
                },
              ]
            );
          }}
        />
      </View>
      <ProfileDetailsComponents.MeasurementGraph profile={profile} />
      <View style={{ marginVertical: 10 }}>
        <Common.Button
          title={t('actions.info', SCOPE_OPTIONS)}
          size={Size.XS}
          theme="info"
          icon="information"
          onPress={() => {
            Alert.alert(
              t('alerts.info.title', SCOPE_OPTIONS),
              t('alerts.info.description', SCOPE_OPTIONS),
              [
                {
                  text: t('alerts.info.confirm', SCOPE_OPTIONS),
                  onPress: () => null,
                  style: 'default',
                },
              ]
            );
          }}
        />
      </View>
      <Common.Button
        theme="secondary"
        size={Size.SM}
        title={t('actions.add', SCOPE_OPTIONS)}
        onPress={() =>
          navigation.navigate(routes.MEASUREMENT_ENTRY_SELECTION, profile)
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
  },
  headerContainer: {
    flexGrow: 2.2,
    minHeight: 80,
  },
  profileImage: {
    flex: 1,
    flexGrow: 1,
    height: '100%',
    resizeMode: 'contain',
    marginRight: 10,
    minWidth: 50,
  },
  profileContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  infoText: {
    fontSize: 15,
  },
});

export default ProfileDetailsScreen;
