import './index.css';
import { useState, useEffect } from 'react';
import { IoMdSearch } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import MovieListItem from '../MovieListItem/index';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // <-- Move useNavigate here

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:4000/get-all-movies');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const onClickedSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        const filteredMovies = movies.filter(movie => {
            return movie.movie_title.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setMovies(filteredMovies);
        setSearchTerm("");
        setLoading(false);
    }

    const onChangeSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    const onClickedAddMovie = () => {
        navigate('/add-movie'); 
    }

    return (
        <div className='main'>
            <div className="home">
                <h1>Welcome to Movie App</h1>
                <form onSubmit={onClickedSearch} className='search-bar'>
                    <input type="text" placeholder="Search for a movie..." onChange={onChangeSearch} />
                    <button type='submit' className='search-btn'><IoMdSearch className='custom-search-icon' height={9} width={12} /></button>
                </form>
                <div className="movie-list">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <ul>
                            {
                                movies.map((movie) => <MovieListItem key={movie.movie_id} movie={movie} />)
                            }
                        </ul>
                    )
                    }
                    <hr />
                </div>
                <button onClick={onClickedAddMovie} className='add-movie-btn'><IoAdd size={30} /></button>
            </div>
        </div>
    );
}

export default Home;