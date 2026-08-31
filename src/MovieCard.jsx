import React from 'react';
import PropTypes from 'prop-types';

const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Type } }) => {
    return (
        <article className="movie" key={imdbID}>
            <div className="movie-year">
                <p>{Year}</p>
            </div>

            <div className="movie-poster">
                <img 
                    src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"} 
                    alt={`${Title} movie poster`}
                    loading="lazy"
                />
            </div>

            <div className="movie-info">
                <span className="movie-type">{Type}</span>
                <h3 className="movie-title">{Title}</h3>
            </div>
        </article>
    );
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        imdbID: PropTypes.string.isRequired,
        Year: PropTypes.string.isRequired,
        Poster: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Type: PropTypes.string.isRequired,
    }).isRequired,
};

export default MovieCard;