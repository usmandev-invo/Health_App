import React, { useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import DatePicker from "react-native-date-picker";
import { FunctionComponent } from "@typings/function-component";
import { DateSelectorProps } from "./typings/date-picker-props";

export const DateSelector: FunctionComponent<DateSelectorProps> = ({
  setDate,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleConfirm = (date: Date) => {
    setOpen(false);
    setSelectedDate(date);
    setDate(date); // Call setDate with the selected date
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString(); // You can customize the format here
  };

  return (
    <View style={styles.container}>
      <Button onPress={() => setOpen(true)} title="Select a date" />
      <DatePicker
        modal
        open={open}
        date={selectedDate || new Date()}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
      {selectedDate && (
        <Text style={styles.dateText}>
          Selected Date: {formatDate(selectedDate)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    marginTop: 10,
    color: "#333",
  },
});

export default DateSelector;
