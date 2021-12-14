import React from 'react';

import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { aboutus, impressum, wissenswertes } from '@app/html';

import { RootStackParamList } from '@app/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AboutUsScreen'>;

function AboutUsScreen({ route }: Props) {
  let html = '';

  switch (route.params.staticPage) {
    case 'aboutus':
      html = aboutus;
      break;
    case 'impressum':
      html = impressum;
      break;
    case 'faq':
      html = wissenswertes;
      break;
  }
  return (
    route?.params?.staticPage != 'external' && (
      <WebView
        style={styles.container}
        originWhitelist={['*']}
        source={html as any}
      />
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AboutUsScreen;
