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
      <View style={{ flexDirection: 'row' }}>
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
        <Common.RadioInput
          size={Size.SM}
          title="mannlich"
          onPress={() => null}
          selected={false}
          theme="primary"
          icon={{ name: 'face' }}
          order="rtl"
          fill={false}
        />
      </View>
      <Text style={styles.title}>TextInput</Text>
      <Common.TextInput
        label="TextInputLabel"
        name="test"
        placeholder="Enter test value"
        icon={{ name: 'face' }}
        size={Size.SM}
      />
      <Common.SelectInput
        label="SelectLabel"
        items={[
          { value: 1, label: 'test1' },
          { value: 2, label: 'test2' },
        ]}
        onValueChange={() => null}
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
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 20,
  },
});
