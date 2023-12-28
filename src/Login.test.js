import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for custom jest matchers
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login';

test('renders login component', () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  // Check if the login form is rendered
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument();
  expect(screen.getByText(/Don't have an account/i)).toBeInTheDocument();
});

test('handles login with correct credentials', () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  // Simulate user input
  fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
    target: { value: 'email' },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: 'password' },
  });

  // Trigger the login button click
  fireEvent.click(screen.getByRole('button', { name: /Log In/i }));

  // Check if the success toast is displayed
  expect(screen.getByText(/Login Successful/i)).toBeInTheDocument();
});

test('handles login with incorrect credentials', () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  // Simulate user input with incorrect credentials
  fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
    target: { value: 'wrong@gmail.com' },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: 'wrongpassword' },
  });

  // Trigger the login button click
  fireEvent.click(screen.getByRole('button', { name: /Log In/i }));

  // Check if the error toast is displayed
  expect(screen.getByText(/Login Failed/i)).toBeInTheDocument();
});
