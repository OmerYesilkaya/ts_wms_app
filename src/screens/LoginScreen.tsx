import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import Constants from 'expo-constants';

import { Common } from '@app/components';
import { useAuth } from '@app/auth';
import { auth as authApi } from '@app/api';

import WebView, { WebViewNavigation } from 'react-native-webview';

const LOGOUT_URL =
  'https://app-backend-api-test-gwc.azurewebsites.net/auth/logout';
const LOGIN_URL =
  'https://app-backend-api-test-gwc.azurewebsites.net/auth/login/?p=B2C_1_signup';

let doExtract = false;

function LoginScreen() {
  const auth = useAuth();
  const [webViewUrl, setWebViewUrl] = useState(1);
  const [loginFailed, setLoginFailed] = useState(false);
  const [viewVisible, setviewVisible] = useState(true);

  const extractLogin = (state: WebViewNavigation) => {
    if (
      !doExtract &&
      state.url.startsWith('https://app-fpt-app-test-gwc.azurewebsites.net')
    ) {
      var regex = /[?&]([^=#]+)=([^&#]*)/g,
        params = {} as any,
        match;
      while ((match = regex.exec(state.url))) {
        params[match[1]] = match[2];
        if (match[1] == 'state') {
          doExtract = true;
        }
      }
      if (doExtract) {
        handleToken(params.code, params.state);
        doExtract = false;
      }
    }
  };

  const handleToken = async (code: any, state: any) => {
    const result = await authApi.login(code, state);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    auth.logIn(result.data.id_token);
  };

  return (
    <Common.Screen style={styles.container}>
      {viewVisible && (
        <WebView
          incognito={true}
          key={webViewUrl}
          source={{
            uri: auth.loggingOut ? LOGOUT_URL : LOGIN_URL,
          }}
          onNavigationStateChange={(navState) => {
            // Keep track of going back navigation within component
            extractLogin(navState);
            if (navState.url.endsWith('logout')) {
              setviewVisible(false);

              setTimeout(() => {
                setWebViewUrl(webViewUrl + 1);
                auth.setLoggingOut(false);
                setviewVisible(true);
              }, 100);
            }
          }}
        />
      )}
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
