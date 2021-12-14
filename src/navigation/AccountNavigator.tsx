import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '@app/types';
import { AccountScreen } from '@app/screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

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
