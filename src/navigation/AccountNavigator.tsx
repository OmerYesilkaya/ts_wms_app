import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { AccountScreen } from '@app/screens';

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AccountScreen"
      options={{
        headerShown: false,
      }}
      component={AccountScreen}
    />
    {/* <Stack.Screen
      name="AboutUsScreen"
      options={{
        title: '',
        headerBackTitleVisible: false,
      }}
      component={AboutUsScreen}
    />
    <Stack.Screen
      name="ExternalLinkScreen"
      options={{
        title: '', //Datenschutzerklärung
        headerBackTitleVisible: false,
      }}
      component={ExternalLinkScreen}
    /> */}
  </Stack.Navigator>
);

export default AccountNavigator;
