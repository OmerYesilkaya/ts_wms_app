import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Common } from '@app/components';
import { Gender, Size } from '@app/types';
import { StyleSheet, View } from 'react-native';
import { useLocale } from '@app/hooks';

type AddProfileFormPropTypes = {
  handleSubmit: any;
  profile: any;
  selectedGender: Gender;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  handleGenderPress: (gender: Gender) => void;
  isLoading: boolean;
};

const AddProfileForm: React.FC<AddProfileFormPropTypes> = ({
  handleSubmit,
  profile,
  selectedGender,
  selectedDate,
  setSelectedDate,
  handleGenderPress,
  isLoading,
}) => {
  const { t } = useLocale();
  const SCOPE_OPTIONS = {
    scope: 'components.AddProfileForm.index',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('form.name.validation', SCOPE_OPTIONS))
      .label(t('form.name.placeholder', SCOPE_OPTIONS)),
  });

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
            label={t('form.name.label', SCOPE_OPTIONS)}
            placeholder={t('form.name.placeholder', SCOPE_OPTIONS)}
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
            label={t('form.birthDay.label', SCOPE_OPTIONS)}
            placeholder={t('form.birthDay.placeholder', SCOPE_OPTIONS)}
          />
          <View style={styles.radioContainer}>
            <Common.RadioInput
              title={t('actions.gender.man', SCOPE_OPTIONS)}
              selected={selectedGender === Gender.MALE}
              onPress={() => handleGenderPress(Gender.MALE)}
              icon="face"
              width="49%"
            />
            <Common.RadioInput
              title={t('actions.gender.woman', SCOPE_OPTIONS)}
              selected={selectedGender === Gender.FEMALE}
              onPress={() => handleGenderPress(Gender.FEMALE)}
              icon="face-woman"
              width="49%"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Common.Button
              title={t('actions.submit', SCOPE_OPTIONS)}
              isLoading={isLoading}
              theme="secondary"
              size={Size.SM}
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
