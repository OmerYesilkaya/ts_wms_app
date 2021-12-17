import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import { useColorScheme } from '@app/hooks';
import { AppNavigator, AuthNavigator, navigationRef } from '@app/navigation';
import { AuthContext, storage as authStorage } from '@app/auth';

import { LocaleProvider } from './src/hooks/useLocale';

export default function App() {
  const colorScheme = useColorScheme();

  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user as any);
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );

  return (
    <AuthContext.Provider value={{ user, setUser, loggingOut, setLoggingOut }}>
      <LocaleProvider>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef} theme={undefined}>
            {user ? <AppNavigator /> : <AuthNavigator />}
            <StatusBar />
          </NavigationContainer>
        </SafeAreaProvider>
      </LocaleProvider>
    </AuthContext.Provider>
  );
}
