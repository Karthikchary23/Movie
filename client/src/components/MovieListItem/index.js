// Import the CSS file in your component
import './index.css';
import { Link, useNavigate } from 'react-router-dom';

const MovieListItem = ({ movie, onDelete }) => {
    const {
        movie_id,
        movie_title,
        movie_director,
        movie_genre,
        movie_release_year,
        movie_poster_url,
        movie_is_watched
    } = movie;

    const navigate = useNavigate();

    const handleUpdate = (e) => {
        e.preventDefault();
        // This will navigate to /edit-movie/{movie_id}
        navigate(`/edit-movie/${movie_id}`);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:4000/delete-movie/${movie_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movie_id })
        });
        if (!response.ok) {
            alert("Error Deleting Movie");
            return;
        }
        const data = await response.json();
        alert(data.message);
    };

    return (
        <div className="movie-list-item card">
            <Link to={`/movie/${movie_id}`} className="movie-link">
                <div className="movie-poster-container">
                    <img src={movie_poster_url} alt={movie_title} className="movie-poster1" />
                    {movie_is_watched && (
                        <span className="watched-badge">Watched</span>
                    )}
                </div>
                <div className="movie-details">
                    <p className="movie-title">{movie_title}</p>
                    <p className="movie-director"><strong>Director:</strong> {movie_director}</p>
                    <div className="movie-meta">
                        <span className="movie-genre">{movie_genre}</span>
                        <span className="movie-release-year">{movie_release_year}</span>
                    </div>
                </div>
            </Link>
            <div className="movie-actions">
                <button className="update-btn" onClick={handleUpdate}>Update</button>
                <button className="delete-btn" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}

export default MovieListItem;