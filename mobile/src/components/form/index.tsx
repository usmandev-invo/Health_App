// HealthRecordForm.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import { Button } from "@components/button";
import { FontFamily, Colors } from "@theme";
import { validationSchema } from "./validations/form-validation";
import { HealthRecordFormProps } from "./typings/form-props-type";
import DateSelector from "@components/date-picker";
import { TextInput } from "@components/text-input";
import { HealthRecord } from "@typings/health-record";

const HealthRecordForm: React.FC<HealthRecordFormProps> = ({ onSubmit }) => {
  return (
    <Formik<HealthRecord>
      initialValues={{ userId: 1, date: new Date(), hoursOfSleep: 0, steps: 0 }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <Text style={styles.label}>Date:</Text>
          <DateSelector setDate={(date) => setFieldValue("date", date)} />

          <Text style={styles.label}>Hours of Sleep:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter hours of sleep"
            keyboardType="numeric"
            onChangeText={handleChange("hoursOfSleep")}
            onBlur={handleBlur("hoursOfSleep")}
            value={values.hoursOfSleep.toString()}
          />
          {touched.hoursOfSleep && errors.hoursOfSleep ? (
            <Text style={styles.errorText}>{errors.hoursOfSleep}</Text>
          ) : null}

          <Text style={styles.label}>Steps:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={handleChange("steps")}
            placeholder="Enter steps"
            onBlur={handleBlur("steps")}
            value={values.steps.toString()}
          />
          {touched.steps && errors.steps ? (
            <Text style={styles.errorText}>{errors.steps}</Text>
          ) : null}

          <Button onPress={() => handleSubmit()}>Submit</Button>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
    fontFamily: FontFamily.Regular,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.Black,
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
    fontFamily: FontFamily.Regular,
  },
  errorText: {
    color: Colors.Error,
  },
});

export default HealthRecordForm;
