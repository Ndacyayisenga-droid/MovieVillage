import React, { useState } from 'react';

const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Type } }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    const handleImageError = () => {
        setImageError(true);
        setImageLoading(false);
    };

    const posterSrc = Poster !== "N/A" && !imageError 
        ? Poster 
        : "https://via.placeholder.com/400x600/343739/f9d3b4?text=No+Image";

    return (
        <article className="movie" aria-labelledby={`title-${imdbID}`}>
            <div className="movie-year">
                <p aria-label={`Released in ${Year}`}>{Year}</p>
            </div>

            <div className="movie-poster">
                {imageLoading && (
                    <div className="image-placeholder" aria-hidden="true">
                        Loading...
                    </div>
                )}
                <img 
                    src={posterSrc}
                    alt={`${Title} movie poster`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    style={{ display: imageLoading ? 'none' : 'block' }}
                />
            </div>

            <div className="movie-info">
                <span className="movie-type" aria-label={`Type: ${Type}`}>
                    {Type}
                </span>
                <h3 id={`title-${imdbID}`} className="movie-title">
                    {Title}
                </h3>
            </div>
        </article>
    );
};

export default MovieCard;