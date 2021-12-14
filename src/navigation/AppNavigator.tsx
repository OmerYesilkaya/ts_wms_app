import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { RootTabParamList } from '@app/types';
import { AccountNavigator } from '.';

const Tab = createBottomTabNavigator<RootTabParamList>();

type AppNavigatorPropTypes = {
  colorScheme: 'light' | 'dark';
};

const AppNavigator: React.FC<AppNavigatorPropTypes> = ({ colorScheme }) => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    {/* <Tab.Screen
      name="FeedNavigator"
      component={FeedNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="foot-print" color={color} size={size} />
        ),
      }}
    /> */}
    {/* <Tab.Screen
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
      }}
    /> */}
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
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
