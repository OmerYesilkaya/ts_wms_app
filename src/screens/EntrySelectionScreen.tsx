import React from 'react';
import { View, StyleSheet, Image, ScrollView, Text } from 'react-native';

import { Common } from '@app/components';
import { COLORS } from '@app/constants';
import { routes } from '@app/navigation';
import { useLocale } from '@app/hooks';

function EntrySelectionScreen({ route, navigation }: any) {
  const { t } = useLocale();
  const SCOPE_OPTIONS = {
    scope: 'screens.EntrySelectionScreen',
  };
  const profile = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.headerText}>
          {t('labels.header', SCOPE_OPTIONS)}
        </Text>
        <Text style={styles.subHeaderText}>
          {t('labels.subHeader', SCOPE_OPTIONS)}
        </Text>
        <View style={styles.optionContainer}>
          <View style={styles.option}>
            <View style={styles.innerContainerRow}>
              <Image
                style={{ width: '35%', height: 90 }}
                resizeMode={'contain'}
                source={require('@app/images/ic_mobile.png')}
              />
              <Text style={styles.subInnerText} lineBreakMode="clip">
                {t('labels.fptAppDescription', SCOPE_OPTIONS)}
              </Text>
            </View>
            <Common.Button
              title={t('actions.fptApp', SCOPE_OPTIONS)}
              onPress={() =>
                navigation.navigate(routes.MEASUREMENT_FPTAPP, profile)
              }
              theme="secondary"
            />
          </View>
          <View style={styles.option}>
            <View style={styles.innerContainerRow}>
              <Image
                style={{ width: '35%', height: 70 }}
                resizeMode={'contain'}
                source={require('@app/images/ic_shop.png')}
              />
              <Text style={styles.subInnerText} lineBreakMode="clip">
                {t('labels.manualEntryDescription', SCOPE_OPTIONS)}
              </Text>
            </View>
            <Common.Button
              title={t('actions.manualEntry', SCOPE_OPTIONS)}
              onPress={() =>
                navigation.navigate(routes.MEASUREMENT_MANUAL, profile)
              }
              theme="secondary"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.wmsColor,
  },
  detailsContainer: {
    margin: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.wmsColorDark,
    padding: 20,
  },
  headerText: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 24,
  },
  innerContainerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    flex: 1,
    width: '100%',
  },
  option: {
    borderRadius: 5,
    backgroundColor: COLORS.white,
    padding: 10,
    marginTop: 10,
  },
  subHeaderText: {
    marginVertical: 10,
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
  subInnerText: {
    fontSize: 16,
    margin: 20,
    flexShrink: 1,
    fontWeight: '700',
  },
});

export default EntrySelectionScreen;
