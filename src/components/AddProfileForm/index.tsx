import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Common } from '@app/components';
import { Gender, Size } from '@app/types';
import { StyleSheet, View } from 'react-native';

type AddProfileFormPropTypes = {
  handleSubmit: any;
  profile: any;
  selectedGender: Gender;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  handleGenderPress: (gender: Gender) => void;
  isLoading: boolean;
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name ist ein Pflichtfeld')
    .label('Name eingeben'),
});

const AddProfileForm: React.FC<AddProfileFormPropTypes> = ({
  handleSubmit,
  profile,
  selectedGender,
  selectedDate,
  setSelectedDate,
  handleGenderPress,
  isLoading,
}) => {
  return (
    <Formik
      initialValues={{ name: profile.name, bdate: '' }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <View style={styles.container}>
          <Common.TextInput
            name="name"
            label="Name"
            placeholder="Name eingeben"
            defaultValue={profile.name}
            icon={
              selectedGender === (profile ? profile.gender : 'MALE')
                ? 'face'
                : 'face-woman'
            }
          />
          <Common.DateInput
            date={selectedDate}
            setDate={setSelectedDate}
            label="Geburtstag"
            placeholder="Datum auswählen"
          />
          <View style={styles.radioContainer}>
            <Common.RadioInput
              title="mannlich"
              selected={selectedGender === Gender.MALE}
              onPress={() => handleGenderPress(Gender.MALE)}
              icon="face"
              totalRadioCount={2}
            />
            <Common.RadioInput
              title="weiblich"
              selected={selectedGender === Gender.FEMALE}
              onPress={() => handleGenderPress(Gender.FEMALE)}
              icon="face-woman"
              totalRadioCount={2}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Common.Button
              title="Weiter"
              isLoading={isLoading}
              theme="secondary"
              size={Size.SM}
              fill
              type="submit"
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  radioContainer: {
    justifyContent: 'space-between',
    marginTop: 20,
    flexDirection: 'row',
  },
  buttonContainer: {
    marginTop: 'auto',
  },
});

export default AddProfileForm;
