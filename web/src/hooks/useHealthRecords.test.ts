import { renderHook, act } from "@testing-library/react";
import { useHealthRecords } from "../hooks/useHealthRecords";
import { getHealthRecords, addHealthRecord } from "../api/healthApi"; // Adjust path if needed

// Mock the API functions
jest.mock("../api/healthApi", () => ({
  getHealthRecords: jest.fn(),
  addHealthRecord: jest.fn(),
}));

describe("useHealthRecords Hook", () => {
  it("should fetch and update records", async () => {
    const mockRecords = [
      { id: 1, date: "2024-08-25", steps: 10000, hoursOfSleep: 7 },
      { id: 2, date: "2024-08-26", steps: 12000, hoursOfSleep: 8 },
    ];

    // Mock implementation of getHealthRecords
    (getHealthRecords as jest.Mock).mockResolvedValue(mockRecords);

    const { result } = renderHook(() => useHealthRecords());

    await act(async () => {
      await result.current.fetchRecords();
    });

    expect(result.current.records).toEqual(mockRecords);
  });

  it("should add a record", async () => {
    const newRecord = { date: "2024-08-27", steps: 9000, hoursOfSleep: 6 };
    const addedRecord = { id: 3, ...newRecord };

    // Mock implementation of addHealthRecord
    (addHealthRecord as jest.Mock).mockResolvedValue(addedRecord);

    const { result } = renderHook(() => useHealthRecords());

    await act(async () => {
      await result.current.addRecord(newRecord);
    });

    expect(result.current.records).toContain(addedRecord);
  });
});
