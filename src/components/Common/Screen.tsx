import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import Constants from 'expo-constants';

import { COLORS } from '@app/constants';

type ScreenPropTypes = {
  style: any;
};

const Screen: React.FC<ScreenPropTypes> = ({ style, children }) => {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={style}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLORS.wmsColor,
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
});

export default Screen;
