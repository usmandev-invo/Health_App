// RecordItem.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RecordItemProps } from "./record-item-prop";
import moment from "moment";
import { FontFamily } from "@theme";
const RecordItem: React.FC<RecordItemProps> = ({
  date,
  hoursOfSleep,
  steps,
}) => {
  const formattedDate = moment(date).format('MMMM D, YYYY');
  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{formattedDate}</Text>
      <Text style={styles.detailText}>Hours of Sleep: {hoursOfSleep}</Text>
      <Text style={styles.detailText}>Steps: {steps}</Text>
    </View>
  );
};

// Styles for the RecordItem component
const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dateText: {
    fontSize: 18,
    fontFamily: FontFamily.SemiBold,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 4,
    fontFamily: FontFamily.Regular,
  },
});

export default RecordItem;
