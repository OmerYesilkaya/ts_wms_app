import AppNavigator from './AppNavigator';
import AccountNavigator from './AccountNavigator';
import AuthNavigator from './AuthNavigator';
import FeedNavigator from './FeedNavigator';

import routes from './routes';

import { createRef } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

const navigationRef = createRef<NavigationContainerRef<any>>();
const navigate = (name: any, params: any) =>
  navigationRef.current?.navigate(name, params);

export {
  AppNavigator,
  AccountNavigator,
  AuthNavigator,
  FeedNavigator,
  routes,
  navigate,
  navigationRef,
};
