import React from "react";
import HealthForm from "../components/HealthForm";
import HealthTable from "../components/HealthTable";
import { useHealthRecords } from "../hooks/useHealthRecords";

const HomePage: React.FC = () => {
  const { records, error, addRecord, fetchRecords } = useHealthRecords();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Health Tracker</h1>
      <HealthForm addRecord={addRecord} fetchRecords={fetchRecords} />
      <HealthTable records={records} error={error} fetchRecords={fetchRecords} />
    </div>
  );
};

export default HomePage;
