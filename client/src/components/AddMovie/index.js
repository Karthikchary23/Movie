import './index.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
    const [movieTitle, setMovieTitle] = useState("");
    const [movieDirector, setMovieDirector] = useState("");
    const [movieGenre, setMovieGenre] = useState("");
    const [movieReleaseYear, setMovieReleaseYear] = useState("");
    const [moviePosterUrl, setMoviePosterUrl] = useState("");
    const [movieIsWatched, setMovieIsWatched] = useState(false);
    const navigate = useNavigate();

    const onChangeMovieTitle = (e) => setMovieTitle(e.target.value);
    const onChangeMovieDirector = (e) => setMovieDirector(e.target.value);
    const onChangeMovieGenre = (e) => setMovieGenre(e.target.value);
    const onChangeMovieReleaseYear = (e) => setMovieReleaseYear(e.target.value);
    const onChangeMoviePosterUrl = (e) => setMoviePosterUrl(e.target.value);
    const onChangeMovieIsWatched = (e) => setMovieIsWatched(e.target.checked);

    const onClickedAddMovie = async (e) => {
        e.preventDefault();
        const movieData = {
            movie_id: uuidv4(),
            movie_title: movieTitle,
            movie_director: movieDirector,
            movie_genre: movieGenre,
            movie_release_year: movieReleaseYear,
            movie_poster_url: moviePosterUrl,
            movie_is_watched: movieIsWatched
        };
        try {
            const response = await fetch('http://localhost:4000/add-movie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movieData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            alert(data.message);
            setMovieTitle("");
            setMovieDirector("");
            setMovieGenre("");
            setMovieReleaseYear("");
            setMoviePosterUrl("");
            setMovieIsWatched(false);
            navigate('/');
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };

    return (
        <div className='add-movie modern-card'>
            <h1 className="add-movie-title">Add a New Movie</h1>
            <form onSubmit={onClickedAddMovie} className="add-movie-form">
                <input type="text" placeholder="Movie Title" value={movieTitle} onChange={onChangeMovieTitle} required />
                <input type="text" placeholder="Director" value={movieDirector} onChange={onChangeMovieDirector} required />
                <input type="text" placeholder="Genre" value={movieGenre} onChange={onChangeMovieGenre} required />
                <input type="number" placeholder="Release Year" value={movieReleaseYear} onChange={onChangeMovieReleaseYear} required min="1888" max={new Date().getFullYear()} />
                <input type="url" placeholder="Poster URL" value={moviePosterUrl} onChange={onChangeMoviePosterUrl} required />
                <label className="checkbox-label">
                    <input type="checkbox" checked={movieIsWatched} onChange={onChangeMovieIsWatched} />
                    Watched
                </label>
                <button type='submit' className="modern-btn">Add Movie</button>
            </form>
        </div>
    );
};

export default AddMovie;