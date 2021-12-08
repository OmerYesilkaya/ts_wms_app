import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type DateInputPropTypes = {
  label: string;
  mode?: 'date' | 'time' | 'datetime';
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

const DateInput: React.FC<DateInputPropTypes> = ({
  label,
  mode = 'date',
  date,
  setDate,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.date}>
          {date
            ? date.toLocaleDateString('de-DE', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
            : 'Select a date...'}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        date={date}
        isVisible={isVisible}
        mode={mode}
        onConfirm={(value: Date) => {
          setDate(value);
          setIsVisible(false);
        }}
        onCancel={() => setIsVisible(false)}
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
  trigger: {
    width: '100%',
    height: 42,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 10,
  },
  date: {
    fontSize: 16,
  },
});

export default DateInput;
