import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { AccountNavigator, FeedNavigator } from '.';
import { StoresScreen } from '@app/screens';
import { COLORS } from '@app/constants';

const Tab = createBottomTabNavigator();

type AppNavigatorPropTypes = {
  colorScheme?: 'light' | 'dark';
};

const AppNavigator: React.FC<AppNavigatorPropTypes> = ({
  colorScheme = 'light',
}) => {
  const tabStyles = {
    tabBarInactiveTintColor: COLORS.medium,
    tabBarActiveTintColor: COLORS.wmsColorDark,
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="FeedNavigator"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="foot-print"
              color={color}
              size={size}
            />
          ),
          ...tabStyles,
        }}
      />
      <Tab.Screen
        name="StoresScreen"
        component={StoresScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="map-search-outline"
              color={color}
              size={size}
            />
          ),
          ...tabStyles,
        }}
      />
      <Tab.Screen
        name="AccountNavigator"
        component={AccountNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="information-outline"
              color={color}
              size={size}
            />
          ),
          ...tabStyles,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
