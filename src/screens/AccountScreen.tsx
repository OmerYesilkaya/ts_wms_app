import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { List } from '@app/components';
import { COLORS } from '@app/constants';
import { useAuth } from '@app/hooks';
import { RootStackParamList } from '@app/types';

import { SafeAreaView } from 'react-native-safe-area-context';
import { DATA } from '@app/constants';

type Props = NativeStackScreenProps<RootStackParamList, 'AccountScreen'>;

function AccountScreen({ navigation }: Props) {
  const { user, logOut } = useAuth();

  function handleAccountClick() {
    return null;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={[
          {
            title: user?.given_name ?? '',
            subTitle: user?.emails[0],
            icon: null,
            targetScreen: null,
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLORS.light,
    flex: 1,
  },
});

export default AccountScreen;
