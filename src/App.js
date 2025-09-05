import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShowDetails from './pages/ShowDetails'; // import this
import BookMovie from './pages/BookMovie';
import Receipt from './pages/Receipt';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show/:id" element={<ShowDetails />} /> {/* Add this */}
        <Route path="/book/:id" element={<BookMovie />} />
<Route path="/receipt" element={<Receipt />} />
      </Routes>
    </Router>
  );
}

export default App;
