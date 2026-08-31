import React, { useState, useEffect, useCallback } from "react";

import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = `https://www.omdbapi.com?apikey=${process.env.REACT_APP_OMDB_API_KEY}`;

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const searchMovies = useCallback(async (title) => {
        if (!title.trim()) {
            setMovies([]);
            setError("");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${API_URL}&s=${encodeURIComponent(title)}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();

            if (data.Response === "True") {
                setMovies(data.Search || []);
            } else {
                setMovies([]);
                setError(data.Error || "No movies found");
            }
        } catch (err) {
            setError("Failed to fetch movies. Please check your connection and try again.");
            setMovies([]);
            console.error("Search error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Debounced search effect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm) {
                searchMovies(searchTerm);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, searchMovies]);

    // Initial search
    useEffect(() => {
        searchMovies("Batman");
    }, [searchMovies]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        searchMovies(searchTerm);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchMovies(searchTerm);
        }
    };

    return (
        <div className="app">
            <h1>MovieVillage</h1>

            <form className="search" onSubmit={handleSearchSubmit} role="search">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Search for movies"
                    aria-label="Search for movies"
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="search-button"
                    disabled={loading}
                    aria-label="Search movies"
                >
                    <img
                        src={SearchIcon}
                        alt=""
                        role="presentation"
                    />
                </button>
            </form>

            {loading && (
                <div className="loading" role="status" aria-live="polite">
                    <p>Searching for movies...</p>
                </div>
            )}

            {error && (
                <div className="error" role="alert" aria-live="assertive">
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && movies?.length > 0 && (
                <div className="container" role="main">
                    {movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            )}

            {!loading && !error && movies?.length === 0 && searchTerm && (
                <div className="empty" role="status">
                    <h2>No movies found for "{searchTerm}"</h2>
                    <p>Try searching with different keywords.</p>
                </div>
            )}
        </div>
    );
};

export default App;