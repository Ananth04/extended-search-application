import React, { useState } from 'react';
import axios from 'axios';

const LandingPage = () => {
  const [entity, setEntity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/search?entity=${entity}&searchTerm=${searchTerm}`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <h1>Welcome to Your Search Application</h1>

      {/* Entity Selection Dropdown */}
      <select value={entity} onChange={(e) => setEntity(e.target.value)}>
        <option value="">Select an Entity</option>
        <option value="technology">Technology</option>
        <option value="country">Country</option>
        <option value="manufacturer">Manufacturer</option>
        {/* Add other entity options */}
      </select>

      {/* Search Bar */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter your search query"
      />

      {/* Search Button */}
      <button onClick={handleSearch}>Search</button>

      {/* Display Search Results */}
      <div>
        <h2>Search Results</h2>
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;
