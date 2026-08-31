import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock fetch for testing
global.fetch = jest.fn();

describe('App Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders MovieVillage title', () => {
    render(<App />);
    const titleElement = screen.getByText(/MovieVillage/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders search input', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Search for movies/i);
    expect(searchInput).toBeInTheDocument();
  });

  test('renders search button', () => {
    render(<App />);
    const searchButton = screen.getByLabelText(/Search movies/i);
    expect(searchButton).toBeInTheDocument();
  });

  test('displays loading state when searching', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ Response: "True", Search: [] }),
      })
    );

    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Search for movies/i);
    
    fireEvent.change(searchInput, { target: { value: 'test movie' } });
    
    // Should show loading state briefly
    await waitFor(() => {
      expect(screen.getByText(/Searching for movies/i)).toBeInTheDocument();
    });
  });

  test('displays error message when API fails', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('API Error'))
    );

    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Search for movies/i);
    
    fireEvent.change(searchInput, { target: { value: 'test movie' } });
    
    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch movies/i)).toBeInTheDocument();
    });
  });

  test('displays no movies found message when search returns empty', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ Response: "False", Error: "Movie not found!" }),
      })
    );

    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Search for movies/i);
    
    fireEvent.change(searchInput, { target: { value: 'nonexistent movie' } });
    
    await waitFor(() => {
      expect(screen.getByText(/Movie not found!/i)).toBeInTheDocument();
    });
  });
});