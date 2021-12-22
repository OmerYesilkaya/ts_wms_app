import React from 'react';

import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import aboutUsHTML from '@app/html/aboutus.html';
import impressumHTML from '@app/html/impressum.html';
import wissenswertesHTML from '@app/html/wissenswertes.html';

// Change any types when navigation part is ts
function AboutUsScreen({ route }: any) {
  let html = '';

  switch (route.params.staticPage) {
    case 'aboutus':
      html = aboutUsHTML;
      break;
    case 'impressum':
      html = impressumHTML;
      break;
    case 'faq':
      html = wissenswertesHTML;
      break;
  }
  return route?.params?.staticPage != 'external' ? (
    <WebView
      style={styles.container}
      originWhitelist={['*']}
      source={html as any}
    />
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AboutUsScreen;
