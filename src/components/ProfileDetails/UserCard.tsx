import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { date as dateUtils } from '@app/utility';
import { COLORS } from '@app/constants';
import { useLocale } from '@app/hooks';
import { Gender } from '@app/types';

type UserCardPropTypes = {
  profile: any;
};

const UserCard: React.FC<UserCardPropTypes> = ({ profile }) => {
  const { t } = useLocale();
  const SCOPE_OPTIONS = {
    scope: 'components.ProfileDetails.UserCard',
  };

  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileImageContainer}>
        <Image
          style={styles.profileImage}
          source={
            profile.gender === Gender.MALE
              ? require('@app/images/ic_boy.png')
              : require('@app/images/ic_boy.png')
          }
        />
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.header}>{profile.name}</Text>
        {profile.measurements && profile.measurements.length > 0 && (
          <>
            <Text style={styles.infoText}>
              {t('labels.lastMeasurementSize', {
                value: profile.lastMeasurementSize,
                ...SCOPE_OPTIONS,
              })}
            </Text>
            <Text style={styles.infoText}>
              {t('labels.shoeWidth', {
                value: profile.shoe_width,
                ...SCOPE_OPTIONS,
              })}
            </Text>
            <Text style={styles.infoText}>
              {t('labels.lastMeasurementUnix', {
                value: dateUtils
                  .unixDateFormat(profile.lastMeasurementUnix)
                  .toLocaleString('de-DE', {
                    month: 'long',
                    year: 'numeric',
                  }),
                ...SCOPE_OPTIONS,
              })}
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.white,
  },
  headerContainer: {
    flexGrow: 2.2,
    minHeight: 80,
  },
  profileImage: {
    flex: 1,
    flexGrow: 1,
    height: '100%',
    resizeMode: 'contain',
    marginRight: 10,
    width: '100%',
  },
  profileImageContainer: {
    backgroundColor: COLORS.white,
    shadowColor: 'rgb(0,50,0)',
    shadowOpacity: 0.2,
    shadowOffset: { height: 3, width: 0 },
    borderRadius: 5,
    paddingVertical: 10,
    width: 82,
    marginRight: 15,
  },
  profileContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.wmsColorDark,
    borderRadius: 5,
    padding: 10,
    height: 100,
  },
  infoText: {
    fontSize: 15,
    color: COLORS.white,
  },
});

export default UserCard;
