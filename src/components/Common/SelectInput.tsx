import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

type Item = {
  label: string;
  value: string | number;
};

type SelectInputPropTypes = {
  items: Item[];
  label: string;
  onValueChange: (value: string | number) => void;
};

const SelectInput: React.FC<SelectInputPropTypes> = ({
  label,
  items,
  onValueChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <RNPickerSelect
        items={items}
        onValueChange={onValueChange}
        style={pickerSelectStyles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 5,

    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 5,

    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default SelectInput;
