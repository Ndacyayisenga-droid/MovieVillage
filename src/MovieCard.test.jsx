import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieCard from './MovieCard';

const mockMovie = {
  imdbID: 'tt0372784',
  Title: 'Batman Begins',
  Year: '2005',
  Type: 'movie',
  Poster: 'https://example.com/poster.jpg'
};

describe('MovieCard Component', () => {
  test('renders movie information correctly', () => {
    render(<MovieCard movie={mockMovie} />);
    
    expect(screen.getByText('Batman Begins')).toBeInTheDocument();
    expect(screen.getByText('2005')).toBeInTheDocument();
    expect(screen.getByText('movie')).toBeInTheDocument();
  });

  test('renders movie poster with correct alt text', () => {
    render(<MovieCard movie={mockMovie} />);
    
    const poster = screen.getByAltText('Batman Begins movie poster');
    expect(poster).toBeInTheDocument();
    expect(poster).toHaveAttribute('src', 'https://example.com/poster.jpg');
  });

  test('uses placeholder image when poster is N/A', () => {
    const movieWithoutPoster = { ...mockMovie, Poster: 'N/A' };
    render(<MovieCard movie={movieWithoutPoster} />);
    
    const poster = screen.getByAltText('Batman Begins movie poster');
    expect(poster.src).toContain('placeholder.com');
  });

  test('has proper accessibility attributes', () => {
    render(<MovieCard movie={mockMovie} />);
    
    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('aria-labelledby', 'title-tt0372784');
    
    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toHaveAttribute('id', 'title-tt0372784');
  });
});