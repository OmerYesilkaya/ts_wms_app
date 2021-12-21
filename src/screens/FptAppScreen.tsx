import React, { useRef, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import measurements from '../api/measurements';

import { useApi } from '@app/hooks';
import { routes } from '@app/navigation';
import { useAuth } from '@app/auth';
import { Common } from '@app/components';

const baseUrl = 'https://app-fpt-app-prod-gwc-staging.azurewebsites.net/'; // ''; //'http://192.168.8.192:3000/'; //'

function FptAppScreen({ route, navigation }: any) {
  const addMeasurementApi = useApi(measurements.addProfileMeasurement);
  const [webViewUrl, setWebViewUrl] = useState<string>();
  const { user } = useAuth();
  const webViewRef = useRef<any>(null);

  const returnHonme = () => {
    navigation.replace(routes.PROFILES);
  };
  console.log(
    baseUrl +
      '?articleName=PFI+Test+Shoe+%28WMS%29&articleNumber=WMS_APP&productSrc=https%3A%2F%2Fshopware.podolino.de%2Fmedia%2Fimage%2F82%2F02%2Ff7%2Fezgif-com-gif-maker1_200x200.jpg&apiKey=12k65T78c.&sizes=20%2C21%2C22%2C23%2C24%2C25%2C26%2C27%2C28%2C29%2C30%2C31%2C32%2C33%2C34%2C35%2C36%2C37%2C38%2C39%2C40%2C41%2C42%2C43%2C44%2C45%2C46%2C47%2C48%2C49%2C50&profile_id=' +
      route.params.profile_id
  );

  const scripts = () => {
    //const color = getRandomColor();

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
            console.log('ResultValue', ResultValue);
            console.log('SIZE', Number(sizes[0]));
            console.log('WIDTH', sizes[1]);
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
              const resultApi = await addMeasurementApi.request(
                user,
                measurementData
              );
              returnHonme();
            }, 5000);
          }
        }}
        source={{
          uri:
            baseUrl +
            '?articleName=PFI+Test+Shoe+%28WMS%29&articleNumber=WMS_APP&productSrc=https%3A%2F%2Fshopware.podolino.de%2Fmedia%2Fimage%2F82%2F02%2Ff7%2Fezgif-com-gif-maker1_200x200.jpg&apiKey=12k65T78c.&sizes=20%2C21%2C22%2C23%2C24%2C25%2C26%2C27%2C28%2C29%2C30%2C31%2C32%2C33%2C34%2C35%2C36%2C37%2C38%2C39%2C40%2C41%2C42%2C43%2C44%2C45%2C46%2C47%2C48%2C49%2C50&profile_id=' +
            route.params.profile_id,
        }}
        onNavigationStateChange={(navState) => {
          // Keep track of going back navigation within component
          // console.log('nav changed', navState);
          if (navState.url === baseUrl + 'match/success') {
            if (!webViewRef.current) return;
            setWebViewUrl(navState.url);
            webViewRef.current.injectJavaScript(scripts());
            console.log('');
          }
          // console.log('statechanged: ', navState.url);
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
