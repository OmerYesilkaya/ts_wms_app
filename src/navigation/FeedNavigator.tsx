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

  const headerStyles = {
    headerStyle: { backgroundColor: COLORS.white },
    headerTitleStyle: {
      fontSize: 20,
      color: COLORS.wmsColorDark,
    },
    headerBackTitleStyle: {
      color: COLORS.wmsColorDark,
    },
    headerTintColor: COLORS.wmsColorDark,
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfilesScreen"
        options={{
          title: t('titles.profilesScreen', SCOPE_OPTIONS),
          ...headerStyles,
        }}
        component={ProfilesScreen}
      />
      <Stack.Screen
        name="AddProfileScreen"
        options={{
          title: t('titles.addProfileScreen', SCOPE_OPTIONS),
          headerBackTitleVisible: false,
          ...headerStyles,
        }}
        component={AddProfileScreen}
      />
      <Stack.Screen
        name="EntrySelectionScreen"
        options={{
          title: t('titles.entrySelectionScreen', SCOPE_OPTIONS),
          headerBackTitleVisible: false,
          ...headerStyles,
        }}
        component={EntrySelectionScreen}
      />
      <Stack.Screen
        name="ManualEntryScreen"
        options={{
          title: t('titles.manualEntryScreen', SCOPE_OPTIONS),
          headerBackTitleVisible: false,
          ...headerStyles,
        }}
        component={ManualEntryScreen}
      />
      <Stack.Screen
        name="FptAppScreen"
        options={{
          title: t('titles.fptAppScreen', SCOPE_OPTIONS),
          ...headerStyles,
        }}
        component={FptAppScreen}
      />
      <Stack.Screen
        name="ProfileDetailsScreen"
        options={{
          title: t('titles.profileDetailsScreen', SCOPE_OPTIONS),
          headerBackTitleVisible: false,
          ...headerStyles,
        }}
        component={ProfileDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default FeedNavigator;
