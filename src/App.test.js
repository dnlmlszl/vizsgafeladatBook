import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Replace the fetch function so that it returns a known, dummy data
global.fetch = async function mockFetch() {
  return {
    status: 200,
    statusText: 'OK',
    ok: true,
    json: async () => {
      return [
        { cim: 'bbb', polc: 1 },
        { cim: 'aaa', polc: 2 },
      ];
    },
  };
};

it('should render the spinner', () => {
  render(<App />);
  const imageElement = screen.getByAltText(/Betöltés/i);
  expect(imageElement).toBeInTheDocument();
});

it('should render the table', async () => {
  render(<App />);

  const book1 = await screen.findByText(/aaa/);
  const book2 = await screen.findByText(/bbb/);
  expect(book1).toBeInTheDocument();
  expect(book2).toBeInTheDocument();
});
