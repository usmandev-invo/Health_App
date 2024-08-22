import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HealthForm from './HealthForm';

describe('HealthForm', () => {
  const mockAddRecord = jest.fn();
  const mockFetchRecords = jest.fn();

  it('renders the form with initial values', () => {
    render(<HealthForm addRecord={mockAddRecord} fetchRecords={mockFetchRecords} />);

    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Steps/i)).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    render(<HealthForm addRecord={mockAddRecord} fetchRecords={mockFetchRecords} />);

    fireEvent.click(screen.getByText(/Submit/i));

    expect(screen.getByText(/Date is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Steps are required/i)).toBeInTheDocument();
    expect(screen.getByText(/Hours of sleep are required/i)).toBeInTheDocument();
  });

  it('calls addRecord on form submission', async () => {
    render(<HealthForm addRecord={mockAddRecord} fetchRecords={mockFetchRecords} />);

    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2024-08-25' } });
    fireEvent.change(screen.getByLabelText(/Steps/i), { target: { value: '10000' } });
    fireEvent.change(screen.getByLabelText(/Hours of Sleep/i), { target: { value: '8' } });

    fireEvent.click(screen.getByText(/Submit/i));

    expect(mockAddRecord).toHaveBeenCalledWith({
      date: '2024-08-25',
      steps: 10000,
      hoursOfSleep: 8
    });
  });
});
