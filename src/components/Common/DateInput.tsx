import React, { useState } from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type DateInputPropTypes = {
  label: string;
  placeholder: string;
  mode?: 'date' | 'time' | 'datetime';
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
};

const DateInput: React.FC<DateInputPropTypes> = ({
  label,
  placeholder,
  mode = 'date',
  date,
  setDate,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  console.log('what is wrong bro, date', date);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => setIsVisible(true)}
      >
        <MaterialCommunityIcons name="calendar" size={30} />
        <Text style={[styles.date, { color: date ? 'default' : 'lightgray' }]}>
          {date
            ? date.toLocaleDateString('de-LI', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
            : placeholder}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        date={date ?? undefined}
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
    flexDirection: 'row',
    width: '100%',
    height: 42,
    borderRadius: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 7,
  },
  date: {
    fontSize: 16,
    flex: 1,
    height: '100%',
    padding: 10,
  },
});

export default DateInput;
