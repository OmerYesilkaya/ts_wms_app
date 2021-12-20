import React from 'react';
import { Text, View } from 'react-native';

const ErrorText: React.FC<any> = (props) => {
  console.log('error text props', props);

  return (
    <View>
      <Text>test</Text>
    </View>
  );
};

export default ErrorText;
