import { routes } from '@app/navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '.';

type Icon = {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  backgroundColor: string;
};

type MenuItem = {
  title: string;
  subTitle?: string;
  icon: Icon | null;
  styles?: any; // fix
  targetScreen: string | null;
  staticPage?: string;
  externalLink?: string;
};

const aboutUsMenuItems = [
  {
    title: 'Meine Footprints',
    icon: {
      name: 'foot-print',
      backgroundColor: COLORS.primary,
    },
    targetScreen: routes.PROFILES,
  },
  {
    title: 'Shops finden',
    icon: {
      name: 'map-search-outline',
      backgroundColor: COLORS.primary,
    },
    targetScreen: routes.SHOPS,
  },
  {
    title: 'Wissenswertes', //  useful information
    icon: {
      name: 'comment-question-outline',
      backgroundColor: COLORS.primary,
    },
    staticPage: 'faq',
    targetScreen: routes.ABOUT_US,
  },
  {
    styles: { paddingTop: 30 },
    title: 'Über uns', //    about us
    icon: {
      name: 'information-outline',
      backgroundColor: COLORS.wmsColorMedium,
    },
    staticPage: 'aboutus',
    targetScreen: routes.ABOUT_US,
  },
  // {
  //   title: "Einstellungen", //settings
  //   icon: {
  //     name: "email",
  //     backgroundColor: COLORS.secondary,
  //   },
  //   targetScreen: routes.MESSAGES,
  // },
  {
    title: 'Impressum', //imprint
    icon: {
      name: 'email',
      backgroundColor: COLORS.wmsColorMedium,
    },
    staticPage: 'impressum',
    targetScreen: routes.ABOUT_US,
  },
  {
    title: 'Datenschutzerklärung', //imprint
    icon: {
      name: 'shield-check-outline',
      backgroundColor: COLORS.wmsColorMedium,
    },
    staticPage: 'external',
    externalLink: 'https://footprinttech.de/wms-dsgvo/',
    targetScreen: routes.EXTERNAL_LINK,
  },
  {
    title: 'Logout',
    icon: {
      name: 'logout',
      backgroundColor: COLORS.medium,
    },
    targetScreen: 'logout',
  },
] as MenuItem[];

export default { aboutUsMenuItems };
