import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import Constants from 'expo-constants';

import { Common } from '@app/components';
import { useAuth } from '@app/auth';

import WebView, { WebViewNavigation } from 'react-native-webview';

const LOGOUT_URL =
  'https://app-backend-api-dev-gwc.azurewebsites.net/auth/logout';
const LOGIN_URL =
  'https://app-backend-api-dev-gwc.azurewebsites.net/auth/login/?p=B2C_1_signup';

let doExtract = false;
function LoginScreen() {
  const auth = useAuth();
  const [webViewUrl, setSetWebViewUrl] = useState(1);
  const [loginFailed, setLoginFailed] = useState(false);

  const extractLogin = (state: WebViewNavigation) => {
    console.log('PAGECHANGED:', state);

    if (
      !doExtract &&
      state.url.startsWith('https://app-fpt-app-dev-gwc.azurewebsites.net')
    ) {
      console.log('its good url  ', state.url);
      var regex = /[?&]([^=#]+)=([^&#]*)/g,
        params = {},
        match;
      while ((match = regex.exec(state.url))) {
        params[match[1]] = match[2];
        if (match[1] == 'state') {
          console.log('found state param in url  ', state.url);
          doExtract = true;
        }
      }
      if (doExtract) {
        console.log('extracting params  ', params);
        auth.logIn(params as any).then((result: any) => {
          console.log('LOGIN RESULT', result);
        }); // ??
      }
    }
  };
  //

  return (
    <Common.Screen style={styles.container}>
      <WebView
        key={webViewUrl}
        source={{
          uri: auth.loggingOut ? LOGOUT_URL : LOGIN_URL,
        }}
        onNavigationStateChange={(navState) => {
          // Keep track of going back navigation within component
          extractLogin(navState);
          if (navState.url.endsWith('index.html')) {
            // setSetWebViewUrl(webViewUrl + 1);
            setTimeout(() => {
              auth.setLoggingOut(false);
            }, 1000);
            console.log('statechanged');
            console.log(' auth.loggingOut ', auth.loggingOut);
          }
        }}
      />
    </Common.Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: Constants.statusBarHeight,
  },
});
export default LoginScreen;
