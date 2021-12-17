import React, { useState } from 'react';
import { StyleSheet, Image, View, Keyboard } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { footIcon } from '@app/images';

import { profiles } from '@app/api';

import { routes } from '@app/navigation';
import { useApi } from '@app/hooks';
import { useAuth } from '@app/auth'; // ??

import { COLORS } from '@app/constants';
import { Gender, ProfileType } from '@app/types';
import { AddProfileForm } from '@app/components';
import { date } from 'src/utility';

const startDate = new Date();
startDate.setDate(startDate.getMonth() - 365 * 10);

// Change any types when navigation part is ts
function AddProfileScreen({ route, navigation }: any) {
  const { user } = useAuth();
  const profileParams = route.params;
  const addProfilesApi = useApi(profiles.addProfile);
  const updateProfilesApi = useApi(profiles.updateProfile);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    profileParams?.birthdate ?? startDate.toISOString()
  );
  const [selectedGender, setSelectedGender] = useState(
    profileParams?.gender ?? 'MALE'
  );
  const [submitted, setSubmitted] = useState(false);

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const profile = {
    profile_id: null,
    name: profileParams ? profileParams.name : '',
    birthdate: null,
    shoeSize: '',
    shoeWidth: '',
    lastMeasurement: '',
    lastMeasurementUnix: new Date().getMilliseconds(),
    gender: profileParams ? profileParams.gender : 'MALE',
    measurements: [],
  } as ProfileType;

  const showDatePicker = () => {
    Keyboard.dismiss();
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    // setSelectedDate(date.toLocaleDateString("de-LI", dateOptions));
    setSelectedDate(date.toISOString());
    profile.birthdate = date.toISOString();
    hideDatePicker();
  };

  const handlePress = (gender: Gender) => {
    setSelectedGender(gender);
  };

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    setSubmitted(true);
    if (selectedDate === '') {
      return false;
    }

    if (profileParams) {
      let requestProfile = {
        profile_id: profileParams.profile_id,
        name: data.name,
        birthdate: selectedDate,
        shoeSize: '',
        shoeWidth: '',
        lastMeasurement: '',
        lastMeasurementUnix: '',
        gender: selectedGender,
        measurements: [],
      };

      updateProfilesApi
        .request(user, requestProfile)
        .then((result) => {
          if (result.status === 200 || result.status === 201) {
            navigation.reset({
              index: 0,
              actions: navigation.navigate(routes.PROFILES), // ??
            });
            setIsLoading(false);
          } else {
            console.log('There was an error while updating the profile.');
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log('err', err);
          setIsLoading(false);
        });
    } else {
      let requestProfile = {
        profile_id: null,
        name: data.name,
        birthdate: selectedDate,
        shoeSize: '',
        shoeWidth: '',
        lastMeasurement: '',
        lastMeasurementUnix: new Date().getMilliseconds(),
        gender: selectedGender,
        measurements: [],
      } as ProfileType;

      addProfilesApi
        .request(user, requestProfile)
        .then((result) => {
          console.log('SAVED RESULT', result);
          if (result.status === 200 || result.status === 201) {
            requestProfile.profile_id = result.data.profile_id;
            requestProfile.name = result.data.name;
            requestProfile.gender = result.data.gender;
            requestProfile.user_id = result.data.user_id;
            requestProfile.birthdate = result.data.birthdate;

            navigation.replace(
              routes.MEASUREMENT_ENTRY_SELECTION,
              requestProfile // ??
            );
            setIsLoading(false);
          } else {
            console.log(
              'There was an error while creating the profile, please try again later.'
            );
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log('err', err);
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={footIcon as any} />
      <AddProfileForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        profile={profile}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedGender={selectedGender}
        handleGenderPress={handlePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.wmsColor,
    padding: 10,
    alignContent: 'center',
    flex: 1,
  },
  logo: {
    width: 76,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10,
  },
  registerText: {
    marginTop: 20,
    alignSelf: 'center',
    color: COLORS.primary,
  },
  toggleBox: {
    width: 200,
  },
  toggleHolder: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inputHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
});
export default AddProfileScreen;
