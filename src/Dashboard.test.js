import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Dashboard';

// Mocking the fetch function
// jest.mock('node-fetch');

test('renders dashboard component', async () => {
  render(
    <Router>
      <Dashboard />
    </Router>
  );

  // Check if the search input and button are rendered
  expect(screen.getByPlaceholderText(/Search for a stock/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
});

test('fetches and displays stock data on search', async () => {
  // Mocking fetch responses
  fetch.mockResolvedValueOnce({
    json: async () => [
      { priceDate: '2022-01-01', close: 100 },
      { priceDate: '2022-01-02', close: 120 },
    ],
  });
  fetch.mockResolvedValueOnce({
    json: async () => [
      { companyName: 'Test Company', close: 120 },
    ],
  });

  render(
    <Router>
      <Dashboard />
    </Router>
  );

  // Simulate user input and trigger search
  fireEvent.change(screen.getByPlaceholderText(/Search for a stock/i), {
    target: { value: 'mock' },
  });
  fireEvent.click(screen.getByRole('button', { name: /Search/i }));

  // Wait for the data to be fetched and displayed
  await waitFor(() => {
    // Check if the stock data is displayed
    expect(screen.getByText(/Test Company/i)).toBeInTheDocument();
    expect(screen.getByText(/2022-01-01/i)).toBeInTheDocument();
    expect(screen.getByText(/2022-01-02/i)).toBeInTheDocument();
  });
});

test('handles error during data fetch', async () => {
  // Mocking a failed fetch response
  fetch.mockRejectedValueOnce(new Error('Fetch error'));

  render(
    <Router>
      <Dashboard />
    </Router>
  );

  // Simulate user input and trigger search
  fireEvent.change(screen.getByPlaceholderText(/Search for a stock/i), {
    target: { value: 'invalid' },
  });
  fireEvent.click(screen.getByRole('button', { name: /Search/i }));

  // Wait for the error message to be displayed
  await waitFor(() => {
    expect(screen.getByText(/Error fetching stock data/i)).toBeInTheDocument();
  });
});

// You can add more test cases for user interactions, formatting, etc.
