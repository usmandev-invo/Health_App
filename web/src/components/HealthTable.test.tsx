import React from 'react';
import { render, screen } from '@testing-library/react';
import HealthTable from './HealthTable';

describe('HealthTable', () => {
  const mockRecords = [
    { id: 1, date: '2024-08-25', steps: 10000, hoursOfSleep: 8 },
    { id: 2, date: '2024-08-26', steps: 8000, hoursOfSleep: 7 }
  ];
  const mockError = null;
  const mockFetchRecords = jest.fn();

  it('renders table headers and data', () => {
    render(<HealthTable records={mockRecords} error={mockError} fetchRecords={mockFetchRecords} />);

    // Check that headers are present
    expect(screen.getByText(/Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Steps/i)).toBeInTheDocument();
    expect(screen.getByText(/Hours of Sleep/i)).toBeInTheDocument();

    // Check that data is rendered
    expect(screen.getByText('2024-08-25')).toBeInTheDocument();
    expect(screen.getByText('10000')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
  });

  it("fetches and displays data correctly", async () => {
    render(<HealthTable records={mockRecords} error={mockError} fetchRecords={mockFetchRecords} />);

    expect(mockFetchRecords).toHaveBeenCalled();
  });

  it("shows loading state", async () => {
    const { rerender } = render(<HealthTable records={[]} error={mockError} fetchRecords={mockFetchRecords} />);
    expect(screen.getByText(/No records found/i)).toBeInTheDocument();
    
    rerender(<HealthTable records={mockRecords} error={mockError} fetchRecords={mockFetchRecords} />);
    expect(screen.getByText("2024-08-25")).toBeInTheDocument();
  });

  it("displays error message", () => {
    const mockError = "Failed to load records";
    render(<HealthTable records={[]} error={mockError} fetchRecords={mockFetchRecords} />);

    expect(screen.getByText(/Failed to load records/i)).toBeInTheDocument();
  });
});
