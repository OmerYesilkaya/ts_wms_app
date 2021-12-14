import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { COLORS } from '@app/constants';
import { RootStackParamList } from '@app/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const FeedNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ProfilesScreen"
      options={{
        headerStyle: { backgroundColor: COLORS.wmsColor },
        title: 'Meine Footprint',
        headerTitle: (props) => (
          <NavigationHeader title="Meine Footprint" {...props} />
        ),
      }}
      component={ProfilesScreen}
    />
    <Stack.Screen
      name="AddProfileScreen"
      options={{
        headerStyle: { backgroundColor: COLORS.wmsColor },
        title: 'Neues Profil',
        headerTitleStyle: {
          fontSize: 20,
        },
        headerBackTitleVisible: false,
      }}
      component={AddProfileScreen}
    />
    <Stack.Screen
      name="EntrySelectionScreen"
      options={{
        headerStyle: { backgroundColor: COLORS.wmsColor },
        title: 'Neues Profil',
        headerTitleStyle: {
          fontSize: 20,
        },
        headerBackTitleVisible: false,
      }}
      component={EntrySelectionScreen}
    />
    <Stack.Screen
      name="ManualEntryScreen"
      options={{
        headerStyle: { backgroundColor: COLORS.wmsColor },
        title: 'Manuelle Eingabe',
        headerTitleStyle: {
          fontSize: 20,
        },
        headerBackTitleVisible: false,
      }}
      component={ManualEntryScreen}
    />
    <Stack.Screen
      name="FptAppScreen"
      options={{
        title: 'Selbst messen',
        headerTitleStyle: {
          fontSize: 20,
        },
      }}
      component={FptAppScreen}
    />
    <Stack.Screen
      name="ProfileDetailsScreen"
      options={{
        headerStyle: { backgroundColor: COLORS.wmsColor },
        title: 'Fußentwicklung',
        headerTitleStyle: {
          fontSize: 20,
        },
        headerBackTitleVisible: false,
      }}
      component={ProfileDetailsScreen}
    />
  </Stack.Navigator>
);
export default FeedNavigator;
