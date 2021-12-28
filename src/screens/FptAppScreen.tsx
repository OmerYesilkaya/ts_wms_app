import React, { useRef, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import measurements from '../api/measurements';

import { useApi } from '@app/hooks';
import { routes } from '@app/navigation';
import { useAuth } from '@app/auth';
import { Common } from '@app/components';
import { URLS } from '@app/constants';

function FptAppScreen({ route, navigation }: any) {
  const addMeasurementApi = useApi(measurements.addProfileMeasurement);
  const [webViewUrl, setWebViewUrl] = useState<string>();
  const { user } = useAuth();
  const webViewRef = useRef<any>(null);

  const returnHonme = () => {
    navigation.replace(routes.PROFILES);
  };

  const scripts = () => {
    return `   
    
    window.ReactNativeWebView.postMessage(document.getElementById("root").innerHTML);
    true;
    `;
  };

  return (
    <Common.Screen style={styles.container}>
      <WebView
        key={route.params.profile_id}
        ref={webViewRef} // create a ref to your webview
        javaScriptEnabledAndroid
        javaScriptEnabled
        mixedContentMode="always"
        allowUniversalAccessFromFileURLs
        mediaCapturePermissionGrantType={'grant'}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        onMessage={(event) => {
          const ResultValue =
            event.nativeEvent.data.match(
              /<div class="SuccessOutcome__RecommendSize[^>]*>(.*?)<\/div>/
            ) ?? '';

          if (ResultValue) {
            let sizes = ResultValue[1].toString().split(' ');
            let recordDate = new Date();
            const measurementData = {
              measurementDataId: Date.now(),
              profile_id: route.params.profile_id,
              bodySize: '1',
              recordDate: recordDate,
              recordDateUnix: recordDate.getTime() / 1000,
              storeName: '',
              storeId: '',
              shoe_size: sizes[0],
              shoe_width: sizes[1],
              weight: '1',
            };

            setTimeout(async () => {
              await addMeasurementApi.request(user, measurementData);
              returnHonme();
            }, 5000);
          }
        }}
        source={{
          uri: URLS.FPT_BASE_URL + URLS.FPT_APP_URL + route.params.profile_id,
        }}
        onNavigationStateChange={(navState) => {
          if (navState.url === URLS.FPT_BASE_URL + 'match/success') {
            if (!webViewRef.current) return;
            setWebViewUrl(navState.url);
            webViewRef.current.injectJavaScript(scripts());
          }
        }}
      />
    </Common.Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FptAppScreen;
