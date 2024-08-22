// src/screens/records/Records.test.tsx

import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import RecordsScreen from './index'; 
import { useNavigation } from '@react-navigation/native';

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

// Mock the APIService.getInstance and getHealthData methods
jest.mock('@services/api', () => ({
  getInstance: jest.fn(() => ({
    getHealthData: jest.fn(() => Promise.resolve([])), // Mock empty data or provide some test data
  })),
}));

describe('RecordsScreen', () => {
  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({
      goBack: jest.fn(),
    });
  });

  test('renders RecordsScreen correctly', async () => {
    const { getByText } = render(<RecordsScreen />);

    // Check for the presence of the text 'Health Records'
    await waitFor(() => {
      expect(getByText('Health Records')).toBeTruthy();
    });
  });
});
