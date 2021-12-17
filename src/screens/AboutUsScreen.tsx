import React from 'react';

import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import { aboutus, impressum, wissenswertes } from '@app/html';

// Change any types when navigation part is ts
function AboutUsScreen({ route }: any) {
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
