import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfilesScreen, LoginScreen } from '@app/screens';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="ProfilesScreen" component={ProfilesScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
