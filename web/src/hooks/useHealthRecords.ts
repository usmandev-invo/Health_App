import { useState, useCallback } from "react";
import { HealthRecord } from "../types/HealthRecord";
import { getHealthRecords, addHealthRecord } from "../api/healthApi";

export const useHealthRecords = () => {
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getHealthRecords();
      setRecords(data);
      setError(null);
    } catch (err) {
      setError("Failed to load records");
    } finally {
      setLoading(false);
    }
  }, []);

  const addRecord = async (record: Omit<HealthRecord, "id">) => {
    try {
      const newRecord = await addHealthRecord(record);
      setRecords((prevRecords) => [...prevRecords, newRecord]); // Optimistic update
      return newRecord;
    } catch (err) {
      setError("Failed to add record");
      return null;
    }
  };

  return { records, loading, error, addRecord, fetchRecords };
};
