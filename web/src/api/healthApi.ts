import axios from "axios";
import { HealthRecord } from "../types/HealthRecord";

const API_URL = "http://localhost:5001/api/health-records";

export const getHealthRecords = async (): Promise<HealthRecord[]> => {
  console.log("Fetching");
  const response = await axios.get<HealthRecord[]>(API_URL);
  return response.data;
};

export const addHealthRecord = async (
  record: Omit<HealthRecord, "id">
): Promise<HealthRecord> => {
  console.log(record, "Pushing");
  const response = await axios.post<HealthRecord>(API_URL, record);
  return response.data;
};
