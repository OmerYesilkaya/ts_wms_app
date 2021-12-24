import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import { LineChart } from 'react-native-chart-kit';

import { COLORS } from '@app/constants';
import { MeasurementData } from '@app/types';
import { date as dateUtils } from '@app/utility';
import { useLocale } from '@app/hooks';

type MeasurementGraphPropTypes = {
  profile: { measurements: MeasurementData[] };
};

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

const MeasurementGraph: React.FC<MeasurementGraphPropTypes> = ({ profile }) => {
  const { t } = useLocale();
  const SCOPE_OPTIONS = {
    scope: 'components.ProfileDetails.MeasurementGraph',
  };

  const chartDataMeasurementShoeSizes = () => {
    const result = profile.measurements.map((item: MeasurementData) =>
      parseInt(item.shoe_size ?? '0')
    );
    return result;
  };

  const chartDataMeasurementDates = () => {
    return profile.measurements.map((item: MeasurementData) => {
      return dateUtils
        .unixDateFormat(item.recordDateUnix ?? 0)
        .toLocaleString(
          'de-DE',
          profile.measurements.length < 3
            ? optionsLong
            : profile.measurements.length >= 3 &&
              profile.measurements.length < 5
            ? optionsShort
            : optionsVeryShort
        );
    });
  };

  return profile.measurements && profile.measurements.length > 0 ? (
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
  ) : (
    <View style={styles.noDataContainer}>
      <Text style={styles.noDataTitle}>
        {t('labels.noDataTitle', SCOPE_OPTIONS)}
      </Text>
      <Text style={styles.noDataDescription}>
        {t('labels.noDataDescription', SCOPE_OPTIONS)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    width: '100%',
    borderRadius: 5,
  },
  chartContainer: {
    flex: 1,
    marginTop: 10,
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
  noDataTitle: {
    color: COLORS.dark,
    fontSize: 22,
    fontWeight: '700',
  },
  noDataDescription: {
    color: COLORS.medium,
    fontSize: 18,
    fontWeight: '500',
    maxWidth: '70%',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default MeasurementGraph;
