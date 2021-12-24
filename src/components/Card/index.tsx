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
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={image} />
        </View>
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
    backgroundColor: COLORS.wmsColorDark,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
    height: 80,
  },
  detailsContainer: {
    flexGrow: 1.3,
    marginLeft: 20,
  },
  image: {
    flex: 1,
    flexGrow: 1.2,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  imageContainer: {
    width: 63,
    backgroundColor: 'white',
    paddingVertical: 7,
    borderRadius: 5,
    shadowColor: 'rgb(0,50,0)',
    shadowOpacity: 0.2,
    shadowOffset: { height: 3, width: 0 },
  },
  subTitle: {
    color: COLORS.white,
    fontWeight: '500',
  },
  title: {
    fontWeight: 'bold',
    color: COLORS.white,
    fontSize: 20,
  },
});

export default Card;
