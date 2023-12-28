import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for custom jest matchers
import { BrowserRouter as Router } from 'react-router-dom';
import Register from './components/Register';

test('renders register component', () => {
  render(
    <Router>
      <Register />
    </Router>
  );

  // Check if the register form is rendered
  expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Your name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Confirm password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
  expect(screen.getByText(/Already have an account/i)).toBeInTheDocument();
});

test('handles registration with valid input', () => {
  render(
    <Router>
      <Register />
    </Router>
  );

  // Simulate user input with valid data
  fireEvent.change(screen.getByPlaceholderText(/Your name/i), {
    target: { value: 'John Doe' },
  });
  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: 'john@example.com' },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: 'password123' },
  });
  fireEvent.change(screen.getByPlaceholderText(/Confirm password/i), {
    target: { value: 'password123' },
  });

  // Trigger the registration button click
  fireEvent.click(screen.getByRole('button', { name: /Register/i }));

  // Check if the success toast is displayed
  expect(screen.getByText(/Registration Successful/i)).toBeInTheDocument();
});

test('handles registration with invalid input', () => {
  render(
    <Router>
      <Register />
    </Router>
  );

  // Simulate user input with invalid data
  fireEvent.change(screen.getByPlaceholderText(/Your name/i), {
    target: { value: '' },
  });
  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: 'invalid-email' },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: 'pass' },
  });
  fireEvent.change(screen.getByPlaceholderText(/Confirm password/i), {
    target: { value: 'mismatch' },
  });

  // Trigger the registration button click
  fireEvent.click(screen.getByRole('button', { name: /Register/i }));

  // Check if the error toast is displayed
  expect(screen.getByText(/Registration Failed/i)).toBeInTheDocument();
});
