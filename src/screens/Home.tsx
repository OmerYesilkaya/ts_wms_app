import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Common } from '@app/components';
import { ButtonSize } from '@app/types';

const Home: React.FC = () => {
  return (
    <View style={styles.center}>
      <Text>Home Screen</Text>
      <Common.Button
        size={ButtonSize.MD}
        theme="primary"
        title="test"
        icon={{ name: 'information-outline' }}
        order="rtl"
        isLoading={false}
        onPress={() => null}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
