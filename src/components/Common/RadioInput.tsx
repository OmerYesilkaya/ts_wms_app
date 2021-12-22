import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { THEMES } from '@app/constants';
import { Size } from '@app/types';

type RadioInputPropTypes = {
  selected: boolean;
  onPress: () => void;
  theme?: 'primary' | 'secondary';
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  title: string;
  size?: Size;
  order?: 'rtl' | 'ltr';
  width: string;
};

const RadioInput: React.FC<RadioInputPropTypes> = ({
  selected = false,
  onPress,
  theme = 'primary',
  icon,
  title,
  size = Size.MD,
  order = 'rtl',
  width = 'auto',
}) => {
  const state = selected ? 'selected' : 'notSelected';
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.container,
          {
            borderColor: THEMES.radioInput[theme][state].border,
            backgroundColor: THEMES.radioInput[theme][state].background,
            paddingHorizontal: size * 2 + 4,
            paddingVertical: size + 2,
            width: width,
          },
        ]}
      >
        {icon && order === 'rtl' && (
          <MaterialCommunityIcons
            name={icon}
            size={size * 6 + 20}
            color={THEMES.radioInput[theme][state].text}
            style={{ marginRight: size }}
          />
        )}
        <Text
          style={[
            styles.text,
            {
              color: THEMES.radioInput[theme][state].text,
              fontSize: size * 4 + 4,
            },
          ]}
        >
          {title}
        </Text>
        {icon && order === 'ltr' && (
          <MaterialCommunityIcons
            name={icon}
            size={size * 4 + 20}
            color={THEMES.radioInput[theme][state].text}
            style={{ marginLeft: size }}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  text: {
    alignSelf: 'center',
  },
});

export default RadioInput;
