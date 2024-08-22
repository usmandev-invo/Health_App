import React, { useEffect, useState } from "react";
import { Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import RecordItem from "./components/record-items";
import APIService from "@services/api";
import { FunctionComponent } from "@typings/function-component";
import { HealthRecordResponse } from "@typings/health-record";
import { Colors } from "@theme";
import { BASE_URL } from "@env";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@typings/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button } from "@components/button";
import { SafeAreaView } from "@components/safe-area-view";

type RecordsScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const RecordsScreen: FunctionComponent = () => {
  const navigation = useNavigation<RecordsScreenNavigationProp>();
  const [records, setRecords] = useState<HealthRecordResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getHealthRecord() {
      try {
        const apiService = APIService.getInstance(BASE_URL);
        const data = await apiService.getHealthData();
        if (data) {
          setRecords(data);
        }
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    getHealthRecord();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button style={styles.backButton} onPress={() => navigation.goBack()}>
        Back
      </Button>
      <Text style={styles.title}>Health Records</Text>
      <FlatList
        data={records}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <RecordItem
            userId={item.userId}
            date={item.date}
            hoursOfSleep={item.hoursOfSleep}
            steps={item.steps}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    marginLeft: 10,
  },
  errorText: {
    color: Colors.Error,
    textAlign: "center",
    marginTop: 16,
  },
  backButton: {
    width: "25%",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
  },
});

export default RecordsScreen;
