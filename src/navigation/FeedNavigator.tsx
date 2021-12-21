import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { COLORS } from '@app/constants';
import { NavigationHeader } from '@app/components';
import {
  ProfilesScreen,
  AddProfileScreen,
  EntrySelectionScreen,
  ManualEntryScreen,
  ProfileDetailsScreen,
  FptAppScreen,
} from '@app/screens';

const Stack = createStackNavigator();

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
