import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type EditScreenInfoPropTypes = {
  path: string;
};

const EditScreenInfo: React.FC<EditScreenInfoPropTypes> = ({ path }) => {
  return (
    <View>
      <Text>test</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
});

export default EditScreenInfo;
