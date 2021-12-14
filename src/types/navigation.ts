import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

type RootStackParamList = {
  HomeScreen: NavigatorScreenParams<RootTabParamList> | undefined;
  NotFoundScreen: NavigatorScreenParams<RootTabParamList> | undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  AboutUsScreen: { staticPage: string };
  AccountScreen: NavigatorScreenParams<RootTabParamList> | undefined;
  ProfilesScreen: undefined;
  ProfileDetailsScreen: undefined;
  AddProfileScreen: {
    birthdate: string;
    gender: string;
    name: string;
    profile_id: string;
  };
  EntrySelectionScreen: undefined;
  ManualEntryScreen: undefined;
  FptAppScreen: undefined;
  StoresScreen: undefined;
  ExternalLinkScreen: undefined;
};

type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

type RootTabParamList = {
  FeedNavigator: undefined;
  StoresScreen: undefined;
  AccountNavigator: undefined;
};

type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type {
  RootTabScreenProps,
  RootStackScreenProps,
  RootStackParamList,
  RootTabParamList,
};
