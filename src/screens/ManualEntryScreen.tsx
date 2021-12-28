import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';

import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { COLORS } from '@app/constants';
import { Common } from '@app/components';
import { routes } from '@app/navigation';
import { useApi, useLocale } from '@app/hooks';
import { localClient, measurements, stores as storesApi } from '@app/api';

import { MeasurementData, Size } from '@app/types';
import { CommonActions } from '@react-navigation/native';
import { useAuth } from '@app/auth';

type StoreType = {
  shop_id: string;
  title: string;
  street: string;
};

const shoeSizeOptions = [...Array(31)].map((e, i) => ({
  label: (i + 18).toString(),
  value: (i + 18).toString(),
}));

const bodySizeOptions = [...Array(111)].map((e, i) => ({
  label: (i + 60).toString() + ' cm',
  value: (i + 60).toString(),
}));

const weightOptions = [...Array(61)].map((e, i) => ({
  label: (i + 10).toString() + ' kg',
  value: (i + 10).toString(),
}));

const measurementData = {
  measurementDataId: new Date(),
  profile_id: null,
  bodySize: '60',
  recordDate: null,
  recordDateUnix: null,
  storeName: '',
  storeId: '',
  shoe_size: '18',
  shoe_width: 'W',
  weight: '10',
} as MeasurementData;

// Fix any types when navigation is in ts
function ManualEntryScreen({ route, navigation }: any) {
  const { t } = useLocale();
  const SCOPE_OPTIONS = {
    scope: 'screens.ManualEntryScreen',
  };

  const profile = route.params;
  const emptyObject = {};
  const { user } = useAuth();
  const getStoresLocal = useApi(storesApi.getStores);
  const addProfilesLocalApi = useApi(localClient.addLocalMeasurement);
  const addMeasurementApi = useApi(measurements.addProfileMeasurement);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedDateUnix, setSelectedDateUnix] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState<
    { id: string; title: string }[]
  >([]);
  const [selectedShoeSize, setSelectedShoeSize] = useState('W');

  const handleSubmit = async () => {
    if (!selectedDate) {
      Alert.alert(
        t('forms.date.alert.title', SCOPE_OPTIONS),
        t('forms.date.alert.description', SCOPE_OPTIONS),
        [
          {
            text: t('forms.date.alert.confirm', SCOPE_OPTIONS),
            onPress: () => null,
            style: 'default',
          },
        ]
      );
      return;
    }

    setIsLoading(true);
    measurementData.profile_id = profile.profile_id;
    measurementData.recordDate = selectedDate;
    measurementData.recordDateUnix = selectedDateUnix;

    await addProfilesLocalApi.request(measurementData);
    await addMeasurementApi.request(user, measurementData);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handlePress = (shoe_size: string) => {
    measurementData.shoe_width = shoe_size;
    setSelectedShoeSize(shoe_size);
  };

  const handlestoreSelection = (store: StoreType) => {
    if (store !== null) {
      measurementData.storeId = store.shop_id;
      measurementData.storeName = store.title;
    } else {
      measurementData.storeId = '';
      measurementData.storeName = '';
    }
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    setSelectedDateUnix(date.getTime() / 1000);
    hideDatePicker();
  };

  const getSuggestions = useCallback(async (q) => {
    const localStores = await getStoresLocal.request();

    if (typeof q !== 'string' || q.length < 2) {
      setSuggestionsList([]);
      return;
    }
    const suggestions = localStores.data
      .filter((t: StoreType) => t.title.toLowerCase().includes(q.toLowerCase()))
      .map(({ shop_id, title, street }: StoreType, index: number) => ({
        id: index,
        shop_id: shop_id,
        title: title,
        street: street,
      }))
      .slice(0, 20);

    setSuggestionsList(suggestions);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            {t('labels.header', SCOPE_OPTIONS)}
          </Text>
          <Image
            style={{ height: 190 }}
            resizeMode={'contain'}
            source={require('@app/images/img_component.png')}
          />
        </View>

        <View style={{ padding: 12 }}>
          <Text style={styles.titleText}>
            {t('forms.shoeSize.label', SCOPE_OPTIONS)}
          </Text>
          <RNPickerSelect
            placeholder={emptyObject}
            style={styles}
            onValueChange={(value) => (measurementData.shoe_size = value)}
            items={shoeSizeOptions}
          />
          <Text style={styles.titleText}>
            {t('forms.selectShoeSize.label', SCOPE_OPTIONS)}
          </Text>
          <View style={styles.toggleHolder}>
            <Common.RadioInput
              selected={selectedShoeSize === 'S'}
              onPress={() => handlePress('S')}
              title={t('actions.shoeSize.small', SCOPE_OPTIONS)}
              size={Size.SM}
              width="32%"
            />
            <Common.RadioInput
              selected={selectedShoeSize === 'M'}
              onPress={() => handlePress('M')}
              title={t('actions.shoeSize.medium', SCOPE_OPTIONS)}
              size={Size.SM}
              width="32%"
            />
            <Common.RadioInput
              selected={selectedShoeSize === 'W'}
              onPress={() => handlePress('W')}
              title={t('actions.shoeSize.large', SCOPE_OPTIONS)}
              size={Size.SM}
              width="32%"
            />
          </View>
          <Common.DateInput
            placeholder={t('forms.date.placeholder', SCOPE_OPTIONS)}
            date={selectedDate}
            setDate={setSelectedDate}
            label={t('forms.date.label', SCOPE_OPTIONS)}
          />
          <Text style={styles.titleText}>
            {t('forms.dropdown.label', SCOPE_OPTIONS)}
          </Text>
          <AutocompleteDropdown
            clearOnFocus={false}
            closeOnBlur={false}
            closeOnSubmit={false}
            onChangeText={getSuggestions}
            initialValue={{ shop_id: 'c3fb1132-b9f4-486b-9bbe-2b94165c26e42' }} // or just '2'
            onSelectItem={handlestoreSelection as any}
            dataSet={suggestionsList}
            suggestionsListMaxHeight={Dimensions.get('window').height * 0.5}
            rightButtonsContainerStyle={{
              backgroundColor: 'transparent',
            }}
            textInputProps={{
              placeholder: t('forms.dropdown.placeholder', SCOPE_OPTIONS),
              autoCorrect: false,
              autoCapitalize: 'none',
              style: {
                borderRadius: 5,
                fontSize: 16,
                backgroundColor: COLORS.white,
                color: COLORS.dark,
              },
            }}
            // @ts-ignore, react-native-autocomplete-dropdown has no type definition for renderItem, yet
            renderItem={(item: StoreType, index: number) => (
              <View
                key={`${item.shop_id}-${index}`}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: '600' }}>
                  {item.title}
                </Text>
                <Text>{item.street}</Text>
              </View>
            )}
          />
          <View style={styles.innerContainerRow}>
            <View style={[styles.optionsContainer, { paddingRight: 10 }]}>
              <Text style={styles.titleText}>
                {t('forms.bodySize.label', SCOPE_OPTIONS)}
              </Text>
              <RNPickerSelect
                placeholder={emptyObject}
                style={styles}
                onValueChange={(value) => (measurementData.bodySize = value)}
                items={bodySizeOptions}
              />
            </View>
            <View style={styles.optionsContainer}>
              <Text style={styles.titleText}>
                {t('forms.weight.label', SCOPE_OPTIONS)}
              </Text>
              <RNPickerSelect
                placeholder={emptyObject}
                style={styles}
                onValueChange={(value) => (measurementData.weight = value)}
                items={weightOptions}
              />
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Common.Button
              theme="info"
              icon="information"
              order="rtl"
              size={Size.XS}
              title={t('actions.info.title', SCOPE_OPTIONS)}
              onPress={() => {
                Alert.alert(
                  t('actions.info.alert.title', SCOPE_OPTIONS),
                  t('actions.info.alert.description', SCOPE_OPTIONS),
                  [
                    {
                      text: t('actions.info.alert.confirm', SCOPE_OPTIONS),
                      onPress: () => null,
                      style: 'default',
                    },
                  ]
                );
              }}
            />
          </View>
          <Common.Button
            onPress={() =>
              handleSubmit().then(() => {
                setIsLoading(false);
                navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [{ name: routes.PROFILES }],
                  })
                );
              })
            }
            title={t('actions.submit', SCOPE_OPTIONS)}
            isLoading={isLoading}
            theme="secondary"
            size={Size.SM}
          />
        </View>
        <View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={new Date()}
            maximumDate={new Date()}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
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
    borderRadius: 5,
    flex: 1,
    margin: 10,
    backgroundColor: COLORS.wmsColorDark,
  },
  form: {},
  headerContainer: {
    alignItems: 'center',
  },
  headerText: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
  },
  inputIOS: {
    borderRadius: 5,
    backgroundColor: COLORS.white,
    color: COLORS.dark,
    paddingLeft: 15,
    fontSize: 18,
    paddingVertical: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    backgroundColor: COLORS.white,
    color: COLORS.dark,
  },
  innerContainerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  optionsContainer: {
    justifyContent: 'space-around',
    flex: 1,
  },

  subHeaderText: {
    fontSize: 18,
    textAlign: 'center',
  },
  subInnerText: {
    fontSize: 16,
    flexShrink: 1,
    fontWeight: '700',
  },
  titleText: {
    paddingTop: 10,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 5,
  },
  toggleHolder: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ManualEntryScreen;
