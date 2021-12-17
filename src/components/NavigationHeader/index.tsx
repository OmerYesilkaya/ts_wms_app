import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type NavigationHeaderPropTypes = {
  title: string;
};

const NavigationHeader: React.FC<NavigationHeaderPropTypes> = ({ title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  title: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default NavigationHeader;
