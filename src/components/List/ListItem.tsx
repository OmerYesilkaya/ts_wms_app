import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Text,
  Animated,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Swipeable } from 'react-native-gesture-handler';
import { COLORS } from '@app/constants';

type ListItemPropTypes = {
  title: string;
  subTitle?: string;
  style: any; // fix
  image?: string;
  iconName?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  iconColor?: string;
  onPress: () => void;
  renderRightActions?: (
    progressAnimatedValue: Animated.AnimatedInterpolation,
    dragAnimatedValue: Animated.AnimatedInterpolation
  ) => React.ReactNode;
};

const ListItem: React.FC<ListItemPropTypes> = ({
  title,
  subTitle,
  style,
  image,
  iconName,
  iconColor,
  onPress,
  renderRightActions,
}) => {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={COLORS.light} onPress={onPress}>
        <View style={[styles.container, style]}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: iconColor,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MaterialCommunityIcons name={iconName} color="#fff" size={20} />
          </View>
          {image && <Image style={styles.image} source={{ uri: image }} />}
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {subTitle && (
              <Text style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </Text>
            )}
          </View>
          <MaterialCommunityIcons
            color={COLORS.medium}
            name="chevron-right"
            size={25}
          />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    backgroundColor: COLORS.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  subTitle: {
    color: COLORS.medium,
  },
  title: {
    fontWeight: '500',
  },
});

export default ListItem;
