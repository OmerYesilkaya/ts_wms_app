import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { THEMES } from '@app/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Size } from '@app/types';

type ButtonPropTypes = {
  title: string;
  onPress?: () => void;
  type?: 'button' | 'submit' | 'reset';
  isLoading: boolean;
  size?: Size;
  theme?: 'primary' | 'secondary' | 'info';
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>;
  order?: 'rtl' | 'ltr';
  fill?: boolean;
};

const Button: React.FC<ButtonPropTypes> = ({
  title,
  onPress,
  size = Size.MD,
  theme = 'primary',
  isLoading,
  icon,
  order,
  fill = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: THEMES.button[theme].background,
          paddingHorizontal: size * 3 + 1,
          paddingVertical: size * 2 + 1,
          width: fill ? '100%' : undefined,
        },
      ]}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <View style={styles.align}>
          {icon && order === 'rtl' && (
            <MaterialCommunityIcons
              {...icon}
              color={THEMES.button[theme].text}
              size={size * 4 + 10}
              style={{ marginRight: size }}
            />
          )}
          <Text
            style={[
              styles.text,
              {
                color: THEMES.button[theme].text,
                fontSize: size * 4 + 8,
                fontWeight: `${Math.max(
                  500,
                  Math.min(size * 100, 800)
                )}` as any,
              },
            ]}
          >
            {title}
          </Text>
          {icon && order === 'ltr' && (
            <MaterialCommunityIcons
              {...icon}
              color={THEMES.button[theme].text}
              size={size * 4 + 10}
              style={{ marginLeft: size }}
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
  },
});

export default Button;
