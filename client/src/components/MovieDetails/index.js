import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';

const MovieDetails = () => {
  const { movie_id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/get-movie/${movie_id}`);
        if (!response.ok) throw new Error('Failed to fetch movie details');
        const data = await response.json();
        console.log(data);
        setMovie(data[0]); // assuming data is an array with one object
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movie_id]);

  if (!movie) return <div className="loading-message">Loading movie details...</div>;

  return (
    <div className="movie-details-container">
      <div className="movie-poster-container">
        <img 
          src={movie.movie_poster_url || "https://via.placeholder.com/300"} 
          alt={movie.movie_title} 
          className="movie-poster"
        />
        <p className="cinema-status">In cinemas</p>
      </div>

      <div className="movie-info-container">
        <h1 className="movie-title">#{movie.movie_title}</h1>
        <div className="rating-container">
          <span className="vote-count"><strong>Director:</strong> {movie.movie_director}</span>
        </div>

        {/* <div className="movie-details-tags">
          <span className="movie-tag"><strong>Released Year:</strong></span>
        </div> */}

        <p className="movie-summary">
           {movie.movie_genre} • UA16+ • Released {movie.movie_release_year}

        </p>

        {/* <button className="book-tickets-button">Book tickets</button> */}
      </div>
    </div>
  );
};

export default MovieDetails;
