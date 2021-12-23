import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { AboutUsScreen, AccountScreen, ExternalLinkScreen } from '@app/screens';
import { useLocale } from '@app/hooks';

const Stack = createStackNavigator();

const AccountNavigator = () => {
  const { t } = useLocale();
  const SCOPE_OPTIONS = {
    scope: 'navigation.AccountNavigator',
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AccountScreen"
        options={{
          headerShown: false,
        }}
        component={AccountScreen}
      />
      <Stack.Screen
        name="AboutUsScreen"
        options={{
          title: t('titles.aboutUsScreen', SCOPE_OPTIONS),
          headerBackTitleVisible: false,
        }}
        component={AboutUsScreen}
      />

      <Stack.Screen
        name="ExternalLinkScreen"
        options={{
          title: t('titles.externalLinkScreen', SCOPE_OPTIONS), //Datenschutzerklärung
          headerBackTitleVisible: false,
        }}
        component={ExternalLinkScreen}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
