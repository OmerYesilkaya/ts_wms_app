import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Common, List } from '@app/components';
import { useAuth } from '@app/auth';
import { COLORS } from '@app/constants';
import { routes } from '@app/navigation';

type MenuItem = {
  title: string;
  subTitle?: string;
  icon: Icon | null;
  styles?: any; // fix
  targetScreen: string | null;
  staticPage?: string;
  externalLink?: string;
};

type Icon = {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  backgroundColor: string;
};

// Change any types when navigation part is ts
function AccountScreen({ navigation }: any) {
  const { user, logOut } = useAuth();

  function handleAccountClick() {
    return null;
  }
  const aboutUsMenuItems = [
    {
      title: user.given_name,
      subTitle: user.emails[0],
      icon: null,
      targetScreen: null,
    },
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
  return (
    <Common.Screen style={styles.screen}>
      <FlatList
        data={aboutUsMenuItems}
        keyExtractor={(menuItem) => menuItem.title ?? ''}
        ItemSeparatorComponent={List.Seperator}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            subTitle={item.subTitle}
            style={[
              item.styles,
              item.targetScreen === 'logout' && { marginTop: 10 },
            ]}
            iconName={item.icon?.name}
            iconColor={item.icon?.backgroundColor}
            onPress={() => {
              item.targetScreen === 'logout'
                ? logOut()
                : item.targetScreen === null
                ? handleAccountClick()
                : navigation.navigate(item.targetScreen as any, item);
            }}
          />
        )}
      />
    </Common.Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLORS.light,
    flex: 1,
  },
});

export default AccountScreen;
