import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/index';
import AddMovie from './components/AddMovie/index';
import EditMovie from './components/EditMovie';


const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/edit-movie/:movie_id" element={<EditMovie />} />
        {/* <Route path="/movie/:id" element={<MovieDetails />} /> */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;