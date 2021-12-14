import { Text, View } from 'react-native';

const ErrorMessage: React.FC<any> = (props) => {
  console.log('props', props);

  return (
    <View>
      <Text>test</Text>
    </View>
  );
};

export default ErrorMessage;
