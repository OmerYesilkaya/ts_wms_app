import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Common } from '@app/components';
import { Size } from '@app/types';

const Home: React.FC = () => {
  return (
    <View style={styles.center}>
      <Text style={styles.header}>Components</Text>
      <Text style={styles.title}>Button</Text>
      <Common.Button
        size={Size.SM}
        theme="secondary"
        title="Weiter"
        order="rtl"
        isLoading={false}
        onPress={() => null}
        fill={true}
      />
      <Text style={styles.title}>RadioInput</Text>
      <Common.RadioInput
        size={Size.SM}
        title="mannlich"
        onPress={() => null}
        selected={true}
        theme="primary"
        icon={{ name: 'face' }}
        order="rtl"
        fill={false}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 5,
  },
});
