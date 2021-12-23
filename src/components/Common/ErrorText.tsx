import { COLORS } from '@app/constants';
import React from 'react';
import { Text, View } from 'react-native';

const ErrorText: React.FC = ({ children }) => {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ color: COLORS.danger }}>{children}</Text>
    </View>
  );
};

export default ErrorText;
