export interface HealthRecord {
  userId: number; // This can be a static value or could be fetched dynamically if required
  date: Date;
  hoursOfSleep: number;
  steps: number;
}

export interface HealthRecordResponse {
  _id: string;
  userId: number;
  date: Date;
  hoursOfSleep: number;
  steps: number;
  createdAt: string;
  updatedAt: string;
}
