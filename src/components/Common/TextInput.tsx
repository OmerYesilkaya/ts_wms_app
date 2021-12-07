import React from 'react';
import {
  KeyboardType,
  StyleSheet,
  Text,
  TextInput as NativeTextInput,
  View,
} from 'react-native';
import { Size } from '@app/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { THEMES } from '@app/constants';

type TextInputPropTypes = {
  icon?: any;
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
  size = Size.SM,
  theme = 'primary',
}) => {
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
          {...icon}
          size={(size * 4 + 8) * 2}
          color={THEMES.textInput[theme].text}
        />
        <NativeTextInput
          style={[
            styles.input,
            {
              fontSize: size * 4 + 8,
              color: THEMES.textInput[theme].text,
            },
          ]}
          keyboardType={keyboardType}
          defaultValue={defaultValue}
          placeholder={placeholder}
          placeholderTextColor={THEMES.textInput[theme].placeholder}
        />
      </View>
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
    padding: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 5,
    paddingHorizontal: 7,
  },
});

export default TextInput;
