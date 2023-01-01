import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

const DateRangePicker = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const formattedDate = (date) => {
    date = date.split(" ");
    return date[1]+" "+date[2]+" "+date[3];
  }
  return (
    <View>
      {showCalendar ? (
        <CalendarPicker
          selectedDate={selectedDate}
          onDateChange={(date) => {
            setSelectedDate(date);
            setShowCalendar(false);
          }}
        />
      ) : (
        <TouchableOpacity onPress={() => setShowCalendar(true)}>
          <Text>{selectedDate ? formattedDate(selectedDate.toString()) : 'Select a date'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DateRangePicker;