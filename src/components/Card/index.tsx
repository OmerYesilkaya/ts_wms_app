import { COLORS } from '@app/constants';
import { useLocale } from '@app/hooks';
import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ImageSourcePropType,
} from 'react-native';
import { TouchableOpacity } from 'react-native';

type CardPropTypes = {
  name: string;
  shoeSize: string;
  lastMeasurement: string;
  image: ImageSourcePropType;
  onPress: () => void;
};

const Card: React.FC<CardPropTypes> = ({
  name,
  shoeSize,
  lastMeasurement,
  image,
  onPress,
}) => {
  const { t } = useLocale();
  const SCOPE_OPTIONS = {
    scope: 'components.Card.index',
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} source={image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.subTitle} numberOfLines={2}>
            {t('labels.shoeSize', { shoeSize, ...SCOPE_OPTIONS })}
          </Text>
          <Text style={styles.subTitle} numberOfLines={2}>
            {lastMeasurement}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: COLORS.wmsColorMedium,
    marginBottom: 10,
    padding: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  detailsContainer: {
    flexGrow: 1.3,
    marginLeft: 20,
  },
  image: {
    flex: 1,
    flexGrow: 1.2,
    height: '100%',
    resizeMode: 'contain',
  },
  subTitle: {
    color: COLORS.black,
    fontWeight: '500',
  },
  title: {
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: 20,
  },
});

export default Card;
