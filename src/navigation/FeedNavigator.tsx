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
import { useLocale } from '@app/hooks';

const Stack = createStackNavigator();

const FeedNavigator = () => {
  const { t } = useLocale();
  const SCOPE_OPTIONS = {
    scope: 'navigation.FeedNavigator',
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfilesScreen"
        options={{
          headerStyle: { backgroundColor: COLORS.wmsColor },
          title: t('titles.profilesScreen', SCOPE_OPTIONS),
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
          title: t('titles.addProfileScreen', SCOPE_OPTIONS),
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
          title: t('titles.entrySelectionScreen', SCOPE_OPTIONS),
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
          title: t('titles.manualEntryScreen', SCOPE_OPTIONS),
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
          title: t('titles.fptAppScreen', SCOPE_OPTIONS),
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
          title: t('titles.profileDetailsScreen', SCOPE_OPTIONS),
          headerTitleStyle: {
            fontSize: 20,
          },
          headerBackTitleVisible: false,
        }}
        component={ProfileDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default FeedNavigator;
