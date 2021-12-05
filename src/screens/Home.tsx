import { Text, View } from 'react-native';

type HomePropTypes = {
  defaultValue: string;
};

const Home: React.FC<HomePropTypes> = ({ defaultValue }) => {
  return (
    <View>
      <Text>test</Text>
    </View>
  );
};

export default Home;
