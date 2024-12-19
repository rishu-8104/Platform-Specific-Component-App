import React from 'react';
import { View, Text, Platform, Button, DatePickerIOS, DatePickerAndroid, StyleSheet } from 'react-native';

const PlatformSpecificComponent = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const openDatePicker = async () => {
    try {
      if (Platform.OS === 'ios') {
        // For iOS, directly set showDatePicker to true
        setShowDatePicker(true);
      } else if (Platform.OS === 'android') {
        // For Android, use the DatePickerAndroid method directly
        const { action, year, month, day } = await DatePickerAndroid.open({
          date: selectedDate,
        });

        if (action !== DatePickerAndroid.dismissedAction) {
          const newDate = new Date(year, month, day);
          setSelectedDate(newDate);
        }
      }
    } catch (error) {
      console.warn('Error opening date picker', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.commonText}>Common Component</Text>

      {Platform.OS === 'android' && <Text style={styles.androidText}>Android-Specific Component</Text>}

      {Platform.OS === 'ios' && <Text style={styles.iosText}>iOS-Specific Component</Text>}

      <Button title="Open Date Picker" onPress={() => openDatePicker()} style={styles.button} />

      {showDatePicker && Platform.OS === 'ios' && (
        <DatePickerIOS
          style={styles.datePicker}
          date={selectedDate}
          onDateChange={(date) => {
            setSelectedDate(date);
            setShowDatePicker(false);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  commonText: {
    fontSize: 18,
    marginBottom: 10,
  },
  androidText: {
    fontSize: 16,
    color: 'green',
    marginBottom: 10,
  },
  iosText: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 10,
  },
  datePicker: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default PlatformSpecificComponent;
