import React from 'react';
import {
  KeyboardType,
  StyleSheet,
  Text,
  TextInput as NativeTextInput,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ErrorMessage, useFormikContext } from 'formik';

import { Size } from '@app/types';
import { THEMES } from '@app/constants';

import ErrorText from './ErrorText';

type TextInputPropTypes = {
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  name: string;
  label: string;
  placeholder: string;
  defaultValue?: string;
  keyboardType?: KeyboardType;
  size?: Size;
  theme?: 'primary' | 'secondary';
};

const TextInput: React.FC<TextInputPropTypes> = ({
  icon,
  name,
  label,
  placeholder,
  defaultValue,
  keyboardType = 'default',
  theme = 'primary',
}) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: THEMES.textInput[theme].background },
        ]}
      >
        <MaterialCommunityIcons
          name={icon}
          size={30}
          color={THEMES.textInput[theme].text}
        />
        <NativeTextInput
          value={values[name]}
          onChangeText={(text) => setFieldValue(name, text)}
          onBlur={() => setFieldTouched(name)}
          style={[
            styles.input,
            {
              color: THEMES.textInput[theme].text,
            },
          ]}
          keyboardType={keyboardType}
          defaultValue={defaultValue}
          placeholder={placeholder}
          placeholderTextColor={THEMES.textInput[theme].placeholder}
          autoCorrect={false}
        />
      </View>
      <ErrorMessage component={ErrorText} name={name} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 5,
    paddingHorizontal: 7,
    height: 42,
  },
});

export default TextInput;
