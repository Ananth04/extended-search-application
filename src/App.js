import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage'; // Import your components
import ResultsPage from './components/ResultsPage'; // Import your components
import EntityDetailPage from './components/EntityDetailPage'; // Import your components

function App() {
  return (
    <Router>
      <div className="App">
        <header>
        <h1>Vineet is an idiot</h1>
        <Link to='/'>Home</Link>
        <Link to='/results'>Results</Link> {/* Link to Results Page */}
        <Link to='/entity/123'>Entity Detail</Link> {/* Example link to Entity Detail Page with ID 123 */}
        </header>
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Landing page */}
          <Route path="/results" element={<ResultsPage />} /> {/* Results page */}
          <Route path="/entity/:id" element={<EntityDetailPage />} /> {/* Entity detail page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
