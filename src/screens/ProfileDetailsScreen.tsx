import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { routes } from '@app/navigation';
import { useApi } from '@app/hooks';
import { profiles } from '@app/api';

import { useAuth } from '@app/auth';
import { MeasurementData, Size } from '@app/types';
import { Common } from '@app/components';
import { COLORS } from '@app/constants';

const optionsLong = {
  day: '2-digit',
  month: 'long',
  year: '2-digit',
} as Intl.DateTimeFormatOptions;
const optionsShort = {
  month: 'long',
  year: 'numeric',
} as Intl.DateTimeFormatOptions;
const optionsVeryShort = {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit',
} as Intl.DateTimeFormatOptions;

function ProfileDetailsScreen({ route, navigation }: any) {
  const { user } = useAuth();

  const profile = route.params;
  console.log(profile);
  const deleteProfilesApi = useApi(profiles.deleteProfile);

  const chartDataMeasurementShoeSizes = () => {
    const result = profile.measurements.map((item: MeasurementData) =>
      parseInt(item.shoe_size ?? '0')
    );
    return result;
  };
  const handleDelete = () => {
    deleteProfilesApi.request(user, profile);
    navigation.replace(routes.PROFILES);
  };

  const unixDateFormat = (unixTime: number) => {
    const dateObject = new Date(1970, 0, 1); // Epoch
    dateObject.setSeconds(unixTime);
    return dateObject;
  };
  const chartDataMeasurementDates = () => {
    return profile.measurements.map((item: MeasurementData) => {
      return unixDateFormat(item.recordDateUnix ?? 0).toLocaleString(
        'de-DE',
        profile.measurements.length < 3
          ? optionsLong
          : profile.measurements.length >= 3 && profile.measurements.length < 5
          ? optionsShort
          : optionsVeryShort
      );
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={
            profile.gender === 'MALE'
              ? require('@app/images/ic_boy.png')
              : require('@app/images/ic_boy.png')
          }
        />
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{profile.name}</Text>
          {profile.measurements && profile.measurements.length > 0 && (
            <>
              <Text style={styles.infoText}>
                WMS-Schuhgröße: {profile.lastMeasurementSize}
              </Text>
              <Text style={styles.infoText}>
                WMS-Schuhweite: {profile.shoe_width}
              </Text>
              <Text style={styles.infoText}>
                Letze Messung:{' '}
                {unixDateFormat(profile.lastMeasurementUnix).toLocaleString(
                  'de-DE',
                  optionsShort
                )}
              </Text>
            </>
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Common.Button
          title="Beárbeiten"
          icon="pencil"
          onPress={() => navigation.navigate(routes.NEW_PROFILE, profile)}
          order="ltr"
          size={Size.SM}
          width="49%"
        />
        <Common.Button
          title="Löschen"
          icon="delete"
          order="ltr"
          size={Size.SM}
          width="49%"
          onPress={() => {
            Alert.alert(
              'Warnung',
              'Möchten Sie dieses Profil wirklich löschen?',
              [
                {
                  text: 'Bestätigen Sie',
                  style: 'default',
                  onPress: () => handleDelete(),
                },
                { text: 'Abbrechen', style: 'cancel' },
              ]
            );
          }}
        />
      </View>
      {profile.measurements && profile.measurements.length > 0 && (
        <View style={styles.chartContainer}>
          <LineChart
            data={{
              labels: chartDataMeasurementDates(),
              datasets: [
                {
                  data: chartDataMeasurementShoeSizes(),
                },
              ],
            }}
            width={Dimensions.get('window').width - 20} // from react-native
            height={300}
            chartConfig={{
              backgroundColor: COLORS.wmsColorDark,
              backgroundGradientFrom: COLORS.wmsColorDark,
              backgroundGradientTo: COLORS.wmsColorMedium,
              strokeWidth: 2, // optional, default 3
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {},
              propsForBackgroundLines: {
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>
      )}

      {profile.measurements && profile.measurements.length === 0 && (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No measurement data found.</Text>
          <Text style={styles.noDataInfo}>
            Please add measurements from below.
          </Text>
        </View>
      )}
      <View style={{ marginVertical: 10 }}>
        <Common.Button
          title="Du möchtestmehr über die Fußentwicklung von Kindern erfahren ?"
          size={Size.XS}
          theme="info"
          onPress={() => {
            Alert.alert(
              '',
              'Durch das Einbeziehen von Größe und Gewicht arbeiten wir daran, zukünftig die Belastung des Fußes zu berechnen, um noch sicherer zu sein, dass der Fuß auch im aktiven Zustand genügend Raum im Schuh hat. Denn je nach Zustand (sitzen,stehen, gehen) verändert sich die Größe unserer Füße, Beim Gehen können die Füße durch das Abrollen länger werden.',
              [{ text: 'ich verstehe', onPress: () => null, style: 'default' }]
            );
          }}
        />
      </View>
      <Common.Button
        theme="secondary"
        size={Size.SM}
        title="Füße nachmessen"
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
  chart: {
    width: '100%',
    borderRadius: 5,
  },
  chartContainer: {
    flex: 1,
    marginTop: 10,
  },
  infoText: {
    fontSize: 15,
  },
  noDataContainer: {
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.dark,
    minHeight: Dimensions.get('screen').height / 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  noDataText: {
    color: COLORS.dark,
    fontSize: 22,
    fontWeight: '700',
  },
  noDataInfo: {
    color: COLORS.medium,
    fontSize: 18,
    fontWeight: '500',
    maxWidth: '70%',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ProfileDetailsScreen;
