import React, { useState, useEffect } from 'react';
import SearchResultCard from './SearchResultCard';

function SearchResults({ searchTerm, selectedEntity, selectedFilters }) {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ searchTerm, selectedEntity, selectedFilters }),
        });

        const data = await response.json();
        setSearchResults(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchTerm, selectedEntity, selectedFilters]);

  return (
    <div>
      <h3>Search Results</h3>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result) => (
            <SearchResultCard key={result.id} result={result} />
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default SearchResults;
