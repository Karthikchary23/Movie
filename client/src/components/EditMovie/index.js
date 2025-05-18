import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './index.css';

const EditMovie = () => {
    const { movie_id } = useParams();
    const navigate = useNavigate();

    const [movieTitle, setMovieTitle] = useState('');
    const [movieDirector, setMovieDirector] = useState('');
    const [movieGenre, setMovieGenre] = useState('');
    const [movieReleaseYear, setMovieReleaseYear] = useState('');
    const [moviePosterUrl, setMoviePosterUrl] = useState('');
    const [movieIsWatched, setMovieIsWatched] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                console.log(movie_id);
                const response = await fetch(`http://localhost:4000/get-movie/${movie_id}`);
                if (!response.ok) throw new Error('Failed to fetch movie');
                const data = await response.json();
                const movie = data[0]; // because it's an array
                setMovieTitle(movie.movie_title);
                setMovieDirector(movie.movie_director);
                setMovieGenre(movie.movie_genre);
                setMovieReleaseYear(movie.movie_release_year);
                setMoviePosterUrl(movie.movie_poster_url);
                setMovieIsWatched(movie.movie_is_watched);

            } catch (error) {
                alert('Error fetching movie details');
            } finally {
                setLoading(false);
            }
        };
        fetchMovie();
    }, [movie_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedMovie = {
            movie_id, // include movie_id in the body
            movie_title: movieTitle,
            movie_director: movieDirector,
            movie_genre: movieGenre,
            movie_release_year: movieReleaseYear,
            movie_poster_url: moviePosterUrl,
            movie_is_watched: movieIsWatched
        };
        try {
            const response = await fetch(`http://localhost:4000/update-movie`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedMovie)
            });
            if (!response.ok) throw new Error('Failed to update movie');
            const data = await response.json();
            alert(data.message);
            navigate('/');
        } catch (error) {
            alert('Error updating movie');
        }
    };

    if (loading) return <div className="edit-movie modern-card"><p>Loading...</p></div>;

    return (
        <div className="edit-movie modern-card">
            <h1 className="edit-movie-title">Edit Movie</h1>
            <form onSubmit={handleSubmit} className="edit-movie-form">
                <input type="text" placeholder="Movie Title" value={movieTitle} onChange={e => setMovieTitle(e.target.value)} required />
                <input type="text" placeholder="Director" value={movieDirector} onChange={e => setMovieDirector(e.target.value)} required />
                <input type="text" placeholder="Genre" value={movieGenre} onChange={e => setMovieGenre(e.target.value)} required />
                <input type="number" placeholder="Release Year" value={movieReleaseYear} onChange={e => setMovieReleaseYear(e.target.value)} required min="1888" max={new Date().getFullYear()} />
                <input type="url" placeholder="Poster URL" value={moviePosterUrl} onChange={e => setMoviePosterUrl(e.target.value)} required />
                <label className="checkbox-label">
                    <input type="checkbox" checked={movieIsWatched} onChange={e => setMovieIsWatched(e.target.checked)} />
                    Watched
                </label>
                <button type="submit" className="modern-btn">Update Movie</button>
            </form>
        </div>
    );
};

export default EditMovie;