import { RootStackParamList } from '@app/types';

type Routes = {
  [key: string]: keyof RootStackParamList;
};

export default {
  PROFILES: 'ProfilesScreen',
  PROFILE_DETAILS: 'ProfileDetailsScreen',
  NEW_PROFILE: 'AddProfileScreen',
  MEASUREMENT_ENTRY_SELECTION: 'EntrySelectionScreen',
  MEASUREMENT_MANUAL: 'ManualEntryScreen',
  MEASUREMENT_FPTAPP: 'FptAppScreen',
  ABOUT_US: 'AboutUsScreen',
  SHOPS: 'StoresScreen',
  EXTERNAL_LINK: 'ExternalLinkScreen',
} as Routes;
