import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import { Common, List } from '@app/components';
import { COLORS } from '@app/constants';
import { useAuth } from '@app/auth';

import { DATA } from '@app/constants';

// Change any types when navigation part is ts
function AccountScreen({ navigation }: any) {
  const { user, logOut } = useAuth();

  function handleAccountClick() {
    return null;
  }

  return (
    <Common.Screen style={styles.screen}>
      <FlatList
        data={[
          {
            title: user?.given_name ?? '',
            subTitle: user?.emails[0],
            icon: null,
            targetScreen: null,
            styles: undefined,
          },
          ...DATA.aboutUsMenuItems,
        ]}
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
