import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { useFormikContext } from 'formik';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { THEMES } from '@app/constants';
import { Size } from '@app/types';

type ButtonPropTypes = {
  title: string;
  onPress?: () => void;
  isLoading?: boolean;
  size?: Size;
  theme?: 'primary' | 'secondary' | 'info';
  type?: 'submit' | 'button' | 'reset';
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  iconSize?: number;
  order?: 'rtl' | 'ltr';
  width?: string;
};

const Button: React.FC<ButtonPropTypes> = ({
  title,
  onPress,
  size = Size.MD,
  theme = 'primary',
  isLoading = false,
  icon,
  iconSize,
  order = 'rtl',
  type,
  width = 'auto',
}) => {
  let formikObject: any;
  if (type === 'submit') {
    formikObject = useFormikContext();
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: THEMES.button[theme].background,
          paddingHorizontal: size * 3 + 1,
          paddingVertical: size * 2 + 1,
          width: width,
        },
      ]}
      onPress={() =>
        type === 'submit' ? formikObject.handleSubmit() : onPress && onPress()
      }
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <View style={styles.align}>
          {icon && order === 'rtl' && (
            <MaterialCommunityIcons
              name={icon}
              color={THEMES.button[theme].text}
              size={iconSize ? iconSize : size * 4 + 16}
            />
          )}
          <Text
            style={[
              styles.text,
              {
                color: THEMES.button[theme].text,
                fontSize: size * 4 + 8,
                fontWeight: `${Math.max(
                  600,
                  Math.min(size * 100, 800)
                )}` as any,
                width: icon && '85%',
              },
            ]}
          >
            {title}
          </Text>
          {icon && order === 'ltr' && (
            <MaterialCommunityIcons
              name={icon}
              color={THEMES.button[theme].text}
              size={iconSize ? iconSize : size * 4 + 16}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    // font family
  },
  align: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default Button;
