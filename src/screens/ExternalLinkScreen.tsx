import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

// fix when navigation is in ts
function ExternalLinkScreen({ route }: any) {
  return (
    <WebView
      style={styles.container}
      originWhitelist={['*']}
      source={{ uri: route.params.externalLink }}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ExternalLinkScreen;
