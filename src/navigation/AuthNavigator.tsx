import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@app/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

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
