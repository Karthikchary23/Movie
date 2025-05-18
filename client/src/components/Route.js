import { Routes, Route } from 'react-router-dom';
import EditMovie from './EditMovie'; // adjust path as needed

function App() {
    return (
        <Routes>
            {/* other routes */}
            <Route path="/edit-movie/:movie_id" element={<EditMovie />} />
        </Routes>
    );
}
