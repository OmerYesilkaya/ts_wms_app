import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Home: React.FC = () => {
  return (
    <View style={styles.center}>
      <Text>Home Screen</Text>
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
