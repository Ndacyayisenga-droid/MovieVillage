import React, { useState, useEffect, useCallback, useMemo } from "react";

import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=1cace739";

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchMovies = useCallback(async (title) => {
        if (!title.trim()) return;
        
        setLoading(true);
        setError(null);
        
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
            setError("Failed to fetch movies. Please try again.");
            setMovies([]);
            console.error("Error fetching movies:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        searchMovies("Batman");
    }, [searchMovies]);

    const handleSearch = useCallback(() => {
        searchMovies(searchTerm);
    }, [searchTerm, searchMovies]);

    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }, [handleSearch]);

    const debouncedSearch = useMemo(() => {
        let timeoutId;
        return (value) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if (value.trim()) {
                    searchMovies(value);
                }
            }, 500);
        };
    }, [searchMovies]);

    const handleInputChange = useCallback((e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    }, [debouncedSearch]);

    return (
        <div className="app">
            <header>
                <h1>MovieVillage</h1>
            </header>

            <main>
                <div className="search" role="search">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Search for movies"
                        aria-label="Search for movies"
                        disabled={loading}
                    />
                    <button
                        type="button"
                        onClick={handleSearch}
                        disabled={loading || !searchTerm.trim()}
                        aria-label="Search movies"
                        className="search-button"
                    >
                        <img
                            src={SearchIcon}
                            alt="Search"
                            width="35"
                            height="35"
                        />
                    </button>
                </div>

                {loading && (
                    <div className="loading" role="status" aria-live="polite">
                        <h2>Searching for movies...</h2>
                    </div>
                )}

                {error && !loading && (
                    <div className="error" role="alert">
                        <h2>{error}</h2>
                    </div>
                )}

                {!loading && !error && movies?.length > 0 && (
                    <div className="container" role="region" aria-label="Movie results">
                        {movies.map((movie) => (
                            <MovieCard key={movie.imdbID} movie={movie} />
                        ))}
                    </div>
                )}

                {!loading && !error && movies?.length === 0 && searchTerm && (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;