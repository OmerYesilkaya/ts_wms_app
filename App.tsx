import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import { useCachedResources, useColorScheme } from '@app/hooks';
import { AppNavigator, navigationRef } from '@app/navigation';

import { LocaleProvider } from './src/hooks/useLocale';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <LocaleProvider>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef} theme={undefined}>
            <AppNavigator colorScheme={colorScheme} />
            <StatusBar />
          </NavigationContainer>
        </SafeAreaProvider>
      </LocaleProvider>
    );
  }
}
