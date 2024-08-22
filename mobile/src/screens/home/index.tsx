import React from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { FunctionComponent } from "@typings/function-component";
import { SafeAreaView } from "@components/safe-area-view";
import HealthRecordForm from "@components/form";
import { FontFamily } from "../../theme/fonts";
import { HealthRecord } from "@typings/health-record";
import APIService from "@services/api";
import { Button } from "@components/button";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@typings/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { BASE_URL } from "@env";

type HealthRecordFormNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

export const Home: FunctionComponent = () => {
  const navigation = useNavigation<HealthRecordFormNavigationProp>();

  const handleFormSubmit = async (values: HealthRecord) => {
    const { userId, ...restValues } = values;
    const formattedValues = {
      ...restValues,
      date: new Date(values.date).toISOString(), // Format the date to ISO 8601
    };
    try {
      const apiService = APIService.getInstance(BASE_URL);
      await apiService.addHealthData(formattedValues);
      Alert.alert("Success", "Data submitted successfully.");
    } catch (error) {
      console.log("errorrr", error);
    }
  };

  const handleViewRecords = () => {
    // Navigate to the HealthRecords screen
    navigation.navigate("Records");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Page</Text>
      <HealthRecordForm onSubmit={handleFormSubmit} />
      <Button onPress={handleViewRecords}>View Health Records</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
    fontFamily: FontFamily.SemiBold,
  },
});
