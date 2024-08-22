import React, { useEffect } from "react";
import { HealthRecord } from "../types/HealthRecord";

interface HealthTableProps {
  records: HealthRecord[];
  error: string | null;
  fetchRecords: () => void;
}

const HealthTable: React.FC<HealthTableProps> = ({ records, error, fetchRecords }) => {
  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  return (
    <div className="p-4">
      {error && <p className="text-red-600">{error}</p>}
      {!error && records.length === 0 && <p>No records found</p>}
      {records.length > 0 && (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Date</th>
              <th className="px-4 py-2 text-left text-gray-600">Steps</th>
              <th className="px-4 py-2 text-left text-gray-600">Hours of Sleep</th>
            </tr>
          </thead>
          <tbody>
            {records.slice().reverse().map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b border-gray-200">
                  {new Date(record.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">{record.steps}</td>
                <td className="px-4 py-2 border-b border-gray-200">{record.hoursOfSleep}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HealthTable;
