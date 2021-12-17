import React from 'react';
import LottieView from 'lottie-react-native';

type LoaderPropTypes = {
  isVisible: boolean;
};

const Loader: React.FC<LoaderPropTypes> = ({ isVisible = false }) => {
  if (!isVisible) return null;
  return (
    <LottieView
      autoPlay
      loop
      source={require('../../assets/animations/loader.json')}
    />
  );
};

export default Loader;
